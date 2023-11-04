import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  Renderer2,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';
import { StyleModel } from '../../models/Style.model';
import { OsConfigService } from '../../services/os-config/os-config.service';
import { theme_list } from '../../themes/theme_list';
import { StyleClass } from '../../classes/Style.class';

@Component({
  selector: `os-radio`,
  templateUrl: './os-radio.component.html',
  styleUrls: [
    './os-radio.component.scss',
    '../../themes/win98/components/radio.scss',
    '../../themes/arc/components/radio.scss',
  ],
  encapsulation: ViewEncapsulation.None,
})
export class OsRadioComponent implements OnInit, OnChanges {
  public componentElement!: ElementRef<HTMLElement>;
  private renderer!: Renderer2;
  private globalConfigService!: OsConfigService;
  public styleConfig!: StyleClass;

  constructor(
    private _componentElement: ElementRef,
    private _renderer: Renderer2,
    private _globalConfigService: OsConfigService
  ) {
    this.componentElement = _componentElement;
    this.renderer = _renderer;
    this.globalConfigService = _globalConfigService;

    this.styleConfig = new StyleClass(
      _componentElement,
      _renderer,
      _globalConfigService,
      'radio'
    );
  }

  //////////////////////
  ////    Inputs    ////
  //////////////////////

  //
  //  Component theme  //
  //
  @Input()
  get theme(): string {
    return this.styleConfig.style.theme;
  }
  set theme(v: string) {
    this.styleConfig.style.theme = v;
  }

  @Input()
  get variant(): string {
    return this.styleConfig.style.variant;
  }
  set variant(v: string) {
    this.styleConfig.style.variant = v;
  }

  @Input()
  get color(): string {
    return this.styleConfig.style.color;
  }
  set color(v: string) {
    this.styleConfig.style.color = v;
  }

  /** Where the label should appear */
  private _labelPosition: 'before' | 'after' = 'after';
  public flexDirection: string = 'row';

  @Input()
  set labelPosition(v: 'before' | 'after') {
    this._labelPosition = v;
  }

  private _uniqueId: string = '';
  private _name: string = '';
  private _ariaLabel: string = '';
  private _ariaLabelledby: string = '';
  private _ariaDescribedby: string = '';
  private _checked: boolean = false;
  private _value: any = null;
  private _disabled: boolean = false;
  private _required: boolean = false;

  @Input()
  get id(): string {
    return this._uniqueId;
  }
  set id(v: string) {
    this._uniqueId = v;
  }

  /** Analog to HTML 'name' attribute used to group radios for unique selection. */
  @Input()
  get name(): string {
    return this._name;
  }
  set name(v: string) {
    this._name = v;
  }

  /** Used to set the 'aria-label' attribute on the underlying input element. */
  @Input('aria-label')
  get ariaLabel(): string {
    return this._ariaLabel;
  }
  set ariaLabel(v: string) {
    this._ariaLabel = v;
  }

  /** The 'aria-labelledby' attribute takes precedence as the element's text alternative. */
  @Input('aria-labelledby')
  get ariaLabelledby(): string {
    return this._ariaLabelledby;
  }
  set ariaLabelledby(v: string) {
    this._ariaLabelledby = v;
  }

  /** The 'aria-describedby' attribute is read after the element's label and field type. */
  @Input('aria-describedby')
  get ariaDescribedby(): string {
    return this._ariaDescribedby;
  }
  set ariaDescribedby(v: string) {
    this._ariaDescribedby = v;
  }

  /** Whether this radio button is checked. */
  @Input()
  get checked(): boolean {
    return this._checked;
  }
  set checked(v: BooleanInput) {
    this._checked = coerceBooleanProperty(v);
  }

  /** The value of this radio button. */
  @Input()
  get value(): any {
    return this._value;
  }
  set value(v: any) {
    this._value = v;
  }

  /** Whether the radio button is disabled. */
  @Input()
  get disabled(): boolean {
    return this._disabled;
  }
  set disabled(v: BooleanInput) {
    this._disabled = coerceBooleanProperty(v);
  }

  /** Whether the radio button is required. */
  @Input()
  get required(): boolean {
    return this._required;
  }
  set required(v: BooleanInput) {
    this._required = coerceBooleanProperty(v);
  }

  ngOnInit(): void {
    //This chooses the flex direction of the container

    if (this._labelPosition == 'after') {
      this.flexDirection = 'row';
    } else {
      this.flexDirection = 'row-reverse';
    }
  }

  ngAfterViewInit(): void {
    this.styleConfig.loadStyles();
    this.styleConfig.loadColor();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.styleConfig.onChanges(changes);
  }

  check(input: HTMLInputElement) {
    input.checked = true;
    input.focus();
  }
}
