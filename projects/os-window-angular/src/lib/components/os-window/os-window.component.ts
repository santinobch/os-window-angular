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
import { OsWindow, clamp } from "../../models/OsWindow.model";

//Services
import { OsConfigService } from '../../services/os-config/os-config.service';


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
  @ViewChild('osWindowParent') osWindowParent!: ElementRef<HTMLElement>;


  constructor(
    private componentElement: ElementRef<HTMLElement>,
    private renderer: Renderer2,
    private globalConfigService: OsConfigService
    ) {
  }

  win: OsWindow = new OsWindow(this.componentElement, this.renderer, this.globalConfigService);

  //////////////////////
  ////    Inputs    ////
  //////////////////////

  //  Component theme  //
  @Input()
  get theme(): String { return this.win.style.theme; }
  set theme(v: String) { };

  @Input()
  get variant(): String { return this.win.style.variant; }
  set variant(v: String) { };

  //  Size & position  ///
  @Input()
  get minHeight(): Number { return this.win.minHeight; }
  set minHeight(v: Number) {
    this.win.minHeight = clamp(v || this.win.minHeight);
  };

  @Input()
  get minWidth(): Number { return this.win.minWidth; }
  set minWidth(v: Number) {
    this.win.minWidth = clamp(v || this.win.minWidth);
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
    
    //Getting element reference (see @ViewChild)
    this.win.element = this.osWindowParent;

    /* We first care about the dimensions and position of the window */
    //Initial width & height, also returns corrected value if bellow minimal
    this.win.setDimesions();

    //Sets initial position
    this.win.setPosition(this.positionStr);

    /* After dimensions & position we set the themes and rules */
    //Setting theme of component
    this.win.loadStyles(this.win.style.theme, this.win.style.variant);

    this.win.loadRules();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.win.subscribeStyles(changes);
  }
}
