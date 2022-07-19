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

  public timerIsRunning = false;
  
  private baseInterval$ = interval(20);
  private baseIntervalSub: Subscription | null = null;

  private elapsedSecondsInterval$ = interval(1000);
  private elapsedSecondsIntervalSub: Subscription | null = null;

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
    
    

    const sketch = (s: p5) => {
       s.setup = () => {
        let canvas2 = s.createCanvas(this.canvWidth, this.canvHeight);
        canvas2.parent('mae-a001-sketch-wrapper');
        s.background(240, 240, 240);
      };

      s.draw = () => {
        // s.background(240, 240, 240);
        s.background(35, 81, 116);

        if (this.timerIsRunning) {
           s.stroke(186, 255, 41);
          // s.stroke(35, 81, 116);
          s.strokeWeight(2);
          s.noFill();
          s.circle(this.canvWidth / 2, this.canvHeight / 2, this.circleRadius * 2);
        }
       
      }
    }

    this.canvas = new p5(sketch);
  }


  ngOnDestroy(): void {
    this.canvas.remove();

    this.baseIntervalSub?.unsubscribe();
    this.elapsedSecondsIntervalSub?.unsubscribe();
  }

  public startSession() {
    if (this.timerIsRunning) {
      return;
    }
    this.timerIsRunning = true;
    this.baseIntervalSub = this.baseInterval$.subscribe(val => {
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
    })
  
    this.elapsedSecondsIntervalSub = this.elapsedSecondsInterval$.subscribe(val => {
        console.log(val);
        if (this.focusTimer[2] < 59) {
          this.focusTimer[2] = this.focusTimer[2] + 1;
        } else if (this.focusTimer[2] === 59) {
          this.focusTimer[2] = 0;
          if (this.focusTimer[1] < 59 ) {
            this.focusTimer[1] = this.focusTimer[1] + 1;
          } else if (this.focusTimer[1] === 59) {
            this.focusTimer[1] = 0;
            this.focusTimer[0] = this.focusTimer[0] + 1;
          }
        }
        console.log(this.focusTimer)
    })
  }

  public stopSession() {
    if (!this.timerIsRunning) {
      return;
    }
    this.timerIsRunning = false;
    this.baseIntervalSub?.unsubscribe();
    this.elapsedSecondsIntervalSub?.unsubscribe();
    this.circleRadius = 0;
  }

  public reload() {
    this.canvas.clear();
  }

}
