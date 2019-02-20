import { AuthState, AUTH_FEATURE_KEY } from './auth.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';

const getAuthState = createFeatureSelector<AuthState>(AUTH_FEATURE_KEY);
const getStatus = createSelector(getAuthState, (state: AuthState) => state.status);
const getErrors = createSelector(getAuthState, (state: AuthState) => state.errors);
const getAuthUser = createSelector(getAuthState, (state: AuthState) => state.user);
const getAuthTokens = createSelector(getAuthState, (state: AuthState) => state.tokens);
const getIsLoggedIn = createSelector(getAuthState, (state: AuthState) => tokensAreValid(state));

export const authQuery = {
  getStatus,
  getErrors,
  getAuthUser,
  getAuthTokens,
  getIsLoggedIn,
};

function tokensAreValid(state: AuthState): boolean {
  const now = new Date().getTime();
  let receivedAt = state.tokens_received_at || new Date('1990-01-30 00:00:00');
  receivedAt = typeof receivedAt === 'string' ? new Date(receivedAt) : receivedAt;
  const secondsToExpire = state.tokens ? state.tokens.expires_in : 1;
  const limit = new Date(receivedAt.getTime() + secondsToExpire * 6000).getTime();

  return !!state.tokens && limit > now;
}