import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { ProviderTypeEnum } from './core/authentication/models/enums';
import { login, getCurrentUser, getAccessToken, logout } from './core/authentication/store';
import { Observable } from 'rxjs';
import { User } from './core/authentication/models/user.model';
import { IS_METAMASK_AVAILABLE } from './core/wallet-providers/metamask/metamask.instance';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  public readonly ProviderTypeEnum = ProviderTypeEnum;
  user: Observable<User>;
  token: Observable<string>;

  constructor(private _store: Store) {
    this.user = _store.select(getCurrentUser);
    this.token = _store.select(getAccessToken);
  }

  login(providerType: ProviderTypeEnum): void {
    if (!IS_METAMASK_AVAILABLE && providerType === ProviderTypeEnum.METAMASK) {
      window.open('https://metamask.io/download/', '_blank');
      return;
    }
    this._store.dispatch(login({ providerType }));
  }

  logout() {
    this._store.dispatch(logout());
  }
}
