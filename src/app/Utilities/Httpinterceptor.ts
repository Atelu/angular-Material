import { Injectable } from '@angular/core';

import { Observable, of,  throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { tap } from 'rxjs/operators';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { AuthorizationService } from './authorization.service';
import {Router} from '@angular/router';


// @Injectable()
// export class ContentType implements HttpInterceptor {
//   constructor() { }
//   intercept(
//     request: HttpRequest<any>,
//     next: HttpHandler
//   ): Observable<HttpEvent<any>> {
//     const req = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
//
//     return next.handle(req);
//   }
// }

@Injectable()
export class MyInterceptor implements HttpInterceptor {
  constructor(private authorizationService: AuthorizationService, private router: Router) { }
  // function which will be called for all http calls
  // handleError(error: 401) {
    // if (error === 401) {}
    // alert ('Please Login Again To Continue');
    // return throwError(error);
  // }
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    // const token = this.authorizationService.getToken();
    // if (token) {
      const req = request.clone({
        // headers: request.headers.set('Authorization', `Bearer ${token}`)
        setHeaders: {
          Authorization: `Bearer ${this.authorizationService.getToken()}`,
          'Content-Type': 'application/json',
        }
      });

      return next.handle(req)
        .pipe( tap(() => {},
          (err: any) => {
            if (err instanceof HttpErrorResponse) {
              if (err.status !== 401) {
                return;
              }
              // this.router.navigate(['login']);
              alert ('Current session Expired, Please Login Again');
            }
          }));
  }
}

      // return next.handle(request);






