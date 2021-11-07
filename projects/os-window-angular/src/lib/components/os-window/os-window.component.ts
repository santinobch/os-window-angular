import { CdkDragEnd, CdkDragMove, CdkDragRelease, CdkDragStart, DragRef } from '@angular/cdk/drag-drop';
import { 
  Component,
  ElementRef,
  Input,
  OnInit,
  OnChanges,
  Renderer2,
  SimpleChanges,
  ViewChild,
  Directive
} from '@angular/core';


//Models
import { PointModel } from "../../models/Point.model";
import { OsWindowModel, initializeDefaultWindow, MIN_HEIGHT, MIN_WIDTH } from "../../models/OsWindow.model";

//Tools
import { 
  clamp, 
  setStyle, 
  getStyle, 
  setHeight,
  setWidth
} from './os-window.tools';

//Config service
import { OsConfigModel } from "../../models/OsConfig.model";
import { OsConfigService } from "../../services/os-config/os-config.service";


@Directive ({
  selector: `window-title, [window-title], [windowTitle]`,
  exportAs: 'OsWindowTitle'
})
export class OsWindowTitle {}

@Directive ({
  selector: `window-content, [window-content], [windowContent]`,
  exportAs: 'WindowContent'
})
export class OsWindowContent {}

@Component({
  selector: 'os-window',
  templateUrl: './os-window.component.html',
  styleUrls: [
    './os-window.component.scss',
    '../../themes/main.scss'
  ]
})

export class OsWindowComponent implements OnInit, OnChanges {

  //References parent html element from component
  @ViewChild('osWindowParent') osWindowParent!: ElementRef;

  constructor(
    private componentElement: ElementRef, 
    private renderer: Renderer2,
    private globalConfigService: OsConfigService
    ) {
      this.win = initializeDefaultWindow(componentElement);
  }


  //////////////////////////
  // Variable declarations//
  //////////////////////////

  //Stores global config
  globalConfigData!: OsConfigModel;

  //z-index of the current window
  lastZIndex: number = 1;

  win!: OsWindowModel;


  //////////////////////
  ////    Inputs    ////
  //////////////////////

  //  Component theme  //
  _theme!: string;
  @Input()
  get theme(): string { return this._theme; }
  set theme(v: string) { this._theme = v; };

  _variant!: string;
  @Input()
  get variant(): string { return this._variant; }
  set variant(v: string) { this._variant = v; };

  //  Size & position  ///
  @Input()
  get minHeight(): Number { return this.win.minHeight; }
  set minHeight(v: Number) {
    this.win.minHeight = clamp(v || MIN_HEIGHT);
  };
  
  @Input()
  get minWidth(): Number { return this.win.minWidth; }
  set minWidth(v: Number) {
    this.win.minWidth = clamp(v || MIN_WIDTH);
  };

  @Input()
  get height(): Number { return this.win.height; }
  set height(v: Number) {
    this.win.height = clamp(v || this.win.minHeight);
  };

  @Input()
  get width(): Number { return this.win.width; }
  set width(v: Number) {
    this.win.width = clamp(v || this.win.minWidth);
  };

  //TODO implement PointModel return
  positionStr!: string[];
  @Input()
  get position(): string { return ""; }
  set position(v: string) {
    this.positionStr = v.split(" ", 2);
  };

  //  Rules  //
  @Input()
  get resizable(): boolean { return this.win.rules.disableResize; }
  set resizable(v: boolean) {
    this.win.rules.disableResize = !v;
  };

  @Input()
  get minimizable(): boolean { return this.win.rules.minimizable; }
  set minimizable(v: boolean) {
    this.win.rules.minimizable = v;
  };

  @Input()
  get maximizable(): boolean { return this.win.rules.maximizable; }
  set maximizable(v: boolean) {
    this.win.rules.maximizable = v;
  };

  @Input()
  get closable(): boolean { return this.win.rules.closable; }
  set closable(v: boolean) {
    this.win.rules.closable = v;
  };


  ngOnInit(): void {
  }

  ngAfterViewInit() {

    this.globalConfigData = this.globalConfigService.getConfig();

    //Getting element reference (see @ViewChild)
    this.win.element = this.osWindowParent;


    /* We first care about the dimensions and position of the window */
    //Initial width & height, also returns corrected value if bellow minimal
    this.win.width = setWidth(this.win.element, this.win.width, this.win.minWidth);
    this.win.height = setHeight(this.win.element, this.win.height, this.win.minHeight);

    //Sets initial position
    this.positionWindow();

    /* After dimensions & position we set the themes and rules */
    //Setting theme of component
    if (this._theme !== "" && this._theme !== undefined && this._variant !== "" && this._variant !== undefined) {

      this.renderer.addClass(this.win.element.nativeElement, `${this._theme}-${this._variant}`);
    } else {
      
      this.renderer.addClass(this.win.element.nativeElement, `${this.globalConfigData.theme}-${this.globalConfigData.variant}`);
    }

    //Minimizable?
    if (!this.win.rules.minimizable) {
      setStyle(this.win.element, '--minimizeButton', 'none');
    }

    //Maximizable?
    if (!this.win.rules.maximizable) {
      setStyle(this.win.element, '--maximizeButton', 'none');
    }

    //Closable?
    if (!this.win.rules.closable) {
      setStyle(this.win.element, '--closeButton', 'none');
    }

    //Resizable?
    if (this.win.rules.disableResize) {
      setStyle(this.win.element, '--cursorN', 'auto')
      setStyle(this.win.element, '--cursorNE', 'auto')
      setStyle(this.win.element, '--cursorE', 'auto')
      setStyle(this.win.element, '--cursorSE', 'auto')
      setStyle(this.win.element, '--cursorS', 'auto')
      setStyle(this.win.element, '--cursorSW', 'auto')
      setStyle(this.win.element, '--cursorW', 'auto')
      setStyle(this.win.element, '--cursorNW', 'auto')
    }

    
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  /*
  alternateTheme() {
    if (this.win.style.theme !== "") {
      if (this.win.style.theme == "arc-dark") {
        this.renderer.removeClass(this.win.element.nativeElement, 'arc-dark');
        this.win.style.theme = "arc-light";
        this.renderer.addClass(this.win.element.nativeElement, this.win.style.theme);
      } else {
        this.renderer.removeClass(this.win.element.nativeElement, 'arc-light');
        this.win.style.theme = "arc-dark";
        this.renderer.addClass(this.win.element.nativeElement, this.win.style.theme);
      }
    }
  }
  */

  //    Position logic    //
  positionWindow() {
    switch (this.positionStr[0]) {
      case 'left':
        this.win.position.x = 0;
        break;
    
      case 'center':
        this.win.position.x = (window.innerWidth / 2 - this.win.width / 2);
        break;

      case 'right':
        this.win.position.x = (window.innerWidth - this.win.width);
          break;

      default:
        this.win.position.x = 0;
        break;
    }

    //To hide the window element we need to set it top: -100% in scss, 
    //so we later need to calculate everything + innerHeight
    switch (this.positionStr[1]) {
      case 'top':
        this.win.position.y = window.innerHeight;
        break;
    
      case 'center':
        this.win.position.y = window.innerHeight + (window.innerHeight / 2 - this.win.height / 2);
        break;

      case 'bottom':
        this.win.position.y = window.innerHeight + (window.innerHeight - this.win.height);
        break;

      default:
        this.win.position.y = window.innerHeight;
        break;
    }

    this.win.setPosition = {
      x: this.win.position.x,
      y: this.win.position.y
    }

  }

  //    Control Logic    //
  minimize() {

  }

  maximize() {
    if (this.win.rules.maximizable) {
      if (this.win.state.maximized == false) {
        
        this.renderer.addClass(this.win.element.nativeElement.firstChild, 'maximized');

        this.win.setPosition = {x: 0, y: window.innerHeight};

        this.win.state.maximized = true;
        this.win.rules.disableResize = true;
      }
      else {
        this.renderer.removeClass(this.win.element.nativeElement.firstChild, 'maximized');

        this.win.setPosition = {
          x: this.win.position.x,
          y: this.win.position.y
        }
        
        this.win.state.maximized = false;
        this.win.rules.disableResize = false;
      }
    }
  }

  //When maximized and then dragged the window demaximizes 
  //and puts itself aligned with the mouse position
  demaximize() {
    if (this.win.state.maximized == true) {
      this.win.position = {
        x: (this.mousePos.x - this.win.width / 2),
        y: ( this.mousePos.y + window.innerHeight - 20)
      }
      this.maximize();
    }
  }

  close() {
    this.componentElement.nativeElement.remove();
  }

  ////////////////////////
  //    Resize logic    //
  ////////////////////////

  //Anchor stores temporary point of the current resize CdkDragMove event
  anchor: PointModel = {x: 0, y: 0};
  newPosition: PointModel = {x: 0, y: 0};

  initialHeight!: number;
  initialWidth!: number;

  mousePos: PointModel = {x: 0, y: 0};

  storeMousePos(event: MouseEvent) {
    this.mousePos = {
      x: event.x,
      y: event.y
    }
  }

  storeWindowPos(event: CdkDragEnd) {
    this.win.position = event.source.getFreeDragPosition();
  }

  //Sets some variables when the resize drag starts, we use them later
  startResize() {
    this.initialHeight = this.win.height;
    this.initialWidth = this.win.width;

    this.newPosition = {
      x: this.win.position.x,
      y: this.win.position.y
    }
  }

  resize(dragEvent: CdkDragMove, direction: string) {

    switch (direction) {
      //Height, Y
      case 'n':
        this.anchor = dragEvent.source.getFreeDragPosition();

        //Checks that the new position and dimesions produce a minHeight lower than the required
        if ( (this.initialHeight - this.anchor.y) >= this.win.minHeight) {
          this.newPosition = {
            x: this.win.position.x,
            y: this.win.position.y + this.anchor.y
          }

          this.win.height = this.initialHeight - this.anchor.y;
          this.win.height = setHeight(this.win.element, this.win.height, this.win.minHeight);
        }

        //Sets the new position
        this.win.setPosition = {
          x: this.newPosition.x,
          y: this.newPosition.y
        }

        //Devuleve el div de resize a su posicion 0 0
        this.win.resize.n = {x: 0, y: 0};

        break;

      //Height, Width, Y
      case 'ne':
        this.anchor = dragEvent.source.getFreeDragPosition();

        //Checks that the new position and dimesions produce a minHeight lower than the required
        if ( (this.initialHeight - this.anchor.y) >= this.win.minHeight) {
          this.newPosition = {
            x: this.win.position.x,
            y: this.win.position.y + this.anchor.y
          }

          this.win.height = this.initialHeight - this.anchor.y;
          this.win.height = setHeight(this.win.element, this.win.height, this.win.minHeight);
        }

        //Sets the new position
        this.win.setPosition = {
          x: this.newPosition.x,
          y: this.newPosition.y
        }

        //Devuleve el div de resize a su posicion 0 0
        this.win.resize.ne = {x: 0, y: 0};

        this.win.width = (this.initialWidth + this.anchor.x);
        this.win.width = setWidth(this.win.element, this.win.width, this.win.minWidth);

        break;

      //Width
      case 'e':
        this.anchor = dragEvent.source.getFreeDragPosition();

        //Devuleve el div de resize a su posicion 0 0
        this.win.resize.e = {x: 0, y: 0};

        this.win.width = (this.initialWidth + this.anchor.x);
        this.win.width = setWidth(this.win.element, this.win.width, this.win.minWidth);

        break;
      
      //Width, Height
      case 'se':
        this.anchor = dragEvent.source.getFreeDragPosition();

        //Devuleve el div de resize a su posicion 0 0
        this.win.resize.se = {x: 0, y: 0};

        this.win.width = (this.initialWidth + this.anchor.x);
        this.win.width = setWidth(this.win.element, this.win.width, this.win.minWidth);

        this.win.height = this.initialHeight + this.anchor.y;
        this.win.height = setHeight(this.win.element, this.win.height, this.win.minHeight);

        break;

      //Height
      case 's':
        this.anchor = dragEvent.source.getFreeDragPosition();

        //Devuleve el div de resize a su posicion 0 0
        this.win.resize.s = {x: 0, y: 0};

        this.win.height = this.initialHeight + this.anchor.y;
        this.win.height = setHeight(this.win.element, this.win.height, this.win.minHeight);

        break;

      //Height, Width, X
      case 'sw':
        this.anchor = dragEvent.source.getFreeDragPosition();

        //Checks that the new position and dimesions produce a minHeight lower than the required
        if ( (this.initialWidth - this.anchor.x) >= this.win.minWidth) {
          this.newPosition = {
            x: this.win.position.x + this.anchor.x,
            y: this.win.position.y
          }

          this.win.width = this.initialWidth - this.anchor.x;
          this.win.width = setWidth(this.win.element, this.win.width, this.win.minWidth);
        }

        //Sets the new position
        this.win.setPosition = {
          x: this.newPosition.x,
          y: this.newPosition.y
        }

        //Devuleve el div de resize a su posicion 0 0
        this.win.resize.sw = {x: 0, y: 0};

        this.win.height = (this.initialHeight + this.anchor.y);
        this.win.height = setHeight(this.win.element, this.win.height, this.win.minHeight);

        break;

      //Width, X
      case 'w':
        this.anchor = dragEvent.source.getFreeDragPosition();

        //Checks that the new position and dimesions produce a minHeight lower than the required
        if ( (this.initialWidth - this.anchor.x) >= this.win.minWidth) {
          this.newPosition = {
            x: this.win.position.x + this.anchor.x,
            y: this.win.position.y
          }

          this.win.width = this.initialWidth - this.anchor.x;
          this.win.width = setWidth(this.win.element, this.win.width, this.win.minWidth);
        }

        //Sets the new position
        this.win.setPosition = {
          x: this.newPosition.x,
          y: this.newPosition.y
        }

        //Devuleve el div de resize a su posicion 0 0
        this.win.resize.w = {x: 0, y: 0};

        break;

      //Width, Height, X, Y
      case 'nw':
        this.anchor = dragEvent.source.getFreeDragPosition();

        //Checks that the new position and dimesions produce a minHeight lower than the required
        if ( (this.initialWidth - this.anchor.x) >= this.win.minWidth ) 
        {
          this.newPosition.x = (this.win.position.x + this.anchor.x);

          this.win.width = this.initialWidth - this.anchor.x;
          this.win.width = setWidth(this.win.element, this.win.width, this.win.minWidth);
        } 

        if ( (this.initialHeight - this.anchor.y) >= this.win.minHeight ) 
        {
          this.newPosition.y = (this.win.position.y + this.anchor.y);

          this.win.height = this.initialHeight - this.anchor.y;
          this.win.height = setHeight(this.win.element, this.win.height, this.win.minHeight);
        } 

        //Sets the new position
        this.win.setPosition = {
          x: this.newPosition.x,
          y: this.newPosition.y
        }

        //Devuleve el div de resize a su posicion 0 0
        this.win.resize.nw = {x: 0, y: 0};

        break;
    }
  }

  //When the resize drag has ended sets the newPosition as the stored position
  endResize() {
    this.win.position = {
      x: this.newPosition.x,
      y: this.newPosition.y
    }
  }



  //////////////////////////////
  //  Other user interaction  //
  //////////////////////////////

  //When a window is clicked we want to change it's z-index value and apply some styles
  focus() {

    //First we increase the z-index of the clicked window
    this.lastZIndex = this.globalConfigService.getZIndex();

    if (this.win.state.zIndex != this.lastZIndex) {
      this.lastZIndex++;
      this.globalConfigService.setZIndex(this.lastZIndex);

      this.win.state.zIndex = this.lastZIndex;
      setStyle(this.win.element, '--zIndex', `${this.win.state.zIndex}`)
    }

    //After that we remove the 'focused' class from all the windows
    let focused = document.getElementsByClassName("focused");
    let i: number = 0;
    while (i < focused.length) {
      this.renderer.removeClass(focused[i], 'focused');
      i++;
    }

    //We add the 'focused' class to the current window
    this.renderer.addClass(this.win.element.nativeElement.firstChild, "focused");
  }

  //When releasing the os-window the user may leave it outside of the browser window
  //which would make it imposible to interact with the component again, 
  //this makes the window 'bounce' back into sight
  correctEndPosition(event: CdkDragEnd) {

    //Fix for Y position, the window-bar will always be visible
    if (this.win.position.y < window.innerHeight) {

      this.win.position.y = window.innerHeight;

      this.win.setPosition = {
        x: this.win.position.x,
        y: this.win.position.y
      }

    } 
    else if (this.win.position.y > ( window.innerHeight * 2 - 40) ) {
      
      this.win.position.y = ( window.innerHeight * 2 - 40);

      this.win.setPosition = {
        x: this.win.position.x,
        y: this.win.position.y
      }
    }

    //Fix for X position, a quarter of the window will always be visible
    if (this.win.position.x < -(this.win.width / 4 * 3) ) {

      this.win.position.x = -(this.win.width / 4 * 3);

      this.win.setPosition = {
        x: this.win.position.x,
        y: this.win.position.y
      }

    } 
    else if (this.win.position.x > (window.innerWidth - this.win.width / 4) ) {
      
      this.win.position.x = (window.innerWidth - this.win.width / 4);

      this.win.setPosition = {
        x: this.win.position.x,
        y: this.win.position.y
      }
    }
  }
}


