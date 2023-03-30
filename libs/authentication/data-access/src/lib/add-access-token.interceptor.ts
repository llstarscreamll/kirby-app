import { Injectable } from '@angular/core';
import { take, flatMap } from 'rxjs/operators';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';

import { AuthFacade } from './+state/auth.facade';
import { AuthTokens } from '@kirby/authentication/utils';

@Injectable()
export class AddAccessTokenInterceptor implements HttpInterceptor {

  constructor(private authFacade: AuthFacade) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.authFacade.authTokens$.pipe(
      take(1),
      flatMap((tokens: AuthTokens) => {
        const authRequest = !!tokens
          ? req.clone({ setHeaders: { Authorization: `Bearer ${tokens.access_token}` } })
          : req;

        return next.handle(authRequest);
      })
    );
  }

}
