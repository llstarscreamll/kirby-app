import { createFeatureSelector, createSelector } from '@ngrx/store';

import { User } from '@kirby/users/util';

import { AuthState, AUTH_FEATURE_KEY } from './auth.reducer';

const getAuthState = createFeatureSelector<AuthState>(AUTH_FEATURE_KEY);
const getStatus = createSelector(getAuthState, (state: AuthState) => state.status);
const getErrors = createSelector(getAuthState, (state: AuthState) => state.errors);
const getAuthUser = createSelector(getAuthState, (state: AuthState) => (state.user ? User.fromJson(state.user) : null));
const getAuthTokens = createSelector(getAuthState, (state: AuthState) => state.tokens);
const getIsLoggedIn = createSelector(getAuthState, (state: AuthState) => state.status === 'loggedIn');

export const authQuery = {
  getStatus,
  getErrors,
  getAuthUser,
  getAuthTokens,
  getIsLoggedIn,
};
