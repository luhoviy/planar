import { ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store';
import { storeLogger } from 'ngrx-store-logger';
import { environment } from '../../environments/environment';

export interface AppState {}

export const appReducers: ActionReducerMap<AppState> = {};

const logger = (reducer: ActionReducer<AppState>): ActionReducer<AppState> => storeLogger()(reducer);
export const metaReducers: MetaReducer<AppState>[] = environment.production ? [] : [logger];
