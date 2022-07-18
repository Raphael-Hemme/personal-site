import { Component, OnInit, OnDestroy } from '@angular/core';
import * as p5 from 'p5';
import _ from 'lodash';
import { WindowSizeService } from 'src/app/shared/services/window-size-service/window-size.service';
import { delay, interval, Subscription } from 'rxjs';

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

  private circleRadius = 0;
  private circleGrowDir: 'GROW' | 'SHRINK' = 'GROW';


  // MEDITATION APP LOGIC RELATED PROPERTIES
  private completedSessionTime = 0;
  private completedAggregateTime = 0;
                    // [h, m, s]
  private focusTimer = [0, 0, 0];
  private baseInterval$ = interval(20);
  private elapsedSecondsInterval$ = interval(1000);

  private subscriptions: Subscription = new Subscription();



  constructor(
    private windowSizeService: WindowSizeService
  ) {}

  ngOnInit(): void {

    const canvasConfig = {
      'isSquare': false,
      'wPercentS': 100,
      'wPercentL': 50,
      'hPercentS': 50,
      'hPercentL': 50
    }

    const canvSizeObj = this.windowSizeService.calculateCanvasSize(canvasConfig);
    this.canvWidth = canvSizeObj.w;
    this.canvHeight = canvSizeObj.w  * 0.36;
    console.log(this.canvHeight, this.canvWidth)


    this.subscriptions.add(
      this.windowSizeService.windowResize$
      .subscribe(() => {
        const canvSizeObj = this.windowSizeService.calculateCanvasSize(canvasConfig);
        this.canvWidth = canvSizeObj.w;
        this.canvHeight = canvSizeObj.w * 0.36;

        this.canvas.clear();

        this.windowSizeService.triggerCanvasResize(this.canvas, canvasConfig);
      })
    )
    this.subscriptions.add(
      this.baseInterval$.subscribe(val => {
        if ((val * 20) % 5000 === 0 && (val * 20) % 10000 !== 0 && this.circleGrowDir === 'GROW') {
          this.circleGrowDir = 'SHRINK';
        } else if ((val * 20) % 10000 === 0 && this.circleGrowDir === 'SHRINK') {
          this.circleGrowDir = 'GROW';
        } 

        if (this.circleGrowDir === 'GROW') {
          this.circleRadius = this.circleRadius + 0.3;
        };
        if (this.circleGrowDir === 'SHRINK') {
          this.circleRadius = this.circleRadius - 0.3;
        }

        console.log('growDir: ', this.circleGrowDir)
        console.log(this.circleRadius);
      })
    )
    this.subscriptions.add(
      this.elapsedSecondsInterval$.subscribe(val => {
          console.log(val);
      })
    )
    

    const sketch = (s: p5) => {

      // P5 SCRIPT

       s.setup = () => {
        let canvas2 = s.createCanvas(this.canvWidth, this.canvHeight);
        canvas2.parent('mae-a001-sketch-wrapper');
        s.background(240, 240, 240);
      };

      s.draw = () => {
        

        s.background(240, 240, 240, 25);
        
        s.stroke(186, 255, 41);
        s.strokeWeight(1);
        s.noFill();
        s.circle(this.canvWidth / 2, this.canvHeight / 2, this.circleRadius * 2);
      }
    }

    this.canvas = new p5(sketch);
  }


  ngOnDestroy(): void {
    this.canvas.remove();
    this.subscriptions.unsubscribe();
  }

  public saveSketch() {
    
  }

  public reload() {
    this.canvas.clear();
  }

}
