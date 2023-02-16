import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';

import { AuthState } from './auth.reducer';
import { authQuery } from './auth.selectors';
import { NewAccount } from '@kirby/authentication/utils';
import { LoginWithCredentials, Logout, SignUp, CleanErrors } from './auth.actions';

@Injectable()
export class AuthFacade {
  errors$ = this.store.select(authQuery.getErrors);
  status$ = this.store.select(authQuery.getStatus);
  authUser$ = this.store.select(authQuery.getAuthUser);
  authTokens$ = this.store.select(authQuery.getAuthTokens);
  isLoggedIn$ = this.store.select(authQuery.getIsLoggedIn);

  constructor(private store: Store<AuthState>) {}

  loginWithCredentials(credentials: { email: string; password: string }) {
    this.store.dispatch(LoginWithCredentials({ payload: credentials }));
  }

  logout() {
    this.store.dispatch(Logout());
  }

  signUp(newAccount: NewAccount) {
    this.store.dispatch(SignUp({ payload: newAccount }));
  }

  cleanErrors() {
    this.store.dispatch(CleanErrors());
  }
}
