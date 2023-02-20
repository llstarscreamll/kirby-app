import { createReducer, on } from '@ngrx/store';

import * as actions from './auth.actions';

export const AUTH_FEATURE_KEY = 'AUTH';

export interface AuthState {
  user: any;
  tokens: any;
  tokens_received_at: Date | null;
  status: 'loggingIn' | 'loggedIn' | 'loginFailed' | 'loginError' | 'loggingOut' | 'signingIn' | 'signInError';
  errors?: any;
}

export interface AuthPartialState {
  readonly [AUTH_FEATURE_KEY]: AuthState;
}

export const initialState: AuthState = {
  user: null,
  status: null,
  tokens: null,
  tokens_received_at: null,
};

export const authReducer = createReducer(
  initialState,
  on(actions.LoginWithCredentials, (state) => ({ ...state, errors: null, status: 'loggingIn' })),
  on(actions.LoginSuccess, (state, action) => ({
    ...state,
    tokens: action.payload,
    status: 'loggedIn',
    tokens_received_at: new Date(),
  })),
  on(actions.LoginError, (state, action) => ({ ...state, status: 'loginError', errors: action.payload })),
  on(actions.GetAuthUserSuccess, (state, action) => ({ ...state, user: action.payload, status: 'loggedIn' })),
  on(actions.Logout, (state) => ({ ...state, status: 'loggingOut' })),
  on(actions.LogoutSuccess, (state) => initialState),
  on(actions.SignUp, (state) => ({ ...state, errors: null, status: 'signingIn' })),
  on(actions.SignUpError, (state, action) => ({ ...state, status: 'signInError', errors: action.payload })),
  on(actions.CleanErrors, (state) => ({ ...state, status: 'signInError', errors: null }))
);
