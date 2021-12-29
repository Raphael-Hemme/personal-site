import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WindowSizeService {

  private currIoExperimentHostContainer = 0;

  constructor() { }

  public getCurrentWindowInnerWidth(): number {
    return window.innerWidth;
  }

  public setCurrentIoExperimentHostContainerWidth(value: number): void {
    this.currIoExperimentHostContainer = value;
  }

  public getCurrentIoExperimentHostContainerWidth(): number {
    return this.currIoExperimentHostContainer;
  }
}
