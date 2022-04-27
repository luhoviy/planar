import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImgLoaderDirective } from './directives/img-loader.directive';

const declarations = [ImgLoaderDirective];

@NgModule({
  declarations: [...declarations],
  imports: [CommonModule],
  exports: [...declarations]
})
export class SharedModule {}
