# BACKLOG.md — Checklist détaillée EventTLS

> **Objectif final :** application portfolio Angular déployée — découverte d'événements à Toulouse, auth Supabase, Open Data, carte, dashboard organisateur.  
> **Comment l'utiliser :** coche `[x]` au fur et à mesure. Une case = une action concrète et vérifiable.  
> **Liens :** vue macro → [TASKS.md](./TASKS.md) · sprint actuel → [docs/CURRENT-SPRINT.md](./docs/CURRENT-SPRINT.md) · spec → [cahier_de_charge.md](./cahier_de_charge.md)

**Dernière mise à jour :** 15 juin 2026

---

## Progression globale


| Phase     | Thème              | Cases   | Cochées | %       |
| --------- | ------------------ | ------- | ------- | ------- |
| 0         | Mise en place      | 42      | 42      | 100%    |
| 1         | Fondations + Auth  | 58      | 0       | 0%      |
| 2         | Liste + carte      | 52      | 0       | 0%      |
| 3         | Détail + favoris   | 48      | 0       | 0%      |
| 4         | Création événement | 44      | 0       | 0%      |
| 5         | Dashboard          | 40      | 0       | 0%      |
| 6         | Polish + deploy    | 36      | 0       | 0%      |
| B         | Idées hors scope   | 8       | 0       | 0%      |
| **Total** |                    | **328** | **42**  | **13%** |


> Mettre à jour les chiffres du tableau quand tu coches des sections entières.

---

## 🎯 Prochaines actions (dans l'ordre)

1. [ ] **EVT-1.1** — Créer l'arborescence `core/` / `shared/` / `features/`
2. [ ] **EVT-1.2** — Routes + lazy loading
3. [ ] **EVT-1.3** — `AuthService` Supabase
4. [ ] **EVT-1.5** — Layout global (remplacer le template Angular par défaut)
5. [ ] **EVT-1.6** — Pages login + register

---

## Phase 0 — Mise en place

**Critère de fin :** repo prêt, Angular tourne, Supabase connecté, secrets hors Git.

### Repo & documentation (EVT-0.1 → 0.5) ✅

- [x] Repo Git initialisé
- [x] `README.md` projet
- [x] `TASKS.md` créé
- [x] `AGENTS.md` créé
- [x] `CLAUDE.md` créé
- [x] Dossier `docs/` (SETUP, WORKFLOW, LEARNING, CURRENT-SPRINT)
- [x] Règles Cursor `.cursor/rules/`
- [x] ECC installé (`.cursor/`, `.claude/`)
- [x] `supabase/migrations/001_initial_schema.sql` rédigé
- [x] `.env.example` avec variables Supabase
- [x] `.gitignore` (node_modules, .env, secrets Angular)

### Supabase (EVT-0.6) ✅

- [x] Compte [supabase.com](https://supabase.com) créé
- [x] Projet Supabase nommé `eventtls` créé
- [x] Région **West EU (Paris)** choisie si dispo
- [x] Mot de passe DB noté (gestionnaire de mots de passe)
- [x] SQL Editor → coller `supabase/migrations/001_initial_schema.sql`
- [x] Exécuter la migration sans erreur
- [x] Vérifier tables : `profiles`, `events`, `registrations`, `favorites`
- [x] Vérifier vue `events_with_stats` créée
- [x] Vérifier RLS activé sur toutes les tables
- [x] Settings → API : copier `Project URL` dans `.env.local`
- [x] Settings → API : copier `anon public` dans `.env.local`
- [x] Authentication → Providers → Email activé
- [x] Authentication → URL Configuration → Site URL = `http://localhost:4200`
- [x] Authentication → URL Configuration → Redirect URLs inclut `http://localhost:4200/`**
- [x] SQL : trigger `handle_new_user` pour créer un profil à l'inscription (EVT-1.8, Phase 1)
- [x] Test manuel : créer un user test dans Auth → Users (optionnel)

### Environnement local (EVT-0.7) ✅

- [x] `node -v` → **≥ 20**
- [x] `npm -v` → **≥ 10**
- [x] `ng version` → Angular CLI **≥ 17** (actuellement 21)
- [x] `npm install` sans erreur
- [x] `npm run setup:env` génère `environment.development.local.ts`
- [x] `ng build` passe
- [x] `ng serve` → page Angular sur [http://localhost:4200](http://localhost:4200)
- [x] Aucune clé secrète dans un fichier versionné (`git status` propre)

### Angular scaffold (EVT-0.8) ✅

- [x] `ng new` — standalone, routing, SCSS
- [x] `package.json` avec scripts `start`, `build`, `test`
- [x] `@supabase/supabase-js` installé
- [x] `@angular/material` + `@angular/cdk` installés
- [x] `leaflet` + `@types/leaflet` installés
- [x] `date-fns` installé
- [x] `@swimlane/ngx-charts` + `d3` installés
- [x] Structure `src/app/`, `src/environments/`, `public/`

### Tailwind + Material + thème (EVT-0.9) ✅

- [x] Tailwind CSS v4 + `@tailwindcss/postcss`
- [x] `postcss.config.js` configuré
- [x] `src/tailwind.css` avec tokens `@theme`
- [x] `src/styles/_ville-rose.scss` — palette Ville Rose
- [x] `src/styles.scss` — thème Material M3 (rouge / bleu)
- [x] Polices : Playfair Display, Inter, JetBrains Mono
- [x] `provideAnimationsAsync()` dans `app.config.ts`
- [x] `index.html` en `lang="fr"`, titre EventTLS

### Environments Supabase (EVT-0.10) ✅

- [x] `environment.model.ts` — interface `Environment`
- [x] `environment.ts` — prod (placeholders)
- [x] `environment.development.local.ts` — gitignored, généré
- [x] `environment.development.local.example.ts` — modèle versionné
- [x] `scripts/sync-env.mjs` lit `.env.local`
- [x] `npm run setup:env` + hook `prestart`
- [x] `angular.json` — fileReplacements dev → `.local.ts`
- [x] Secrets **jamais** commités

---

## Phase 1 — Fondations + Auth (Semaine 1)

**Critère de fin :** login/register OK, guards actifs, layout global, `ng build` OK.

### EVT-1.1 — Structure dossiers

- [ ] Créer `src/app/core/services/`
- [ ] Créer `src/app/core/guards/`
- [ ] Créer `src/app/core/interceptors/`
- [ ] Créer `src/app/core/resolvers/`
- [ ] Créer `src/app/core/models/` (types partagés core)
- [ ] Créer `src/app/shared/components/`
- [ ] Créer `src/app/shared/pipes/`
- [ ] Créer `src/app/features/home/`
- [ ] Créer `src/app/features/events/`
- [ ] Créer `src/app/features/auth/`
- [ ] Créer `src/app/features/dashboard/`
- [ ] Créer `src/app/features/profile/`
- [ ] Barrel exports optionnels (`index.ts`) si utile
- [ ] Supprimer le template par défaut Angular (`app.html` géant)

### EVT-1.2 — Routing + lazy loading

- [ ] Définir routes dans `app.routes.ts` :
  - [ ] `''` → Home (lazy)
  - [ ] `'events'` → EventsList (lazy)
  - [ ] `'events/:id'` → EventDetail (lazy + resolver plus tard)
  - [ ] `'auth/login'` → Login (lazy)
  - [ ] `'auth/register'` → Register (lazy)
  - [ ] `'dashboard'` → `dashboard.routes` (lazy + guards plus tard)
  - [ ] `'profile'` → Profile (lazy + guard plus tard)
- [ ] Route wildcard `*`* → redirect ou page 404
- [ ] Chaque feature = `loadComponent` ou `loadChildren`
- [ ] Vérifier que chaque route lazy charge un chunk séparé (`ng build` → lazy chunks)
- [ ] `RouterLink` / `routerLinkActive` préparés pour la navbar

### EVT-1.3 — AuthService

- [ ] Créer `core/services/supabase.service.ts` — client Supabase singleton (`createClient` + `environment`)
- [ ] Créer `core/models/user-profile.model.ts` — type `Profile`, rôle `user` | `organizer`
- [ ] Créer `auth.service.ts` :
  - [ ] `signal` / `computed` pour `currentUser`, `session`, `isAuthenticated`
  - [ ] `login(email, password)` → `signInWithPassword`
  - [ ] `register(email, password, displayName)` → `signUp`
  - [ ] `logout()` → `signOut`
  - [ ] `initSession()` — écouter `onAuthStateChange` au démarrage
  - [ ] Charger le profil depuis table `profiles` après login
  - [ ] Gestion erreurs avec messages en français
- [ ] Appeler `initSession()` dans `APP_INITIALIZER` ou `app.config.ts`
- [ ] Tester login/logout en console (sans UI d'abord)

### EVT-1.4 — Guards fonctionnels

- [ ] `auth.guard.ts` — `CanActivateFn` : redirige vers `/auth/login` si non connecté
- [ ] `role.guard.ts` — factory `roleGuard(role: 'organizer')` vérifie `profile.role`
- [ ] Guards branchés sur `/dashboard` et `/profile`
- [ ] Query param `returnUrl` après redirection login (optionnel mais UX++)
- [ ] Test manuel : visiteur bloqué sur `/dashboard`

### EVT-1.5 — Layout global

- [ ] Créer `shared/components/layout/` ou `core/layout/`
- [ ] `NavbarComponent` standalone :
  - [ ] Logo / lien accueil EventTLS
  - [ ] Liens : Événements, Dashboard (si organizer), Profil
  - [ ] Boutons Connexion / Inscription si déconnecté
  - [ ] Bouton Déconnexion si connecté
  - [ ] `MatToolbar` + responsive (menu mobile optionnel phase 6)
- [ ] `LayoutComponent` : navbar + `<router-outlet>`
- [ ] Intégrer layout dans `app.ts` (remplacer template par défaut)
- [ ] Styles Tailwind + tokens Ville Rose sur la navbar

### EVT-1.6 — Pages Login + Register

- [ ] `LoginComponent` — Reactive Form :
  - [ ] Champs email + mot de passe + validation
  - [ ] `MatFormField`, `MatInput`, `MatButton`
  - [ ] Message d'erreur en français
  - [ ] Redirection après succès (accueil ou `returnUrl`)
- [ ] `RegisterComponent` — Reactive Form :
  - [ ] email, mot de passe, confirmation, `displayName`
  - [ ] Validators : email, minLength password
  - [ ] Appel `authService.register()`
- [ ] Lien croisé login ↔ register
- [ ] État loading pendant la requête (`signal` ou `MatProgressSpinner`)

### EVT-1.7 — Interceptors

- [ ] `auth.interceptor.ts` — injecter `Authorization: Bearer <jwt>` si session active
- [ ] `error.interceptor.ts` — intercepter 401/403/500, `MatSnackBar` message FR
- [ ] Enregistrer avec `provideHttpClient(withInterceptors([...]))`
- [ ] Vérifier que les appels Supabase REST passent le JWT

### EVT-1.8 — Trigger profil Supabase

- [ ] SQL : fonction `handle_new_user()` — INSERT dans `profiles` à la création auth.users
- [ ] SQL : trigger `on_auth_user_created` AFTER INSERT on `auth.users`
- [ ] `display_name` depuis `raw_user_meta_data` ou email
- [ ] Rôle par défaut `user`
- [ ] Tester : inscription app → ligne dans `profiles`
- [ ] Option : checkbox « Je suis organisateur » → rôle `organizer` en metadata

### EVT-1.9 — Tests AuthService

- [ ] Mock client Supabase
- [ ] Test `login` succès / échec
- [ ] Test `register` succès
- [ ] Test `logout` remet session à null
- [ ] Test `isAuthenticated` computed
- [ ] `ng test` passe pour AuthService

### Validation Phase 1

- [ ] `ng build` OK
- [ ] `ng test` OK (au moins AuthService)
- [ ] Parcours : inscription → login → accès profile → logout
- [ ] Organisateur peut accéder `/dashboard` (même vide)
- [ ] Visiteur redirigé si accès `/profile`
- [ ] Cocher EVT-1.1 → 1.9 dans [TASKS.md](./TASKS.md)

---

## Phase 2 — Liste événements + carte (Semaine 2)

**Critère de fin :** liste Open Data, recherche, filtres, carte Leaflet, données réelles.

### EVT-2.1 — Modèle Event

- [ ] `core/models/event.model.ts` — interface `Event` alignée cahier des charges
- [ ] `toulouse-api.model.ts` — types réponse API Open Data
- [ ] Enum ou union `source: 'toulouse_api' | 'user'`
- [ ] Champs optionnels typés (`lat`, `lng`, `image_url`, etc.)

### EVT-2.2 — ToulouseApiService

- [ ] `toulouse-api.service.ts` — `BASE_URL` Open Data Toulouse
- [ ] Méthode `getEvents({ limit, offset, category, search })`
- [ ] Filtre `date_debut >= aujourd'hui` dans `where`
- [ ] `HttpParams` : limit, offset, order_by, where
- [ ] Fonction `mapToulouseEvent(raw) → Event`
- [ ] Gestion erreur réseau / API vide
- [ ] Test manuel : appel retourne des événements réels

### EVT-2.3 — EventsListComponent

- [ ] Route `/events` affiche la liste
- [ ] Pagination (offset/limit ou MatPaginator)
- [ ] `@for` avec `track event.id`
- [ ] État loading / empty / error
- [ ] Titre page « Événements à Toulouse »

### EVT-2.4 — Recherche live RxJS

- [ ] `FormControl` recherche
- [ ] `valueChanges.pipe(debounceTime(300), distinctUntilChanged(), switchMap(...))`
- [ ] Annulation requête précédente (switchMap)
- [ ] Indicateur « recherche en cours »
- [ ] Placeholder « Rechercher un événement… »

### EVT-2.5 — Filtres Signals

- [ ] `signal` pour catégorie sélectionnée
- [ ] `signal` pour plage de dates (MatDatepicker)
- [ ] `computed` pour params API combinés
- [ ] `effect` ou subscription pour recharger la liste
- [ ] `MatChipList` ou select pour catégories
- [ ] Bouton « Réinitialiser les filtres »

### EVT-2.6 — EventCardComponent

- [ ] `@Input() event: Event`
- [ ] `ChangeDetectionStrategy.OnPush`
- [ ] Image, titre, date, lieu, catégorie (badge)
- [ ] Lien vers `/events/:id`
- [ ] Hover / focus accessible
- [ ] Fallback si pas d'image

### EVT-2.7 — EventDatePipe

- [ ] `event-date.pipe.ts` — `date-fns` + locale `fr`
- [ ] Formats : « Demain à 20h », « Sam. 21 juin », « En cours »
- [ ] Standalone pipe
- [ ] Tests unitaires pipe

### EVT-2.8 — MapViewComponent (Leaflet)

- [ ] Importer CSS Leaflet dans `angular.json` ou composant
- [ ] Carte centrée sur Toulouse (43.6047, 1.4442)
- [ ] Tuiles OpenStreetMap
- [ ] `@Input() events: Event[]` → markers
- [ ] Popup marker : titre + lien détail
- [ ] `ngOnDestroy` : `map.remove()`
- [ ] Fix hauteur conteneur carte (CSS)

### EVT-2.9 — Toggle liste / carte

- [ ] `signal<'list' | 'map'> viewMode`
- [ ] Boutons toggle (MatButtonToggle ou icônes)
- [ ] Même données filtrées pour liste et carte
- [ ] Persistance optionnelle dans `localStorage`

### EVT-2.10 — Tests ToulouseApiService

- [ ] Mock `HttpClientTestingModule`
- [ ] Test mapping `mapToulouseEvent`
- [ ] Test construction `where` avec search + category
- [ ] `ng test` passe

### Validation Phase 2

- [ ] Données réelles Open Data affichées
- [ ] Recherche + filtres fonctionnels
- [ ] Carte avec markers corrects
- [ ] `ng build` OK

---

## Phase 3 — Détail + inscription + favoris (Semaine 3)

**Critère de fin :** page détail, inscription temps réel, favoris, skeletons.

### EVT-3.1 — EventsService (Supabase CRUD)

- [ ] `events.service.ts` — `getById`, `create`, `update`, `delete`
- [ ] `getUserEvents(organizerId)`
- [ ] Types alignés table `events`
- [ ] Gestion erreurs Supabase (RLS, not found)

### EVT-3.2 — eventDetailResolver

- [ ] Resolver fonctionnel charge l'événement par `:id`
- [ ] Source `toulouse_api` → ToulouseApiService OU cache Supabase
- [ ] Source `user` → EventsService
- [ ] Redirect 404 si introuvable

### EVT-3.3 — EventDetailComponent

- [ ] Affiche titre, description, dates, lieu, carte mini, image
- [ ] `ActivatedRoute` / `input()` depuis resolver data
- [ ] Bouton inscription (si connecté)
- [ ] Bouton favori (cœur)
- [ ] Partage lien (optionnel)

### EVT-3.4 — Inscription / désinscription

- [ ] INSERT `registrations` status `confirmed`
- [ ] DELETE ou UPDATE status `cancelled`
- [ ] Vérifier capacité max si `capacity` défini
- [ ] Messages succès / erreur (SnackBar)
- [ ] UI : bouton désactivé si déjà inscrit

### EVT-3.5 — Realtime compteur participants

- [ ] `realtime.service.ts` ou méthode dans EventsService
- [ ] Channel Supabase sur `registrations` filtré par `event_id`
- [ ] `signal` compteur mis à jour en live
- [ ] Affichage « X participants » sur le détail
- [ ] Unsubscribe à la destruction du composant

### EVT-3.6 — Favoris

- [ ] `favorites.service.ts` — add, remove, `isFavorite`, `getUserFavorites`
- [ ] Table `favorites` + RLS
- [ ] Toggle favori sur EventCard et EventDetail
- [ ] Page ou section « Mes favoris » (profile ou liste filtrée)

### EVT-3.7 — SkeletonLoaderComponent

- [ ] Composant réutilisable (shimmer)
- [ ] Variantes : card, detail, list
- [ ] Affiché pendant chargement resolver / HTTP

### EVT-3.8 — MatDialog confirmation

- [ ] Dialog « Confirmer l'inscription ? »
- [ ] Dialog « Se désinscrire ? »
- [ ] Actions Annuler / Confirmer
- [ ] Accessibilité focus trap

### EVT-3.9 — Tests

- [ ] Tests resolver (mock services)
- [ ] Tests EventDatePipe (cas limites)
- [ ] `ng test` OK

### Validation Phase 3

- [ ] Détail Open Data + événement user
- [ ] Inscription visible en temps réel
- [ ] Favoris persistés
- [ ] `ng build` OK

---

## Phase 4 — Création événement (Semaine 4)

**Critère de fin :** organisateur crée un événement avec image et géoloc.

### EVT-4.1 — Formulaire MatStepper

- [ ] Route `/dashboard/events/create`
- [ ] Étape 1 : titre, description, catégorie
- [ ] Étape 2 : dates (MatDatepicker), lieu, adresse
- [ ] Étape 3 : capacité, prix, image
- [ ] Étape 4 : récapitulatif + submit
- [ ] Navigation étapes validée (linear stepper)

### EVT-4.2 — Validators custom

- [ ] `futureDateValidator()` — date début dans le futur
- [ ] `dateRangeValidator()` — fin ≥ début
- [ ] Messages erreur en français
- [ ] Tests validators

### EVT-4.3 — Upload image Storage

- [ ] Bucket `event-images` créé sur Supabase (public read)
- [ ] Upload via `supabase.storage`
- [ ] Nom fichier unique (uuid + extension)
- [ ] URL publique stockée dans `image_url`
- [ ] Preview avant envoi
- [ ] Limite taille / type MIME

### EVT-4.4 — Sélection lieu sur carte

- [ ] Carte Leaflet cliquable dans le formulaire
- [ ] Clic met à jour `lat` / `lng` signals
- [ ] Marker draggable (optionnel)
- [ ] Sync avec champs adresse

### EVT-4.5 — Géocodage Nominatim

- [ ] Service géocodage OSM Nominatim
- [ ] Adresse → coordonnées
- [ ] Coordonnées → adresse (reverse)
- [ ] Respect rate limit / User-Agent
- [ ] Debounce sur saisie adresse

### EVT-4.6 — Route protégée

- [ ] `canActivate: [authGuard, roleGuard('organizer')]`
- [ ] Redirection si non organisateur
- [ ] Après création → redirect détail ou liste dashboard

### EVT-4.7 — Tests validators

- [ ] Tests unitaires `futureDateValidator`, `dateRangeValidator`
- [ ] `ng test` OK

### Validation Phase 4

- [ ] Événement créé visible en base
- [ ] Image accessible via URL publique
- [ ] Coordonnées correctes sur carte
- [ ] `ng build` OK

---

## Phase 5 — Dashboard organisateur (Semaine 5)

**Critère de fin :** stats, charts, table participants, export CSV.

### EVT-5.1 — Dashboard routes lazy

- [ ] `dashboard.routes.ts`
- [ ] `/dashboard` → overview
- [ ] `/dashboard/events` → liste mes événements
- [ ] `/dashboard/events/create` → formulaire
- [ ] `/dashboard/events/:id/edit` → édition (optionnel)
- [ ] Layout dashboard (sidebar ou tabs)

### EVT-5.2 — Métriques globales

- [ ] Compteur total événements organisateur
- [ ] Compteur inscriptions totales
- [ ] Taux remplissage moyen (si capacity)
- [ ] Signals + requêtes Supabase / vue `events_with_stats`

### EVT-5.3 — Line chart inscriptions 30j

- [ ] Données agrégées par jour (30 derniers jours)
- [ ] `@swimlane/ngx-charts` line chart
- [ ] Axes labels en français
- [ ] État empty si pas de données

### EVT-5.4 — Pie chart catégories

- [ ] Répartition événements par `category`
- [ ] Pie chart ngx-charts
- [ ] Couleurs palette Ville Rose

### EVT-5.5 — MatTable participants

- [ ] Liste inscrits par événement
- [ ] Colonnes : nom, email, date inscription, statut
- [ ] `MatSort` + `MatPaginator`
- [ ] Filtre par événement (select)

### EVT-5.6 — Export CSV

- [ ] Bouton « Exporter CSV »
- [ ] Génération Blob côté client
- [ ] Téléchargement `participants-{eventId}.csv`
- [ ] Encodage UTF-8 avec BOM (Excel FR)

### EVT-5.7 — Edit / delete événements

- [ ] Édition formulaire pré-rempli
- [ ] Suppression avec MatDialog confirmation
- [ ] CASCADE registrations côté DB vérifié

### EVT-5.8 — Vue SQL `events_with_stats`

- [ ] Vue déjà dans migration — vérifier en prod Supabase
- [ ] Requête Angular via `.from('events_with_stats')`
- [ ] RLS lecture pour organisateur sur ses events

### Validation Phase 5

- [ ] Dashboard complet avec vraies données
- [ ] Charts et table fonctionnels
- [ ] Export CSV téléchargeable
- [ ] `ng build` OK

---

## Phase 6 — Polish & Deploy (Semaine 6)

**Critère de fin :** app déployée, tests, README portfolio, sécurité revue.

### EVT-6.1 — Page profil

- [ ] Afficher `display_name`, email, avatar, bio, rôle
- [ ] Formulaire édition profil
- [ ] Upload avatar Storage (optionnel)
- [ ] Liste « Mes inscriptions » / « Mes favoris »

### EVT-6.2 — PWA

- [ ] `ng add @angular/pwa`
- [ ] `manifest.webmanifest` — nom, icônes, theme_color `#C0392B`
- [ ] Service worker configuré
- [ ] Test installable sur mobile

### EVT-6.3 — Performance

- [ ] `ChangeDetectionStrategy.OnPush` sur composants liste/carte
- [ ] `loading="lazy"` sur images EventCard
- [ ] Vérifier budgets `angular.json`
- [ ] Lighthouse score > 80 perf (objectif)

### EVT-6.4 — Tests unitaires clés

- [ ] Pipes : event-date, distance, truncate
- [ ] Services : auth, toulouse-api, events
- [ ] Couverture ≥ 80% sur core (objectif projet)

### EVT-6.5 — README portfolio

- [ ] Captures d'écran (accueil, liste, carte, détail, dashboard)
- [ ] Section « Compétences démontrées »
- [ ] Lien demo Vercel
- [ ] Instructions install claires

### EVT-6.6 — Deploy Vercel

- [ ] Repo connecté à Vercel
- [ ] Variables env prod : `SUPABASE_URL`, `SUPABASE_ANON_KEY`
- [ ] Script build `ng build` OK en CI
- [ ] Domaine custom optionnel
- [ ] Redirect URLs Supabase mises à jour pour prod

### EVT-6.7 — Review sécurité

- [ ] Audit RLS toutes tables
- [ ] Pas de `service_role` key côté client
- [ ] Interceptors ne loguent pas le JWT
- [ ] CORS / Auth URLs prod correctes
- [ ] Rapport security-reviewer ECC

### Validation Phase 6 — 🏁 Objectif atteint

- [ ] App en ligne et utilisable
- [ ] `ng test` + `ng build` OK
- [ ] README prêt pour portfolio / entretien
- [ ] Toutes les cases Phase 0–6 cochées

---

## Backlog idées (hors scope initial)

- [ ] **EVT-B.1** — Email confirmation inscription (Supabase Edge Function)
- [ ] **EVT-B.2** — Mode sombre (Material dark theme)
- [ ] **EVT-B.3** — i18n EN/FR (`@angular/localize`)
- [ ] **EVT-B.4** — Sync cron Open Data → table `events` Supabase
- [ ] **EVT-B.5** — Notifications push PWA
- [ ] **EVT-B.6** — Filtre « près de moi » (géoloc navigateur)
- [ ] **EVT-B.7** — Partage réseaux sociaux (Open Graph)
- [ ] **EVT-B.8** — Tests E2E Playwright parcours critique

---

## Règles de maintenance

1. **Avant chaque session** — ouvrir [CURRENT-SPRINT.md](./docs/CURRENT-SPRINT.md), choisir 1–3 cases ici.
2. **Pendant** — cocher les micro-tâches au fil de l'eau.
3. **Fin de tâche EVT-X.Y** — cocher la ligne correspondante dans [TASKS.md](./TASKS.md).
4. **Nouvelle idée** — ajouter en bas (section B ou nouvelle case).
5. **Commit** — un commit par tâche EVT ou petit groupe cohérent.

---

## Légende


| Symbole     | Signification                |
| ----------- | ---------------------------- |
| `[ ]`       | À faire                      |
| `[x]`       | Terminé                      |
| `[~]`       | En cours (optionnel)         |
| **EVT-X.Y** | ID lié à TASKS.md            |
| ✅           | Section entièrement terminée |


