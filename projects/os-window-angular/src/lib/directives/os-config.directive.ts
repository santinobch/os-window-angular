import { 
  Directive,
  Injectable,
  Input,
  OnInit,
  ViewChild
} from '@angular/core';
import { OsConfigModel } from "../models/OsConfig.model";
import { OsConfigService } from "../services/os-config/os-config.service";


@Directive({
  selector: 'os-config'
})
export class OsConfigDirective implements OnInit {

  constructor(private themeService: OsConfigService) { }

  _theme: string = "";
  @Input()
  get theme(): string { return this._theme; }
  set theme(v: string) { v == "" ? this._theme = "arc" : this._theme = v; };

  _variant: string = "";
  @Input()
  get variant(): string { return this._variant; }
  set variant(v: string) { v == "" ? this._variant = "light" : this._variant = v; };

  _config: OsConfigModel = {
    theme:  "",
    variant: ""  
  };

  ngOnInit(): void {
    this._config = {
      theme: this._theme,
      variant: this._variant
    };

    this.themeService.setConfig(this._config);
  }
}