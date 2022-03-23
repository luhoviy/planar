import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RootStoreConfig, StoreModule } from '@ngrx/store';
import { environment } from '../../environments/environment';
import { appReducers, AppState, metaReducers } from './app.reducers';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

const NgrxConfig: RootStoreConfig<AppState> = {
  runtimeChecks: {
    strictStateImmutability: true,
    strictActionImmutability: true
  }
};

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forRoot(appReducers, {
      metaReducers,
      ...NgrxConfig
    }),
    EffectsModule.forRoot(),
    !environment.production ? StoreDevtoolsModule.instrument({ maxAge: 25 }) : []
  ]
})
export class AppStoreModule {}
