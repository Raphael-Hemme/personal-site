import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, fromEvent, switchMap, startWith, tap } from 'rxjs';

export interface CanvasSizeReturnObj {
  'w': number;
  'h': number;
}

export interface CanvasConfigObj {
  'isSquare': boolean;
  'wPercentS': number;
  'wPercentL': number;
  'hPercentS': number;
  'hPercentL': number;
}


@Injectable({
  providedIn: 'root'
})
export class WindowSizeService {

  private currMainContainerWidth = 0;
  private currMainContainerHeight = 0;

  public windowResize$: Observable<any> = fromEvent(window, 'resize');
  public currWindowWidth$: BehaviorSubject<number> = new BehaviorSubject(window.innerWidth);
  public currWindowHeight$: BehaviorSubject<number> = new BehaviorSubject(window.innerHeight);

  constructor() { }

  public getCurrentWindowInnerWidth(): number {
    return window.innerWidth;
  }

  public getDynamicWindowInnerWidth(): Observable<number> {
    return this.windowResize$.pipe(
      tap(() => {
        this.currWindowWidth$.next(window.innerWidth)
      }),
      switchMap(() => {
        return this.currWindowWidth$
      })
    )
  }

  public setCurrentMainContainerWidth(value: number): void {
    this.currMainContainerWidth = value;
  }

  public getCurrentMainContainerWidth(): number {
    return this.currMainContainerWidth;
  }

  public setCurrentMainContainerHeight(value: number): void {
    this.currMainContainerHeight = value;
    // console.log('setting mainContentHeight to: ', value);
  }

  public getCurrentMainContainerHeight(): number {
    return this.currMainContainerHeight;
  }

  public triggerCanvasResize(canvas: any, canvasConfig: CanvasConfigObj): void {

    const canvSizeObj = this.calculateCanvasSize(canvasConfig);
    let canvWidth = canvSizeObj.w;
    let canvHeight = canvSizeObj.h;

    canvas.resizeCanvas(canvWidth, canvHeight);
    // canvas.redraw();
  }

  public calculateCanvasSize(canvasConfig: CanvasConfigObj): CanvasSizeReturnObj {
    const result = {
      w: 0,
      h: 0
    }

    
    if (window.innerWidth <= 768) {
      result.w = ((window.innerWidth / 100) * canvasConfig.wPercentS) - 35;
      result.h = ((window.innerHeight / 100) * canvasConfig.hPercentS);
    } else if (window.innerWidth > 768 && window.innerWidth < 1200) {
      // result.w = ((window.innerWidth / 100) * canvasConfig.wPercentL) - 195;
      result.w = ((window.innerWidth / 100) * canvasConfig.wPercentL) - 175;
      result.h = ((window.innerHeight / 100) * canvasConfig.hPercentL);
    } else {
      if (!canvasConfig.isSquare) {
        result.w = 1005;
      } else {
        result.w = (1005 / 100) * canvasConfig.wPercentL;
      }
       
      // 1005px is the hard coded size of the main-content-container on windowInnerwidth of 1200 and up. 
      // 1005 because it is the dynamic size before the breakpoint gets activated -> prevents size glitches. 
      result.h = ((window.innerHeight / 100) * canvasConfig.hPercentL);
    }

    if (canvasConfig.isSquare) {
      result.h = result.w;
    }
    
    return result
  }
}
