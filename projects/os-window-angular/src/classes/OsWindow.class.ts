import { CdkDragEnd, CdkDragMove } from '@angular/cdk/drag-drop';
import { ElementRef, Renderer2, SimpleChanges } from '@angular/core';
import { coerceNumberProperty } from '@angular/cdk/coercion';

import { OsConfigService } from '../services/os-config/os-config.service';
import { TwoPointModel } from '../models/TwoPoint.model';
import { PositionModel } from '../models/Position.model';
import { ResizeModel } from '../models/Resize.model';
import { StyleClass } from './Style.class';
import { SizeModel } from '../models/Size.model';

export function clamp(v: Number, min = 0, max = Number.MAX_SAFE_INTEGER) {
  return Math.max(min, Math.min(max, coerceNumberProperty(v)));
}

export class OsWindowClass {
  public styleConfig!: StyleClass;

  constructor(
    public componentElement: ElementRef<HTMLElement>,
    public renderer: Renderer2,
    public globalConfigService: OsConfigService
  ) {
    this.styleConfig = new StyleClass(
      componentElement,
      renderer,
      globalConfigService,
      'window'
    );
  }

  private mousePos: TwoPointModel = { x: 0, y: 0 };

  //Anchor stores temporary point of the current resize CdkDragMove event
  private anchor: TwoPointModel = { x: 0, y: 0 };

  public minHeight: number = 200;
  public minWidth: number = 200;

  public size: SizeModel = {
    height: {
      previous: 200,
      current: 200,
      unit: 'px',
    },
    width: {
      previous: 200,
      current: 200,
      unit: 'px',
    },
  };

  public position: PositionModel = {
    resize: { x: 0, y: 0 },
    current: { x: 0, y: 0 },
    next: { x: 0, y: 0 },
    zIndex: {
      current: 0,
      next: 1,
    },
  };

  public cdkAnchors: ResizeModel = {
    n: { x: 0, y: 0 },
    ne: { x: 0, y: 0 },
    e: { x: 0, y: 0 },
    se: { x: 0, y: 0 },
    s: { x: 0, y: 0 },
    sw: { x: 0, y: 0 },
    w: { x: 0, y: 0 },
    nw: { x: 0, y: 0 },
  };

  public state = {
    minimized: false,
    maximized: false,
  };

  public rules = {
    disableResize: false,
    minimizable: true,
    maximizable: true,
    closable: true,
  };

  private setStyle(_elementRef: ElementRef, property: string, value: string) {
    _elementRef.nativeElement.style.setProperty(property, value);
  }

  private getStyle(_elementRef: ElementRef, property: string) {
    return getComputedStyle(_elementRef.nativeElement).getPropertyValue(
      property
    );
  }

  private clamp(input: number, max: number) {
    return input >= max ? input : max;
  }

  private clampHeight(
    _elementRef: ElementRef,
    _height: number,
    _minHeight?: number
  ) {
    if (_minHeight) {
      _height = this.clamp(_height, _minHeight);
    }

    return _height;
  }

  private clampWidth(
    _elementRef: ElementRef,
    _width: number,
    _minWidth?: number
  ) {
    if (_minWidth) {
      _width = this.clamp(_width, _minWidth);
    }

    return _width;
  }

  setDimesions() {
    this.size.width.current = this.clampWidth(
      this.componentElement,
      this.size.width.current,
      this.minWidth
    );
    this.size.height.current = this.clampHeight(
      this.componentElement,
      this.size.height.current,
      this.minHeight
    );
  }

  ////////////////////////
  //      Position      //
  ////////////////////////

  setPosition(positionStr: string[]) {
    const X = parseInt(positionStr[0]);
    const Y = parseInt(positionStr[1]);

    if (!Number.isNaN(X)) {
      this.position.next.x = X;
    } else {
      switch (positionStr[0]) {
        case 'left':
          this.position.next.x = 0;
          break;

        case 'center':
          this.position.next.x =
            window.innerWidth / 2 - this.size.width.current / 2;
          break;

        case 'right':
          this.position.next.x = window.innerWidth - this.size.width.current;
          break;

        default:
          this.position.next.x = 0;
          break;
      }
    }

    if (!Number.isNaN(Y)) {
      this.position.next.y = Y + window.innerHeight;
    } else {
      //To hide the window element we need to set it top: -100% in scss,
      //so we later need to calculate everything + innerHeight
      switch (positionStr[1]) {
        case 'top':
          this.position.next.y = window.innerHeight;
          break;

        case 'center':
          this.position.next.y =
            window.innerHeight +
            (window.innerHeight / 2 - this.size.height.current / 2);
          break;

        case 'bottom':
          this.position.next.y =
            window.innerHeight +
            (window.innerHeight - this.size.height.current);
          break;

        default:
          this.position.next.y = window.innerHeight;
          break;
      }
    }

    this.position.current = this.position.next;
  }

  ////////////////////////
  //       Style        //
  ////////////////////////

  ////////////////////////
  //       Rules        //
  ////////////////////////

  loadRules() {
    //Minimizable?
    if (!this.rules.minimizable) {
      this.setStyle(this.componentElement, '--minimizeButton', 'none');
    }

    //Maximizable?
    if (!this.rules.maximizable) {
      this.setStyle(this.componentElement, '--maximizeButton', 'none');
    }

    //Closable?
    if (!this.rules.closable) {
      this.setStyle(this.componentElement, '--closeButton', 'none');
    }

    //Resizable?
    if (this.rules.disableResize) {
      this.setStyle(this.componentElement, '--cursorN', 'auto');
      this.setStyle(this.componentElement, '--cursorNE', 'auto');
      this.setStyle(this.componentElement, '--cursorE', 'auto');
      this.setStyle(this.componentElement, '--cursorSE', 'auto');
      this.setStyle(this.componentElement, '--cursorS', 'auto');
      this.setStyle(this.componentElement, '--cursorSW', 'auto');
      this.setStyle(this.componentElement, '--cursorW', 'auto');
      this.setStyle(this.componentElement, '--cursorNW', 'auto');
    }
  }

  ////////////////////////
  //      Controls      //
  ////////////////////////

  minimize() {
    //TODO
  }

  maximize() {
    if (this.rules.maximizable) {
      if (this.state.maximized == false) {
        //Saving value for later
        this.size.height.previous = this.size.height.current;
        this.size.width.previous = this.size.width.current;

        this.size.height.current = 100;
        this.size.height.unit = 'vh';
        this.size.width.current = 100;
        this.size.width.unit = 'vw';

        this.position.current = { x: 0, y: window.innerHeight };

        this.state.maximized = true;
        this.rules.disableResize = true;
      } else {
        //Restoring window size
        this.size.height.current = this.size.height.previous;
        this.size.height.unit = 'px';
        this.size.width.current = this.size.width.previous;
        this.size.width.unit = 'px';

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
        x: this.mousePos.x - this.size.width.current / 2,
        y: this.mousePos.y + window.innerHeight - 20,
      };
      this.maximize();
    }
  }

  close() {
    this.componentElement.nativeElement.remove();
  }

  ////////////////////////
  // Resize & movement  //
  ////////////////////////

  storeMousePos(event: MouseEvent) {
    this.mousePos = {
      x: event.x,
      y: event.y,
    };
  }

  //Sets some variables when the resize drag starts, we use them later
  startResize() {
    this.size.height.previous = this.size.height.current;
    this.size.width.previous = this.size.width.current;
  }

  resize(dragEvent: CdkDragMove, direction: string) {
    let directionSplit: string[] = [direction.charAt(0), direction.charAt(1)];

    this.anchor = dragEvent.source.getFreeDragPosition();

    directionSplit.forEach(dir => {
      this.resizeDirection(dir);
    });

    //Reset anchor position
    switch (direction) {
      case 'n':
        this.cdkAnchors.n = { x: 0, y: 0 };
        break;

      case 'ne':
        this.cdkAnchors.n = { x: 0, y: 0 };
        break;

      case 'e':
        this.cdkAnchors.e = { x: 0, y: 0 };
        break;

      case 'se':
        this.cdkAnchors.se = { x: 0, y: 0 };
        break;

      case 's':
        this.cdkAnchors.s = { x: 0, y: 0 };
        break;

      case 'sw':
        this.cdkAnchors.sw = { x: 0, y: 0 };
        break;

      case 'w':
        this.cdkAnchors.w = { x: 0, y: 0 };
        break;

      case 'nw':
        this.cdkAnchors.nw = { x: 0, y: 0 };
        break;
    }
  }

  resizeDirection(direction: string) {
    this.position.resize = this.position.next;

    switch (direction) {
      case 'n':
        //Checks that the new position and dimesions produce a minHeight lower than the required
        if (this.size.height.previous - this.anchor.y >= this.minHeight) {
          this.position.resize = {
            x: this.position.resize.x,
            y: this.position.next.y + this.anchor.y,
          };

          this.size.height.current = this.size.height.previous - this.anchor.y;
          this.size.height.current = this.clampHeight(
            this.componentElement,
            this.size.height.current,
            this.minHeight
          );

          this.position.current = {
            x: this.position.current.x,
            y: this.position.resize.y,
          };
        }
        break;

      case 'e':
        this.size.width.current = this.size.width.previous + this.anchor.x;
        this.size.width.current = this.clampWidth(
          this.componentElement,
          this.size.width.current,
          this.minWidth
        );

        break;

      case 's':
        this.size.height.current = this.size.height.previous + this.anchor.y;
        this.size.height.current = this.clampHeight(
          this.componentElement,
          this.size.height.current,
          this.minHeight
        );

        break;

      case 'w':
        //Checks that the new position and dimesions produce a minHeight lower than the required
        if (this.size.width.previous - this.anchor.x >= this.minWidth) {
          this.position.resize = {
            x: this.position.next.x + this.anchor.x,
            y: this.position.resize.y,
          };

          this.size.width.current = this.size.width.previous - this.anchor.x;
          this.size.width.current = this.clampWidth(
            this.componentElement,
            this.size.width.current,
            this.minWidth
          );

          this.position.current = {
            x: this.position.resize.x,
            y: this.position.current.y,
          };
        }
        break;
    }
  }

  endResize() {
    this.position.next = this.position.current;
  }

  //When releasing the os-window the user may leave it outside of the browser window
  //which would make it imposible to interact with the component again,
  //this makes the window 'bounce' back into sight
  correctEndPosition(event: CdkDragEnd) {
    this.position.next = event.source.getFreeDragPosition();

    //Fix for Y position, the window-bar will always be visible
    if (this.position.next.y < window.innerHeight) {
      this.position.next.y = window.innerHeight;
    } else if (this.position.next.y > window.innerHeight * 2 - 40) {
      this.position.next.y = window.innerHeight * 2 - 40;
    }

    //Fix for X position, a quarter of the window will always be visible
    if (this.position.next.x < -((this.size.width.current / 4) * 3)) {
      this.position.next.x = -((this.size.width.current / 4) * 3);
    } else if (
      this.position.next.x >
      window.innerWidth - this.size.width.current / 4
    ) {
      this.position.next.x = window.innerWidth - this.size.width.current / 4;
    }

    this.position.current = this.position.next;
  }

  //////////////////////////////
  //  Other user interaction  //
  //////////////////////////////

  //When a window is clicked we want to change it's z-index value and apply some styles
  focus() {
    //We get the current global z-index
    this.position.zIndex.next = this.globalConfigService.getZIndex();

    //This will be unequal if another window has been focused on
    if (this.position.zIndex.current != this.position.zIndex.next) {
      this.position.zIndex.next++;
      this.position.zIndex.current = this.position.zIndex.next;

      //Updating global z-index
      this.globalConfigService.setZIndex(this.position.zIndex.current);
    }

    //After that we remove the 'focused' class from all the windows
    let focused = document.getElementsByClassName('focused');
    let i: number = 0;
    while (i < focused.length) {
      this.renderer.removeClass(focused[i], 'focused');
      i++;
    }

    //We add the 'focused' class to the current window
    this.renderer.addClass(
      this.componentElement.nativeElement.firstChild,
      'focused'
    );
  }
}
