import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { ProfileBackgroundComponent } from '../../core/profile/profile-background/profile-background.component';
import { SharedModule } from '../../shared/shared.module';
import { ProfileDetailsComponent } from '../../core/profile/profile-details/profile-details.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [ProfileComponent, ProfileBackgroundComponent, ProfileDetailsComponent],
  imports: [CommonModule, ProfileRoutingModule, SharedModule, MatIconModule]
})
export class ProfileModule {}
