import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  Observable,
  of,
  throwError,
  switchMap,
  from,
  catchError,
  map,
  merge,
  withLatestFrom,
  take
} from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { MetamaskError } from '../models';
import { transformMetamaskErrorMessage } from '../metamask.utils';
import { UserService } from '../../../authentication/services/user.service';
import { AccountAuthData } from '../../../authentication/models/auth.model';
import { isEmpty } from 'lodash';
import { User } from '../../../authentication/models/user.model';
import { Store } from '@ngrx/store';
import { getCurrentUser } from '../../../authentication/store';
import { METAMASK } from '../../../../shared/injectors/metamask';
import { Metamask } from '../../../../shared/models/metamask.model';

interface SignedNonceDTO {
  publicAddress: string;
  signature: string;
}

@Injectable({
  providedIn: 'root'
})
export class MetamaskAuthService {
  private readonly _apiBaseUrl = environment.API_BASE_URL;

  constructor(
    private readonly _http: HttpClient,
    private readonly _userService: UserService,
    private readonly _store: Store,
    @Inject(METAMASK) private readonly _metamask: Metamask
  ) {}

  // getters & setters

  public get metamaskAccountChanged$(): Observable<string> {
    if (!this._metamask.isAvailable) {
      return of(null).pipe(take(1));
    }

    const initialAccount$ = from(this._metamask.instance.getCoinbase());
    const accountChanged$ = new Observable<string>((sub) => {
      window.ethereum.on('accountsChanged', (accounts: string[]) => {
        sub.next(isEmpty(accounts) ? null : accounts[0]);
      });
    });
    return merge(initialAccount$, accountChanged$).pipe(
      map((address: string) => {
        return address?.toLowerCase();
      })
    );
  }

  // methods

  public signIn(): Observable<AccountAuthData> {
    return this._requestMetamaskAccount().pipe(
      withLatestFrom(this._store.select(getCurrentUser)),
      switchMap(([publicAddress, localUser]) => {
        const user$: Observable<User> =
          !isEmpty(localUser) && localUser.publicAddress === publicAddress
            ? of(localUser)
            : this._userService.findOrCreateUser(publicAddress);

        return user$.pipe(
          switchMap((user) =>
            this._createSignature(user).pipe(
              switchMap((signedNonce) =>
                this._login(signedNonce).pipe(
                  map((accessToken) => ({
                    user,
                    accessToken
                  }))
                )
              )
            )
          )
        );
      }),
      catchError((err: MetamaskError) => throwError(() => new Error(transformMetamaskErrorMessage(err))))
    );
  }

  private _requestMetamaskAccount(): Observable<string> {
    return from(this._metamask.instance.requestAccounts()).pipe(
      switchMap((accounts: string[]) => {
        if (!accounts.length) {
          return throwError(() => new Error('No MetaMask accounts found.'));
        }
        return of(accounts[0].toLowerCase());
      })
    );
  }

  private _createSignature(user: User): Observable<SignedNonceDTO> {
    const signMessage = 'Welcome to Planar!\n\n Press "Sign" to sign in\n\nNonce:\n' + user.nonce;
    return from(this._metamask.instance.personal.sign(signMessage, user.publicAddress, null)).pipe(
      map((signature: string) => {
        return {
          signature,
          publicAddress: user.publicAddress
        };
      })
    );
  }

  private _login(signedNonce: SignedNonceDTO): Observable<string> {
    return this._http
      .post<{ prefixedToken: string }>(`${this._apiBaseUrl}/auth/sign/in`, signedNonce)
      .pipe(map((res) => res.prefixedToken.replace('Bearer', '').trim()));
  }
}
