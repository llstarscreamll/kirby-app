import { NxModule } from '@nrwl/nx';
import { NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { TestBed } from '@angular/core/testing';
import { StoreModule, Store } from '@ngrx/store';
import { readFirst, cold, getTestScheduler } from '@nrwl/nx/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { AuthFacade } from './auth.facade';
import { AuthEffects } from './auth.effects';

import { AuthService } from '../services/auth.service';
import { LoginWithCredentials, Logout, LoginSuccess, GetAuthUserSuccess } from './auth.actions';
import { CREDENTIALS, USER, AUTH_TOKENS_MOCK, INCORRECT_CREDENTIALS_API_ERROR } from '../utils/mocks';
import { AuthState, initialState, authReducer } from './auth.reducer';
import { SharedModule } from '@agile-work/shared';

interface TestSchema {
  'auth': AuthState
}

describe('AuthFacade', () => {
  let router: Router;
  let facade: AuthFacade;
  let store: Store<TestSchema>;
  let authService: AuthService;
  const authUser = USER;
  const authTokens = AUTH_TOKENS_MOCK;
  const credentials = CREDENTIALS;

  describe('used in NgModule', () => {

    beforeEach(() => {
      @NgModule({
        imports: [
          SharedModule,
          HttpClientTestingModule,
          StoreModule.forFeature('auth', authReducer, { initialState }),
          EffectsModule.forFeature([AuthEffects])
        ],
        providers: [
          AuthService,
          AuthFacade,
          AuthEffects,
          { provide: 'environment', useValue: { api: 'http://my.api.com/' } },
          { provide: Router, useValue: { navigate: (url) => true } },
        ]
      })
      class CustomFeatureModule { }

      @NgModule({
        imports: [
          NxModule.forRoot(),
          StoreModule.forRoot({}),
          EffectsModule.forRoot([]),
          CustomFeatureModule,
        ]
      })
      class RootModule { }
      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.get(Store);
      facade = TestBed.get(AuthFacade);
      authService = TestBed.get(AuthService);
      router = TestBed.get(Router);

      spyOn(store, 'dispatch').and.callThrough();
      spyOn(router, 'navigate').and.returnValue(true);
    });

    /**
     * The initially generated facade::login() returns null
     */
    it('should return auth tokens, user and status == loggedIn on login() success', async (done) => {
      // api auth response ok
      spyOn(authService, 'loginWithCredentials').and.returnValue(cold('-a|', { a: authTokens }));
      // get current user api ok
      spyOn(authService, 'getAuthUser').and.returnValue(cold('--a|', { a: authUser }));

      try {

        let tokens = await readFirst(facade.authTokens$);
        let user = await readFirst(facade.authUser$);
        let status = await readFirst(facade.status$);

        expect(user).toBe(null, 'initial auth user is null');
        expect(tokens).toBe(null, 'initial tokens are null');
        expect(status).toBe(null, 'initial status is null');

        await facade.loginWithCredentials(credentials);

        expect(store.dispatch).toHaveBeenCalledWith(new LoginWithCredentials(credentials));

        getTestScheduler().flush();

        status = await readFirst(facade.status$);
        tokens = await readFirst(facade.authTokens$);
        user = await readFirst(facade.authUser$);

        expect(status).toBe('loggedIn', 'after login success, status == loggedIn');
        expect(tokens).toBeTruthy();
        expect(user).toBeTruthy();

        done();
      } catch (err) {
        done.fail(err);
      }
    });

    it('should return auth errors when login throws error', async (done) => {
      // api auth response ok
      spyOn(authService, 'loginWithCredentials').and.returnValue(cold('-#', {}, INCORRECT_CREDENTIALS_API_ERROR));

      try {
        let errors = await readFirst(facade.errors$);
        expect(errors).toBeFalsy();

        await facade.loginWithCredentials(credentials);

        getTestScheduler().flush();

        errors = await readFirst(facade.errors$);
        expect(errors).toBeTruthy();

        done();
      } catch (err) {
        done.fail(err);
      }
    });

    it('should dispatch logout action on logout()', async (done) => {
      // api logout response ok
      spyOn(authService, 'logout').and.returnValue(cold('-a', { a: ['ok'] }));
      store.dispatch(new LoginSuccess(AUTH_TOKENS_MOCK));
      store.dispatch(new GetAuthUserSuccess(USER));

      try {
        let user = await readFirst(facade.authUser$);
        let tokens = await readFirst(facade.authTokens$);
        let status = await readFirst(facade.status$);

        expect(user).toBeTruthy();
        expect(tokens).toBeTruthy();
        expect(status).toBeTruthy();

        await facade.logout();

        getTestScheduler().flush();

        expect(store.dispatch).toHaveBeenCalledWith(new Logout);
        user = await readFirst(facade.authUser$);
        tokens = await readFirst(facade.authTokens$);
        status = await readFirst(facade.status$);

        expect(user).toBeFalsy();
        expect(tokens).toBeFalsy();
        expect(status).toBeFalsy();
        done();
      } catch (err) {
        done.fail(err);
      }
    });
  });

});
