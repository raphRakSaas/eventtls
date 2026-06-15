# Workflow — Travailler avec Cursor + Claude Code

Guide pratique pour ton setup mixte IA avec **[ECC](https://github.com/affaan-m/ECC)** (Everything Claude Code).

> ECC est installé dans ce projet. Voir [ECC-SETUP.md](./ECC-SETUP.md) pour les agents, commandes `/plan`, `/code-review`, et l'orchestration multi-agents.

---

## Setup IDE recommandé

```
Cursor (IDE principal)
├── Panneau gauche : explorateur + git
├── Centre : éditeur code
├── Droite ou bas : Terminal
├── Chat Cursor (Agent) : Cmd+L ou panneau Agent
└── Claude Code : icône Claude dans la barre latérale
```

### Conseil layout

- **Cursor Agent** : visible quand tu codes (implémentation)
- **Claude Code** : ouvre en onglet séparé pour planification/review
- **Terminal** : toujours visible pour `ng serve` + `ng build`

---

## Scénarios concrets

### Scénario A — « Je débute une nouvelle feature »

1. Ouvre `TASKS.md`, choisis la tâche (ex. EVT-2.4)
2. **Claude Code** : `/plan` avec le prompt :

   ```
   Planifier EVT-2.4 — recherche live RxJS
   Contexte : @TASKS.md @cahier_de_charge.md
   Livrable : plan en 3-5 étapes, pas de code encore
   ```

3. Lis le plan, valide ou ajuste
4. **Cursor Agent** : implémente étape par étape
5. **Claude Code** `code-reviewer` : review rapide
6. `ng build` → coche `[x]` dans TASKS.md

---

### Scénario B — « Je veux apprendre un concept »

1. Lis la section dans `docs/LEARNING.md`
2. **Cursor** en mode question (pas Agent) :

   ```
   Explique-moi switchMap vs mergeMap dans le contexte
   de EVT-2.4. Donne un exemple minimal sans coder
   toute la feature.
   ```

3. Code toi-même un mini-exemple
4. Compare avec le cahier des charges §6.1

---

### Scénario C — « Le build casse »

1. Copie l'erreur complète
2. **Claude Code** avec agent `build-error-resolver` :

   ```
   ng build échoue avec cette erreur :
   [coller l'erreur]

   Contexte : tâche EVT-1.7, auth.interceptor.ts
   Fix minimal uniquement.
   ```

3. Ne passe pas à la tâche suivante tant que `ng build` ne passe pas

---

### Scénario D — « Je suis bloqué depuis 30 min »

1. Stop — ne pas enchaîner les prompts au hasard
2. Reformule le problème en une phrase
3. Demande une **explication** (pas du code) à Cursor
4. Si toujours bloqué : demande à Claude Code `planner` de découper en sous-tâches plus petites
5. Note le blocage dans `docs/CURRENT-SPRINT.md`

---

## Règles d'or

| # | Règle |
|---|-------|
| 1 | **Un agent pilote par tâche** — voir AGENTS.md |
| 2 | **Toujours référencer l'ID tâche** (EVT-x.x) dans tes prompts |
| 3 | **`ng build` avant de cocher [x]** |
| 4 | **Commit après chaque tâche** (quand tu le demandes) |
| 5 | **Ne pas laisser deux agents modifier les mêmes fichiers en parallèle** |
| 6 | **Lire le diff** — ne pas accepter aveuglément |

---

## Prompts utiles (copier-coller)

### Cursor — implémentation ciblée

```
Tâche EVT-{ID} — {titre}
Fichiers autorisés : {liste}
Interdit : toucher aux autres features
Référence : cahier_de_charge.md §{section}
Après : ng build doit passer
```

### Claude Code — planification

```
/plan

Feature : {description}
Tâche TASKS.md : EVT-{ID}
Contraintes : Angular 17 standalone, Signals, français UI
```

### Claude Code — review

```
Review mes changements git pour EVT-{ID}.
Vérifie : conventions AGENTS.md, pas de any, OnPush où pertinent.
```

---

## Anti-patterns à éviter

| ❌ Éviter | ✅ Faire |
|----------|---------|
| « Code toute l'app » | Une tâche TASKS.md à la fois |
| Changer d'agent mid-tâche sans commit | Commit → changement d'agent |
| Ignorer les erreurs de build | Fix immédiat |
| Copier sans comprendre | 5 min d'explication avant d'accepter |
| Improviser des features | Rester dans cahier_de_charge.md |

---

## Suivi hebdomadaire

Chaque dimanche (ou fin de semaine) :

1. Mettre à jour les stats dans `TASKS.md`
2. Remplir le journal dans `docs/LEARNING.md`
3. Planifier le sprint suivant dans `docs/CURRENT-SPRINT.md`
4. Commit « chore: weekly progress update »
