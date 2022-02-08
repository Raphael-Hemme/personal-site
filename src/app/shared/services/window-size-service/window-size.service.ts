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

/*   public calcCanvasSizeRelToMainContainerWidth(canvasSizeParamObj: CanvasSizeParamObj): CanvasSizeReturnObj {
      let canvWidth = 0;
      let canvHeight = 0;

      console.log(this.currMainContainerWidth)

      if (window.innerWidth >= 992) {
        canvWidth = this.currMainContainerWidth / 100 * canvasSizeParamObj.wPercentL - 10;
        canvHeight = this.currMainContainerHeight / 100 * canvasSizeParamObj.hPercentL;
      } else if (window.innerWidth > 720 && window.innerWidth < 992) {
        canvWidth = this.currMainContainerWidth / 100 * canvasSizeParamObj.wPercentL - 35;
        canvHeight = this.currMainContainerHeight / 100 * canvasSizeParamObj.hPercentL;
      } else {
        canvWidth = this.currMainContainerWidth / 100 * canvasSizeParamObj.wPercentS - 20;
        canvHeight = this.currMainContainerHeight / 100 * canvasSizeParamObj.hPercentS;
      }

      return {
        w: canvWidth,
        h: canvHeight
      }
  } */

  public triggerCanvasResize(canvas: any, canvasConfig: CanvasConfigObj): void {

    const canvSizeObj = this.calculateCanvasSize(canvasConfig);
    let canvWidth = canvSizeObj.w;
    let canvHeight = canvSizeObj.h;

    canvas.resizeCanvas(canvWidth, canvHeight);
  }

  public calculateCanvasSize(canvasConfig: CanvasConfigObj): CanvasSizeReturnObj {
    const result = {
      w: 0,
      h: 0
    }

    if (window.innerWidth <= 768) {
      result.w = ((window.innerWidth / 100) * canvasConfig.wPercentS) - 35;
      result.h = ((window.innerHeight / 100) * canvasConfig.hPercentS);
    } else {
      result.w = ((window.innerWidth / 100) * canvasConfig.wPercentL) - 195;
      result.h = ((window.innerHeight / 100) * canvasConfig.hPercentL);
    }

    if (canvasConfig.isSquare) {
      result.h = result.w;
    }
    
    return result
  }
}
