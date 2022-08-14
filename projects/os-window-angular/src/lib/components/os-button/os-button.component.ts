import { CssSelector } from '@angular/compiler';
import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  Renderer2,
  SimpleChanges,
  ViewEncapsulation
} from '@angular/core';
import { StyleModel } from "../../models/Style.model";
import { OsConfigService } from "../../services/os-config/os-config.service";
import { theme_list } from "../../themes/theme_list";

//Button Selectors: Normal, Warn, Icon
//Button States: Normal, Pressed, Disabled, Focused

@Component({
  selector: `button[os-button], button[os-icon-button],
              a[os-button], a[os-icon-button]`,
  templateUrl: './os-button.component.html',
  styleUrls: [
    './os-button.component.scss',
    '../../themes/arc/_buttons.scss',
    '../../themes/win98/_buttons.scss'
  ],
  encapsulation: ViewEncapsulation.None
})
export class OsButtonComponent implements OnInit, OnChanges {

  //Stores data from OsThemeComponent
  globalConfigData: StyleModel = {
    theme: "",
    variant: ""
  };

  style: StyleModel = {
    theme: "",
    variant: ""
  }

  buttonColor: string = "";

  constructor(
    public componentElement: ElementRef, 
    public renderer: Renderer2,
    public globalConfigService: OsConfigService
    ) {}


  //////////////////////
  ////    Inputs    ////
  //////////////////////

  //
  //  Component theme  //
  //
  @Input()
  get theme(): string { return this.style.theme; }
  set theme(v: string) { };

  @Input()
  get variant(): string { return this.style.variant; }
  set variant(v: string) { };

  @Input()
  get color(): string { return this.buttonColor }
  set color(v: string) { this.buttonColor = v };

  _src!: string;
  @Input()
  get src(): string { return this._src; }
  set src(v: string) { this._src = v; };

  _imgHeight!: string;
  @Input()
  get imgHeight(): string { return this._imgHeight; }
  set imgHeight(v: string) { this._imgHeight = v; };

  _imgWidth!: string;
  @Input()
  get imgWidth(): string { return this._imgWidth; }
  set imgWidth(v: string) { this._imgWidth = v; };

  

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {

    this.loadStyles(this.style.theme, this.style.variant);

    //Checks if the color is a valid color in the theme palette
    theme_list.forEach(t => {
      if (t.theme == this.style.theme) {

        t.palette.forEach(p => {
          if (this.buttonColor == p) {
            
            this.renderer.addClass(this.componentElement.nativeElement, 
              this.buttonColor + "-os-button");
          }
        })
      }
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes != undefined) {
      if (changes.theme != undefined && changes.variant != undefined ) {
        this.loadStyles(changes.theme.currentValue, changes.variant.currentValue);
      } 
      //Only variant has changed
      else if (changes.variant != undefined ) {
        this.loadStyles(this.style.theme, changes.variant.currentValue);
      } 
    } 
  }

  getStyleStr(): string {
    return `${this.style.theme}-${this.style.variant}-button`;
  }

  loadStyles(_theme: string, _variant: string) {
    if (_theme !== "" && _theme !== undefined && _variant !== "" && _variant !== undefined) {

      //Removes old theme class
      if (this.style.theme !== "" && this.style.theme !== undefined && this.style.variant !== "" && this.style.variant !== undefined) {
        this.renderer.removeClass(this.componentElement.nativeElement, this.getStyleStr());
      }

      this.style.theme = _theme;
      this.style.variant = _variant;

      //Adds theme class
      this.renderer.addClass(this.componentElement.nativeElement, this.getStyleStr());
    } else {

      this.loadGlobalStyles()
    }
  }

  loadGlobalStyles() {
    //Global theme config
    this.globalConfigData = this.globalConfigService.getGlobal();
    this.style = this.globalConfigData;
    this.renderer.addClass(this.componentElement.nativeElement, this.getStyleStr());
  }
}