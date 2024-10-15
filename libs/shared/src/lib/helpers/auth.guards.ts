import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';


/**
 * Prevent access to routes if access-token is not present.
 *
 * @export
 * @class AuthGuard
 * @implements {CanActivate}
 */
@Injectable({
  providedIn: "root"
})
export class AuthGuard implements CanActivate {
  constructor (
    private _router: Router
  ) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      const jwt = localStorage.getItem('accessToken');
    if (jwt) {      
      return true;
    }
    else {
      this._router.navigate([ '/login' ], { queryParams: { returnUrl: state.url } });
      return false;
    }
  }
}
