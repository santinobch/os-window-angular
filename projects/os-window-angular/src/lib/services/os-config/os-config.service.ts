import { Injectable } from '@angular/core';
import { ProcessModel as InstanceModel } from '../../models/Shared.model';
import { Theme, ThemeDefinition } from '../../models/Theme.model';
import { THEME_LIST } from '../../themes/theme_list';

@Injectable({
  providedIn: 'root',
})
export class OsConfigService {
  constructor() {}

  private globalTheme: Theme = {
    name: 'arc',
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

  getGlobalTheme(): Theme {
    const GLOBAL_THEME = localStorage.getItem('GLOBAL_THEME');

    if (GLOBAL_THEME === null) {
      return this.globalTheme;
    }

    return JSON.parse(GLOBAL_THEME);
  }

  setGlobalTheme(style: Theme) {
    this.globalTheme = style;

    localStorage.setItem('GLOBAL_THEME', JSON.stringify(this.globalTheme));
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

  private userThemeList: ThemeDefinition[] = THEME_LIST;

  addTheme(theme: ThemeDefinition) {
    this.userThemeList.push(theme);

    localStorage.setItem('THEME_LIST', JSON.stringify(this.userThemeList));
  }

  getThemes() {
    const THEME_LIST = localStorage.getItem('THEME_LIST');

    if (THEME_LIST === null) {
      return THEME_LIST;
    }

    return JSON.parse(THEME_LIST);
  }
}
