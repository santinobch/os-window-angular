import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//import { OsWindowModule, OsConfigModule, OsButtonModule } from "@santinobch/os-window-angular";
import { OsWindowModule, OsConfigModule, OsButtonModule, OsRadioModule } from '../../../os-window-angular/src/public-api';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    OsWindowModule,
    OsConfigModule,
    OsButtonModule,
    OsRadioModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
