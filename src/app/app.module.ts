import { NgModule } from '@angular/core';
import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppStoreModule } from './store/app-store.module';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { HeaderComponent } from './shared/components/header/header.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { APP_CONFIG, AppConfigFactory } from './shared/injectors/app-config';
import { METAMASK, MetamaskFactory } from './shared/injectors/metamask';

@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserTransferStateModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AppStoreModule,
    HttpClientModule,
    MatButtonModule,
    FlexLayoutModule,
    MatMenuModule,
    MatIconModule
  ],
  providers: [
    {
      provide: APP_CONFIG,
      useFactory: AppConfigFactory
    },
    {
      provide: METAMASK,
      useFactory: MetamaskFactory(true)
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
