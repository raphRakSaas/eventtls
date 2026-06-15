import type { Environment } from './environment.model';

export const environment: Environment = {
  production: false,
  supabase: {
    url: 'https://your-project.supabase.co',
    anonKey: 'your-anon-key',
  },
};
