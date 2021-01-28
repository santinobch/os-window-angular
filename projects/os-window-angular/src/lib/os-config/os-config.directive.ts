import { 
  Directive,
  Injectable,
  Input,
  OnInit,
  ViewChild
} from '@angular/core';
import { osConfigData } from "./commons";
import { OsConfigService } from "./os-config.service";


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

  _config: osConfigData = {
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