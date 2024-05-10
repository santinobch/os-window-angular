import { ElementRef, Renderer2, SimpleChanges } from '@angular/core';
import { OsConfigService } from '../services/os-config/os-config.service';
import { THEME_LIST } from '../themes/theme_list';
import { Theme } from '../models/Theme.model';

export class StyleClass {
  private componentElement!: ElementRef;
  private renderer!: Renderer2;
  private globalConfigService!: OsConfigService;
  private componentName!: string;

  constructor(
    private _componentElement: ElementRef,
    private _renderer: Renderer2,
    private _globalConfigService: OsConfigService,
    private _componentName: string
  ) {
    this.componentElement = _componentElement;
    this.renderer = _renderer;
    this.globalConfigService = _globalConfigService;
    this.componentName = _componentName;
  }

  private globalConfigData: Theme = {
    name: '',
    variant: '',
  };

  public style: Theme = {
    name: '',
    variant: '',
    color: '',
  };

  private previousStyle: Theme = {
    name: '',
    variant: '',
    color: '',
  };

  private isValidStyle(): boolean {
    if (
      this.style.name !== '' &&
      this.style.name !== undefined &&
      this.style.variant !== '' &&
      this.style.variant !== undefined
    ) {
      for (const i of this.globalConfigService.getThemes()) {
        if (i.name == this.style.name) {
          for (const v of i.variants) {
            if (v == this.style.variant) {
              return true;
            }
          }
          console.error(
            'Invalid variant at ' +
              this.componentName +
              ' component: ' +
              this.style.variant
          );
          return false;
        }
      }
      console.error(
        'Invalid Theme at ' +
          this.componentName +
          ' component: ' +
          this.style.name
      );
      return false;
    }
    return false;
  }

  private isValidColor(): boolean {
    if (
      this.style.name !== '' &&
      this.style.name !== undefined &&
      this.style.color !== '' &&
      this.style.color !== undefined
    ) {
      for (const i of this.globalConfigService.getThemes()) {
        if (i.name == this.style.name) {
          for (const p of i.palette) {
            if (p == this.style.color) {
              return true;
            }
          }
          console.error(
            'Invalid color at ' +
              this.componentName +
              ' component: ' +
              this.style.color
          );
          return false;
        }
      }
      console.error(
        'Invalid Theme at ' +
          this.componentName +
          ' component: ' +
          this.style.name
      );
      return false;
    }
    return false;
  }

  private getStyle(): string {
    return (
      this.style.name + '-' + this.style.variant + '-os-' + this.componentName
    );
  }

  private getPreviousStyle(): string {
    return (
      this.previousStyle.name +
      '-' +
      this.previousStyle.variant +
      '-os-' +
      this.componentName
    );
  }

  private getColor() {
    return this.style.color + '-os-' + this.componentName;
  }

  private getPreviousColor() {
    return this.previousStyle.color + '-os-' + this.componentName;
  }

  public loadGlobalStyles() {
    //Global theme config
    this.globalConfigData = this.globalConfigService.getGlobalTheme();
    this.style.name = this.globalConfigData.name;
    this.style.variant = this.globalConfigData.variant;
    this.renderer.addClass(
      this.componentElement.nativeElement,
      this.getStyle()
    );
  }

  public loadStyles() {
    if (this.isValidStyle()) {
      //Removes old theme class
      if (
        this.previousStyle.name !== '' &&
        this.previousStyle.name !== undefined &&
        this.previousStyle.variant !== '' &&
        this.previousStyle.variant !== undefined
      ) {
        this.renderer.removeClass(
          this.componentElement.nativeElement,
          this.getPreviousStyle()
        );
      }

      this.previousStyle.name = this.style.name;
      this.previousStyle.variant = this.style.variant;

      //Adds theme class
      this.renderer.addClass(
        this.componentElement.nativeElement,
        this.getStyle()
      );
    } else {
      this.loadGlobalStyles();
    }
  }

  public loadColor() {
    if (this.isValidColor()) {
      if (
        this.previousStyle.color !== '' &&
        this.previousStyle.color !== undefined
      ) {
        this.renderer.removeClass(
          this.componentElement.nativeElement,
          this.getPreviousColor()
        );
      }
      this.previousStyle.color = this.style.color;

      this.renderer.addClass(
        this.componentElement.nativeElement,
        this.getColor()
      );
    }
  }

  public onChanges(changes: SimpleChanges) {
    if (changes != undefined) {
      if (changes['theme'] != undefined) {
        this.style.name = changes['theme'].currentValue;
      }
      if (changes.variant != undefined) {
        this.style.variant = changes['variant'].currentValue;
      }

      if (changes['theme'] != undefined || changes['variant'] != undefined) {
        this.loadStyles();
      }

      if (changes['color'] != undefined) {
        this.loadColor();
      }
    }
  }
}
