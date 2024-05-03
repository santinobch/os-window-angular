import { Injectable } from '@angular/core';
import { SharedModel } from '../../models/Shared.model';
import { SimpleStyleModel } from '../../models/Style.model';

@Injectable({
  providedIn: 'root',
})
export class OsConfigService {
  constructor() {}

  private globalStyles: SimpleStyleModel = {
    theme: 'arc',
    variant: 'light',
  };

  private sharedData!: SharedModel[];

  // This stores windows information (id and styles)
  setShared(shared: SharedModel) {
    this.sharedData.push(shared);
  }

  getShared(): SharedModel[] {
    return this.sharedData;
  }

  getGlobalStyles(): SimpleStyleModel {
    return this.globalStyles;
  }

  setGlobalStyles(config: SimpleStyleModel) {
    this.globalStyles = config;
  }

  // This shares the last zIndex value used
  private zIndex: number = 1;

  getZIndex(): number {
    return this.zIndex;
  }

  setZIndex(zIndex: number) {
    this.zIndex = zIndex;
  }
}
