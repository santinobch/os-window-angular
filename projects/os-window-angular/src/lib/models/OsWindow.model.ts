import { ElementRef, Renderer2 } from '@angular/core'
import { PointModel } from "./Point.model";

export interface OsWindowModel {
  element: ElementRef,
  minHeight: number,
  minWidth: number,

  height: number,
  width: number,
  transform: string,

  setPosition: PointModel,
  position: PointModel,

  resize: {
    n: PointModel,
    ne: PointModel,
    e: PointModel,
    se: PointModel,
    s: PointModel,
    sw: PointModel,
    w: PointModel,
    nw: PointModel
  },

  state: {
    zIndex: number,
    minimized: boolean,
    maximized: boolean
  },

  rules: {
    disableResize: false | boolean,
    minimizable: true | boolean,
    maximizable: true | boolean,
    closable: true | boolean
  }
}

//Deafult minHeight & minWidth
export const MIN_HEIGHT: number = 200;
export const MIN_WIDTH:  number = 200;

export function initializeDefaultWindow(_element: ElementRef): OsWindowModel {
  let winDefault: OsWindowModel = {
    element: _element,
    minHeight: MIN_HEIGHT,
    minWidth: MIN_WIDTH,
  
    height: 0,
    width: 0,
    transform: "",
  
    //This functions as the used variable in real time for position
    setPosition: {x: 0, y: 0},
    position: {x: 0, y: 0},
  
    resize: {
      n:  {x: 0, y: 0},
      ne: {x: 0, y: 0},
      e:  {x: 0, y: 0},
      se: {x: 0, y: 0},
      s:  {x: 0, y: 0},
      sw: {x: 0, y: 0},
      w:  {x: 0, y: 0},
      nw: {x: 0, y: 0},
    },
  
    state: {
      zIndex: 0,
      maximized: false,
      minimized: false
    },
  
    rules: {
      disableResize: false,
      minimizable: true,
      maximizable: true,
      closable: true
    }
  };
  return winDefault;
}