import { Injectable } from '@angular/core';
import { StyleModel } from "../../models/Style.model";

@Injectable({
  providedIn: 'root'
})
export class OsConfigService {

  constructor() { }

  private _config: StyleModel = {
    theme: "arc",
    variant: "light"
  };

  getConfig(): StyleModel {
    return this._config;
  }

  setConfig(config: StyleModel) {
    this._config = config;
  }


  private _zIndex: number = 1;

  getZIndex(): number {
    return this._zIndex;
  }

  setZIndex(zIndex: number) {
    this._zIndex = zIndex;
  }
}
