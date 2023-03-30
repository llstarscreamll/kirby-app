import { User } from '@kirby/users/util';
import { createSelector } from '@ngrx/store';
import { AuthState, AUTH_FEATURE_KEY } from './auth.reducer';

const selectFeature = (state: any) => state[AUTH_FEATURE_KEY];
const getStatus = createSelector(selectFeature, (state: AuthState) => state.status);
const getErrors = createSelector(selectFeature, (state: AuthState) => state.errors);
const getAuthUser = createSelector(selectFeature, (state: AuthState) =>
  state.user ? User.fromJson(state.user) : null
);
const getAuthTokens = createSelector(selectFeature, (state: AuthState) => state.tokens);
const getIsLoggedIn = createSelector(selectFeature, (state: AuthState) => state.status === 'loggedIn');

export const authQuery = {
  getStatus,
  getErrors,
  getAuthUser,
  getAuthTokens,
  getIsLoggedIn,
};
