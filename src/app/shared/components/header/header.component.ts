import {
  Component,
  OnInit,
  NgZone,
  ElementRef,
  ViewChild,
  Renderer2,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  Inject
} from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { fromEvent, throttleTime, skip, map, filter, Observable } from 'rxjs';
import { ProviderTypeEnum } from 'src/app/core/authentication/models/enums';
import { User } from '../../../core/authentication/models/user.model';
import { getCurrentUser, getAccessToken, login, logout } from '../../../core/authentication/store';
import { METAMASK } from '../../injectors/metamask';
import { Metamask } from '../../models/metamask.model';

@UntilDestroy()
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {
  @ViewChild('nav') private readonly _nav: ElementRef;
  public readonly ProviderTypeEnum = ProviderTypeEnum;
  public user: User;
  readonly token: Observable<string>;
  private _topOffset = 0;

  constructor(
    private readonly _store: Store,
    private readonly _zone: NgZone,
    private readonly _renderer: Renderer2,
    private cdr: ChangeDetectorRef,
    @Inject(METAMASK) private readonly _metamask: Metamask
  ) {
    this.token = _store.select(getAccessToken);
  }

  login(providerType: ProviderTypeEnum): void {
    if (!this._metamask.isAvailable && providerType === ProviderTypeEnum.METAMASK) {
      window.open('https://metamask.io/download/', '_blank');
      return;
    }
    this._store.dispatch(login({ providerType }));
  }

  logout() {
    this._store.dispatch(logout());
  }

  ngOnInit(): void {
    this._store
      .select(getCurrentUser)
      .pipe(untilDestroyed(this))
      .subscribe((user) => {
        this.user = user;
        this.cdr.markForCheck();
      });
    // this._toggleVisibilityOnScroll();
  }

  private _toggleVisibilityOnScroll(): void {
    this._zone.runOutsideAngular(() => {
      fromEvent(document.body, 'scroll')
        .pipe(
          skip(1),
          map(() => document.body.scrollTop),
          filter((topOffset) => {
            const inTopArea = topOffset < 200;
            inTopArea ? this._toggleVisibility(true) : void 0;
            return !inTopArea;
          }),
          throttleTime(100),
          untilDestroyed(this)
        )
        .subscribe((topOffset) => {
          const previousOffset = this._topOffset;
          this._topOffset = topOffset;
          this._toggleVisibility(previousOffset > this._topOffset);
        });
    });
  }

  private _toggleVisibility(show: boolean): void {
    show
      ? this._renderer.removeClass(this._nav?.nativeElement, 'nav-up')
      : this._renderer.addClass(this._nav?.nativeElement, 'nav-up');
  }
}
