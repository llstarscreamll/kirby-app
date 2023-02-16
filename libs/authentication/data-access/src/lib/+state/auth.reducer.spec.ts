import { INCORRECT_CREDENTIALS_API_ERROR } from '../testing';
import { AuthState, initialState, authReducer } from './auth.reducer';
import { LoginSuccess, LoginError, LogoutSuccess } from './auth.actions';
import { AUTH_TOKENS_MOCK } from '@kirby/authentication/utils';

describe('Auth Reducer', () => {
  const getAuthId = (it) => it['id'];
  let createAuth;

  beforeEach(() => {
    createAuth = (id: string, name = '') => ({
      id,
      name: name || `name-${id}`,
    });
  });

  describe('valid Auth actions ', () => {
    it('should set auth tokens on LoginSuccess action', () => {
      const tokens = AUTH_TOKENS_MOCK;

      const action = LoginSuccess({ payload: tokens });
      const result: AuthState = authReducer(initialState, action);

      expect(result.status).toBe('loggedIn');
      expect(result.tokens).toBeTruthy();
      expect(result.user).toBeFalsy();
    });

    it('should set errors on LoginError action', () => {
      const errors = INCORRECT_CREDENTIALS_API_ERROR;

      const action = LoginError({ payload: errors });
      const result: AuthState = authReducer(initialState, action);

      expect(result.status).toBe('loginError');
      expect(result.tokens).toBe(null);
      expect(result.user).toBe(null);
      expect(result.errors).toBeTruthy();
    });

    it('should set all to null on LogoutSuccess action', () => {
      const action = LogoutSuccess();
      const result: AuthState = authReducer(initialState, action);

      expect(result.status).toBeFalsy();
      expect(result.tokens).toBeFalsy();
      expect(result.user).toBeFalsy();
      expect(result.errors).toBeFalsy();
    });
  });

  describe('unknown action', () => {
    it('should return the initial state', () => {
      const action = {} as any;
      const result = authReducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
