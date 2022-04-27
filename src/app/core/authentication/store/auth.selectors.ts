import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.state';

const getAuthenticationState = createFeatureSelector<AuthState>('auth');

export const getCurrentUser = createSelector(getAuthenticationState, (state) => (state ? state.user : null));

export const getAccessToken = createSelector(getAuthenticationState, (state) =>
  state ? state.accessToken : null
);

export const isLoggedIn = createSelector(getAccessToken, (accessToken) => !!accessToken);

export const isInitialLoginChecked = createSelector(
  getAuthenticationState,
  (state) => state.initialLoginChecked
);
