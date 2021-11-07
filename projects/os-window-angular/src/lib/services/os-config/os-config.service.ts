import { Injectable } from '@angular/core';
import { OsConfigModel } from "../../models/OsConfig.model";

@Injectable({
  providedIn: 'root'
})
export class OsConfigService {

  constructor() { }

  private _config: OsConfigModel = {
    theme: "arc",
    variant: "light"
  };

  getConfig(): OsConfigModel {
    return this._config;
  }

  setConfig(config: OsConfigModel) {
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
