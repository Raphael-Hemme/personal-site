import { Component, OnInit, OnDestroy } from '@angular/core';
import * as p5 from 'p5';
import { WindowSizeService } from 'src/app/shared/services/window-size-service/window-size.service';
import { interval, Subscription, tap } from 'rxjs';
import { DateTime } from 'luxon';

interface SessionObj {
  timerIsRunning: boolean;
  completedSessionTime: number;
  startTime: undefined | DateTime;
  stopTime: undefined | DateTime;
  timer: {
    hours: number;
    minutes: number;
    seconds: number;
  }
}

interface ProfileObj {
  id: undefined | string;
  name: undefined | string;
  completedAggregateTime: number;
  sessions: SessionObj[];
}


@Component({
  selector: 'app-mae-a001',
  templateUrl: './mae-a001.component.html',
  styleUrls: ['./mae-a001.component.scss']
})
export class MaeA001Component implements OnInit, OnDestroy {

  public isInFocusView = false;

  // CANVAS RELATED PROPERTIES
  public canvas: any;
  public canvWidth = 300;
  public canvHeight = 300;
  private circleRadius = 0;
  private circleGrowDir: 'GROW' | 'SHRINK' = 'GROW';


  // RXJS STUFF
  private baseInterval$ = interval(20);
  private baseIntervalSub: Subscription | null = null;
  private subscriptions: Subscription = new Subscription();

  // PROFILE DATA
  public profile: ProfileObj = {
    id: undefined,
    name: undefined,
    completedAggregateTime: 0,
    sessions: [],
  }

  // SESSION DATA
  public sessionRawTimer = 5;
  public session: SessionObj = {
    timerIsRunning: false,
    completedSessionTime: 0,
    startTime: undefined,
    stopTime: undefined,
    timer: {
      hours: 0,
      minutes: 5,
      seconds: 0
    }
  }
  public displayTimer = '';

  constructor(
    private windowSizeService: WindowSizeService
  ) {}

  ngOnInit(): void {

    this.loadProfile();
    this.bootUpP5();
    this.generateDisplayTimerStr();

    const sketch = (s: p5) => {
       s.setup = () => {
        let canvas2 = s.createCanvas(this.canvWidth, this.canvHeight);
        canvas2.parent('mae-a001-sketch-wrapper');
        s.background(240, 240, 240);
      };

      s.draw = () => {
        // s.background(240, 240, 240);
        s.background(35, 81, 116);

        if (this.session.timerIsRunning) {
           s.fill(186, 255, 41);
           s.noStroke();
          // s.stroke(35, 81, 116);
          // s.strokeWeight(2);
          //s.noFill();
          s.circle(this.canvWidth / 2, this.canvHeight / 2, this.circleRadius * 2);
        }
       
      }
    }

    this.canvas = new p5(sketch);
  }


  ngOnDestroy(): void {
    this.canvas.remove();

    this.baseIntervalSub?.unsubscribe();
    this.subscriptions.unsubscribe();
  }

  public startSession(): void {
    if (this.session.timerIsRunning) {
      return;
    }
    this.session.startTime = DateTime.now()

    this.session.timerIsRunning = true;
    this.isInFocusView = true;

    this.baseIntervalSub = this.baseInterval$
    .pipe(
      tap(val => {
        if ((val * 20) % 1000 === 0) {
          this.countDownTimer();
          this.generateDisplayTimerStr();
        }
      })
    )
    .subscribe(val => {
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
  }

  public stopSession(): void {
    if (!this.session.timerIsRunning) {
      return;
    }

    this.session.timerIsRunning = false;
    this.isInFocusView = false;

    this.session.stopTime = DateTime.now();
    this.session.completedSessionTime = Number(
      this.session.stopTime
      .diff(this.session.startTime!, 'seconds')
      .toFormat('s')
    );
    this.saveSession();
    this.updateProfile();

    console.log(this.profile.name)

    this.baseIntervalSub?.unsubscribe();
    this.circleRadius = 0;
  }

  private loadProfile(): void {
    if (window.localStorage.getItem('focus-stream-profile')) {
      this.profile = JSON.parse(window.localStorage.getItem('focus-stream-profile')!);
      console.log(JSON.parse(window.localStorage.getItem('focus-stream-profile')!));
    }
  }

  private saveSession(): void {
    this.profile.sessions.push(this.session);
    this.profile.completedAggregateTime = this.profile.completedAggregateTime + this.session.completedSessionTime
  }

  private updateProfile(): void {
    window.localStorage.setItem('focus-stream-profile', JSON.stringify(this.profile));
  }

  public resetProgress(): void {
    this.profile.completedAggregateTime = 0;
    this.profile.sessions = [];
    this.updateProfile();
  }

  private countDownTimer(): void {
    if (this.session.timer.seconds > 0) {
      this.session.timer.seconds = this.session.timer.seconds - 1;
    } else if (this.session.timer.seconds === 0 && this.session.timer.minutes > 0) {
      this.session.timer.minutes = this.session.timer.minutes - 1;
      this.session.timer.seconds = 60;
    } else if (this.session.timer.minutes === 0 && this.session.timer.hours > 0) {
      this.session.timer.hours = this.session.timer.hours - 1;
      this.session.timer.minutes = 60;
    } else {
      console.log('timer finished')
      this.stopSession();
    }
  }

  generateDisplayTimerStr(): void {
    let result = '';
    this.session.timer.hours > 9 ? result += this.session.timer.hours : result += '0' + this.session.timer.hours;
    result += ' : '
    this.session.timer.minutes > 9 ? result += this.session.timer.minutes : result += '0' + this.session.timer.minutes
    result += ' : '
    this.session.timer.seconds > 9 ? result += this.session.timer.seconds : result += '0' + this.session.timer.seconds
    this.displayTimer = result;
  }

  public reload(): void {
    this.canvas.clear();
  }

  private bootUpP5() {
    const canvasConfig = {
      'isSquare': true,
      'wPercentS': 100,
      'wPercentL': 50,
      'hPercentS': 50,
      'hPercentL': 50
    }

    const canvSizeObj = this.windowSizeService.calculateCanvasSize(canvasConfig);
    this.canvWidth = canvSizeObj.w;
    this.canvHeight = canvSizeObj.w;

    this.subscriptions.add(
      this.windowSizeService.windowResize$
      .subscribe(() => {
        const canvSizeObj = this.windowSizeService.calculateCanvasSize(canvasConfig);
        this.canvWidth = canvSizeObj.w;
        this.canvHeight = canvSizeObj.w;

        this.canvas.clear();

        this.windowSizeService.triggerCanvasResize(this.canvas, canvasConfig);
      })
    )
  }

}
