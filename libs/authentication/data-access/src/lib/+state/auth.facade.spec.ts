import { NxModule } from '@nrwl/angular';
import { NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { TestBed } from '@angular/core/testing';
import { StoreModule, Store } from '@ngrx/store';
import { readFirst } from '@nrwl/angular/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { AuthFacade } from './auth.facade';
import { AuthEffects } from './auth.effects';
import { AuthService } from '../services/auth.service';
import { SharedModule, ApiError } from '@kirby/shared';
import { AUTH_TOKENS_MOCK, USER } from '@kirby/authentication/utils';
import { CREDENTIALS, INCORRECT_CREDENTIALS_API_ERROR } from '../testing';
import { AuthState, initialState, authReducer, AUTH_FEATURE_KEY } from './auth.reducer';
import { LoginWithCredentials, Logout, LoginSuccess, GetAuthUserSuccess, SignUp } from './auth.actions';
import { User } from '@kirby/users/util';
import { cold, getTestScheduler } from 'jasmine-marbles';

interface TestSchema {
  [AUTH_FEATURE_KEY]: AuthState;
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
          StoreModule.forFeature(AUTH_FEATURE_KEY, authReducer, {
            initialState,
          }),
          EffectsModule.forFeature([AuthEffects]),
        ],
        providers: [
          AuthService,
          AuthFacade,
          AuthEffects,
          { provide: 'environment', useValue: { api: 'http://my.api.com/' } },
          { provide: Router, useValue: { navigate: (url) => true } },
        ],
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [
          NxModule.forRoot(),
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
          CustomFeatureModule,
        ],
      })
      class RootModule {}
      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.inject(Store);
      facade = TestBed.inject(AuthFacade);
      authService = TestBed.inject(AuthService);
      router = TestBed.inject(Router);

     jest.spyOn(store, 'dispatch').and.callThrough();
     jest.spyOn(router, 'navigate').mockReturnValue(true);
    });

    /**
     * The initially generated facade::login() returns null
     */
    it('should return auth tokens, user and status == loggedIn on login() success', async (done) => {
      // api auth response ok
     jest.spyOn(authService, 'loginWithCredentials').mockReturnValue(cold('-a|', { a: authTokens }));
      // get current user api ok
     jest.spyOn(authService, 'getAuthUser').mockReturnValue(cold('--a|', { a: authUser }));

      try {
        let tokens = await readFirst(facade.authTokens$);
        let user = await readFirst(facade.authUser$);
        let status = await readFirst(facade.status$);

        expect(user).toBe(null);
        expect(tokens).toBe(null);
        expect(status).toBe(null);

        await facade.loginWithCredentials(credentials);

        expect(store.dispatch).toHaveBeenCalledWith(new LoginWithCredentials(credentials));

        getTestScheduler().flush();

        status = await readFirst(facade.status$);
        tokens = await readFirst(facade.authTokens$);
        user = await readFirst(facade.authUser$);

        expect(status).toBe('loggedIn');
        expect(tokens).toBeTruthy();
        expect(user).toBeTruthy();

        done();
      } catch (err) {
        done.fail(err);
      }
    });

    it('should return auth errors when login throws error', async (done) => {
      // api auth response ok
     jest.spyOn(authService, 'loginWithCredentials').mockReturnValue(cold('-#', {}, INCORRECT_CREDENTIALS_API_ERROR));

      try {
        let errors = await readFirst(facade.errors$);
        expect(errors).toBeFalsy();

        await facade.loginWithCredentials(credentials);

        getTestScheduler().flush();

        errors = await readFirst(facade.errors$);
        expect(errors).toBeTruthy();
        expect(errors).toBe(INCORRECT_CREDENTIALS_API_ERROR);

        done();
      } catch (err) {
        done.fail(err);
      }
    });

    it('should dispatch logout action on logout()', async (done) => {
      // api logout response ok
     jest.spyOn(authService, 'logout').mockReturnValue(cold('-a', { a: ['ok'] }));
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

        expect(store.dispatch).toHaveBeenCalledWith(new Logout());
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

    describe('signUp()', () => {
      it('should set logged in state when sign up API responds ok', async (done) => {
        // api sign up response ok
       jest.spyOn(authService, 'signUp').mockReturnValue(cold('-a', { a: authTokens }));
        // get current user api ok
       jest.spyOn(authService, 'getAuthUser').mockReturnValue(cold('--a|', { a: authUser }));

        try {
          let tokens = await readFirst(facade.authTokens$);
          let user = await readFirst(facade.authUser$);
          let status = await readFirst(facade.status$);
          let errors = await readFirst(facade.errors$);

          expect(user).toBe(null);
          expect(tokens).toBe(null);
          expect(status).toBe(null);
          expect(errors).toBeFalsy();

          const newAccount = {
            first_name: 'John',
            last_name: 'Doe',
            email: 'john@doe.com',
            password: 'john.123456',
            password_confirmation: 'john.123456',
          };

          await facade.signUp(newAccount);

          expect(store.dispatch).toHaveBeenCalledWith(new SignUp(newAccount));

          getTestScheduler().flush();

          status = await readFirst(facade.status$);
          tokens = await readFirst(facade.authTokens$);
          user = await readFirst(facade.authUser$);
          errors = await readFirst(facade.errors$);

          expect(status).toBe('loggedIn');
          expect(tokens).toBeTruthy();
          expect(user).toBeInstanceOf(User);
          expect(user.id).toBe(authUser.id);
          expect(user.first_name).toBe(authUser.first_name);
          expect(errors).toBeFalsy();

          done();
        } catch (err) {
          done.fail(err);
        }
      });

      it('should set errors in state when sign up API responds error', async (done) => {
        // api sign up response ok
        const apiError: ApiError = {
          message: 'Unprocessable entity',
          ok: false,
          error: {
            message: 'Invalida data!!',
            errors: { email: ['email is invalid'] },
          },
        };
       jest.spyOn(authService, 'signUp').mockReturnValue(cold('-#', {}, apiError));

        try {
          let tokens = await readFirst(facade.authTokens$);
          let user = await readFirst(facade.authUser$);
          let status = await readFirst(facade.status$);
          let errors = await readFirst(facade.errors$);

          expect(user).toBe(null);
          expect(tokens).toBe(null);
          expect(status).toBe(null);
          expect(errors).toBeFalsy();

          const newAccount = {
            first_name: 'John',
            last_name: 'Doe',
            email: 'john@doe.com',
            password: 'john.123456',
            password_confirmation: 'john.123456',
          };

          await facade.signUp(newAccount);

          expect(store.dispatch).toHaveBeenCalledWith(new SignUp(newAccount));

          getTestScheduler().flush();

          status = await readFirst(facade.status$);
          tokens = await readFirst(facade.authTokens$);
          user = await readFirst(facade.authUser$);
          errors = await readFirst(facade.errors$);

          expect(status).toBe('signInError');
          expect(tokens).toBeFalsy();
          expect(user).toBeFalsy();
          expect(errors).toBeTruthy();
          expect(errors).toBe(apiError);

          done();
        } catch (err) {
          done.fail(err);
        }
      });
    });
  });
});
