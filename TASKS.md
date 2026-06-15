# TASKS.md — Suivi de tâches EventTLS

> **Source de vérité** pour l'avancement du projet.  
> Légende : `[ ]` à faire · `[~]` en cours · `[x]` terminé · `[—]` annulé

**Dernière mise à jour :** Phase 0 — scaffolding Angular terminé

---

## Phase 0 — Mise en place (avant le code)

| ID | Tâche | Agent | Statut |
|----|-------|-------|--------|
| EVT-0.1 | Initialiser repo git + structure docs | Cursor | [x] |
| EVT-0.2 | Créer TASKS.md, AGENTS.md, CLAUDE.md | Cursor | [x] |
| EVT-0.3 | Configurer règles Cursor (.cursor/rules/) | Cursor | [x] |
| EVT-0.4 | Installer ECC officiel ([affaan-m/ECC](https://github.com/affaan-m/ECC)) Cursor + Claude | Cursor | [x] |
| EVT-0.5 | Préparer migration Supabase SQL | Cursor | [x] |
| EVT-0.6 | Créer projet Supabase + appliquer migration | Toi | [ ] |
| EVT-0.7 | Vérifier Node.js + Angular CLI installés | Toi | [ ] |
| EVT-0.8 | `ng new eventtls` + dépendances initiales | Cursor | [x] |
| EVT-0.9 | Configurer Tailwind + Angular Material + thème | Cursor | [x] |
| EVT-0.10 | Configurer environments Supabase | Cursor | [x] |

---

## Phase 1 — Semaine 1 : Fondations

**Objectif :** Projet Angular fonctionnel avec auth Supabase et routing.

| ID | Tâche | Compétence Angular | Agent | Statut |
|----|-------|-------------------|-------|--------|
| EVT-1.1 | Structure dossiers core/shared/features | Architecture | Cursor | [ ] |
| EVT-1.2 | `app.routes.ts` + lazy loading | Routing | Cursor | [ ] |
| EVT-1.3 | `AuthService` (login, register, session) | Services, DI, Signals | Cursor | [ ] |
| EVT-1.4 | `auth.guard.ts` + `role.guard.ts` | Guards fonctionnels | Claude Code | [ ] |
| EVT-1.5 | Layout global (navbar + router-outlet) | Composants standalone | Cursor | [ ] |
| EVT-1.6 | Pages login + register (Reactive Forms) | Reactive Forms | Cursor | [ ] |
| EVT-1.7 | `auth.interceptor.ts` + `error.interceptor.ts` | Interceptors | Claude Code | [ ] |
| EVT-1.8 | Trigger profil auto à l'inscription (Supabase) | Supabase Auth | Toi + Cursor | [ ] |
| EVT-1.9 | Tests unitaires AuthService | Testing | Claude Code tdd-guide | [ ] |

**Critère de fin de phase :** Login/register fonctionnels, guards actifs, `ng build` OK.

---

## Phase 2 — Semaine 2 : Liste événements + carte

**Objectif :** Afficher les événements Open Data avec recherche et carte.

| ID | Tache | Compétence Angular | Agent | Statut |
|----|-------|-------------------|-------|--------|
| EVT-2.1 | Modèle `Event` + interfaces API Toulouse | TypeScript | Cursor | [ ] |
| EVT-2.2 | `ToulouseApiService` + mapping | HttpClient, Observables | Cursor | [ ] |
| EVT-2.3 | `EventsListComponent` + pagination | Composants, @for | Cursor | [ ] |
| EVT-2.4 | Recherche live (debounce + switchMap) | RxJS | Claude Code | [ ] |
| EVT-2.5 | Filtres catégorie/date avec Signals | signal, computed, effect | Cursor | [ ] |
| EVT-2.6 | `EventCardComponent` | Inputs, OnPush | Cursor | [ ] |
| EVT-2.7 | `EventDatePipe` | Custom Pipes | Cursor | [ ] |
| EVT-2.8 | `MapViewComponent` (Leaflet) | Intégration lib tierce | Claude Code | [ ] |
| EVT-2.9 | Toggle liste/carte (viewMode signal) | Signals | Cursor | [ ] |
| EVT-2.10 | Tests mapping ToulouseApiService | Testing | Claude Code | [ ] |

**Critère de fin de phase :** Liste + recherche + carte fonctionnelles avec données réelles.

---

## Phase 3 — Semaine 3 : Détail + inscription + favoris

| ID | Tache | Compétence Angular | Agent | Statut |
|----|-------|-------------------|-------|--------|
| EVT-3.1 | `EventsService` CRUD Supabase | Services async | Cursor | [ ] |
| EVT-3.2 | `eventDetailResolver` | Resolvers fonctionnels | Claude Code | [ ] |
| EVT-3.3 | `EventDetailComponent` | Route params, resolver data | Cursor | [ ] |
| EVT-3.4 | Inscription / désinscription événement | Supabase + RLS | Cursor | [ ] |
| EVT-3.5 | Compteur participants Realtime | Supabase Realtime + Signals | Claude Code | [ ] |
| EVT-3.6 | Système favoris (add/remove) | CRUD + auth | Cursor | [ ] |
| EVT-3.7 | `SkeletonLoaderComponent` | UX loading | Cursor | [ ] |
| EVT-3.8 | MatDialog confirmation inscription | Angular Material | Cursor | [ ] |
| EVT-3.9 | Tests resolver + EventDatePipe | Testing | Claude Code | [ ] |

**Critère de fin de phase :** Détail événement complet avec inscription temps réel.

---

## Phase 4 — Semaine 4 : Création événement

| ID | Tache | Compétence Angular | Agent | Statut |
|----|-------|-------------------|-------|--------|
| EVT-4.1 | Formulaire multi-steps (MatStepper) | Reactive Forms avancés | Claude Code | [ ] |
| EVT-4.2 | Validators custom (date future, range) | ValidatorFn | Claude Code | [ ] |
| EVT-4.3 | Upload image Supabase Storage | Supabase Storage | Cursor | [ ] |
| EVT-4.4 | Sélection lieu sur carte Leaflet | Composants interactifs | Cursor | [ ] |
| EVT-4.5 | Géocodage Nominatim/OSM | HttpClient | Cursor | [ ] |
| EVT-4.6 | Route `/dashboard/events/create` + guards | Routing protégé | Cursor | [ ] |
| EVT-4.7 | Tests validators custom | Testing | Claude Code | [ ] |

**Critère de fin de phase :** Organisateur peut créer un événement avec image et géoloc.

---

## Phase 5 — Semaine 5 : Dashboard organisateur

| ID | Tache | Compétence Angular | Agent | Statut |
|----|-------|-------------------|-------|--------|
| EVT-5.1 | Dashboard routes lazy (`dashboard.routes.ts`) | Lazy loading modules | Cursor | [ ] |
| EVT-5.2 | Métriques globales (compteurs) | Signals + Supabase | Cursor | [ ] |
| EVT-5.3 | Line chart inscriptions 30j (ngx-charts) | Data viz | Claude Code | [ ] |
| EVT-5.4 | Pie chart catégories | ngx-charts | Claude Code | [ ] |
| EVT-5.5 | MatTable participants + sort + paginator | Angular Material | Cursor | [ ] |
| EVT-5.6 | Export CSV participants | Génération fichier | Cursor | [ ] |
| EVT-5.7 | Edit/delete événements | CRUD | Cursor | [ ] |
| EVT-5.8 | Vue `events_with_stats` Supabase | SQL | Toi | [ ] |

**Critère de fin de phase :** Dashboard complet avec charts et gestion événements.

---

## Phase 6 — Semaine 6 : Polish & Deploy

| ID | Tache | Compétence Angular | Agent | Statut |
|----|-------|-------------------|-------|--------|
| EVT-6.1 | Page profil utilisateur | Composants | Cursor | [ ] |
| EVT-6.2 | PWA (manifest + service worker) | PWA | Claude Code | [ ] |
| EVT-6.3 | OnPush + lazy loading images | Performance | Cursor | [ ] |
| EVT-6.4 | Tests unitaires pipes + services clés | Testing | Claude Code | [ ] |
| EVT-6.5 | README avec captures d'écran | Docs | Toi + Cursor | [ ] |
| EVT-6.6 | Deploy Vercel | CI/CD | Cursor | [ ] |
| EVT-6.7 | Review sécurité RLS + auth | Security | Claude Code security-reviewer | [ ] |

**Critère de fin de phase :** App déployée, tests passent, README portfolio-ready.

---

## Backlog (hors scope initial)

| ID | Idée | Priorité |
|----|------|----------|
| EVT-B.1 | Notifications email inscription | Basse |
| EVT-B.2 | Mode sombre | Basse |
| EVT-B.3 | i18n EN/FR | Basse |
| EVT-B.4 | Sync périodique Open Data → Supabase | Moyenne |

---

## Comment utiliser ce fichier

1. **Avant chaque session** : trouve la première tâche `[ ]` de la phase en cours
2. **Pendant** : passe en `[~]`
3. **Après validation** (`ng build` OK) : passe en `[x]`
4. **Commit** : un commit par tâche ou par petit groupe cohérent

## Statistiques

| Phase | Total | Fait | % |
|-------|-------|------|---|
| 0 | 10 | 8 | 80% |
| 1 | 9 | 0 | 0% |
| 2 | 10 | 0 | 0% |
| 3 | 9 | 0 | 0% |
| 4 | 7 | 0 | 0% |
| 5 | 8 | 0 | 0% |
| 6 | 7 | 0 | 0% |
| **Total** | **60** | **8** | **13%** |
