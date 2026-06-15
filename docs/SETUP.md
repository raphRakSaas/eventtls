# Setup — Checklist environnement EventTLS

## Prérequis système


| Outil           | Version min       | Vérification    | Statut |
| --------------- | ----------------- | --------------- | ------ |
| Node.js         | 20+               | `node -v`       | [ ]    |
| npm             | 10+               | `npm -v`        | [ ]    |
| Angular CLI     | 17+               | `ng version`    | [ ]    |
| Git             | —                 | `git --version` | [x]    |
| Compte Supabase | gratuit           | supabase.com    | [ ]    |
| Compte Vercel   | gratuit (phase 6) | vercel.com      | [ ]    |


### Installer Angular CLI (si absent)

```bash
npm install -g @angular/cli@latest
ng version
```

---

## Supabase

### 1. Créer le projet

1. [supabase.com/dashboard](https://supabase.com/dashboard) → New Project
2. Nom : `eventtls`
3. Région : `West EU (Paris)` si disponible
4. Mot de passe DB : noter dans un gestionnaire de mots de passe

### 2. Appliquer le schéma

1. SQL Editor → New query
2. Coller le contenu de `supabase/migrations/001_initial_schema.sql`
3. Run

### 3. Récupérer les clés

Settings → API :

- `Project URL` → `SUPABASE_URL`
- `anon public` → `SUPABASE_ANON_KEY`

### 4. Configurer Auth

Authentication → Providers :

- Email activé (par défaut)
- Site URL : `http://localhost:4200` (dev)

### 5. Storage (phase 4)

Storage → New bucket :

- Nom : `event-images`
- Public : oui (lecture publique)

---

## Variables d'environnement

Les secrets **ne vont jamais** dans les fichiers versionnés sous `src/environments/`.

```bash
cp .env.example .env.local
# Remplir SUPABASE_URL et SUPABASE_ANON_KEY dans .env.local (gitignored)

npm run setup:env
# → génère src/environments/environment.development.local.ts (gitignored)
```

| Fichier | Versionné | Rôle |
|---------|-----------|------|
| `.env.local` | Non | Source unique des secrets en local |
| `environment.ts` | Oui | Production (placeholders ou variables CI au deploy) |
| `environment.development.local.example.ts` | Oui | Modèle documenté, sans secrets |
| `environment.development.local.ts` | Non | Généré par `setup:env`, utilisé par `ng serve` |

`npm start` lance `setup:env` automatiquement avant `ng serve`.

---

## Créer le projet Angular (EVT-0.8)

```bash
cd /Users/plum-desktop/Documents/perso/EventTLS

# Si ng n'est pas installé globalement :
npx @angular/cli@latest new eventtls \
  --routing \
  --style=scss \
  --standalone \
  --ssr=false

# Déplacer les fichiers à la racine OU garder le sous-dossier eventtls/
# Recommandation : créer directement à la racine avec :
# ng new . --routing --style=scss --standalone
```

### Dépendances

```bash
npm install @supabase/supabase-js
npm install @angular/material @angular/cdk
npm install tailwindcss postcss autoprefixer
npm install leaflet @types/leaflet
npm install @swimlane/ngx-charts
npm install date-fns
```

### Tailwind

```bash
npx tailwindcss init
```

---

## ECC — [Everything Claude Code](https://github.com/affaan-m/ECC)

ECC est installé project-level dans ce repo (agents, skills, hooks, rules).

```bash
# Réinstaller / mettre à jour
./scripts/ecc-install.sh
```

Prérequis : clone ECC local (ex. `~/Documents/perso/ECC`) ou variable `ECC_ROOT`.

Voir [ECC-SETUP.md](./ECC-SETUP.md) pour le détail multi-agents.

---

## Vérification finale Phase 0

```bash
# Tout doit passer sans erreur
ng build
ng serve   # → http://localhost:4200
```

- [ ] Page d'accueil Angular s'affiche
- [ ] Connexion Supabase testée (console sans erreur CORS)
- [ ] TASKS.md EVT-0.6 à EVT-0.10 cochés