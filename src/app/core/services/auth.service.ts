import { computed, inject, Injectable, signal } from '@angular/core';
import { Session, User } from '@supabase/supabase-js';

import { UserProfile } from '../models/user-profile.model';
import { mapAuthError } from './auth-error.mapper';
import { SupabaseService } from './supabase.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly supabaseService = inject(SupabaseService);

  private readonly sessionState = signal<Session | null>(null);
  private readonly profileState = signal<UserProfile | null>(null);
  private readonly authReadyState = signal(false);

  readonly session = this.sessionState.asReadonly();
  readonly profile = this.profileState.asReadonly();
  readonly authReady = this.authReadyState.asReadonly();

  readonly currentUser = computed<User | null>(() => this.sessionState()?.user ?? null);
  readonly isAuthenticated = computed(() => this.sessionState() !== null);

  async initSession(): Promise<void> {
    const supabase = this.supabaseService.getClient();

    const { data, error } = await supabase.auth.getSession();
    if (error) {
      console.error('Erreur lors de la récupération de la session :', error.message);
    }

    await this.applySession(data.session);

    supabase.auth.onAuthStateChange(async (_event, session) => {
      await this.applySession(session);
    });

    this.authReadyState.set(true);
  }

  async login(email: string, password: string): Promise<void> {
    const supabase = this.supabaseService.getClient();

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw new Error(mapAuthError(error));
    }

    await this.applySession(data.session);
  }

  async register(email: string, password: string, displayName: string): Promise<void> {
    const supabase = this.supabaseService.getClient();

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          display_name: displayName,
        },
      },
    });

    if (error) {
      throw new Error(mapAuthError(error));
    }

    await this.applySession(data.session);
  }

  async logout(): Promise<void> {
    const supabase = this.supabaseService.getClient();

    const { error } = await supabase.auth.signOut();
    if (error) {
      throw new Error(mapAuthError(error));
    }

    this.sessionState.set(null);
    this.profileState.set(null);
  }

  getToken(): string | null {
    return this.sessionState()?.access_token ?? null;
  }

  private async applySession(session: Session | null): Promise<void> {
    this.sessionState.set(session);

    const userId = session?.user?.id;
    if (!userId) {
      this.profileState.set(null);
      return;
    }

    await this.loadProfile(userId);
  }

  private async loadProfile(userId: string): Promise<void> {
    const supabase = this.supabaseService.getClient();

    const { data, error } = await supabase
      .from('profiles')
      .select('id, display_name, avatar_url, role, bio, created_at')
      .eq('id', userId)
      .single();

    if (error) {
      console.error('Erreur lors du chargement du profil :', error.message);
      this.profileState.set(null);
      return;
    }

    this.profileState.set(data as UserProfile);
  }
}