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
import { AUTH_FEATURE_KEY } from './auth.reducer';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthEffects {
  signUp$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SignUp),
      pessimisticUpdate({
        run: (action: ReturnType<typeof SignUp>) =>
          this.authService.signUp(action.payload).pipe(map((tokens) => SignUpSuccess({ payload: tokens }))),
        onError: (_: ReturnType<typeof SignUp>, err) => SignUpError({ payload: err }),
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
        onError: (action: ReturnType<typeof LoginWithCredentials>, err) =>
          LoginError({ payload: err.status === 401 ? { error: { message: 'Credenciales incorrectas' } } : err }),
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
          run: (action: ReturnType<typeof GetAuthUserSuccess>) => {
            return this.localStorage.setItem(AUTH_FEATURE_KEY, {
              ...this.localStorage.getItem(AUTH_FEATURE_KEY),
              user: action.payload,
            });
          },
          undoAction: (action: ReturnType<typeof GetAuthUserSuccess>) => {
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
        run: (_: ReturnType<typeof Logout>) => this.authService.logout().pipe(map(() => LogoutSuccess())),
        undoAction: (_: ReturnType<typeof Logout>) => LogoutSuccess(),
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

  checkIfAuthenticated$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CheckIfUserIsAuthenticated),
      optimisticUpdate({
        run: (_: ReturnType<typeof CheckIfUserIsAuthenticated>) => {
          return this.authService.getAuthUser().pipe(map((user) => GetAuthUserSuccess({ payload: user })));
        },
        undoAction: (action: ReturnType<typeof CheckIfUserIsAuthenticated>) => LogoutSuccess(),
      })
    )
  );

  init$ = createEffect(() => defer(() => from([CheckIfUserIsAuthenticated()])));

  constructor(
    private router: Router,
    private actions$: Actions,
    private authService: AuthService,
    private localStorage: LocalStorageService
  ) {}
}
