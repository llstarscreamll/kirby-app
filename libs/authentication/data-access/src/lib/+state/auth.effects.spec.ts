import { Observable } from 'rxjs';
import { NxModule } from '@nrwl/angular';
import { Router } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { DataPersistence } from '@nrwl/angular';
import { hot, cold } from '@nrwl/angular/testing';
import { EffectsModule } from '@ngrx/effects';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { AuthEffects } from './auth.effects';
import { AUTH_FEATURE_KEY } from './auth.reducer';
import { AuthService } from '../services/auth.service';
import { AUTH_TOKENS_MOCK, USER } from '@kirby/authentication/utils';
import { SharedModule, LocalStorageService } from '@kirby/shared';
import { CREDENTIALS, INCORRECT_CREDENTIALS_API_ERROR } from '../testing';
import {
  LoginWithCredentials,
  LoginSuccess,
  LoginError,
  GetAuthUserSuccess,
  Logout,
  LogoutSuccess,
  CheckIfUserIsAuthenticated
} from './auth.actions';

describe('AuthEffects', () => {
  let expectedAction$: Observable<any>;
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
        NxModule.forRoot(),
        StoreModule.forRoot(
          {},
          {
            runtimeChecks: {
              strictStateImmutability: true,
              strictActionImmutability: true
            }
          }
        ),
        EffectsModule.forRoot([]),
        HttpClientTestingModule
      ],
      providers: [
        AuthEffects,
        AuthService,
        DataPersistence,
        provideMockActions(() => expectedAction$),
        { provide: 'environment', useValue: { api: 'http://my.api.com/' } },
        { provide: Router, useValue: { navigate: url => true } }
      ]
    });

    effects = TestBed.get(AuthEffects);
    authService = TestBed.get(AuthService);
    router = TestBed.get(Router);
    localStorageService = TestBed.get(LocalStorageService);

    spyOn(router, 'navigate').and.returnValue(true);
    spyOn(localStorageService, 'setItem').and.returnValue(true);
    spyOn(localStorageService, 'removeItem').and.returnValue(true);
  });

  describe('loginWithCredentials$', () => {
    it('should return LoginSuccess and navigate if login API responds ok', () => {
      // api ok response
      const apiResponse = cold('-r', { r: authTokens });
      spyOn(authService, 'loginWithCredentials').and.returnValue(apiResponse);

      const action = new LoginWithCredentials(credentials);
      const completion = new LoginSuccess(authTokens);

      expectedAction$ = hot('-a', { a: action });
      const expected = cold('--c', { c: completion });

      expect(effects.loginWithCredentials$).toBeObservable(expected);
    });

    it('should return LoginError if login API throws error', () => {
      const apiResponse = cold('-#', {}, wrongCredentialsError);
      spyOn(authService, 'loginWithCredentials').and.returnValue(apiResponse);

      expectedAction$ = hot('-a-', {
        a: new LoginWithCredentials(credentials)
      });
      expect(effects.loginWithCredentials$).toBeObservable(
        hot('--a', { a: new LoginError(wrongCredentialsError) })
      );
    });
  });

  describe('loginSuccess$', () => {
    it('should return GetAuthUserSuccess if get user API responds ok', () => {
      // user api response ok
      const apiResponse = cold('-u', { u: authUser });
      spyOn(authService, 'getAuthUser').and.returnValue(apiResponse);

      const action = new LoginSuccess(authTokens);
      const completion = new GetAuthUserSuccess(authUser);

      expectedAction$ = cold('-a', { a: action });
      const expected = cold('--e', { e: completion });

      expect(effects.loginSuccess$).toBeObservable(expected);
      expect(router.navigate).toHaveBeenCalledWith(['/welcome']);
      expect(localStorageService.setItem).toHaveBeenCalledWith(
        AUTH_FEATURE_KEY,
        { tokens: authTokens }
      );
    });
  });

  describe('logout$', () => {
    it('should return LogoutSuccess if logout API response is ok', () => {
      const apiResponse = cold('-a', { a: ['oki!!'] });
      spyOn(authService, 'logout').and.returnValue(apiResponse);

      const action = new Logout();
      const completion = new LogoutSuccess();

      expectedAction$ = cold('-a', { a: action });
      const expected = cold('--e', { e: completion });

      expect(effects.logout$).toBeObservable(expected);
    });

    it('should return LogoutSuccess if logout API response is error', () => {
      const apiResponse = cold('-#', {}, ['error']);
      spyOn(authService, 'logout').and.returnValue(apiResponse);

      const action = new Logout();
      const completion = new LogoutSuccess();

      expectedAction$ = cold('-a', { a: action });
      const expected = cold('--e', { e: completion });

      expect(effects.logout$).toBeObservable(expected);
    });
  });

  describe('logoutSuccess$', () => {
    it('should navigate and remove related data from local storage', () => {
      const action = new LogoutSuccess();
      expectedAction$ = cold('-a', { a: action });

      expect(effects.logoutSuccess$).toBeObservable(expectedAction$);
      expect(localStorageService.removeItem).toHaveBeenCalledWith(
        AUTH_FEATURE_KEY
      );
      expect(router.navigate).toHaveBeenCalledWith(['/']);
    });
  });

  describe('init$', () => {
    it('should dispatch CheckIfUserIsAuthenticated action', () => {
      const action = new CheckIfUserIsAuthenticated();
      expectedAction$ = hot('(a|)', { a: action });

      expect(effects.init$).toBeObservable(expectedAction$);
    });
  });
});
