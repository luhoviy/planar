import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { Observable, switchMap, of, take, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { getCurrentUser, isInitialLoginChecked } from '../store';

@Injectable({
  providedIn: 'root'
})
export class UserDataGuard implements CanActivate, CanLoad {
  constructor(private _store: Store, private _router: Router) {}

  canActivate(): Observable<boolean> {
    return this._store.select(isInitialLoginChecked).pipe(
      tap((res) => console.log('isInitialLoginChecked', res)),
      // filter(Boolean),
      switchMap(() => {
        return this._store.select(getCurrentUser).pipe(
          take(1),
          switchMap((user) => {
            console.log('user', user);
            if (!!user) {
              return of(true);
            }

            this._router.navigateByUrl('/');
            return of(false);
          })
        );
      })
    );
  }

  canLoad(): Observable<boolean> {
    return this.canActivate();
  }
}
