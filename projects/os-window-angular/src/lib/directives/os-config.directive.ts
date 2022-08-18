import { 
  Directive,
  Injectable,
  Input,
  OnInit,
  ViewChild
} from '@angular/core';
import { StyleModel } from "../models/Style.model";
import { OsConfigService } from "../services/os-config/os-config.service";


@Directive({
  selector: 'os-config'
})
export class OsConfigDirective implements OnInit {

  constructor(private themeService: OsConfigService) { }

  _theme: string = "";
  @Input()
  get theme(): string { return this._theme; }
  set theme(v: string) { v == "" ? this._theme = "win98" : this._theme = v; };

  _variant: string = "";
  @Input()
  get variant(): string { return this._variant; }
  set variant(v: string) { v == "" ? this._variant = "classic" : this._variant = v; };

  globalConfig: StyleModel = {
    theme:  "",
    variant: ""  
  };

  ngOnInit(): void {
    this.globalConfig = {
      theme: this._theme,
      variant: this._variant
    };

    this.themeService.setGlobal(this.globalConfig);
  }
}