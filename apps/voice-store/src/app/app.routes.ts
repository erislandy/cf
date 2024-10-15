import { Route } from '@angular/router';
import { 
    DashboardComponent, 
    LoginComponent, 
    StockComponent, 
    InboundComponent } from './components';
import { AuthGuard } from '@cf/shared';
export const appRoutes: Route[] = [
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard],
        children:[            
            {
                path: 'stock',
                component: StockComponent
            },
            {
                path: 'inbound',
                component: InboundComponent
            },
            {
                path: '',
                redirectTo: 'stock',
                pathMatch: 'full'
            },
        ]
    },
    {
        path: 'login',
        component: LoginComponent,
    }, 
    {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
    }

];
