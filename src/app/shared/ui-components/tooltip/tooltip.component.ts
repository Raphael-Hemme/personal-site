import { Component } from '@angular/core';

@Component({
    selector: 'app-tooltip',
    imports: [],
    templateUrl: './tooltip.component.html',
    styleUrl: './tooltip.component.scss'
})
export class TooltipComponent {

  private _tooltipText: string = '';

  public get tooltipText(): string {
    return this._tooltipText;
  }
  
  public set tooltipText(value: string) {
    this._tooltipText = value;
  }

  private _left: number = 0;

  public get left(): number {
    return this._left;
  }

  public set left(value: number) {
    this._left = value;
  }

  private _top: number = 0;

  public get top(): number {
    return this._top;
  }

  public set top(value: number) {
    this._top = value;
  }
}
