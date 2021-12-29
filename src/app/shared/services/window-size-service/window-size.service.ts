import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WindowSizeService {

  private currMainContainerWidth = 0;

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
}
