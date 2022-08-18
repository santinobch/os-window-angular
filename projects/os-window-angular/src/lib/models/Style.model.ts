import { ElementRef, Renderer2, SimpleChanges } from "@angular/core";
import { OsConfigService } from "../services/os-config/os-config.service";
import { theme_list } from "../themes/theme_list";

export interface StyleModel {
    theme: string;
    variant: string;
}

export class StyleClass {

    private globalConfigData: StyleModel = {
        theme: "",
        variant: ""
    };

    public style: StyleModel = {
        theme: "",
        variant: ""
    }

    private previousStyle: StyleModel = {
        theme: "",
        variant: ""
    }

    public color: string = "";
    private previousColor: string = "";

    public element!: ElementRef<HTMLElement>;

    constructor(
        private componentElement: ElementRef,
        private renderer: Renderer2,
        private globalConfigService: OsConfigService,
        private componentName: string
    ) {
        this.element = componentElement;
    }


    private isValidStyle(): boolean {
        if (this.style.theme !== "" && this.style.theme !== undefined && 
        this.style.variant !== "" && this.style.variant !== undefined) {

            for (const i of theme_list) {
                if (i.theme == this.style.theme) {
                    for (const v of i.variants) {
                        if (v == this.style.variant) {
                            
                            return true;
                        }
                    }
                    console.error("Invalid variant at component: " + this.componentElement);
                    return false;
                }
            }
            console.error("Invalid Theme at component: " + this.componentElement);
            return false;
        }
        return false;
    }

    private isValidColor(): boolean {
        if (this.style.theme !== "" && this.style.theme !== undefined) {

            for (const i of theme_list) {
                if (i.theme == this.style.theme) {
                    for (const p of i.palette) {
                        if (p == this.color) {
                            
                            return true;
                        }
                    }
                    console.error("Invalid color at component: " + this.componentElement);
                    return false;
                }
            }
            console.error("Invalid Theme at component: " + this.componentElement);
            return false;
        }
        return false;
    }

    private getStyle(): string {
        return this.style.theme + "-" + this.style.variant + "-" + this.componentName;
    }

    private getPreviousStyle(): string {
        return this.previousStyle.theme + "-" + this.previousStyle.variant + "-" + this.componentName;
    }

    private getColor() {
        return this.color + "-os-" + this.componentName;
    }

    private getPreviousColor() {
        return this.previousColor + "-os-" + this.componentName;
    }

    public loadGlobalStyles() {
        //Global theme config
        this.globalConfigData = this.globalConfigService.getGlobal();
        this.style = this.globalConfigData;
        this.renderer.addClass(this.componentElement.nativeElement, this.getStyle());
    }

    public loadStyles() {
        if (this.isValidStyle()) {

            //Removes old theme class
            if (this.previousStyle.theme !== "" && this.previousStyle.theme !== undefined && 
                this.previousStyle.variant !== "" && this.previousStyle.variant !== undefined) {

                this.renderer.removeClass(this.componentElement.nativeElement, this.getPreviousStyle());
            }

            this.previousStyle.theme = this.style.theme;
            this.previousStyle.variant = this.style.variant;

            //Adds theme class
            this.renderer.addClass(this.componentElement.nativeElement, this.getStyle());
        } else {

            this.loadGlobalStyles()
        }
    }

    public loadColor() {
        if (this.isValidColor()) {
            if (this.previousColor !== "" && this.previousColor !== undefined) {
                this.renderer.removeClass(this.componentElement.nativeElement, this.getPreviousColor());
            }
            this.previousColor = this.color;

            this.renderer.addClass(this.componentElement.nativeElement, this.getColor());
        }
    }

    public onChanges(changes: SimpleChanges) {
        if (changes != undefined) {
            if (changes.theme != undefined) {
                this.style.theme = changes.theme.currentValue;
            } 
            if (changes.variant != undefined) {
                this.style.variant = changes.variant.currentValue;
            } 

            if (changes.theme != undefined || changes.variant != undefined) {
                this.loadStyles();
            }

            if (changes.color != undefined) {
                this.loadColor();
            }
        }
    }
}