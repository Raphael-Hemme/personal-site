import { Component, OnInit, OnDestroy } from '@angular/core';
import { WindowSizeService } from 'src/app/shared/services/window-size-service/window-size.service';
import { BehaviorSubject, interval, Observable, Subscription, tap, throttleTime } from 'rxjs';
import { DateTime } from 'luxon';
import p5 from 'p5';
import * as d3 from 'd3';
import _ from 'lodash';

interface SessionObj {
  timerIsRunning: boolean;
  completedSessionTime: number;
  date: undefined | string;
  startTime: undefined | DateTime;
  stopTime: undefined | DateTime;
  timer: {
    hours: number;
    minutes: number;
    seconds: number;
  }
}

interface ProfileObj {
  name: undefined | string;
  completedAggregateTime: number;
  chartDateRangeSetting: number
  sessions: SessionObj[];
}

type Mode = 'FOCUS' | 'HOME' | 'SETTINGS';


@Component({
  selector: 'app-mae-a001',
  templateUrl: './mae-a001.component.html',
  styleUrls: ['./mae-a001.component.scss']
})
export class MaeA001Component implements OnInit, OnDestroy {

  public isInFocusView = false;

  private currMode$$ = new BehaviorSubject<Mode>('HOME');
  public currMode: Mode = 'HOME';

  public resetWarningDialogIsOpen = false;

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
    name: undefined,
    completedAggregateTime: 0,
    chartDateRangeSetting: 30,
    sessions: [],
  }

  public dateRangeOptions = [7, 14, 30, 90, 180, 365, -1]

  // SESSION DATA
  public session: SessionObj = this.returnDefaultValuesForSession();
  public displayTimer = '';

  constructor(
    private windowSizeService: WindowSizeService
  ) {}

  ngOnInit(): void {
    this.profile = this.loadProfile();

    console.log('profile: ', this.profile)
    this.generateDisplayTimerStr();
    this.bootAndRenderD3Chart();

    this.subscriptions.add(
      this.currMode$$.subscribe(cMode => {
        this.currMode = cMode;
        if (cMode === 'FOCUS') {
          setTimeout(() => {
            this.bootUpP5();
            this.generateAndExecuteSketchAndCanvas()
          }, 0);
        }
      })
    )
    this.subscriptions.add(
      this.windowSizeService.windowResize$
      .pipe(
        throttleTime(50)
      )
      .subscribe(() => this.bootAndRenderD3Chart())
    )
  }


  ngOnDestroy(): void {
    if (this.canvas) {
      this.canvas.remove();
    }

    this.baseIntervalSub?.unsubscribe();
    this.subscriptions.unsubscribe();
  }

  public startSession(): void {
    if (this.session.timerIsRunning) {
      return;
    }

    console.log('session in start', this.session);

    this.session.startTime = DateTime.now()
    this.session.date = this.session.startTime.toFormat('yyyy-MM-dd');

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

    this.goIntoHomeMode();

    this.baseIntervalSub?.unsubscribe();
    this.circleRadius = 0;
  }

  private loadProfile(): ProfileObj {
    let result: ProfileObj;
    if (window.localStorage.getItem('focus-stream-profile')) {
      result = JSON.parse(window.localStorage.getItem('focus-stream-profile')!);
      if (typeof result.chartDateRangeSetting === 'string') {
        result.chartDateRangeSetting = Number(result.chartDateRangeSetting)
      }
    } else {
      result = {
        name: undefined,
        completedAggregateTime: 0,
        chartDateRangeSetting: 30,
        sessions: [],
      }
    }
    return result;
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

  private returnDefaultValuesForSession(): SessionObj {
     return {
      timerIsRunning: false,
      completedSessionTime: 0,
      date: undefined,
      startTime: undefined,
      stopTime: undefined,
      timer: {
        hours: 0,
        minutes: 5,
        seconds: 0
      }
    }
  }

  public goIntoFocusMode(): void {
    this.updateProfile();
    this.session = this.returnDefaultValuesForSession();
    setTimeout(() => this.currMode$$.next('FOCUS'), 10);
  }

  public goIntoHomeMode(): void {
    this.updateProfile();
    setTimeout(() => {
      this.currMode$$.next('HOME');
      this.bootAndRenderD3Chart();
    },0)
    console.log('this.profile.dateRange: ', this.profile.chartDateRangeSetting)
  }

  public goIntoSettingsMode(): void {
    this.currMode$$.next('SETTINGS');
  }

  private bootAndRenderD3Chart(): void {
    if (this.profile.sessions?.length > 0) {
      setTimeout(() => {
        const statisticsContainer = document.getElementById('statisticsContainer');
        const w = statisticsContainer?.offsetWidth;
        const h = statisticsContainer?.offsetHeight;
        this.generateD3Chart(w, h);
      }, 0);
    }
  }

  private countDownTimer(): void {
    if (this.session.timer.seconds > 0) {
      this.session.timer.seconds = this.session.timer.seconds - 1;
    } else if (this.session.timer.seconds === 0 && this.session.timer.minutes > 0) {
      this.session.timer.minutes = this.session.timer.minutes - 1;
      this.session.timer.seconds = 59;
    } else if (this.session.timer.minutes === 0 && this.session.timer.hours > 0) {
      this.session.timer.hours = this.session.timer.hours - 1;
      this.session.timer.minutes = 59;
    } else {
      console.log('timer finished')
      this.stopSession();
    }
  }
  
  public handleModelChangeOnHours(): void {
    this.generateDisplayTimerStr()
  }

  public handleModelChangeOnMinutes(): void {
    if (this.session.timer.minutes === 60) {
      this.session.timer.minutes = 0;
      this.session.timer.hours = this.session.timer.hours + 1
    }
    this.generateDisplayTimerStr()
  }

  public handleModelChangeOnSeconds(): void {
    if (this.session.timer.seconds === 60) {
      this.session.timer.seconds = 0;
      this.session.timer.minutes = this.session.timer.minutes + 1
    }
    this.generateDisplayTimerStr()
  }

  public generateDisplayTimerStr(): void {
    let result = '';
    this.session.timer.hours > 9 ? result += this.session.timer.hours : result += '0' + this.session.timer.hours;
    result += ' : '
    this.session.timer.minutes > 9 ? result += this.session.timer.minutes : result += '0' + this.session.timer.minutes
    result += ' : '
    this.session.timer.seconds > 9 ? result += this.session.timer.seconds : result += '0' + this.session.timer.seconds
    this.displayTimer = result;
  }

/*   public reload(): void {
    this.canvas.clear();
  } */

  public closeResetWarningDialog(): void {
    this.resetWarningDialogIsOpen = false;
  }

  public openResetWarningDialog(): void {
    this.resetWarningDialogIsOpen = true;
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

  private generateAndExecuteSketchAndCanvas(): void {
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

  private generateD3Chart(w = 500, h = 150): void {
    const sessions = this.generateDateRangeNormalizedSessions(this.profile.sessions, this.profile.chartDateRangeSetting)

    const maxColWidth = w / sessions.length;
    const colGap = maxColWidth / 5;
    const padding = h / 50;
    const colWidth = (w - colGap) / sessions.length - colGap;
    const maxYVal = d3.max(sessions, (session) => session.completedSessionTime) ?? h
    
    const yScale = d3.scaleLinear()
    .domain([0, maxYVal])
    .range([padding, h * 0.8 - padding])

    /* const xScale = d3.scaleLinear()
    .domain([0, sessions.length])
    .range([padding, w - padding]) */
    
    // const xAxis = d3.axisBottom(xScale)

    const alreadyExistingSvgNodeList = document.getElementsByTagName('svg');

    if (alreadyExistingSvgNodeList.length > 0) {
      for (let i = 0; i < alreadyExistingSvgNodeList.length; i++) {
        let node = alreadyExistingSvgNodeList[i];
        node.remove();
      }
    }

    const svg = d3.select('.statistics')
      .append('svg')
      .attr('width', w)
      .attr('height', h)

    const svgCols = svg.selectAll('rect')
      .data(sessions)
      .enter()
      .append('rect')
      .attr('x', (d, i) => i < 1 ? colGap : colGap + i * (colWidth + colGap))
      .attr('y', (d, i) => h - yScale(d.completedSessionTime))
      .attr('width', colWidth)
      .attr('height', (d, i) => {
        // console.log(yScale(d.completedSessionTime))
        return yScale(d.completedSessionTime) - padding
      })
      .attr('class', 'single-chart-column')
      .append('title')
      .text((d): string => {
        let result: string = d.date + ' : ';
        let currValStr: string =  d.completedSessionTime < 60 
        ? d.completedSessionTime + ' Sec.' 
        : (d.completedSessionTime / 60).toFixed(2) + ' Min.'
        result += currValStr;
        return result ;
      })

      // svgCols.on('click', (event) => console.log('test'))

    /* svg.append('g')
        .attr('transform', 'translate(0, ' + (h - padding) + ')')
        .call(xAxis); */

    /* svg.selectAll('text')
      .data(sessions)
      .enter()
      .append('text')
      .text((d, i) => `${d.date?.replaceAll('-', '.')}`)
      .attr('x', (d, i) => i < 1 ? colGap : colGap + i * (colWidth + colGap))
      .attr('y', 50)
      .attr('class', 'column-axis-labels') */

  }

  private generateDateRangeNormalizedSessions(sessions: SessionObj[], timeFrameInDays: number): SessionObj[] {
    const endDate = DateTime.now();
    let startDate: DateTime;
    if (timeFrameInDays === -1) {
      startDate = sessions[0].date ? DateTime.fromISO(sessions[0].date) : endDate.minus({'days': 7});
    } else {
      startDate = endDate.minus({'days': timeFrameInDays});
    }

    const result: SessionObj[] = [];

    const dateReducedSessionTimesArr = Object.values(_.groupBy(sessions, 'date'))
    .map(dateArr => {
      const resultObj = this.returnDefaultValuesForSession();
      resultObj.completedSessionTime = dateArr.reduce((prev, curr) => prev + curr.completedSessionTime, 0)
      resultObj.date = dateArr[0].date;
      return resultObj;
    })

    for (let i = startDate; i <= endDate; i = i.plus({'days': 1})) {
      if (dateReducedSessionTimesArr.some(el => el.date === i.toFormat('yyyy-MM-dd'))) {
        const currSessionObj = dateReducedSessionTimesArr.find(el => el.date === i.toFormat('yyyy-MM-dd')) as SessionObj
        result.push(currSessionObj);
      } else {
        const currSessionObj = this.returnDefaultValuesForSession();
        currSessionObj.date = i.toFormat('yyyy-MM-dd');
        result.push(currSessionObj)
      }
    }
    return result;
  }

}
