import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';

import { AuthState } from './auth.reducer';
import { authQuery } from './auth.selectors';
import { LoginWithCredentials, Logout } from './auth.actions';

@Injectable()
export class AuthFacade {

  public errors$ = this.store.select(authQuery.getErrors);
  public status$ = this.store.select(authQuery.getStatus);
  public authUser$ = this.store.select(authQuery.getAuthUser);
  public authTokens$ = this.store.select(authQuery.getAuthTokens);
  public isLoggedIn$ = this.store.select(authQuery.getIsLoggedIn);

  public constructor(private store: Store<AuthState>) { }

  public loginWithCredentials(credentials: { email: string, password: string }) {
    this.store.dispatch(new LoginWithCredentials(credentials));
  }

  public logout() {
    this.store.dispatch(new Logout);
  }
}
