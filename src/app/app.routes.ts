import { Routes } from '@angular/router';

import { authGuard } from './core/guards/auth.guard';
import { roleGuard } from './core/guards/role.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/home/home/home').then((module) => module.Home),
  },
  {
    path: 'events',
    loadComponent: () =>
      import('./features/events/events-list/events-list').then((module) => module.EventsList),
  },
  {
    path: 'events/:id',
    loadComponent: () =>
      import('./features/events/event-detail/event-detail').then((module) => module.EventDetail),
  },
  {
    path: 'auth/login',
    loadComponent: () =>
      import('./features/auth/login/login').then((module) => module.Login),
  },
  {
    path: 'auth/register',
    loadComponent: () =>
      import('./features/auth/register/register').then((module) => module.Register),
  },
  {
    path: 'dashboard',
    canActivate: [authGuard, roleGuard('organizer')],
    loadChildren: () =>
      import('./features/dashboard/dashboard.routes').then((module) => module.dashboardRoutes),
  },
  {
    path: 'profile',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/profile/profile/profile').then((module) => module.Profile),
  },
  { path: '**', redirectTo: '' },
];
