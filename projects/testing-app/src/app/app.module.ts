import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//import { OsWindowComponent, OsWindowContent } from "os-window-angular";
import { OsWindowModule, OsConfigModule } from 'os-window-angular';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    OsWindowModule,
    OsConfigModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
