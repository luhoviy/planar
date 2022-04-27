import { Action, createReducer, on } from '@ngrx/store';
import { AuthState, initialState } from './auth.state';
import * as AuthActions from './auth.actions';

const reducer = createReducer(
  initialState,
  on(AuthActions.saveAccountData, (state, { authData }) => {
    return {
      ...state,
      ...authData,
      initialLoginChecked: true
    };
  }),
  on(AuthActions.clearAccountData, (state) => {
    return {
      ...state,
      user: null,
      accessToken: null,
      initialLoginChecked: true
    };
  })
);

export const authReducerFactory = (state: AuthState | undefined, action: Action) => reducer(state, action);
