# AGENTS.md — Workflow multi-agents EventTLS

Ce fichier définit **qui fait quoi** quand tu travailles avec Cursor, Claude Code et ECC en parallèle.

## Les trois acteurs

| Acteur | Outil | Force | Faiblesse |
|--------|-------|-------|-----------|
| **Toi** | — | Décisions, compréhension métier, validation | Temps limité |
| **Cursor Agent** | Chat Cursor (Cmd+L / Agent) | Navigation codebase, edits multi-fichiers, intégration rapide | Contexte limité sur longues sessions |
| **Claude Code** | Extension Claude Code dans Cursor | Planification profonde, agents ECC spécialisés, terminal | Moins intégré au diff Cursor |

## Principe : un seul « pilote » par tâche

Pour éviter les conflits et la confusion :

1. Choisis **un agent pilote** par tâche (Cursor OU Claude Code)
2. L'autre sert de **review** ou **second avis**
3. **Toi** valides toujours avant de passer à la tâche suivante

## Matrice de délégation

| Type de travail | Pilote recommandé | Second avis |
|-----------------|-------------------|-------------|
| Setup projet, config, scaffolding | **Cursor** | Claude Code `/plan` |
| Feature Angular (composant, service) | **Cursor** | Claude Code `code-reviewer` |
| Planifier une grosse feature (ex. dashboard) | **Claude Code** `planner` | Cursor pour implémenter |
| Corriger erreurs de build | **Claude Code** `build-error-resolver` | — |
| Écrire les tests | **Claude Code** `tdd-guide` | Cursor pour intégrer |
| Review sécurité (auth, RLS) | **Claude Code** `security-reviewer` | — |
| Apprendre un concept Angular | **Toi + docs** | Cursor ou Claude Code en mode explication |
| Migration Supabase | **Cursor** | `postgres-patterns` skill |
| Deploy Vercel | **Cursor** | — |

## Workflow type pour une tâche

```
1. Lire TASKS.md → choisir la prochaine tâche [ ]
2. Cocher [~] dans TASKS.md
3. Choisir le pilote (voir matrice)
4. Donner le contexte minimal :
   - ID tâche (ex. EVT-2.4)
   - Fichiers concernés
   - « Ne fais que cette tâche »
5. Implémenter
6. Vérifier : ng build / ng test
7. Review (autre agent si besoin)
8. Cocher [x], mettre à jour CURRENT-SPRINT.md
9. Commit (si tu le demandes)
```

## Prompt type pour Cursor

```
Tâche EVT-1.3 — AuthService Supabase
Référence : cahier_de_charge.md §6.3 et TASKS.md
Scope : créer uniquement auth.service.ts + types
Ne touche pas aux composants auth pour l'instant
Après : ng build doit passer
```

## Prompt type pour Claude Code

```
/plan

Implémenter EVT-2.1 — ToulouseApiService
Contexte : @cahier_de_charge.md @TASKS.md @CLAUDE.md
Livrable : service + interface Event + tests unitaires du mapping
```

## ECC — [Everything Claude Code](https://github.com/affaan-m/ECC)

ECC est installé **project-level** dans ce repo. Voir [docs/ECC-SETUP.md](./docs/ECC-SETUP.md).

### Agents ECC (Cursor)

48 agents dans `.cursor/agents/ecc-*.md` :

| Agent | Usage EventTLS |
|-------|----------------|
| `ecc-planner` | Planifier une feature complexe |
| `ecc-architect` | Valider l'architecture |
| `ecc-code-reviewer` | Review après implémentation |
| `ecc-tdd-guide` | Écrire les tests d'abord |
| `ecc-build-error-resolver` | Corriger `ng build` |
| `ecc-security-reviewer` | Audit auth/RLS (phase 6) |

### Agents ECC (Claude Code)

Même agents dans `.claude/agents/` + commandes slash `/plan`, `/code-review`, `/build-fix`, `/tdd`.

### Skills ECC

| Skill | Chemin |
|-------|--------|
| `angular-developer` | `.cursor/skills/angular-developer/` |
| `postgres-patterns` | `.cursor/skills/postgres-patterns/` |
| `tdd-workflow` | `.cursor/skills/tdd-workflow/` |
| `verification-loop` | `.cursor/skills/verification-loop/` |

Réinstaller : `./scripts/ecc-install.sh`

## Règles anti-conflit

1. **Ne pas faire coder la même tâche par Cursor et Claude Code en parallèle**
2. **Git commit entre chaque tâche terminée** — point de restauration
3. **TASKS.md = source de vérité** — si un agent propose hors scope, refuse
4. **cahier_de_charge.md = spec** — ne pas improviser de features non listées
5. En cas de désaccord entre agents → **tu tranches**

## Sessions recommandées

| Moment | Durée | Focus |
|--------|-------|-------|
| Session d'apprentissage | 1-2h | 1-2 petites tâches + lire docs Angular |
| Session d'implémentation | 2-3h | 1 feature moyenne avec pilote unique |
| Session review | 30min | code-reviewer + ng build + ng test |

## Prochaine étape

Voir [docs/CURRENT-SPRINT.md](./docs/CURRENT-SPRINT.md) pour le sprint actif.
