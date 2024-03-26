import { Injectable } from '@angular/core';
import { 
  BehaviorSubject, 
  Observable, 
  debounceTime, 
  fromEvent, 
  switchMap, 
  tap 
} from 'rxjs';

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
      debounceTime(50)
    );
  public currWindowWidth$: BehaviorSubject<number> = new BehaviorSubject(this.getContentContainerWidth());
  public currWindowHeight$: BehaviorSubject<number> = new BehaviorSubject(window.innerHeight);

  constructor() { }

/*   public getCurrentWindowInnerWidth(): number {
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
  } */

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
    const contentContainerWidth = this.getContentContainerWidth();

    const result = {
      w: 0,
      h: 0
    }
    
    if (contentContainerWidth <= 768) {
      result.w = ((contentContainerWidth / 100) * canvasConfig.wPercentS) - 20;
      result.h = ((window.innerHeight / 100) * canvasConfig.hPercentS);
    } else {
      result.w = ((contentContainerWidth / 100) * canvasConfig.wPercentL) - 140;
      result.h = ((window.innerHeight / 100) * canvasConfig.hPercentL);
    } 

    if (canvasConfig.isSquare) {
      result.h = result.w;
    }
    
    return result
  }

  private getContentContainerWidth(): number {
    const userAgent = navigator.userAgent;
    const isWindows = userAgent.search('Windows') !== -1;

    const actualWidth = document.getElementById('sidenavContentContainer')?.offsetWidth ?? window.innerWidth;

    if (isWindows && !actualWidth) {
      return window.innerWidth - 16;
    } else {
      return actualWidth
    }
  }
}
