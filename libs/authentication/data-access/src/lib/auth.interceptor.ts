import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';

import { AuthFacade } from './+state/auth.facade';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authFacade: AuthFacade) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap({
        next: (event) =>
          event instanceof HttpResponse && event.status === 401 && !event.url.includes('logout')
            ? this.authFacade.logout()
            : null,
        error: (event) => (event.status === 401 && !event.url.includes('logout') ? this.authFacade.logout() : null),
      })
    );
  }
}
