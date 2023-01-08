import { ElementRef, Renderer2, SimpleChanges } from "@angular/core";
import { OsConfigService } from "../services/os-config/os-config.service";
import { theme_list } from "../themes/theme_list";

export interface SimpleStyleModel {
    theme: string;
    variant: string;
}

export interface StyleModel {
    theme: string;
    variant: string;
    color: string;
}