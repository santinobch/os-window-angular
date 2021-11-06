import { ElementRef } from '@angular/core'
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
      disableResize: boolean,
      minimizable: boolean,
      maximizable: boolean,
      closable: boolean
    }
  }