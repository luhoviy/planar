import { Injectable } from '@angular/core';
import { User, BaseUser } from '../models/user.model';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Authority } from '../models/enums';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly _apiBaseUrl = environment.API_BASE_URL;

  constructor(private readonly _http: HttpClient) {}

  public registerAccount(publicAddress: string): Observable<User> {
    const user: BaseUser = {
      publicAddress,
      authority: Authority.USER,
      username: `User_${publicAddress}`
    };
    const formData = new FormData();
    formData.append('user', JSON.stringify(user));
    return this._http.post<User>(`${this._apiBaseUrl}/auth/sign/up`, formData);
  }

  public getUser(publicAddress: string): Observable<User> {
    return this._http.get<User>(`${this._apiBaseUrl}/user/${publicAddress}`);
  }

  public findOrCreateUser(publicAddress: string): Observable<User> {
    return this.getUser(publicAddress).pipe(
      catchError((err) => {
        if (err.status === 404) {
          // user is not registered
          return this.registerAccount(publicAddress);
        }
        return throwError(() => err);
      })
    );
  }
}
