# Parcours d'apprentissage Angular — EventTLS

Ce document mappe **ce que tu apprends** à **chaque phase** du projet.  
L'objectif n'est pas de tout mémoriser, mais de **pratiquer les concepts recherchés sur le marché toulousain**.

---

## Concepts par phase

### Phase 1 — Fondations

| Concept | Tâche | Ressource |
|---------|-------|-----------|
| Standalone components | EVT-1.5 | [angular.dev/guide/components](https://angular.dev/guide/components) |
| Dependency Injection (`inject()`) | EVT-1.3 | Skill ECC `angular-developer/references/di-fundamentals.md` |
| Routing + lazy loading | EVT-1.2 | `references/define-routes.md`, `references/loading-strategies.md` |
| Guards fonctionnels | EVT-1.4 | `references/route-guards.md` |
| Reactive Forms | EVT-1.6 | `references/reactive-forms.md` |
| HTTP Interceptors | EVT-1.7 | angular.dev guide interceptors |
| Signals (intro) | EVT-1.3 | `references/signals-overview.md` |

**Exercice mental :** Explique à voix haute la différence entre un Guard et un Interceptor.

---

### Phase 2 — Liste + carte

| Concept | Tâche | Ressource |
|---------|-------|-----------|
| HttpClient + Observables | EVT-2.2 | angular.dev guide HTTP |
| RxJS operators | EVT-2.4 | debounceTime, switchMap, distinctUntilChanged |
| Signals avancés | EVT-2.5 | `references/effects.md`, `references/linked-signal.md` |
| Custom Pipes | EVT-2.7 | angular.dev guide pipes |
| `@input()` signal-based | EVT-2.6 | `references/inputs.md` |
| OnPush change detection | EVT-2.6 | `references/components.md` |
| Intégration lib tierce | EVT-2.8 | Leaflet docs |

**Exercice mental :** Pourquoi `switchMap` et pas `mergeMap` pour la recherche ?

---

### Phase 3 — Détail + Realtime

| Concept | Tâche | Ressource |
|---------|-------|-----------|
| Resolvers fonctionnels | EVT-3.2 | `references/data-resolvers.md` |
| Route params | EVT-3.3 | `references/navigate-to-routes.md` |
| Supabase Realtime | EVT-3.5 | supabase.com/docs/guides/realtime |
| `effect()` pour side effects | EVT-3.5 | `references/effects.md` |
| Angular Material Dialog | EVT-3.8 | material.angular.io |

**Exercice mental :** Resolver vs charger dans `ngOnInit` — avantages/inconvénients ?

---

### Phase 4 — Formulaires avancés

| Concept | Tâche | Ressource |
|---------|-------|-----------|
| Multi-step forms (Stepper) | EVT-4.1 | Material Stepper docs |
| Validators custom | EVT-4.2 | `references/reactive-forms.md` |
| Cross-field validation | EVT-4.2 | Reactive Forms guide |
| File upload | EVT-4.3 | Supabase Storage docs |

**Exercice mental :** Écris un `ValidatorFn` pour une date future sans regarder le cahier des charges.

---

### Phase 5 — Dashboard

| Concept | Tâche | Ressource |
|---------|-------|-----------|
| Lazy feature modules | EVT-5.1 | `references/loading-strategies.md` |
| Data visualization | EVT-5.3-5.4 | ngx-charts docs |
| MatTable + Sort + Paginator | EVT-5.5 | Material Table docs |
| `computed()` pour métriques | EVT-5.2 | `references/signals-overview.md` |

---

### Phase 6 — Production

| Concept | Tâche | Ressource |
|---------|-------|-----------|
| PWA / Service Worker | EVT-6.2 | angular.dev guide service-worker |
| Performance (OnPush, lazy images) | EVT-6.3 | `references/rendering-strategies.md` |
| Testing (Jasmine/Karma) | EVT-6.4 | `references/testing-fundamentals.md` |
| Deploy | EVT-6.6 | Vercel + Angular docs |

---

## Méthode d'apprentissage recommandée

### Pour chaque tâche

1. **Lire** la section du cahier des charges + ressource Angular
2. **Coder** toi-même d'abord (30 min max) — même incomplet
3. **Demander de l'aide** à l'IA avec le contexte précis (ID tâche)
4. **Comparer** ta solution avec celle proposée
5. **Expliquer** ce que tu as appris (note dans ce fichier ou un journal)

### Ratio recommandé

| Activité | % du temps |
|----------|-----------|
| Coder toi-même | 50% |
| IA assistée (Cursor/Claude) | 30% |
| Lire docs / comprendre | 20% |

---

## Journal d'apprentissage

_Ajoute tes notes ici au fur et à mesure._

### Semaine 1

- _Date :_ 
- _Concept appris :_
- _Difficulté rencontrée :_
- _Ce que je referais différemment :_

---

## Compétences entretien (checklist finale)

À cocher en fin de projet :

- [ ] Je peux expliquer standalone vs NgModules
- [ ] Je peux écrire un guard fonctionnel de zéro
- [ ] Je connais la différence signal / computed / effect
- [ ] Je peux implémenter debounce + switchMap pour une recherche
- [ ] Je peux créer un Reactive Form avec validators custom
- [ ] Je comprends RLS Supabase et pourquoi c'est important
- [ ] Je peux décrire le flux auth (login → JWT → interceptor → guard)
