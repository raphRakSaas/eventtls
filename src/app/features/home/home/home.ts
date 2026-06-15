import { Component, inject } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  template: `
    <p>Auth prêt : {{ authService.authReady() }}</p>
    <p>Connecté : {{ authService.isAuthenticated() }}</p>
    <p>Profil : {{ authService.profile()?.display_name ?? '—' }}</p>

    <button type="button" (click)="testLogin()">Test login</button>
    <button type="button" (click)="testLogout()">Test logout</button>
  `,
})
export class Home {
  protected readonly authService = inject(AuthService);

  async testLogin(): Promise<void> {
    try {
      await this.authService.login('eventtls@yopmail.com', 'Tototo123');
      console.log('Login OK', this.authService.profile());
    } catch (error) {
      console.error(error);
    }
  }

  async testLogout(): Promise<void> {
    await this.authService.logout();
  }
}