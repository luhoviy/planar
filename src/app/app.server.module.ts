import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { LocalStorageService } from './shared/services/local-storage.service';
import { LocalStorageMockService } from './shared/services/local-storage-mock.service';

@NgModule({
  imports: [AppModule, ServerModule],
  bootstrap: [AppComponent],
  providers: [
    {
      provide: LocalStorageService,
      useClass: LocalStorageMockService
    }
  ]
})
export class AppServerModule {}
