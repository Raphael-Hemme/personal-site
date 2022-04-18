import { Component, OnInit } from '@angular/core';
import * as p5 from 'p5';
import { WindowSizeService } from '../../services/window-size-service/window-size.service';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent implements OnInit {

  public canvas: any;

  public canvWidth = 300;
  public canvHeight = 300;

  constructor(
    private windowSizeService: WindowSizeService
  ) {}

  ngOnInit() {

    const canvasConfig = {
      'isSquare': true,
      'wPercentS': 100,
      'wPercentL': 60,
      'hPercentS': 50,
      'hPercentL': 50
    }

    const canvSizeObj = this.windowSizeService.calculateCanvasSize(canvasConfig);
    this.canvWidth = canvSizeObj.w;
    this.canvHeight = canvSizeObj.h;

  

    this.windowSizeService.windowResize$.subscribe(() => {
      const canvSizeObj = this.windowSizeService.calculateCanvasSize(canvasConfig);
      this.canvWidth = canvSizeObj.w;
      this.canvHeight = canvSizeObj.h;

      console.log('this.canvWidth, this.canvHeight in subscription: ', this.canvWidth, this.canvHeight)

      this.canvas.clear();
      this.windowSizeService.triggerCanvasResize(this.canvas, canvasConfig);
    })

    const sketch = (s: p5) => {

      // CUSTOM FUNCTION DECLARATIONS
      const generateDotMatrix = () => {
        
      }


    
      // P5 SCRIPT
      s.setup = () => {
        console.log('this.canvWidth, this.canvHeight in setup: ', this.canvWidth, this.canvHeight)
        let canvas2 = s.createCanvas(this.canvWidth, this.canvHeight);
        canvas2.parent('le-a002-sketch-wrapper');
        s.frameRate(5);
      }

      s.draw = () => {
        s.background(100);

      }
    };

    this.canvas = new p5(sketch);
  }

  ngOnDestroy(): void {
    this.canvas.remove();
  }

  public navigateBackOrHome(): void {
    console.log('should navigate here.')
  }

}
