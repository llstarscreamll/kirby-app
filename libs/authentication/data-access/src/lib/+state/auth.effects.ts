import { from, defer } from 'rxjs';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { map, switchMap, tap } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { optimisticUpdate, pessimisticUpdate } from '@nrwl/angular';

import { LocalStorageService } from '@kirby/shared';

import {
  Logout,
  SignUp,
  LoginError,
  SignUpError,
  LoginSuccess,
  LogoutSuccess,
  SignUpSuccess,
  GetAuthUserSuccess,
  LoginWithCredentials,
  CheckIfUserIsAuthenticated,
} from './auth.actions';
import { AuthService } from '../services/auth.service';
import { AuthPartialState, AUTH_FEATURE_KEY } from './auth.reducer';

@Injectable()
export class AuthEffects {
  signUp$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SignUp),
      pessimisticUpdate({
        run: (action: ReturnType<typeof SignUp>) =>
          this.authService.signUp(action.payload).pipe(map((tokens) => SignUpSuccess({ payload: tokens }))),
        onError: (action: ReturnType<typeof SignUp>, error) => SignUpError({ payload: error }),
      })
    )
  );

  signUpSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SignUpSuccess),
      map((action: ReturnType<typeof SignUpSuccess>) => LoginSuccess({ payload: action.payload }))
    )
  );

  loginWithCredentials$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LoginWithCredentials),
      pessimisticUpdate({
        run: (action: ReturnType<typeof LoginWithCredentials>) =>
          this.authService
            .loginWithCredentials(action.payload)
            .pipe(map((tokens) => LoginSuccess({ payload: tokens }))),
        onError: (action: ReturnType<typeof LoginWithCredentials>, error) => LoginError({ payload: error }),
      })
    )
  );

  loginSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LoginSuccess),
      tap((action: ReturnType<typeof LoginSuccess>) =>
        this.localStorage.setItem(AUTH_FEATURE_KEY, { tokens: action.payload })
      ),
      switchMap((action: ReturnType<typeof LoginSuccess>) =>
        this.authService.getAuthUser().pipe(
          map((user) => GetAuthUserSuccess({ payload: user })),
          tap((user) => this.router.navigate(['/welcome']))
        )
      )
    )
  );

  getUserSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(GetAuthUserSuccess),
        optimisticUpdate({
          run: (action: ReturnType<typeof GetAuthUserSuccess>, state: AuthPartialState) => {
            return this.localStorage.setItem(AUTH_FEATURE_KEY, {
              ...state[AUTH_FEATURE_KEY],
              user: action.payload,
            });
          },
          undoAction: (action: ReturnType<typeof GetAuthUserSuccess>, state: AuthPartialState) => {
            return null;
          },
        })
      ),
    { dispatch: false }
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(Logout),
      optimisticUpdate({
        run: (_: ReturnType<typeof Logout>, state: AuthPartialState) =>
          this.authService.logout().pipe(map(() => LogoutSuccess())),
        undoAction: (_: ReturnType<typeof Logout>, state: AuthPartialState) => LogoutSuccess(),
      })
    )
  );

  logoutSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(LogoutSuccess),
        tap(() => this.localStorage.removeItem(AUTH_FEATURE_KEY)),
        tap(() => this.router.navigate(['/']))
      ),
    { dispatch: false }
  );

  checkIfAuthenticated$ = this.actions$.pipe(
    ofType(CheckIfUserIsAuthenticated),
    optimisticUpdate({
      run: (_: ReturnType<typeof CheckIfUserIsAuthenticated>, state: AuthPartialState) =>
        state[AUTH_FEATURE_KEY].tokens
          ? this.authService.getAuthUser().pipe(map((user) => GetAuthUserSuccess({ payload: user })))
          : null,
      undoAction: (action: ReturnType<typeof CheckIfUserIsAuthenticated>, state: AuthPartialState) => LogoutSuccess(),
    })
  );

  init$ = createEffect(() => defer(() => from([CheckIfUserIsAuthenticated()])));

  constructor(
    private router: Router,
    private actions$: Actions,
    private authService: AuthService,
    private localStorage: LocalStorageService
  ) {}
}
