import { Injectable } from '@angular/core';
import { osConfigData } from "../../models/OsConfigData.model";

@Injectable({
  providedIn: 'root'
})
export class OsConfigService {

  constructor() { }

  private _config: osConfigData = {
    theme: "arc",
    variant: "light"
  };

  getConfig(): osConfigData {
    return this._config;
  }

  setConfig(config: osConfigData) {
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
