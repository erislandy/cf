import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import {  Injectable } from '@angular/core';
import { Observable } from 'rxjs';

//import { AmplifyService } from 'aws-amplify-angular'

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor () {
  }

  /**
   * Add auth header with jwt if user is logged in and request is to api url
   * @param request
   * @param next
   */
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const jwt = localStorage.getItem('accessToken');
    const with_access_control = request.clone({
      setHeaders: {
        'Access-Control-Allow-Origin': '*'
      }
    });
    if (!jwt) {
      return next.handle(with_access_control);
    }
    const with_auth_request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${jwt}`
      }
    });
    return next.handle(with_auth_request);
  }
}
