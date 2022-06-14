import { CdkDragEnd, CdkDragMove } from '@angular/cdk/drag-drop';
import { ElementRef, Renderer2, SimpleChanges } from '@angular/core'
import { coerceNumberProperty } from '@angular/cdk/coercion';

import { OsConfigService } from '../services/os-config/os-config.service';
import { TwoPointModel } from "./TwoPoint.model";
import { PositionModel } from "./Position.model";
import { ResizeModel } from "./Resize.model";
import { StyleModel } from "./Style.model";

export function clamp(v: Number, min = 0, max = Number.MAX_SAFE_INTEGER) {
  return Math.max(min, Math.min(max, coerceNumberProperty(v) ) );
}


export class OsWindow {
  
  public element!: ElementRef<HTMLElement>;

  private globalConfigData!: StyleModel;

  private initialHeight!: number;
  private initialWidth!: number;

  private mousePos: TwoPointModel = {x: 0, y: 0};

  //Anchor stores temporary point of the current resize CdkDragMove event
  private anchor: TwoPointModel = {x: 0, y: 0};
  


  public minHeight: number = 200;
  public minWidth: number = 200;

  public height: number = 200;
  public width: number = 200;

  public position: PositionModel = {
    resize: {x: 0, y: 0},
    current: {x: 0, y: 0},
    next: {x: 0, y: 0},
    zIndex: {
      current: 0,
      next: 1
    }
  }

  public cdkAnchors: ResizeModel = {
    n: {x: 0, y: 0},
    ne: {x: 0, y: 0},
    e: {x: 0, y: 0},
    se: {x: 0, y: 0},
    s: {x: 0, y: 0},
    sw: {x: 0, y: 0},
    w: {x: 0, y: 0},
    nw: {x: 0, y: 0}
  };

  public state = {
    minimized: false,
    maximized: false
  };

  public rules = {
    disableResize: false,
    minimizable: true,
    maximizable: true,
    closable: true
  };

  public style = {
    theme: "",
    variant: ""
  };


  constructor(
    private componentElement: ElementRef,
    private renderer: Renderer2,
    private globalConfigService: OsConfigService
  ) {
    this.element = componentElement;
  }



  private highest(input: number, max: number) {
      let n: number = input >= max ? input : max;
      return n;
  }


  private setStyle(_elementRef: ElementRef, property: string, value: string)  {
      _elementRef.nativeElement.style.setProperty(property, value);
  }
      
  private getStyle(_elementRef: ElementRef, property: string) {
      return getComputedStyle(_elementRef.nativeElement).getPropertyValue(property);
  }
  
  private setHeight(_elementRef: ElementRef, _height: number, _minHeight?: number) {
  
      if (_minHeight) {
          _height = this.highest(_height, _minHeight)
      }
      this.setStyle(_elementRef, '--winHeight', `${_height}px`);
      
      return _height;
  }
  
  private setWidth(_elementRef: ElementRef, _width: number, _minWidth?: number) {
  
      if (_minWidth) {
          _width = this.highest(_width, _minWidth)
      }
      this.setStyle(_elementRef, '--winWidth', `${_width}px`);
      
      return _width;
  }

  private getStyleStr(): string {
    return `${this.style.theme}-${this.style.variant}`;
  }

  getGlobalConfig() {
    this.globalConfigData = this.globalConfigService.getConfig();
  }

  setDimesions() {
    this.width = this.setWidth(this.element, this.width, this.minWidth);
    this.height = this.setHeight(this.element, this.height, this.minHeight);
  }

  setPosition(positionStr: string[]) {
    switch (positionStr[0]) {
      case 'left':
        this.position.next.x = 0;
        break;

      case 'center':
        this.position.next.x = (window.innerWidth / 2 - this.width / 2);
        break;

      case 'right':
        this.position.next.x = (window.innerWidth - this.width);
          break;

      default:
        this.position.next.x = 0;
        break;
    }

    //To hide the window element we need to set it top: -100% in scss,
    //so we later need to calculate everything + innerHeight
    switch (positionStr[1]) {
      case 'top':
        this.position.next.y = window.innerHeight;
        break;

      case 'center':
        this.position.next.y = window.innerHeight + (window.innerHeight / 2 - this.height / 2);
        break;

      case 'bottom':
        this.position.next.y = window.innerHeight + (window.innerHeight - this.height);
        break;

      default:
        this.position.next.y = window.innerHeight;
        break;
    }

    this.position.current = this.position.next;
  }

  minimize() {
    //TODO
  }

  maximize() {
    if (this.rules.maximizable) {
      if (this.state.maximized == false) {

        this.renderer.addClass(this.element.nativeElement.firstChild, 'maximized');

        this.position.current = {x: 0, y: window.innerHeight};

        this.state.maximized = true;
        this.rules.disableResize = true;
      }
      else {
        this.renderer.removeClass(this.element.nativeElement.firstChild, 'maximized');

        this.position.current = this.position.next;

        this.state.maximized = false;
        this.rules.disableResize = false;
      }
    }
  }

  //When maximized and then dragged the window demaximizes
  //and puts itself aligned with the mouse position
  demaximize() {
    if (this.state.maximized == true) {
      this.position.next = {
        x: (this.mousePos.x - this.width / 2),
        y: ( this.mousePos.y + window.innerHeight - 20)
      }
      this.maximize();
    }
  }

  close() {
    this.componentElement.nativeElement.remove();
  }


  ////////////////////////
  //       Style        //
  ////////////////////////

  
  loadGlobalStyles() {

    this.getGlobalConfig();

    if (this.style.theme != this.globalConfigData.theme || this.style.variant != this.globalConfigData.variant) {
      this.renderer.removeClass(this.element.nativeElement, this.getStyleStr());
    }

    this.style.theme = this.globalConfigData.theme;
    this.style.variant = this.globalConfigData.variant;

    //Adds theme class
    this.renderer.addClass(this.element.nativeElement, this.getStyleStr());
  }

  loadStyles(_theme: string, _variant: string) {

    if (_theme !== "" && _theme !== undefined && _variant !== "" && _variant !== undefined) {

      //Removes old theme class
      if (this.style.theme !== "" && this.style.theme !== undefined && this.style.variant !== "" && this.style.variant !== undefined) {
        this.renderer.removeClass(this.element.nativeElement, this.getStyleStr());
      }

      this.style.theme = _theme;
      this.style.variant = _variant;

      //Adds theme class
      this.renderer.addClass(this.element.nativeElement, this.getStyleStr());
    } else {

      this.loadGlobalStyles()
    }
  }

  subscribeStyles(changes: SimpleChanges) {
    
    if (changes != undefined && changes.theme != undefined && changes.variant != undefined) {
      
      this.loadStyles(changes.theme.currentValue, changes.variant.currentValue);
    }
  }

  ////////////////////////
  //       Rules        //
  ////////////////////////

  loadRules() {
    //Minimizable?
    if (!this.rules.minimizable) {
      this.setStyle(this.element, '--minimizeButton', 'none');
    }

    //Maximizable?
    if (!this.rules.maximizable) {
      this.setStyle(this.element, '--maximizeButton', 'none');
    }

    //Closable?
    if (!this.rules.closable) {
      this.setStyle(this.element, '--closeButton', 'none');
    }

    //Resizable?
    if (this.rules.disableResize) {
      this.setStyle(this.element, '--cursorN', 'auto')
      this.setStyle(this.element, '--cursorNE', 'auto')
      this.setStyle(this.element, '--cursorE', 'auto')
      this.setStyle(this.element, '--cursorSE', 'auto')
      this.setStyle(this.element, '--cursorS', 'auto')
      this.setStyle(this.element, '--cursorSW', 'auto')
      this.setStyle(this.element, '--cursorW', 'auto')
      this.setStyle(this.element, '--cursorNW', 'auto')
    }
  }


  ////////////////////////
  //      Resize       //
  ////////////////////////

  storeMousePos(event: MouseEvent) {
    this.mousePos = {
      x: event.x,
      y: event.y
    }
  }

  //Sets some variables when the resize drag starts, we use them later
  startResize() {
    this.initialHeight = this.height;
    this.initialWidth = this.width;
  }

  resize(dragEvent: CdkDragMove, direction: string) {

    let directionSplit: string[] = [direction.charAt(0), direction.charAt(1)];

    this.anchor = dragEvent.source.getFreeDragPosition();

    directionSplit.forEach( dir => {
      this.resizeDirection(dir);
    })

    //Reset anchor position
    switch (direction) {
      case "n":
        this.cdkAnchors.n = {x: 0, y: 0};
        break;
    
      case "ne":
        this.cdkAnchors.n = {x: 0, y: 0};
        break;

      case "e":
        this.cdkAnchors.e = {x: 0, y: 0};
        break;

      case "se":
        this.cdkAnchors.se = {x: 0, y: 0};
        break;

      case "s":
        this.cdkAnchors.s = {x: 0, y: 0};
        break;

      case "sw":
        this.cdkAnchors.sw = {x: 0, y: 0};
        break;

      case "w":
        this.cdkAnchors.w = {x: 0, y: 0};
        break;

      case "nw":
        this.cdkAnchors.nw = {x: 0, y: 0};
        break;
    }
  }

  resizeDirection(direction: string) {

    this.position.resize = this.position.next;

    switch (direction) {
      case "n":
        //Checks that the new position and dimesions produce a minHeight lower than the required
        if ( (this.initialHeight - this.anchor.y) >= this.minHeight) {

          this.position.resize = {
            x: this.position.resize.x,
            y: this.position.next.y + this.anchor.y
          }

          this.height = this.initialHeight - this.anchor.y;
          this.height = this.setHeight(this.element, this.height, this.minHeight);

          this.position.current = {
            x: this.position.current.x,
            y: this.position.resize.y
          }
        }
        break;

      case "e":
        this.width = (this.initialWidth + this.anchor.x);
        this.width = this.setWidth(this.element, this.width, this.minWidth);

        break;

      case "s":
        this.height = this.initialHeight + this.anchor.y;
        this.height = this.setHeight(this.element, this.height, this.minHeight);

        break;

      case "w":
        //Checks that the new position and dimesions produce a minHeight lower than the required
        if ( (this.initialWidth - this.anchor.x) >= this.minWidth) {

          this.position.resize = {
            x: this.position.next.x + this.anchor.x,
            y: this.position.resize.y
          }

          this.width = this.initialWidth - this.anchor.x;
          this.width = this.setWidth(this.element, this.width, this.minWidth);

          this.position.current = {
            x: this.position.resize.x,
            y: this.position.current.y
          }
        }
        break;
    }
  }


  endResize() {
    this.position.next = this.position.current;
  }


  //////////////////////////////
  //  Other user interaction  //
  //////////////////////////////

  //When a window is clicked we want to change it's z-index value and apply some styles
  focus() {

    //First we increase the z-index of the clicked window
    this.position.zIndex.next = this.globalConfigService.getZIndex();

    if (this.position.zIndex.current != this.position.zIndex.next) {

      this.position.zIndex.next++;
      this.position.zIndex.current = this.position.zIndex.next;

      this.globalConfigService.setZIndex(this.position.zIndex.current);
      this.setStyle(this.element, '--zIndex', `${this.position.zIndex.current}`)
    }

    //After that we remove the 'focused' class from all the windows
    let focused = document.getElementsByClassName("focused");
    let i: number = 0;
    while (i < focused.length) {
      this.renderer.removeClass(focused[i], 'focused');
      i++;
    }

    //We add the 'focused' class to the current window
    this.renderer.addClass(this.element.nativeElement.firstChild, "focused");
  }

  //When releasing the os-window the user may leave it outside of the browser window
  //which would make it imposible to interact with the component again,
  //this makes the window 'bounce' back into sight
  correctEndPosition(event: CdkDragEnd) {

    this.position.next = event.source.getFreeDragPosition();

    //Fix for Y position, the window-bar will always be visible
    if (this.position.next.y < window.innerHeight) {

      this.position.next.y = window.innerHeight;
    }
    else if (this.position.next.y > ( window.innerHeight * 2 - 40) ) {

      this.position.next.y = ( window.innerHeight * 2 - 40);
    }

    //Fix for X position, a quarter of the window will always be visible
    if (this.position.next.x < -(this.width / 4 * 3) ) {

      this.position.next.x = -(this.width / 4 * 3);
    }
    else if (this.position.next.x > (window.innerWidth - this.width / 4) ) {

      this.position.next.x = (window.innerWidth - this.width / 4);
    }

    this.position.current = this.position.next;
  }
}