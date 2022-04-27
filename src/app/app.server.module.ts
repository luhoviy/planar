import { NgModule } from '@angular/core';
import { ServerModule, INITIAL_CONFIG, ServerTransferStateModule } from '@angular/platform-server';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { LocalStorageService } from './shared/services/local-storage.service';
import { LocalStorageMockService } from './shared/services/local-storage-mock.service';
import { METAMASK, MetamaskFactory } from './shared/injectors/metamask';
import { FlexLayoutServerModule } from '@angular/flex-layout/server';
import { environment } from '../environments/environment';

@NgModule({
  imports: [AppModule, ServerModule, ServerTransferStateModule, FlexLayoutServerModule],
  bootstrap: [AppComponent],
  providers: [
    {
      provide: INITIAL_CONFIG,
      useValue: { useAbsoluteUrl: true, baseUrl: environment.API_URL }
    },
    {
      provide: LocalStorageService,
      useClass: LocalStorageMockService
    },
    {
      provide: METAMASK,
      useFactory: MetamaskFactory(false)
    }
  ]
})
export class AppServerModule {}
