import { createAction, props } from '@ngrx/store';
import { ProviderTypeEnum } from '../models/enums';
import { AccountAuthData } from '../models/auth.model';

export const LOGIN = 'LOGIN';
export const login = createAction(LOGIN, props<{ providerType: ProviderTypeEnum }>());

export const SAVE_ACCOUNT_DATA = 'SAVE_ACCOUNT_DATA';
export const saveAccountData = createAction(SAVE_ACCOUNT_DATA, props<{ authData: AccountAuthData }>());

export const CLEAR_ACCOUNT_DATA = 'CLEAR_ACCOUNT_DATA';
export const clearAccountData = createAction(CLEAR_ACCOUNT_DATA);

export const LOGOUT = 'LOGOUT';
export const logout = createAction(LOGOUT);
