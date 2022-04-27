import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDataGuard } from './core/authentication/guards/user-data.guard';
import { ProfileResolver } from './core/profile/profile.resolver';

const routes: Routes = [
  {
    path: 'me',
    loadChildren: () => import('./routes/profile/profile.module').then((m) => m.ProfileModule),
    data: { isLoggedInUser: true },
    canLoad: [UserDataGuard],
    canActivate: [UserDataGuard],
    resolve: {
      user: ProfileResolver
    }
  },
  {
    path: ':publicAddress',
    loadChildren: () => import('./routes/profile/profile.module').then((m) => m.ProfileModule),
    data: { isLoggedInUser: false },
    resolve: {
      user: ProfileResolver
    }
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabledBlocking'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
