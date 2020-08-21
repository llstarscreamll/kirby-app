import { AuthAction, AuthActionTypes } from './auth.actions';

export const AUTH_FEATURE_KEY = 'AUTH';

export interface AuthState {
  user: any;
  tokens: any;
  tokens_received_at: Date | null;
  status: 'loggingIn' | 'loggedIn' | 'loginFailed' | 'loginError' | 'loggingOut' | 'signingIn' | 'signInError' | null;
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
      state = { ...state, errors: null, status: 'loggingIn' };
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

    case AuthActionTypes.SignUp: {
      state = { ...state, errors: null, status: 'signingIn' };
      break;
    }

    case AuthActionTypes.SignUpError: {
      state = { ...state, status: 'signInError', errors: action.payload };
      break;
    }

    case AuthActionTypes.CleanErrors: {
      state = { ...state, status: 'signInError', errors: null };
      break;
    }
  }

  return state;
}
