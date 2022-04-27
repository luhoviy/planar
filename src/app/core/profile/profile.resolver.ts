import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, catchError } from 'rxjs';
import { User } from '../authentication/models/user.model';
import { isEmpty } from 'lodash';
import { Store } from '@ngrx/store';
import { UserService } from '../authentication/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileResolver implements Resolve<User> {
  constructor(
    private _router: Router,
    private _store: Store,
    private _userService: UserService,
    @Inject(PLATFORM_ID) private _platformId: Object
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<User> {
    // if (isPlatformBrowser(this._platformId)) {
    //   return of(null);
    // }
    const { isLoggedInUser } = route.data;
    if (isLoggedInUser) {
      return of(null);
    }

    const extractedUser: User = this._router.getCurrentNavigation().extras.state?.user;
    if (!isEmpty(extractedUser)) {
      return of(extractedUser);
    }

    const publicAddress = route.paramMap.get('publicAddress');
    return this._userService.getUser(publicAddress).pipe(
      catchError(() => {
        this._router.navigateByUrl('/');
        return of(null);
      })
    );
  }
}
