# Sprint actuel — Phase 1 : Fondations

> Mettre à jour ce fichier à chaque session.  
> Checklist détaillée → [BACKLOG.md](../BACKLOG.md)

## En cours

**Phase :** **1 — Fondations + Auth**  
**Objectif sprint :** structure Angular, routing, AuthService, login/register  
**Date début Phase 1 :** 15 juin 2026

---

## Cette session — à faire en priorité

| # | ID | Action | Fichier / commande | Statut |
|---|-----|--------|-------------------|--------|
| 1 | EVT-1.1 | Créer arborescence core/shared/features | `src/app/` | [ ] |
| 2 | EVT-1.2 | Routes + lazy loading | `app.routes.ts` | [ ] |
| 3 | EVT-1.3 | Supabase client + AuthService | `core/services/` | [ ] |
| 4 | EVT-1.5 | Layout global (navbar) | `shared/components/` | [ ] |
| 5 | EVT-1.6 | Pages login + register | `features/auth/` | [ ] |
| 6 | EVT-1.8 | Trigger profil auto à l'inscription | SQL Supabase | [ ] |

---

## Phase 0 — terminée ✅

- [x] EVT-0.1 → EVT-0.10 — Repo, Angular, Tailwind, Material, env, Supabase
- [x] Migration SQL appliquée sur Supabase
- [x] Auth URL configurée (`http://localhost:4200`)
- [x] `ng serve` OK — http://localhost:4200

> La page « Hello, eventtls » est le template Angular par défaut — normal pour l'instant. Le layout EventTLS arrive en EVT-1.5.

---

## Checklist rapide Phase 1

- [x] `.env.local` rempli
- [x] `ng serve` fonctionne
- [x] Tables Supabase créées
- [ ] `npm run setup:env` à jour
- [ ] Structure `core/` / `shared/` / `features/` créée
- [ ] Première route custom (home) remplace le template par défaut

---

## Prochaine session (estimation 2–3 h)

**Prompt suggéré pour Cursor :**
```
Tâche EVT-1.1 + EVT-1.2 — Structure + routing
Référence : BACKLOG.md Phase 1, cahier_de_charge.md §3
Scope : créer dossiers core/shared/features + app.routes.ts lazy loading
Ne pas toucher à l'auth encore. ng build doit passer.
```

Puis EVT-1.3 (AuthService) dans la même session ou la suivante.

---

## Notes de session

| Date | Note |
|------|------|
| 15 juin 2026 | Scaffolding Angular 21, thème Ville Rose, env secrets gitignored |
| 15 juin 2026 | BACKLOG.md créé |
| 15 juin 2026 | **Phase 0 validée** — migration Supabase + Auth URL + ng serve OK |

---

## Blocages

_Aucun._

---

## Critère de fin Phase 1

Login/register OK · guards actifs · layout global · interceptors · trigger profil · tests AuthService.

Voir [BACKLOG.md](../BACKLOG.md) section « Validation Phase 1 ».
