import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { TransferState, makeStateKey } from '@angular/platform-browser';
import { Observable, of, tap } from 'rxjs';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';

interface TransferConfig<T> {
  stateKey: string;
  request: Observable<T>;
  removeFromStateOnClientSide?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class TransferStateService {
  constructor(private _state: TransferState, @Inject(PLATFORM_ID) private _platformId: Object) {}

  public transferableHttpRequest<T>(config: TransferConfig<T>): Observable<T> {
    const stateKey = makeStateKey<T>(config.stateKey);
    console.log(stateKey);
    const stateValue: T = this._state.get(stateKey, null);

    if (!!stateValue) {
      console.log('stateValue', stateValue);
      if (isPlatformBrowser(this._platformId)) {
        // this._state.remove(stateKey);
      }
      return of(stateValue);
    }

    return config.request.pipe(
      tap((response: T) => {
        // if (isPlatformServer(this._platformId)) {
        console.log('isPlatformServer', isPlatformServer(this._platformId));
        this._state.set(stateKey, response);
        // }
      })
    );
  }
}
