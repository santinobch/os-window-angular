import { Injectable } from '@angular/core';
import { ProcessModel as InstanceModel } from '../../models/Shared.model';
import { SimpleStyleModel } from '../../models/Style.model';
import { OsTheme } from '../../models/Theme.model';
import { THEME_LIST } from '../../themes/theme_list';

@Injectable({
  providedIn: 'root',
})
export class OsConfigService {
  constructor() {}

  private globalStyles: SimpleStyleModel = {
    theme: 'arc',
    variant: 'light',
  };

  private instances!: InstanceModel[];

  // This stores windows information (id and styles)
  getInstances(): InstanceModel[] {
    return this.instances;
  }

  setInstances(shared: InstanceModel) {
    this.instances.push(shared);
  }

  getGlobalStyles(): SimpleStyleModel {
    return this.globalStyles;
  }

  setGlobalStyles(config: SimpleStyleModel) {
    this.globalStyles = config;
  }

  private zIndex: number = 1;

  /**
   * Returns last zIndex value
   *
   * When a window is focused, it's zIndex value changes,
   * making it appear in front of the other windows
   */
  getZIndex(): number {
    return this.zIndex;
  }

  /**
   * Sets last zIndex value
   *
   * When a window is focused, it's zIndex value changes,
   * making it appear in front of the other windows
   */
  setZIndex(zIndex: number) {
    this.zIndex = zIndex;
  }

  private USER_THEME_LIST: OsTheme[] = THEME_LIST;

  addTheme(theme: OsTheme) {
    this.USER_THEME_LIST.push(theme);

    localStorage.setItem(
      'USER_THEME_LIST',
      JSON.stringify(this.USER_THEME_LIST)
    );
  }

  getThemes() {
    const USER_THEME_LIST = localStorage.getItem('USER_THEME_LIST');

    if (USER_THEME_LIST === null) {
      return THEME_LIST;
    }

    return JSON.parse(USER_THEME_LIST);
  }
}
