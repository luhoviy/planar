import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'me',
    loadChildren: () => import('./routes/profile/profile.module').then((m) => m.ProfileModule),
    data: { editable: true }
  },
  {
    path: 'test',
    loadChildren: () => import('./routes/profile/profile.module').then((m) => m.ProfileModule),
    data: { editable: false }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
