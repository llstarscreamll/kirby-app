import { authQuery } from './auth.selectors';
import { AUTH_FEATURE_KEY } from './auth.reducer';
import { AUTH_TOKENS_MOCK } from '@llstarscreamll/authentication/utils';
import { USER, INCORRECT_CREDENTIALS_API_ERROR } from '../utils/mocks';

describe('Auth Selectors', () => {
  let storeState;

  beforeEach(() => {
    storeState = {
      [AUTH_FEATURE_KEY]: {
        tokens: AUTH_TOKENS_MOCK,
        user: USER,
        errors: INCORRECT_CREDENTIALS_API_ERROR,
        status: 'loggedIn',
        tokens_received_at: new Date()
      }
    };
  });

  describe('Auth Selectors', () => {

    it('getAuthUser() should return the authenticated user', () => {
      const result = authQuery.getAuthUser(storeState);

      expect(result).toBe(USER);
    });

    it('getStatus() should return the current auth status', () => {
      const result = authQuery.getStatus(storeState);

      expect(result).toBe('loggedIn');
    });

    it('getErrors() should return the current auth \'errors\' storeState', () => {
      const result = authQuery.getErrors(storeState);

      expect(result).toBe(INCORRECT_CREDENTIALS_API_ERROR);
    });

    it('getIsLoggedIn() should return true if there are access tokens', () => {
      const result = authQuery.getIsLoggedIn(storeState);

      expect(result).toBe(true);
    });

    it('getIsLoggedIn() should return false if there aren\'t access tokens', () => {
      const result = authQuery.getIsLoggedIn({ ...storeState, ...{ [AUTH_FEATURE_KEY]: { tokens: null } } });

      expect(result).toBe(false);
    });

    it('getIsLoggedIn() should return false if auth token is expired', () => {
      const result = authQuery.getIsLoggedIn({
        ...storeState, ...{
          [AUTH_FEATURE_KEY]: {
            tokens: AUTH_TOKENS_MOCK,
            tokens_received_at: new Date('2000-01-30 10:00:00')
          }
        }
      });

      expect(result).toBe(false);
    });

  });
});
