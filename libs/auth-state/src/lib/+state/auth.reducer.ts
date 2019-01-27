import { AuthAction, AuthActionTypes } from './auth.actions';

/**
 * Interface for the 'Auth' data used in
 *  - AuthState, and
 *  - authReducer
 *
 *  Note: replace if already defined in another module
 */

/* tslint:disable:no-empty-interface */
export interface Entity {
};

export const AUTH_FEATURE_KEY = 'AUTH';

export interface AuthState {
  user: any;
  tokens: any;
  tokens_received_at: Date | null;
  status: 'loggingIn' | 'loggedIn' | 'loginFailed' | 'loginError' | 'loggingOut';
  errors?: any;
};

export interface AuthPartialState {
  readonly [AUTH_FEATURE_KEY]: AuthState;
}

export const initialState: AuthState = {
  user: null,
  status: null,
  tokens: null,
  tokens_received_at: null,
};

export function authReducer(
  state: AuthState = initialState,
  action: AuthAction): AuthState {

  switch (action.type) {
    case AuthActionTypes.LoginWithCredentials: {
      state = { ...state, status: 'loggingIn' };
      break;
    }

    case AuthActionTypes.LoginSuccess: {
      state = { ...state, tokens: action.payload, status: 'loggedIn', tokens_received_at: new Date() };
      break;
    }

    case AuthActionTypes.LoginError: {
      state = { ...state, status: 'loginError', errors: action.payload };
      break;
    }

    case AuthActionTypes.GetAuthUserSuccess: {
      state = { ...state, user: action.payload };
      break;
    }

    case AuthActionTypes.Logout: {
      state = { ...state, status: 'loggingOut' };
      break;
    }

    case AuthActionTypes.LogoutSuccess: {
      state = initialState;
      break;
    }
  }

  return state;
}
