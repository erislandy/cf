import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { REST_API_URL } from './config';

//import { AmplifyService } from 'aws-amplify-angular'

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor () {
    console.log('jwt interceptor init');
  }

  /**
   * Add auth header with jwt if user is logged in and request is to api url
   * @param request
   * @param next
   */
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const jwt = localStorage.getItem('accessToken');
    console.log('jwt interceptor', jwt);
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
