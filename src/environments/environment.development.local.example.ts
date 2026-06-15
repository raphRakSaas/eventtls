// Copiez ce fichier vers environment.development.local.ts (généré automatiquement)
// ou lancez : npm run setup:env
//
// En pratique : renseignez uniquement .env.local (gitignored).

import type { Environment } from './environment.model';

export const environment: Environment = {
  production: false,
  supabase: {
    url: 'https://your-project.supabase.co',
    anonKey: 'your-anon-key',
  },
};
