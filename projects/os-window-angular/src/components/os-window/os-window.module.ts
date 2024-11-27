import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Custom scrollbars
import { NgScrollbarModule } from 'ngx-scrollbar';

//Component
import {
  OsWindowComponent,
  OsWindowContent,
  OsWindowTitle,
} from './os-window.component';

//cdk
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [OsWindowComponent, OsWindowContent, OsWindowTitle],
  imports: [CommonModule, DragDropModule, NgScrollbarModule],
  exports: [OsWindowComponent, OsWindowContent, OsWindowTitle],
})
export class OsWindowModule {}
