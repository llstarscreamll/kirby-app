import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { DataPersistence } from '@nrwl/nx';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { map, switchMap, tap } from 'rxjs/operators';

import { AuthState, AuthPartialState, AUTH_FEATURE_KEY } from './auth.reducer';
import { AuthService } from '../services/auth.service';
import { LoginWithCredentials, LoginSuccess, LoginError, AuthActionTypes, GetAuthUserSuccess, Logout, LogoutSuccess } from './auth.actions';
import { LocalStorageService } from '@agile-work/shared';
import { config } from '../config';

@Injectable()
export class AuthEffects {

  @Effect()
  public loginWithCredentials$ = this.dataPersistence
    .pessimisticUpdate(AuthActionTypes.LoginWithCredentials, {
      run: (action: LoginWithCredentials, state: AuthPartialState) => {
        return this.authService
          .loginWithCredentials(action.payload)
          .pipe(map(tokens => new LoginSuccess(tokens)))
      },
      onError: (action: LoginWithCredentials, error) => {
        return new LoginError(error);
      }
    });

  @Effect()
  public loginSuccess$ = this.actions$.pipe(
    ofType(AuthActionTypes.LoginSuccess),
    tap((action: LoginSuccess) => this.localStorage.setItem(this.config.key, { tokens: action.payload })),
    switchMap((action: LoginSuccess) => this.authService
      .getAuthUser(action.payload)
      .pipe(
        map(user => new GetAuthUserSuccess(user)),
        tap(user => this.router.navigate(['/welcome'])),
      ))
  );

  @Effect({ dispatch: false })
  public getUserSuccess$ = this.dataPersistence
    .optimisticUpdate(AuthActionTypes.GetAuthUserSuccess, {
      run: (action: GetAuthUserSuccess, state: AuthPartialState) => {
        return this.localStorage.setItem(this.config.key, { ...state[AUTH_FEATURE_KEY], user: action.payload });
      },
      undoAction: (action: GetAuthUserSuccess, state: AuthPartialState) => {
        return null;
      }
    });

  @Effect()
  public logout$ = this.dataPersistence
    .optimisticUpdate(AuthActionTypes.Logout, {
      run: (action: Logout, state: AuthPartialState) => {
        return this.authService.logout(state[AUTH_FEATURE_KEY].tokens)
          .pipe(map(() => new LogoutSuccess));
      },
      undoAction: (action: Logout, state: AuthPartialState) => {
        return new LogoutSuccess;
      }
    });

  @Effect({ dispatch: false })
  public logoutSuccess$ = this.actions$.pipe(
    ofType(AuthActionTypes.LogoutSuccess),
    tap(() => this.localStorage.removeItem(this.config.key))
  );


  private config = config;

  public constructor(
    private router: Router,
    private actions$: Actions,
    private authService: AuthService,
    private localStorage: LocalStorageService,
    private dataPersistence: DataPersistence<AuthPartialState>
  ) { }
}
