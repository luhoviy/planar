import { Injectable, Inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import * as AuthActions from './auth.actions';
import { clearAccountData, saveAccountData } from './auth.actions';
import { switchMap, take, tap, finalize, filter, map, withLatestFrom, of, catchError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { MetamaskAuthService } from '../../wallet-providers/metamask/services/metamask-auth.service';
import { LocalStorageService } from '../../../shared/services/local-storage.service';
import { getCurrentUser } from './auth.selectors';
import { UserService } from '../services/user.service';
import { METAMASK } from '../../../shared/injectors/metamask';
import { Metamask } from '../../../shared/models/metamask.model';
import { isNil, isEqual } from 'lodash';
import { AccountAuthData } from '../models/auth.model';

@Injectable()
export class AuthEffects {
  private _manuallySignedOut: boolean;
  private _isProcessingLogin = false;

  constructor(
    private _actions$: Actions,
    private _store: Store,
    private _authService: AuthService,
    private _metamask: MetamaskAuthService,
    private _localStorageService: LocalStorageService,
    private _userService: UserService,
    @Inject(METAMASK) metamask: Metamask
  ) {
    this._manuallySignedOut = !!_localStorageService.getItem('manuallySignedOut');
  }

  login$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(AuthActions.login),
        tap(() => (this._isProcessingLogin = true)),
        switchMap(({ providerType }) =>
          this._authService.login(providerType).pipe(
            take(1),
            tap((authData) => {
              this._store.dispatch(AuthActions.saveAccountData({ authData }));
              this._localStorageService.setItem(authData.user.publicAddress, authData);
              this._localStorageService.removeItem('manuallySignedOut');
              this._manuallySignedOut = false;
            }),
            finalize(() => (this._isProcessingLogin = false))
          )
        )
      ),
    { dispatch: false }
  );

  logout$ = createEffect(() =>
    this._actions$.pipe(
      ofType(AuthActions.logout),
      withLatestFrom(this._store.select(getCurrentUser)),
      map(([_, user]) => user),
      filter((user) => !!user),
      tap((user) => {
        this._localStorageService.removeItem(user.publicAddress);
        this._localStorageService.setItem('manuallySignedOut', true);
        this._manuallySignedOut = true;
      }),
      map(() => AuthActions.clearAccountData())
    )
  );

  MetaMaskAccountChanged$ = createEffect(() =>
    this._metamask.metamaskAccountChanged$.pipe(
      filter(() => !this._isProcessingLogin && !this._manuallySignedOut),
      switchMap((publicAddress) => {
        if (isNil(publicAddress)) {
          return of(clearAccountData());
        }

        const localUserData = this._localStorageService.getItem<AccountAuthData>(publicAddress);
        if (!isNil(localUserData)) {
          return of(saveAccountData({ authData: localUserData })).pipe(
            tap(() => {
              this._userService
                .getUser(publicAddress)
                .pipe(take(1))
                .subscribe((user) => {
                  if (!isEqual(user, localUserData.user)) {
                    const authData: AccountAuthData = {
                      ...localUserData,
                      user
                    };
                    this._store.dispatch(saveAccountData({ authData }));
                    this._localStorageService.setItem(user.publicAddress, authData);
                  }
                });
            })
          );
        }

        return this._userService.findOrCreateUser(publicAddress).pipe(
          map((user) => {
            const authData: AccountAuthData = {
              user,
              accessToken: null
            };
            this._localStorageService.setItem(user.publicAddress, authData);
            return saveAccountData({ authData });
          })
        );
      }),
      catchError(() => of(clearAccountData()))
    )
  );
}
