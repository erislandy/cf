import { Route } from '@angular/router';

export const appRoutes: Route[] = [
    {
        path: 'dashboard',
        loadComponent: () => import("@cf/web").then(m => m.DashboardComponent),
        children:[            
            {
                path: 'routines',
                loadComponent: () => import("@cf/web").then(m => m.RoutineListComponent),
            },
            {
                path: 'routine-details/:id',
                loadComponent: () => import("@cf/web").then(m => m.RoutineDetailsComponent),
            },
            {
                path: '',
                redirectTo: 'routines',
                pathMatch: 'full'
            },
        ]
    },
    {
        path: 'login',
        loadComponent: () => import("@cf/web").then(m => m.LoginComponent),
    },    
    {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
    }
];
