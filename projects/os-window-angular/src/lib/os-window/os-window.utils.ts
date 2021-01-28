import { ElementRef } from '@angular/core'
import { coerceNumberProperty } from '@angular/cdk/coercion';

export interface Point {
  x: number;
  y: number;
}

//Window object
export interface osWindow {
  element: ElementRef,
  minHeight: number,
  minWidth: number,

  height: number,
  width: number,
  transform: string,

  setPosition: Point,
  position: Point,

  resize: {
    n: Point,
    ne: Point,
    e: Point,
    se: Point,
    s: Point,
    sw: Point,
    w: Point,
    nw: Point
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

export function clamp(v: Number, min = 0, max = Number.MAX_SAFE_INTEGER) {
  return Math.max(min, Math.min(max, coerceNumberProperty(v) ) );
}

//Simplifyng seting & getting styles of component
export function setStyle(_elementRef: ElementRef, property: string, value: string)  {
  _elementRef.nativeElement.style.setProperty(property, value);
}

export function getStyle(_elementRef: ElementRef, property: string) {
  return getComputedStyle(_elementRef.nativeElement).getPropertyValue(property); 
}

export function setHeight(_elementRef: ElementRef, _height: number, _minHeight?: number) {

  if (_minHeight) {
    _height = _height >= _minHeight ? _height : _minHeight;   
  }
  setStyle(_elementRef, '--winHeight', `${_height}px`);

  return _height;
}

export function setWidth(_elementRef: ElementRef, _width: number, _minWidth?: number) {

  if (_minWidth) {
    _width = _width >= _minWidth ? _width : _minWidth;
  }
  setStyle(_elementRef, '--winWidth', `${_width}px`);

  return _width;
}