# ECC — [Everything Claude Code](https://github.com/affaan-m/ECC)

ECC est le système d'optimisation des agents IA créé par [affaan-m](https://github.com/affaan-m/ECC).  
Il fournit **63 agents**, **249 skills**, hooks, rules et commandes pour **Cursor**, **Claude Code**, Codex, OpenCode, etc.

> Repo : https://github.com/affaan-m/ECC  
> Guides : [Shorthand Guide](https://github.com/affaan-m/ECC/blob/main/the-shortform-guide.md) · [Longform Guide](https://github.com/affaan-m/ECC/blob/main/the-longform-guide.md)

---

## Ce qui est installé dans EventTLS

Installation **project-level** (dans ce repo, pas global) effectuée le 15 juin 2026.

### Cursor (`.cursor/`)

| Composant | Contenu |
|-----------|---------|
| **Agents** | 48 agents `ecc-*.md` (planner, code-reviewer, tdd-guide, build-error-resolver, architect, security-reviewer…) |
| **Skills** | `angular-developer`, `postgres-patterns`, `tdd-workflow`, `verification-loop` + skills qualité |
| **Commands** | `/plan`, `/code-review`, `/build-fix`, `/tdd`, etc. |
| **Rules** | Rules Angular + common (coding-style, security, testing…) |
| **Hooks** | beforeShellExecution, afterFileEdit, beforeSubmitPrompt (secrets), etc. |

État d'installation : `.cursor/ecc-install-state.json`

### Claude Code (`.claude/`)

| Composant | Contenu |
|-----------|---------|
| **Agents** | Agents ECC dans `.claude/agents/` |
| **Skills** | `.claude/skills/ecc/angular-developer`, `postgres-patterns`, etc. |
| **Rules** | `.claude/rules/ecc/angular/` + common |
| **Commands** | Slash commands ECC |

État d'installation : `.claude/ecc/install-state.json`

### Règles EventTLS (custom)

En plus d'ECC, nos règles projet restent dans :
- `.cursor/rules/eventtls-core.mdc` — contexte EventTLS
- `.cursor/rules/angular-patterns.mdc` — conventions spécifiques

---

## Réinstaller ou mettre à jour

### Option 1 — Script projet (recommandé)

```bash
chmod +x scripts/ecc-install.sh
./scripts/ecc-install.sh
```

Variable optionnelle si ton clone ECC est ailleurs :
```bash
ECC_ROOT=/chemin/vers/ECC ./scripts/ecc-install.sh
```

### Option 2 — Commandes manuelles

```bash
# Depuis la racine EventTLS
node ~/Documents/perso/ECC/scripts/install-apply.js \
  --target cursor \
  --profile minimal \
  --with framework:angular \
  --with skill:angular-developer \
  --with skill:postgres-patterns

node ~/Documents/perso/ECC/scripts/install-apply.js \
  --target claude-project \
  --profile minimal \
  --with framework:angular \
  --with skill:angular-developer \
  --with skill:postgres-patterns
```

### Option 3 — Plugin Claude Code (user-level, en plus)

Si tu veux ECC **globalement** dans Claude Code (tous tes projets) :

```
/plugin install ecc@ecc
```

> Ne pas combiner `/plugin install ecc@ecc` **et** `./install.sh --profile full` — risque de doublons. Voir [README ECC § Install paths](https://github.com/affaan-m/ECC#quick-start).

### Option 4 — Wizard interactif

Dans Claude Code, dis :
```
configure ecc
```

---

## Utiliser plusieurs agents ECC

ECC supporte l'orchestration multi-agents nativement. Pour EventTLS :

### Dans Cursor

Les agents sont dans `.cursor/agents/ecc-*.md`. Mentionne-les explicitement :

```
Utilise l'agent ecc-planner pour planifier EVT-5.x dashboard
```

Commandes slash disponibles (`.cursor/commands/`) :
- `/plan` — planification
- `/code-review` — review qualité
- `/build-fix` — corriger le build
- `/tdd` — workflow test-first

### Dans Claude Code

```
/plan
Tâche EVT-2.4 — recherche RxJS
@TASKS.md @cahier_de_charge.md
```

Agents project-level dans `.claude/agents/` :
- `planner`, `architect`, `code-reviewer`, `tdd-guide`, `build-error-resolver`, `security-reviewer`

### Orchestration multi-agents (ECC avancé)

ECC v2 inclut des commandes PM2/multi-agent (voir [README § PM2](https://github.com/affaan-m/ECC)) :

| Commande | Usage EventTLS |
|----------|----------------|
| `/multi-plan` | Planifier dashboard + events en parallèle |
| `/multi-execute` | Exécuter sous-tâches sur worktrees git |
| `dmux-workflows` skill | Sessions agents parallèles |

Pour EventTLS (apprentissage solo), le workflow simple suffit :
**1 pilote + 1 reviewer** — voir [AGENTS.md](../AGENTS.md).

---

## Skills prioritaires pour ce projet

| Skill | Chemin Cursor | Usage |
|-------|---------------|-------|
| `angular-developer` | `.cursor/skills/angular-developer/` | Patterns Angular 17+, signals, forms, routing |
| `postgres-patterns` | `.cursor/skills/postgres-patterns/` | Supabase, RLS, requêtes |
| `tdd-workflow` | `.cursor/skills/tdd-workflow/` | Tests avant implémentation |
| `verification-loop` | `.cursor/skills/verification-loop/` | QA post-feature |

---

## Diagnostic

```bash
# Vérifier l'installation
node ~/Documents/perso/ECC/scripts/doctor.js

# Réparer les fichiers manquants
node ~/Documents/perso/ECC/scripts/repair.js

# Recommandation composants pour une query
node ~/Documents/perso/ECC/scripts/consult.js "Angular Supabase" --target cursor
```

---

## Liens utiles

- [ECC GitHub](https://github.com/affaan-m/ECC)
- [Cursor IDE Support (ECC README)](https://github.com/affaan-m/ECC#cursor-ide-support)
- [Subagent Orchestration (Longform Guide)](https://github.com/affaan-m/ECC/blob/main/the-longform-guide.md)
- [ECC Discord Community](https://github.com/affaan-m/ECC/discussions)
