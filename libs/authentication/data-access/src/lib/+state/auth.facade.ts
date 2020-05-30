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

  constructor(private store: Store<AuthState>) { }

  loginWithCredentials(credentials: { email: string, password: string }) {
    this.store.dispatch(new LoginWithCredentials(credentials));
  }

  logout() {
    this.store.dispatch(new Logout);
  }

  signUp(newAccount: NewAccount) {
    this.store.dispatch(new SignUp(newAccount));
  }

  cleanErrors() {
    this.store.dispatch(new CleanErrors());
  }
}
