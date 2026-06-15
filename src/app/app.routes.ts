import { Routes } from '@angular/router';

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
    loadChildren: () =>
      import('./features/dashboard/dashboard.routes').then((module) => module.dashboardRoutes),
  },
  {
    path: 'profile',
    loadComponent: () =>
      import('./features/profile/profile/profile').then((module) => module.Profile),
  },
  { path: '**', redirectTo: '' },
];