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
import { StyleClass } from '../../classes/Style.class';

@Component({
  selector: `button[os-button], button[os-icon-button],
              a[os-button], a[os-icon-button]`,
  templateUrl: './os-button.component.html',
  styleUrls: [
    './os-button.component.scss',
    '../../themes/arc/components/buttons.scss',
    '../../themes/win98/components/buttons.scss'
  ],
  encapsulation: ViewEncapsulation.None
})
export class OsButtonComponent implements OnInit, OnChanges {

  constructor(
    public componentElement: ElementRef, 
    public renderer: Renderer2,
    public globalConfigService: OsConfigService
    ) {}

  styleConfig: StyleClass = new StyleClass(this.componentElement, this.renderer, this.globalConfigService, "button");

  //////////////////////
  ////    Inputs    ////
  //////////////////////

  //
  //  Component theme  //
  //
  @Input()
  get theme(): string { return this.styleConfig.style.theme; }
  set theme(v: string) { this.styleConfig.style.theme = v  };

  @Input()
  get variant(): string { return this.styleConfig.style.variant; }
  set variant(v: string) { this.styleConfig.style.variant = v };

  @Input()
  get color(): string { return this.styleConfig.style.color }
  set color(v: string) { this.styleConfig.style.color = v };


  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.styleConfig.loadStyles();
    this.styleConfig.loadColor();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.styleConfig.onChanges(changes);
  }
}