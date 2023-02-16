import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { hot, cold } from 'jasmine-marbles';
import { EffectsModule } from '@ngrx/effects';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { SharedModule, LocalStorageService } from '@kirby/shared';
import { AUTH_TOKENS_MOCK, USER } from '@kirby/authentication/utils';

import * as actions from './auth.actions';
import { AuthEffects } from './auth.effects';
import { AUTH_FEATURE_KEY } from './auth.reducer';
import { AuthService } from '../services/auth.service';
import { CREDENTIALS, INCORRECT_CREDENTIALS_API_ERROR } from '../testing';

describe('AuthEffects', () => {
  let action$: Observable<any>;
  let effects: AuthEffects;
  let authService: AuthService;
  let localStorageService: LocalStorageService;
  let router: Router;
  const authUser = USER;
  const authTokens = AUTH_TOKENS_MOCK;
  const credentials = CREDENTIALS;
  const wrongCredentialsError = INCORRECT_CREDENTIALS_API_ERROR;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        StoreModule.forRoot(
          {},
          {
            runtimeChecks: {
              strictStateImmutability: true,
              strictActionImmutability: true,
            },
          }
        ),
        EffectsModule.forRoot([]),
        HttpClientTestingModule,
      ],
      providers: [
        AuthEffects,
        AuthService,
        provideMockActions(() => action$),
        { provide: 'environment', useValue: { api: 'http://my.api.com/' } },
        { provide: Router, useValue: { navigate: (url) => true } },
      ],
    });

    effects = TestBed.inject(AuthEffects);
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    localStorageService = TestBed.inject(LocalStorageService);

    jest.spyOn(router, 'navigate').mockReturnValue(new Promise(() => true));
    jest.spyOn(localStorageService, 'setItem').mockReturnValue(null);
    jest.spyOn(localStorageService, 'removeItem').mockReturnValue(null);
  });

  describe('loginWithCredentials$', () => {
    it('should return LoginSuccess and navigate if login API responds ok', () => {
      // api ok response
      const apiResponse = cold('-r', { r: authTokens });
      jest.spyOn(authService, 'loginWithCredentials').mockReturnValue(apiResponse);

      const action = actions.LoginWithCredentials({ payload: credentials });
      const completion = actions.LoginSuccess({ payload: authTokens });

      action$ = hot('-a', { a: action });
      const expected = cold('--c', { c: completion });

      expect(effects.loginWithCredentials$).toBeObservable(expected);
    });

    it('should return LoginError if login API throws error', () => {
      const apiResponse = cold('-#', {}, wrongCredentialsError);
      jest.spyOn(authService, 'loginWithCredentials').mockReturnValue(apiResponse);

      action$ = hot('-a-', {
        a: actions.LoginWithCredentials({ payload: credentials }),
      });
      expect(effects.loginWithCredentials$).toBeObservable(
        hot('--a', { a: actions.LoginError({ payload: wrongCredentialsError }) })
      );
    });
  });

  describe('loginSuccess$', () => {
    it('should return GetAuthUserSuccess if get user API responds ok', () => {
      const apiResponse = cold('-u', { u: authUser });
      jest.spyOn(authService, 'getAuthUser').mockReturnValue(apiResponse);

      action$ = hot('-a', { a: actions.LoginSuccess({ payload: authTokens }) });
      const expected = cold('--e', { e: actions.GetAuthUserSuccess({ payload: authUser }) });

      expect(effects.loginSuccess$).toBeObservable(expected);
      expect(router.navigate).toHaveBeenCalledWith(['/welcome']);
      expect(localStorageService.setItem).toHaveBeenCalledWith(AUTH_FEATURE_KEY, { tokens: authTokens });
    });
  });

  describe('logout$', () => {
    it('should return LogoutSuccess if logout API response is ok', () => {
      const apiResponse = cold('-a', { a: ['oki!!'] });
      jest.spyOn(authService, 'logout').mockReturnValue(apiResponse);

      action$ = cold('-a', { a: actions.Logout() });
      const expected = cold('--e', { e: actions.LogoutSuccess() });

      expect(effects.logout$).toBeObservable(expected);
    });

    it('should return LogoutSuccess if logout API response is error', () => {
      const apiResponse = cold('-#', {}, ['error']);
      jest.spyOn(authService, 'logout').mockReturnValue(apiResponse);

      const action = actions.Logout();
      const completion = actions.LogoutSuccess();

      action$ = cold('-a', { a: action });
      const expected = cold('--e', { e: completion });

      expect(effects.logout$).toBeObservable(expected);
    });
  });

  describe('logoutSuccess$', () => {
    it('should navigate and remove related data from local storage', () => {
      action$ = cold('-a', { a: actions.LogoutSuccess() });
      const expected$ = cold('-a', { a: actions.LogoutSuccess() });

      expect(effects.logoutSuccess$).toBeObservable(expected$);
      expect(localStorageService.removeItem).toHaveBeenCalledWith(AUTH_FEATURE_KEY);
      expect(router.navigate).toHaveBeenCalledWith(['/']);
    });
  });

  describe('init$', () => {
    xit('should dispatch CheckIfUserIsAuthenticated action', () => {
      const expected$ = hot('(a|)', { a: actions.CheckIfUserIsAuthenticated() });

      expect(effects.init$).toBeObservable(expected$);
    });
  });
});
