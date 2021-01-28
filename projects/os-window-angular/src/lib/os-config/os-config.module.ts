import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OsConfigDirective } from './os-config.directive';



@NgModule({
  declarations: [OsConfigDirective],
  imports: [
    CommonModule
  ],
  exports: [
    OsConfigDirective
  ]
})
export class OsConfigModule { }
