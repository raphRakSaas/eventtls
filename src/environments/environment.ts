import type { Environment } from './environment.model';

export const environment: Environment = {
  production: true,
  supabase: {
    url: 'https://your-project.supabase.co',
    anonKey: 'your-anon-key',
  },
};
