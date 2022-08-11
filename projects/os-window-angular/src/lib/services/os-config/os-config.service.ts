import { Injectable } from '@angular/core';
import { SharedModel } from '../../models/Shared.model';
import { StyleModel } from "../../models/Style.model";

@Injectable({
  providedIn: 'root'
})
export class OsConfigService {

  constructor() { }

  private globalStyles: StyleModel = {
    theme: "arc",
    variant: "light"
  };

  private sharedData!: SharedModel[];

  setShared(shared: SharedModel) {
    this.sharedData.push(shared);
  }

  getShared(): SharedModel[] {
    return this.sharedData;
  }

  getGlobal(): StyleModel {
    return this.globalStyles;
  }

  setGlobal(config: StyleModel) {
    this.globalStyles = config;
  }


  private zIndex: number = 1;

  getZIndex(): number {
    return this.zIndex;
  }

  setZIndex(zIndex: number) {
    this.zIndex = zIndex;
  }
}
