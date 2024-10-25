import { Route } from '@angular/router';
import { 
    DashboardComponent, 
    LoginComponent, 
    StockComponent, 
    InboundComponent } from './pages';
import { AuthGuard } from '@cf/shared';
import { InboundCreateComponent } from './pages/inbound-create/inbound-create.component';
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
                path: 'inbound/new',
                component: InboundCreateComponent
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
