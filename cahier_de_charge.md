# EventTLS — Cahier des charges technique

> Plateforme de découverte et gestion d'événements à Toulouse  
> Stack : Angular 17+ · Supabase · Open Data Toulouse Métropole  
> Objectif : démontrer les compétences Angular recherchées sur le marché toulousain

---

## 1. Vue d'ensemble

EventTLS agrège les événements officiels de Toulouse Métropole (via API open data) et permet à des organisateurs de publier leurs propres événements. Les utilisateurs peuvent rechercher, filtrer, s'inscrire et favoriser des événements.

**Trois rôles :**
- `visitor` — navigation libre, pas de compte
- `user` — inscription aux événements, favoris, profil
- `organizer` — création/gestion d'événements, dashboard stats

---

## 2. Stack technique

| Couche | Techno | Justification |
|---|---|---|
| Framework | Angular 17+ (Standalone) | Marché toulousain |
| State | Angular Signals | Moderne, sans NgRx |
| UI | Angular Material + Tailwind | Combo standard ESN/produit |
| Backend | Supabase | Auth + DB + Realtime + Storage |
| Carte | Leaflet + OpenStreetMap | Libre, pas de clé |
| Charts | ngx-charts | Natif Angular |
| Data source | Open Data Toulouse Métropole API | Données réelles |
| Deploy | Vercel | Simple, gratuit |

---

## 3. Architecture Angular

### Structure des dossiers

```
src/
├── app/
│   ├── core/                         # Singletons injectés root
│   │   ├── services/
│   │   │   ├── auth.service.ts       # Supabase Auth wrapper
│   │   │   ├── events.service.ts     # CRUD events Supabase
│   │   │   ├── toulouse-api.service.ts  # Open Data API
│   │   │   └── realtime.service.ts   # Supabase Realtime
│   │   ├── guards/
│   │   │   ├── auth.guard.ts         # Redirige si non connecté
│   │   │   └── role.guard.ts         # Vérifie le rôle (organizer)
│   │   ├── interceptors/
│   │   │   ├── auth.interceptor.ts   # Injecte JWT Supabase
│   │   │   └── error.interceptor.ts  # Gestion erreurs globale
│   │   └── resolvers/
│   │       └── event-detail.resolver.ts
│   │
│   ├── shared/                       # Composants/pipes réutilisables
│   │   ├── components/
│   │   │   ├── event-card/
│   │   │   ├── map-view/
│   │   │   ├── skeleton-loader/
│   │   │   └── category-badge/
│   │   └── pipes/
│   │       ├── event-date.pipe.ts    # "Demain à 20h" / "Sam. 21 juin"
│   │       ├── distance.pipe.ts      # "à 1.2 km"
│   │       └── truncate.pipe.ts
│   │
│   ├── features/
│   │   ├── home/                     # Route /
│   │   ├── events/                   # Route /events + /events/:id
│   │   ├── auth/                     # Route /auth/login + /register
│   │   ├── dashboard/                # Route /dashboard (lazy + guard)
│   │   └── profile/                  # Route /profile (lazy + guard)
│   │
│   ├── app.routes.ts
│   └── app.config.ts
```

### Routes avec lazy loading

```typescript
// app.routes.ts
export const routes: Routes = [
  { path: '', loadComponent: () => import('./features/home/home.component') },
  { path: 'events', loadComponent: () => import('./features/events/events-list.component') },
  {
    path: 'events/:id',
    loadComponent: () => import('./features/events/event-detail.component'),
    resolve: { event: eventDetailResolver }
  },
  { path: 'auth/login', loadComponent: () => import('./features/auth/login.component') },
  { path: 'auth/register', loadComponent: () => import('./features/auth/register.component') },
  {
    path: 'dashboard',
    loadChildren: () => import('./features/dashboard/dashboard.routes'),
    canActivate: [authGuard, roleGuard('organizer')]
  },
  {
    path: 'profile',
    loadComponent: () => import('./features/profile/profile.component'),
    canActivate: [authGuard]
  }
];
```

---

## 4. Schéma Supabase

### Tables

```sql
-- Profils utilisateurs (extension de auth.users)
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT NOT NULL,
  avatar_url TEXT,
  role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'organizer')),
  bio TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Événements (source officielle ou créés par organisateurs)
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  date_start TIMESTAMPTZ NOT NULL,
  date_end TIMESTAMPTZ,
  location_name TEXT,
  address TEXT,
  lat DOUBLE PRECISION,
  lng DOUBLE PRECISION,
  category TEXT,
  capacity INTEGER,
  price DECIMAL(10,2) DEFAULT 0,
  image_url TEXT,
  organizer_id UUID REFERENCES profiles(id),
  source TEXT NOT NULL DEFAULT 'user' CHECK (source IN ('toulouse_api', 'user')),
  external_id TEXT UNIQUE,          -- ID Open Data pour éviter les doublons
  views_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Inscriptions
CREATE TABLE registrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  event_id UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'confirmed' CHECK (status IN ('confirmed', 'cancelled', 'waitlist')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, event_id)
);

-- Favoris
CREATE TABLE favorites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  event_id UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, event_id)
);
```

### Vues utiles

```sql
-- Événements enrichis avec compteur d'inscrits (pour le dashboard)
CREATE VIEW events_with_stats AS
SELECT
  e.*,
  COUNT(DISTINCT r.id) FILTER (WHERE r.status = 'confirmed') AS registrations_count,
  COUNT(DISTINCT f.id) AS favorites_count
FROM events e
LEFT JOIN registrations r ON r.event_id = e.id
LEFT JOIN favorites f ON f.event_id = e.id
GROUP BY e.id;
```

### Row Level Security (RLS)

```sql
-- events : lecture publique, écriture uniquement par l'organisateur owner
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Lecture publique" ON events FOR SELECT USING (true);
CREATE POLICY "Organisateur peut créer" ON events FOR INSERT
  WITH CHECK (auth.uid() = organizer_id);
CREATE POLICY "Organisateur peut modifier ses events" ON events FOR UPDATE
  USING (auth.uid() = organizer_id);

-- registrations : user voit les siennes, organisateur voit celles de ses events
ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "User voit ses inscriptions" ON registrations FOR SELECT
  USING (auth.uid() = user_id);
CREATE POLICY "User peut s'inscrire" ON registrations FOR INSERT
  WITH CHECK (auth.uid() = user_id);
```

---

## 5. Intégration Open Data Toulouse

### Service Angular

```typescript
// toulouse-api.service.ts
@Injectable({ providedIn: 'root' })
export class ToulouseApiService {
  private readonly BASE_URL =
    'https://data.toulouse-metropole.fr/api/explore/v2.1/catalog/datasets/agenda-des-manifestations-culturelles-so-toulouse/records';

  private http = inject(HttpClient);

  getEvents(params: {
    limit?: number;
    offset?: number;
    category?: string;
    dateFrom?: string;
    search?: string;
  }): Observable<ToulouseApiResponse> {
    const where: string[] = [];

    // Toujours filtrer sur les événements futurs
    where.push(`date_debut >= '${new Date().toISOString().split('T')[0]}'`);

    if (params.category) {
      where.push(`type_de_manifestation = '${params.category}'`);
    }
    if (params.search) {
      where.push(`search(nom_de_la_manifestation, '${params.search}')`);
    }

    const httpParams = new HttpParams()
      .set('limit', params.limit ?? 20)
      .set('offset', params.offset ?? 0)
      .set('order_by', 'date_debut ASC')
      .set('where', where.join(' AND '));

    return this.http.get<ToulouseApiResponse>(this.BASE_URL, { params: httpParams });
  }
}
```

### Mapping vers le modèle interne

```typescript
// Transformer la réponse API vers le modèle Event de l'app
function mapToulouseEvent(raw: ToulouseRecord): Event {
  return {
    id: raw.recordid,
    title: raw.fields.nom_de_la_manifestation,
    description: raw.fields.descriptif_court,
    date_start: raw.fields.date_debut,
    date_end: raw.fields.date_fin,
    location_name: raw.fields.nom_du_lieu,
    address: raw.fields.adresse_du_lieu,
    lat: raw.geometry?.coordinates[1],
    lng: raw.geometry?.coordinates[0],
    category: raw.fields.type_de_manifestation,
    image_url: raw.fields.url_de_l_image,
    source: 'toulouse_api',
    external_id: raw.recordid
  };
}
```

---

## 6. Fonctionnalités — détail technique

### 6.1 Recherche live (RxJS)

```typescript
// events-list.component.ts
searchControl = new FormControl('');

filteredEvents$ = this.searchControl.valueChanges.pipe(
  debounceTime(300),
  distinctUntilChanged(),
  switchMap(query => this.toulouseApi.getEvents({ search: query ?? '' })),
  map(response => response.results)
);
```

Compétences couvertes : `debounceTime`, `distinctUntilChanged`, `switchMap`

---

### 6.2 Formulaire création événement (Reactive Forms, multi-steps)

```typescript
// event-create.component.ts — Stepper Angular Material

// Étape 1 : Informations générales
step1 = this.fb.group({
  title: ['', [Validators.required, Validators.minLength(5)]],
  description: ['', Validators.required],
  category: ['', Validators.required]
});

// Étape 2 : Date et lieu
step2 = this.fb.group({
  date_start: [null, [Validators.required, futureDateValidator()]],
  date_end: [null],
  location_name: ['', Validators.required],
  address: ['', Validators.required],
  lat: [null],
  lng: [null]
}, { validators: dateRangeValidator() });

// Étape 3 : Capacité et prix
step3 = this.fb.group({
  capacity: [null, [Validators.min(1), Validators.max(100000)]],
  price: [0, [Validators.required, Validators.min(0)]],
  image: [null]
});

// Validators custom
function futureDateValidator(): ValidatorFn {
  return (control) => {
    const date = new Date(control.value);
    return date > new Date() ? null : { pastDate: true };
  };
}
```

Compétences couvertes : Reactive Forms, validators custom, cross-field validator, stepper

---

### 6.3 Auth Interceptor

```typescript
// auth.interceptor.ts
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getToken();

  if (token) {
    const cloned = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });
    return next(cloned);
  }

  return next(req);
};
```

Compétences couvertes : HTTP Interceptors fonctionnels (Angular 17+)

---

### 6.4 Route Guards

```typescript
// auth.guard.ts
export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn()) return true;
  return router.createUrlTree(['/auth/login']);
};

// role.guard.ts
export const roleGuard = (requiredRole: string): CanActivateFn => () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const user = authService.currentUser();
  if (user?.role === requiredRole) return true;
  return router.createUrlTree(['/']);
};
```

Compétences couvertes : Guards fonctionnels, usage de Signals dans les guards

---

### 6.5 Signals (state management)

```typescript
// events-list.component.ts
export class EventsListComponent {
  // Signals pour l'état des filtres
  selectedCategory = signal<string | null>(null);
  selectedDate = signal<Date | null>(null);
  viewMode = signal<'list' | 'map'>('list');

  // Computed signal — recalculé automatiquement si les dépendances changent
  activeFiltersCount = computed(() => {
    let count = 0;
    if (this.selectedCategory()) count++;
    if (this.selectedDate()) count++;
    return count;
  });

  // Effect — réagit aux changements pour relancer le fetch
  constructor() {
    effect(() => {
      const category = this.selectedCategory();
      const date = this.selectedDate();
      this.loadEvents(category, date);
    });
  }
}
```

Compétences couvertes : `signal()`, `computed()`, `effect()`

---

### 6.6 Realtime Supabase

```typescript
// event-detail.component.ts
ngOnInit() {
  // Charger les données initiales
  this.loadRegistrationsCount();

  // S'abonner aux changements en temps réel
  this.supabase
    .channel(`event-${this.eventId}`)
    .on('postgres_changes', {
      event: 'INSERT',
      schema: 'public',
      table: 'registrations',
      filter: `event_id=eq.${this.eventId}`
    }, () => {
      // Mettre à jour le compteur via Signal
      this.registrationsCount.update(count => count + 1);
    })
    .subscribe();
}
```

Compétences couvertes : Supabase Realtime, intégration avec Signals

---

### 6.7 Resolver (chargement avant navigation)

```typescript
// event-detail.resolver.ts
export const eventDetailResolver: ResolveFn<Event> = (route) => {
  const eventsService = inject(EventsService);
  const id = route.paramMap.get('id')!;

  return eventsService.getById(id).pipe(
    catchError(() => {
      inject(Router).navigate(['/events']);
      return EMPTY;
    })
  );
};
```

Compétences couvertes : Resolvers fonctionnels, gestion d'erreur RxJS

---

### 6.8 Custom Pipes

```typescript
// event-date.pipe.ts
@Pipe({ name: 'eventDate', standalone: true })
export class EventDatePipe implements PipeTransform {
  transform(dateStr: string): string {
    const date = new Date(dateStr);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return `Aujourd'hui à ${format(date, 'HH:mm')}`;
    }
    if (date.toDateString() === tomorrow.toDateString()) {
      return `Demain à ${format(date, 'HH:mm')}`;
    }
    return format(date, 'EEE d MMM · HH:mm', { locale: fr });
  }
}
```

---

## 7. Dashboard Organisateur

### Métriques affichées

- Total inscrits à mes événements
- Événement le plus populaire
- Taux de remplissage moyen (inscrits / capacité)
- Évolution des inscriptions sur 30 jours (line chart)
- Répartition par catégorie (pie chart)

### Charts avec ngx-charts

```typescript
// dashboard.component.ts
registrationsOverTime: { name: string; value: number }[] = [];
categoryBreakdown: { name: string; value: number }[] = [];

// Données formatées depuis Supabase pour ngx-charts
loadChartData() {
  this.supabase
    .from('registrations')
    .select('created_at, events(category, title)')
    .eq('events.organizer_id', this.currentUserId)
    .then(({ data }) => {
      this.registrationsOverTime = this.groupByDay(data);
      this.categoryBreakdown = this.groupByCategory(data);
    });
}
```

---

## 8. UI / Design

### Direction visuelle : **"Ville vivante"**

Palette inspirée des couleurs de Toulouse — la "Ville Rose" :

```
--primary:     #C0392B   (rouge brique toulousain)
--primary-light: #E74C3C
--surface:     #FAFAF8   (blanc chaud)
--surface-alt: #F5F0ED   (crème)
--text:        #1A1A1A
--text-muted:  #6B6B6B
--accent:      #2980B9   (bleu Garonne)
--success:     #27AE60
```

Typographie :
- Display : **Playfair Display** (élégant, ancré dans la culture)
- Body : **Inter** (lisible, moderne)
- Data/chips : **JetBrains Mono** (catégories, dates)

### Composants Angular Material utilisés

- `MatStepper` — création d'événement
- `MatDatepicker` — filtre et formulaires
- `MatAutocomplete` — recherche lieu
- `MatChipList` — catégories / filtres actifs
- `MatTable` + `MatSort` + `MatPaginator` — liste participants
- `MatSnackBar` — toasts de confirmation
- `MatDialog` — confirmation inscription/désinscription
- `MatSkeleton` — loading states

---

## 9. Planning de développement (6 semaines)

### Semaine 1 — Fondations
- Setup Angular 17 + TailwindCSS + Angular Material
- Configuration Supabase (tables + RLS)
- AuthService (login, register, session persistante)
- Layout global (navbar, router-outlet, guards)
- Structure des routes + lazy loading

### Semaine 2 — Events list + carte
- ToulouseApiService + mapping des données
- EventsListComponent avec pagination
- Recherche live RxJS (debounce + switchMap)
- Filtres combinés avec Signals
- Intégration Leaflet (carte + markers)
- Composant EventCard + pipe EventDate

### Semaine 3 — Détail événement + inscription
- EventDetailComponent avec Resolver
- Auth Interceptor (JWT Supabase)
- Inscription / désinscription (RLS vérifié)
- Compteur participants Realtime
- Système de favoris
- Skeleton loaders

### Semaine 4 — Création d'événement
- Formulaire multi-steps (MatStepper)
- Validators custom (date future, range dates)
- Upload image vers Supabase Storage
- Sélection lieu sur carte Leaflet
- Géocodage adresse (Nominatim/OSM, libre)

### Semaine 5 — Dashboard organisateur
- Stats globales (compteurs, taux remplissage)
- Charts ngx-charts (line + pie)
- Table participants avec tri/pagination
- Export CSV participants
- Gestion de ses événements (edit/delete)

### Semaine 6 — Polish & Deploy
- PWA (manifest + service worker)
- Performance (lazy loading images, OnPush)
- Tests unitaires sur les pipes et services clés
- README soigné avec captures d'écran
- Deploy Vercel + domaine custom (optionnel)

---

## 10. Points forts à mentionner en entretien

| Feature | Ce que ça démontre |
|---|---|
| Open Data API officielle | Intégration d'API REST tierce, mapping de données |
| Recherche RxJS | debounceTime, switchMap, gestion des race conditions |
| Formulaire multi-steps | Reactive Forms avancés, validators custom |
| Auth Interceptor | HTTP pipeline Angular, sécurité |
| Route Guards fonctionnels | Gestion des rôles et accès |
| Signals + computed + effect | State management moderne Angular 17+ |
| Lazy loading | Performance, code splitting |
| Realtime Supabase | WebSockets, état temps réel |
| RLS Supabase | Sécurité backend, politique d'accès |
| Dashboard ngx-charts | Data visualization, agrégation de données |

---

## 11. Commandes de démarrage

```bash
# Créer le projet
ng new eventtls --routing --style=scss --standalone

# Installer les dépendances
npm install @supabase/supabase-js
npm install @angular/material @angular/cdk
npm install tailwindcss postcss autoprefixer
npm install leaflet @types/leaflet
npm install ngx-charts
npm install date-fns

# Initialiser Tailwind
npx tailwindcss init

# Lancer le dev server
ng serve
```

---

*Projet estimé : 6 semaines · Niveau démontré : Développeur Angular confirmé*