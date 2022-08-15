import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
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


@Component({
  selector: `os-radio`,
  templateUrl: './os-radio.component.html',
  styleUrls: [
    './os-radio.component.scss'
  ],
  encapsulation: ViewEncapsulation.None
})
export class OsRadioComponent implements OnInit, OnChanges {

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

  _uniqueId: string = "";
  _name: string = "";
  _ariaLabel: string = "";
  _ariaLabelledby: string = "";
  _ariaDescribedby: string = "";
  _checked: boolean = false;
  _value: any = null;
  private _labelPosition: 'before' | 'after' = 'after';

  
  @Input() 
  get id(): string { return this._uniqueId }
  set id(v: string) { this._uniqueId = v };

  /** Analog to HTML 'name' attribute used to group radios for unique selection. */
  @Input()
  get name(): string { return this._name }
  set name(v: string) { this._name = v };

  /** Used to set the 'aria-label' attribute on the underlying input element. */
  @Input('aria-label')
  get ariaLabel(): string { return this._ariaLabel }
  set ariaLabel(v: string) { this._ariaLabel = v };

  /** The 'aria-labelledby' attribute takes precedence as the element's text alternative. */
  @Input('aria-labelledby')
  get ariaLabelledby(): string { return this._ariaLabelledby }
  set ariaLabelledby(v: string) { this._ariaLabelledby = v };

  /** The 'aria-describedby' attribute is read after the element's label and field type. */
  @Input('aria-describedby')
  get ariaDescribedby(): string { return this._ariaDescribedby }
  set ariaDescribedby(v: string) { this._ariaDescribedby = v };

  /** Whether this radio button is checked. */
  @Input()
  get checked(): boolean { return this._checked; }
  set checked(v: BooleanInput) { this._checked = coerceBooleanProperty(v); }

  /** The value of this radio button. */
  @Input()
  get value(): any { return this._value; }
  set value(v: any) { this._value = v; }

  /** Whether the label should appear after or before the radio button. Defaults to 'after' */
  @Input()
  get labelPosition(): 'before' | 'after' { return this._labelPosition; }
  set labelPosition(v) { this._labelPosition = v === 'before' ? 'before' : 'after'; }
  

  /** Whether the radio button is disabled. */
  @Input()
  get disabled(): boolean {
  }
  set disabled(value: BooleanInput) {
  }

  /** Whether the radio button is required. */
  @Input()
  get required(): boolean {
  }
  set required(value: BooleanInput) {
  }


  ngOnInit(): void {
  }

  ngAfterViewInit(): void {

    this.renderer.setAttribute(this.componentElement, "type", "radio");

    this.loadStyles(this.style.theme, this.style.variant);

    //Checks if the color is a valid color in the theme palette
    theme_list.forEach(t => {
      if (t.theme == this.style.theme) {

        t.palette.forEach(p => {
          if (this.buttonColor == p) {
            
            this.renderer.addClass(this.componentElement.nativeElement, 
              this.buttonColor + "-os-radio");
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
    return `${this.style.theme}-${this.style.variant}-radio`;
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