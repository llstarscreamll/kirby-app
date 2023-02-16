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
  let expected$: Observable<any>;
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
        provideMockActions(() => expected$),
        { provide: 'environment', useValue: { api: 'http://my.api.com/' } },
        { provide: Router, useValue: { navigate: (url) => true } },
      ],
    });

    effects = TestBed.get(AuthEffects);
    authService = TestBed.get(AuthService);
    router = TestBed.get(Router);
    localStorageService = TestBed.get(LocalStorageService);

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

      expected$ = hot('-a', { a: action });
      const expected = cold('--c', { c: completion });

      expect(effects.loginWithCredentials$).toBeObservable(expected);
    });

    it('should return LoginError if login API throws error', () => {
      const apiResponse = cold('-#', {}, wrongCredentialsError);
      jest.spyOn(authService, 'loginWithCredentials').mockReturnValue(apiResponse);

      expected$ = hot('-a-', {
        a: actions.LoginWithCredentials({ payload: credentials }),
      });
      expect(effects.loginWithCredentials$).toBeObservable(
        hot('--a', { a: actions.LoginError({ payload: wrongCredentialsError }) })
      );
    });
  });

  describe('loginSuccess$', () => {
    it('should return GetAuthUserSuccess if get user API responds ok', () => {
      // user api response ok
      const apiResponse = cold('-u', { u: authUser });
      jest.spyOn(authService, 'getAuthUser').mockReturnValue(apiResponse);

      const action = actions.LoginSuccess({ payload: authTokens });
      const completion = actions.GetAuthUserSuccess({ payload: authUser });

      expected$ = cold('-a', { a: action });
      const expected = cold('--e', { e: completion });

      expect(effects.loginSuccess$).toBeObservable(expected);
      expect(router.navigate).toHaveBeenCalledWith(['/welcome']);
      expect(localStorageService.setItem).toHaveBeenCalledWith(AUTH_FEATURE_KEY, { tokens: authTokens });
    });
  });

  describe('logout$', () => {
    it('should return LogoutSuccess if logout API response is ok', () => {
      const apiResponse = cold('-a', { a: ['oki!!'] });
      jest.spyOn(authService, 'logout').mockReturnValue(apiResponse);

      const action = actions.Logout();
      const completion = actions.LogoutSuccess();

      expected$ = cold('-a', { a: action });
      const expected = cold('--e', { e: completion });

      expect(effects.logout$).toBeObservable(expected);
    });

    it('should return LogoutSuccess if logout API response is error', () => {
      const apiResponse = cold('-#', {}, ['error']);
      jest.spyOn(authService, 'logout').mockReturnValue(apiResponse);

      const action = actions.Logout();
      const completion = actions.LogoutSuccess();

      expected$ = cold('-a', { a: action });
      const expected = cold('--e', { e: completion });

      expect(effects.logout$).toBeObservable(expected);
    });
  });

  describe('logoutSuccess$', () => {
    it('should navigate and remove related data from local storage', () => {
      const action = actions.LogoutSuccess();
      const expected$ = cold('-a', { a: action });

      expect(effects.logoutSuccess$).toBeObservable(expected$);
      expect(localStorageService.removeItem).toHaveBeenCalledWith(AUTH_FEATURE_KEY);
      expect(router.navigate).toHaveBeenCalledWith(['/']);
    });
  });

  describe('init$', () => {
    it('should dispatch CheckIfUserIsAuthenticated action', () => {
      const action = actions.CheckIfUserIsAuthenticated();
      const expected$ = hot('(a|)', { a: action });

      expect(effects.init$).toBeObservable(expected$);
    });
  });
});
