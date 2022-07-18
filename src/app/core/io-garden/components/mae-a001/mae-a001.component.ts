import { Component, OnInit, OnDestroy } from '@angular/core';
import * as p5 from 'p5';
import _ from 'lodash';
import { WindowSizeService } from 'src/app/shared/services/window-size-service/window-size.service';

@Component({
  selector: 'app-mae-a001',
  templateUrl: './mae-a001.component.html',
  styleUrls: ['./mae-a001.component.scss']
})
export class MaeA001Component implements OnInit {


  // CANVAS RELATED PROPERTIES
  public canvas: any;
  public canvWidth = 300;
  public canvHeight = 300;


  // MEDITATION APP LOGIC RELATED PROPERTIES
  private completedSessionTime = 0;
  private completedAggregateTime = 0;
                    // [h, m, s]
  private focusTimer = [0, 0, 0];



  constructor(
    private windowSizeService: WindowSizeService
  ) {}

  ngOnInit(): void {

    const canvasConfig = {
      'isSquare': false,
      'wPercentS': 100,
      'wPercentL': 100,
      'hPercentS': 50,
      'hPercentL': 50
    }

    const canvSizeObj = this.windowSizeService.calculateCanvasSize(canvasConfig);
    this.canvWidth = canvSizeObj.w;
    this.canvHeight = canvSizeObj.w  * 0.36;
    console.log(this.canvHeight, this.canvWidth)


    this.windowSizeService.windowResize$.subscribe(() => {
      const canvSizeObj = this.windowSizeService.calculateCanvasSize(canvasConfig);
      this.canvWidth = canvSizeObj.w;
      this.canvHeight = canvSizeObj.w * 0.36;

      this.canvas.clear();

      this.windowSizeService.triggerCanvasResize(this.canvas, canvasConfig);
    })

    const sketch = (s: p5) => {

      // P5 SCRIPT
      s.draw = () => {
        // console.log('this.canvWidth, this.canvHeight in setup: ', this.canvWidth, this.canvHeight)
        let canvas2 = s.createCanvas(this.canvWidth, this.canvHeight);
        canvas2.parent('mae-a001-sketch-wrapper');

        s.colorMode(s.HSL)
        s.background(150);

      }
    }

    this.canvas = new p5(sketch);
  }


  ngOnDestroy(): void {
    this.canvas.remove();
  }

  public saveSketch() {
    
  }

  public reload() {
    this.canvas.clear();
  }

}
