import { Component, Inject, Input, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { isEmpty } from 'lodash';
import { APP_CONFIG } from '../../../shared/injectors/app-config';
import { AppConfig } from '../../../shared/models/app-config.model';

@Component({
  selector: 'app-profile-background',
  templateUrl: './profile-background.component.html',
  styleUrls: ['./profile-background.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileBackgroundComponent {
  @Input() set profileBgUrl(path: string) {
    this.path = isEmpty(path) ? this._defaultPath : path;
    this.cdr.detectChanges();
  }

  public path: string;

  private _defaultPath = `${this._appConfig.STATIC_IMAGES_URL}/profile-bg.png`;

  constructor(@Inject(APP_CONFIG) private readonly _appConfig: AppConfig, private cdr: ChangeDetectorRef) {
    this.path = this._defaultPath;
  }
}
