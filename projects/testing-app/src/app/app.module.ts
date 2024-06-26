import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {
  OsWindowModule,
  OsButtonModule,
  OsRadioModule,
} from '@santinobch/os-window-angular';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    OsWindowModule,
    OsButtonModule,
    OsRadioModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
