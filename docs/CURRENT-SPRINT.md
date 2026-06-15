# Sprint actuel — Phase 1 : Fondations

> Checklist détaillée → [BACKLOG.md](../BACKLOG.md)

## En cours

**Phase :** 1 — Fondations + Auth  
**Objectif sprint :** AuthService, layout, login/register  
**Date :** 15 juin 2026

---

## Cette session — priorités

| # | ID | Action | Statut |
|---|-----|--------|--------|
| 1 | EVT-1.1 | Structure core/shared/features | [x] |
| 2 | EVT-1.2 | Routes + lazy loading | [x] |
| 3 | EVT-1.3 | SupabaseService + AuthService | [ ] |
| 4 | EVT-1.5 | Layout + navbar (RouterLink) | [ ] |
| 5 | EVT-1.6 | Pages login + register | [ ] |

---

## Vérifications du 15 juin 2026

- [x] `ng build` OK — lazy chunks : home, events-list, event-detail, login, register, profile, dashboard
- [x] `ng serve` → `/` affiche HomeComponent
- [x] `app.ts` : `<router-outlet />` uniquement (plus de template Angular par défaut)
- [x] Dossiers `core/` et `shared/` créés (étaient manquants)
- [ ] Tester manuellement toutes les URLs dans le navigateur (recommandé)

---

## Prochaine étape

**EVT-1.3** — `SupabaseService` + `AuthService` avec Signals

```
Fais EVT-1.3 — AuthService Supabase
Référence : BACKLOG.md, cahier_de_charge.md §6.3
Scope : supabase.service.ts, user-profile.model.ts, auth.service.ts, initSession
ng build doit passer.
```

---

## Notes

| Date | Note |
|------|------|
| 15 juin 2026 | Phase 0 terminée |
| 15 juin 2026 | EVT-1.1 + EVT-1.2 validés (build + structure) |
