import { Route } from '@angular/router';
import { StockComponent } from './components/stock/stock.component';
import { AuthGuard } from '@cf/shared';
import { LoginComponent } from './components/login/login.component';

export const appRoutes: Route[] = [
    {
        path: 'stock',
        component: StockComponent,
        canActivate: [AuthGuard],

    },
    {
        path: 'login',
        component: LoginComponent,
    }, 
    {
        path: '',
        redirectTo: '/stock',
        pathMatch: 'full'
    }

];
