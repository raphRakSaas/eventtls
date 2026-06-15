import { AuthError } from '@supabase/supabase-js';

const AUTH_ERROR_MESSAGES: Record<string, string> = {
  invalid_credentials: 'Email ou mot de passe incorrect.',
  email_not_confirmed: 'Veuillez confirmer votre email avant de vous connecter.',
  user_already_exists: 'Un compte existe déjà avec cet email.',
  weak_password: 'Le mot de passe est trop faible (minimum 6 caractères).',
  over_request_rate_limit: 'Trop de tentatives. Réessayez dans quelques minutes.',
};

export function mapAuthError(error: AuthError | null): string {
  if (!error) {
    return 'Une erreur inattendue est survenue.';
  }

  return AUTH_ERROR_MESSAGES[error.message] ?? error.message;
}