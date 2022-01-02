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

      console.log(this.currMainContainerWidth)

      if (window.innerWidth >= 992) {
        // Subtract 10px from actual width * percent to handle padding-right of 10px and have a fluid canvas
        canvWidth = this.currMainContainerWidth / 100 * canvasSizeParamObj.wPercentL - 10;
        // canvWidth = this.currMainContainerWidth / 100 * canvasSizeParamObj.wPercentL;
        canvHeight = this.currMainContainerHeight / 100 * canvasSizeParamObj.hPercentL;
      } else if (window.innerWidth > 720 && window.innerWidth < 992) {
        // Subtract 10px from actual width * percent to handle padding-right of 10px and have a fluid canvas
        console.log(this.currMainContainerWidth)
        canvWidth = this.currMainContainerWidth / 100 * canvasSizeParamObj.wPercentL - 35;
        // canvWidth = this.currMainContainerWidth / 100 * canvasSizeParamObj.wPercentL;
        canvHeight = this.currMainContainerHeight / 100 * canvasSizeParamObj.hPercentL;
      } else {
        // Subtract 20px from actual width * percent to handle padding on both sides of 10px and have a fluid canvas
        // canvWidth = this.currMainContainerWidth / 100 * canvasSizeParamObj.wPercentS - 20;
        canvWidth = this.currMainContainerWidth / 100 * canvasSizeParamObj.wPercentS - 20;
        canvHeight = this.currMainContainerHeight / 100 * canvasSizeParamObj.hPercentS;
      }

      return {
        width: canvWidth,
        height: canvHeight
      }
  }
}
