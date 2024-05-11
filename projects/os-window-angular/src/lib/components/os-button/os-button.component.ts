import { CssSelector } from '@angular/compiler';
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
import { OsConfigService } from '../../services/os-config/os-config.service';
import { StyleClass } from '../../classes/Style.class';

@Component({
  selector: `button[os-button], button[os-icon-button],
              a[os-button], a[os-icon-button]`,
  templateUrl: './os-button.component.html',
  styleUrls: [
    './os-button.component.scss',
    '../../themes/arc/components/buttons.scss',
    '../../themes/win98/components/buttons.scss',
  ],
  encapsulation: ViewEncapsulation.None,
})
export class OsButtonComponent implements OnInit, OnChanges {
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
      'button'
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
    return this.styleConfig.style.name;
  }
  set theme(v: string) {
    this.styleConfig.style.name = v;
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
    return this.styleConfig.style.color || '';
  }
  set color(v: string) {
    this.styleConfig.style.color = v;
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.styleConfig.loadStyles();
    this.styleConfig.loadColor();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.styleConfig.onChanges(changes);
  }
}
