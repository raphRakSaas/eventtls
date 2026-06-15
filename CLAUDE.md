# CLAUDE.md

Contexte pour Claude Code lors du travail sur ce dépôt.

@AGENTS.md

## Projet

**EventTLS** — plateforme de découverte d'événements à Toulouse.  
Objectif principal : **apprendre Angular 17+** tout en construisant un portfolio démontrable.

## Références obligatoires

- `cahier_de_charge.md` — spec technique complète
- `TASKS.md` — tâches à faire (cocher au fur et à mesure)
- `docs/CURRENT-SPRINT.md` — focus actuel

## Stack

Angular 17+ standalone · Signals · Angular Material · Tailwind · Supabase · Leaflet · ngx-charts

## Commandes (après `ng new`)

```bash
npm install
ng serve                    # Dev server http://localhost:4200
ng build                    # Build production — TOUJOURS lancer après génération de code
ng test                     # Tests unitaires
ng lint                     # Linting
```

## Architecture

```
src/app/
├── core/       # Singletons : auth.service, events.service, guards, interceptors
├── shared/     # event-card, map-view, pipes (eventDate, distance, truncate)
└── features/   # home, events, auth, dashboard, profile
```

## Conventions

- Composants **standalone** uniquement
- Guards/interceptors/resolvers **fonctionnels** (pas de classes)
- State avec **Signals** (`signal`, `computed`, `effect`) — pas NgRx
- UI en **français**
- Palette « Ville Rose » : primary `#C0392B`, accent `#2980B9`

## ECC — [Everything Claude Code](https://github.com/affaan-m/ECC)

Installé project-level. Doc complète : [docs/ECC-SETUP.md](./docs/ECC-SETUP.md)

### Skills (`.claude/skills/ecc/`)

| Skill | Usage |
|-------|-------|
| `angular-developer` | Patterns Angular, CLI, signals, forms, routing |
| `tdd-workflow` | Tests avant implémentation |
| `verification-loop` | Vérification qualité post-implémentation |
| `postgres-patterns` | Schéma Supabase, requêtes, RLS |

### Agents (`.claude/agents/`)

| Agent | Quand l'utiliser |
|-------|------------------|
| `planner` | Planifier une feature complexe |
| `architect` | Décisions d'architecture |
| `code-reviewer` | Review après implémentation |
| `tdd-guide` | Écrire les tests d'abord |
| `build-error-resolver` | Corriger les erreurs de build |
| `security-reviewer` | Audit auth/RLS/interceptors |

### Commandes slash ECC

`/plan` · `/code-review` · `/build-fix` · `/tdd`

## Règles de travail

1. **Une tâche à la fois** — référencer l'ID dans `TASKS.md` (ex. `EVT-1.3`)
2. **Mettre à jour TASKS.md** — `[~]` en cours, `[x]` terminé
3. **Ne pas dépasser le scope** — rester dans la tâche demandée
4. **Toujours `ng build`** après génération de code Angular
5. **Ne pas commit** sauf demande explicite de l'utilisateur

## Supabase

- Migration SQL : `supabase/migrations/001_initial_schema.sql`
- Variables : `SUPABASE_URL`, `SUPABASE_ANON_KEY` (voir `.env.example`)

## Langue

Toute l'interface utilisateur est en **français**. Les commentaires de code peuvent être en anglais ou français.
