import { Injectable } from '@angular/core';
import { ProviderTypeEnum } from '../models/enums';
import { MetamaskAuthService } from '../../wallet-providers/metamask/services/metamask-auth.service';
import { Observable, throwError } from 'rxjs';
import { AccountAuthData } from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private readonly _metamask: MetamaskAuthService) {}

  public login(providerType: ProviderTypeEnum): Observable<AccountAuthData> {
    switch (providerType) {
      case ProviderTypeEnum.METAMASK:
        return this._metamask.signIn();
      default:
        return throwError(() => new Error('Invalid ProviderType.'));
    }
  }
}
