import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { User } from '../../core/authentication/models/user.model';
import { Store } from '@ngrx/store';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { getCurrentUser } from '../../core/authentication/store';
import { take } from 'rxjs';

@UntilDestroy()
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent implements OnInit {
  public user: User;
  public isEditable = false;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _title: Title,
    private _store: Store,
    private _router: Router
  ) {}

  public ngOnInit(): void {
    this._getUserData();
  }

  private _getUserData(): void {
    const { isLoggedInUser, user } = this._activatedRoute.snapshot.data;
    const currentUser$ = this._store.select(getCurrentUser).pipe(untilDestroyed(this));
    this.isEditable = !!isLoggedInUser;
    this._title.setTitle(this.isEditable ? 'EDITABLE' : 'NON EDITABLE');
    this.user = user;

    if (!!user) {
      const publicAddress = this._activatedRoute.snapshot.paramMap.get('publicAddress');
      currentUser$
        .pipe(take(1))
        .subscribe((user) => (this.isEditable = user?.publicAddress === publicAddress));
      return;
    }

    currentUser$.subscribe((user) => (this.user = user));
  }
}
