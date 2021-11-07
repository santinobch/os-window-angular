import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  Renderer2,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { OsConfigModel } from "../../models/OsConfig.model";
import { OsConfigService } from "../../services/os-config/os-config.service";

//Button Selectors: Normal, Warn, Icon, FAB
//Button States: Normal, Pressed, Disabled, Focused

@Component({
  selector: `button[os-button], button[os-circle-button], button[os-fab-button], button[os-warn-button],
              a[os-button], a[os-circle-button], a[os-fab-button], a[os-warn-button]`,
  templateUrl: './os-button.component.html',
  styleUrls: ['./os-button.component.scss'],
  encapsulation: ViewEncapsulation.None
  //changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OsButtonComponent implements OnInit {

  //Stores data from OsThemeComponent
  globalConfigData: OsConfigModel = {
    theme: "arc",
    variant: "light"
  };

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
  _theme!: string;
  @Input()
  get theme(): string { return this._theme; }
  set theme(v: string) { this._theme = v; };

  _variant!: string;
  @Input()
  get variant(): string { return this._variant; }
  set variant(v: string) { this._variant = v; };

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {

    //Global theme config
    this.globalConfigData = this.globalConfigService.getConfig();
    
    //Setting theme of component
    if (this._theme !== "" && this._theme !== undefined && this._variant !== "" && this._variant !== undefined) {

      this.renderer.addClass(this.componentElement.nativeElement, `${this._theme}-${this._variant}-button`);
    } else {
      
      this.renderer.addClass(this.componentElement.nativeElement, `${this.globalConfigData.theme}-${this.globalConfigData.variant}-button`);
    }
  }

}