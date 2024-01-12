import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, debounceTime, fromEvent, switchMap, tap, throttleTime } from 'rxjs';

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

  public windowResize$: Observable<any> = fromEvent(window, 'resize')
    .pipe(
      debounceTime(200)
    );
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
  }

  public getCurrentMainContainerHeight(): number {
    return this.currMainContainerHeight;
  }

  public triggerCanvasResize(canvas: any, canvasConfig: CanvasConfigObj): void {

    const canvSizeObj = this.calculateCanvasSize(canvasConfig);
    let canvWidth = canvSizeObj.w;
    let canvHeight = canvSizeObj.h;

    canvas.resizeCanvas(canvWidth, canvHeight);
    canvas.redraw();
  }

  public calculateCanvasSize(canvasConfig: CanvasConfigObj): CanvasSizeReturnObj {
    const result = {
      w: 0,
      h: 0
    }
    
    if (window.innerWidth <= 768) {
      result.w = ((window.innerWidth / 100) * canvasConfig.wPercentS) - 20;
      result.h = ((window.innerHeight / 100) * canvasConfig.hPercentS);
    } else {
      // result.w = ((window.innerWidth / 100) * canvasConfig.wPercentL) - 195;
      result.w = ((window.innerWidth / 100) * canvasConfig.wPercentL) - 140;
      result.h = ((window.innerHeight / 100) * canvasConfig.hPercentL);
    } 

    if (canvasConfig.isSquare) {
      result.h = result.w;
    }
    
    return result
  }
}
