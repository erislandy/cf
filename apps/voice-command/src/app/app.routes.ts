import { Route } from '@angular/router';
import { MsalGuard } from '@azure/msal-angular';

export const appRoutes: Route[] = [
    {
        path: 'dashboard',
        loadComponent: () => import("@cf/web").then(m => m.DashboardComponent),
        canActivate: [MsalGuard],
        children:[            
            {
                path: 'routines',
                loadComponent: () => import("@cf/web").then(m => m.RoutineListComponent),
            },
            {
                path: 'routine/:id',
                loadComponent: () => import("@cf/web").then(m => m.RoutineDetailsComponent),
            },
            {
                path: 'commands',
                loadComponent: () => import("@cf/web").then(m => m.CommandListComponent),
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
