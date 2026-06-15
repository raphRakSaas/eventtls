# EventTLS

Plateforme de découverte et gestion d'événements à Toulouse.

**Stack :** Angular 21 · Supabase · Open Data Toulouse Métropole · Leaflet · Vercel

## Statut

| Phase | Semaine | Thème | Statut |
|-------|---------|-------|--------|
| 0 | — | Mise en place | ✅ Terminé |
| 1 | S1 | Fondations Angular + Auth | 🟡 En cours |
| 2 | S2 | Liste événements + carte | ⬜ À faire |
| 3 | S3 | Détail + inscription + favoris | ⬜ À faire |
| 4 | S4 | Création événement | ⬜ À faire |
| 5 | S5 | Dashboard organisateur | ⬜ À faire |
| 6 | S6 | Polish + deploy | ⬜ À faire |

## Documentation

| Fichier | Rôle |
|---------|------|
| [cahier_de_charge.md](./cahier_de_charge.md) | Spécifications techniques complètes |
| [TASKS.md](./TASKS.md) | Suivi macro (IDs EVT-0.1 → EVT-6.7) |
| [BACKLOG.md](./BACKLOG.md) | Checklist détaillée — cocher au fur et à mesure |
| [AGENTS.md](./AGENTS.md) | Workflow multi-agents (Cursor + Claude Code + ECC) |
| [CLAUDE.md](./CLAUDE.md) | Contexte pour Claude Code |
| [docs/SETUP.md](./docs/SETUP.md) | Checklist environnement |
| [docs/LEARNING.md](./docs/LEARNING.md) | Parcours d'apprentissage Angular |
| [docs/WORKFLOW.md](./docs/WORKFLOW.md) | Comment travailler avec les IA |
| [docs/CURRENT-SPRINT.md](./docs/CURRENT-SPRINT.md) | Sprint en cours |

## Démarrage rapide

```bash
cp .env.example .env.local
# Renseigner SUPABASE_URL et SUPABASE_ANON_KEY dans .env.local (gitignored)

npm install
npm run setup:env   # génère environment.development.local.ts (gitignored)
npm start           # ou ng serve
```

Ouvrir [http://localhost:4200](http://localhost:4200).

## Structure prévue

```
src/app/
├── core/       # auth, events, toulouse-api, guards, interceptors
├── shared/     # event-card, map-view, pipes
└── features/   # home, events, auth, dashboard, profile
```

## IA & outils

Ce projet est conçu pour un apprentissage Angular avec assistance IA mixte :

- **Cursor** — IDE principal, agent intégré + agents ECC (`.cursor/agents/`)
- **Claude Code** — extension Cursor, commandes `/plan`, `/code-review`, etc.
- **[ECC](https://github.com/affaan-m/ECC)** — Everything Claude Code : 63 agents, skills Angular, hooks, rules

| Doc | Contenu |
|-----|---------|
| [AGENTS.md](./AGENTS.md) | Qui fait quoi (Cursor vs Claude Code) |
| [docs/ECC-SETUP.md](./docs/ECC-SETUP.md) | Installation et multi-agents ECC |
| [docs/WORKFLOW.md](./docs/WORKFLOW.md) | Scénarios de travail quotidiens |
