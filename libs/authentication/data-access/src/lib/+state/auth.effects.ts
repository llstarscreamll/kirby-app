import { from } from 'rxjs';
import { defer } from 'rxjs';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Effect, ofType } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/angular';
import { map, switchMap, tap } from 'rxjs/operators';

import { AuthService } from '../services/auth.service';
import { LocalStorageService } from '@kirby/shared';
import { AuthPartialState, AUTH_FEATURE_KEY } from './auth.reducer';
import {
  LoginWithCredentials,
  LoginSuccess,
  LoginError,
  AuthActionTypes,
  GetAuthUserSuccess,
  Logout,
  LogoutSuccess,
  SignUp,
  SignUpSuccess,
  SignUpError,
  CheckIfUserIsAuthenticated,
} from './auth.actions';

@Injectable()
export class AuthEffects {
  @Effect()
  signUp$ = this.dataPersistence.pessimisticUpdate(AuthActionTypes.SignUp, {
    run: (action: SignUp) => {
      return this.authService.signUp(action.payload).pipe(map((tokens) => new SignUpSuccess(tokens)));
    },
    onError: (action: SignUp, error) => {
      return new SignUpError(error);
    },
  });

  @Effect()
  signUpSuccess$ = this.dataPersistence.actions.pipe(
    ofType(AuthActionTypes.SignUpSuccess),
    map((action: SignUpSuccess) => new LoginSuccess(action.payload))
  );

  @Effect()
  loginWithCredentials$ = this.dataPersistence.pessimisticUpdate(AuthActionTypes.LoginWithCredentials, {
    run: (action: LoginWithCredentials) => {
      return this.authService.loginWithCredentials(action.payload).pipe(map((tokens) => new LoginSuccess(tokens)));
    },
    onError: (action: LoginWithCredentials, error) => {
      return new LoginError(error);
    },
  });

  @Effect()
  loginSuccess$ = this.dataPersistence.actions.pipe(
    ofType(AuthActionTypes.LoginSuccess),
    tap((action: LoginSuccess) => this.localStorage.setItem(AUTH_FEATURE_KEY, { tokens: action.payload })),
    switchMap((action: LoginSuccess) =>
      this.authService.getAuthUser().pipe(
        map((user) => new GetAuthUserSuccess(user)),
        tap((user) => this.router.navigate(['/welcome']))
      )
    )
  );

  @Effect({ dispatch: false })
  getUserSuccess$ = this.dataPersistence.optimisticUpdate(AuthActionTypes.GetAuthUserSuccess, {
    run: (action: GetAuthUserSuccess, state: AuthPartialState) => {
      return this.localStorage.setItem(AUTH_FEATURE_KEY, {
        ...state[AUTH_FEATURE_KEY],
        user: action.payload,
      });
    },
    undoAction: (action: GetAuthUserSuccess, state: AuthPartialState) => {
      return null;
    },
  });

  @Effect()
  logout$ = this.dataPersistence.optimisticUpdate(AuthActionTypes.Logout, {
    run: (action: Logout, state: AuthPartialState) => {
      return this.authService.logout().pipe(map(() => new LogoutSuccess()));
    },
    undoAction: (action: Logout, state: AuthPartialState) => {
      return new LogoutSuccess();
    },
  });

  @Effect({ dispatch: false })
  logoutSuccess$ = this.dataPersistence.actions.pipe(
    ofType(AuthActionTypes.LogoutSuccess),
    tap(() => this.localStorage.removeItem(AUTH_FEATURE_KEY)),
    tap(() => this.router.navigate(['/']))
  );

  @Effect()
  checkIfAuthenticated$ = this.dataPersistence.optimisticUpdate(AuthActionTypes.CheckIfAuthenticated, {
    run: (action: CheckIfUserIsAuthenticated, state: AuthPartialState) => {
      // check user is authentication on server only if auth tokens exists
      return state[AUTH_FEATURE_KEY].tokens
        ? this.authService.getAuthUser().pipe(map((user) => new GetAuthUserSuccess(user)))
        : null;
    },
    undoAction: (action: CheckIfUserIsAuthenticated, state: AuthPartialState) => {
      return new LogoutSuccess();
    },
  });

  @Effect()
  init$ = defer(() => from([new CheckIfUserIsAuthenticated()]));

  constructor(
    private router: Router,
    private authService: AuthService,
    private localStorage: LocalStorageService,
    private dataPersistence: DataPersistence<AuthPartialState>
  ) {}
}
