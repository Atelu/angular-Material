import { Injectable } from '@angular/core';

import { Observable, of, } from 'rxjs';
import { tap } from 'rxjs/operators';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
} from '@angular/common/http';
import { AuthorizationService } from './authorization.service';


@Injectable()
export class ContentType implements HttpInterceptor {
  constructor() { }
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const req = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });

    return next.handle(req);
  }
}

@Injectable()
export class MyInterceptor implements HttpInterceptor {
  constructor(private authorizationService: AuthorizationService) { }
  // function which will be called for all http calls
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    const token = this.authorizationService.getToken();
    if (token) {
      const req = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${token}`)
      });

      return next.handle(req);
    }

    return next.handle(request);
  }
}




