import { from } from 'rxjs';
import { defer } from 'rxjs';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { map, switchMap, tap } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';

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
import { optimisticUpdate, pessimisticUpdate } from '@nrwl/angular';

@Injectable()
export class AuthEffects {
  signUp$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActionTypes.SignUp),
      pessimisticUpdate({
        run: (action: SignUp) =>
          this.authService.signUp(action.payload).pipe(map((tokens) => new SignUpSuccess(tokens))),
        onError: (action: SignUp, error) => new SignUpError(error),
      })
    )
  );

  signUpSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActionTypes.SignUpSuccess),
      map((action: SignUpSuccess) => new LoginSuccess(action.payload))
    )
  );

  loginWithCredentials$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActionTypes.LoginWithCredentials),
      pessimisticUpdate({
        run: (action: LoginWithCredentials) =>
          this.authService.loginWithCredentials(action.payload).pipe(map((tokens) => new LoginSuccess(tokens))),
        onError: (action: LoginWithCredentials, error) => new LoginError(error),
      })
    )
  );

  loginSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActionTypes.LoginSuccess),
      tap((action: LoginSuccess) => this.localStorage.setItem(AUTH_FEATURE_KEY, { tokens: action.payload })),
      switchMap((action: LoginSuccess) =>
        this.authService.getAuthUser().pipe(
          map((user) => new GetAuthUserSuccess(user)),
          tap((user) => this.router.navigate(['/welcome']))
        )
      )
    )
  );

  getUserSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActionTypes.GetAuthUserSuccess),
        optimisticUpdate({
          run: (action: GetAuthUserSuccess, state: AuthPartialState) => {
            return this.localStorage.setItem(AUTH_FEATURE_KEY, {
              ...state[AUTH_FEATURE_KEY],
              user: action.payload,
            });
          },
          undoAction: (action: GetAuthUserSuccess, state: AuthPartialState) => {
            return null;
          },
        })
      ),
    { dispatch: false }
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActionTypes.Logout),
      optimisticUpdate({
        run: (action: Logout, state: AuthPartialState) =>
          this.authService.logout().pipe(map(() => new LogoutSuccess())),
        undoAction: (action: Logout, state: AuthPartialState) => new LogoutSuccess(),
      })
    )
  );

  logoutSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActionTypes.LogoutSuccess),
        tap(() => this.localStorage.removeItem(AUTH_FEATURE_KEY)),
        tap(() => this.router.navigate(['/']))
      ),
    { dispatch: false }
  );

  checkIfAuthenticated$ = this.actions$.pipe(
    ofType(AuthActionTypes.CheckIfAuthenticated),
    optimisticUpdate({
      run: (action: CheckIfUserIsAuthenticated, state: AuthPartialState) =>
        state[AUTH_FEATURE_KEY].tokens
          ? this.authService.getAuthUser().pipe(map((user) => new GetAuthUserSuccess(user)))
          : null,
      undoAction: (action: CheckIfUserIsAuthenticated, state: AuthPartialState) => new LogoutSuccess(),
    })
  );

  init$ = createEffect(() => defer(() => from([new CheckIfUserIsAuthenticated()])));

  constructor(
    private router: Router,
    private actions$: Actions,
    private authService: AuthService,
    private localStorage: LocalStorageService
  ) {}
}
