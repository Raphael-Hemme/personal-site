import { Injectable } from '@angular/core';

export interface CanvasSizeReturnObj {
  'width': number;
  'height': number;
}

export interface CanvasSizeParamObj {
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

  constructor() { }

  public getCurrentWindowInnerWidth(): number {
    return window.innerWidth;
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

  public calcCanvasSizeRelToMainContainerWidth(canvasSizeParamObj: CanvasSizeParamObj): CanvasSizeReturnObj {
      let canvWidth = 0;
      let canvHeight = 0;

      if (window.innerWidth >= 992) {
        canvWidth = this.currMainContainerWidth / 100 * canvasSizeParamObj.wPercentL;
        canvHeight = this.currMainContainerHeight / 100 * canvasSizeParamObj.hPercentL;
      } else {
        canvWidth = this.currMainContainerWidth / 100 * canvasSizeParamObj.wPercentS;
        canvHeight = this.currMainContainerHeight / 100 * canvasSizeParamObj.hPercentS;
      }

      return {
        width: canvWidth,
        height: canvHeight
      }
  }
}
