import { Routes } from "@angular/router";

export const dashboardRoutes: Routes = [
    {
        path: '',
        loadComponent: () => import('./dashboard-overview/dashboard-overview').then((module) => module.DashboardOverview)
    }
]