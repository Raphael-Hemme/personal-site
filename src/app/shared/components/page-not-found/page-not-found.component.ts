import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import p5 from 'p5';
import { WindowSizeService } from '../../services/window-size-service/window-size.service';
import { Subscription } from 'rxjs';
import { LoadingService } from '../../services/loading-service/loading.service';


interface DotMatrixPoint {
  posX: number;
  posY: number;
  active: boolean;
}

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent implements OnInit, AfterViewInit, OnDestroy {

  public canvas: any;

  public canvWidth = 300;
  public canvHeight = 300;

  private dotMatrixArr: DotMatrixPoint[] = [];
  private subscriptions: Subscription = new Subscription();

  constructor(
    private windowSizeService: WindowSizeService,
    private router: Router,
    private loadingService: LoadingService
  ) {}

  ngOnInit() {

    const canvasConfig = {
      'isSquare': false,
      'wPercentS': 100,
      'wPercentL': 100,
      'hPercentS': 30,
      'hPercentL': 40
    }

    const canvSizeObj = this.windowSizeService.calculateCanvasSize(canvasConfig);
    this.canvWidth = canvSizeObj.w;
    this.canvHeight = canvSizeObj.h;

  
    this.subscriptions.add(
      this.windowSizeService.windowResize$.subscribe(() => {
        const canvSizeObj = this.windowSizeService.calculateCanvasSize(canvasConfig);
        this.canvWidth = canvSizeObj.w;
        this.canvHeight = canvSizeObj.h;
  
        // console.log('this.canvWidth, this.canvHeight in subscription: ', this.canvWidth, this.canvHeight)
  
        this.canvas.clear();
        this.windowSizeService.triggerCanvasResize(this.canvas, canvasConfig);
      })
    );

    const sketch = (s: p5) => {
      // P5 SCRIPT
      s.setup = () => {
        let canvas2 = s.createCanvas(this.canvWidth, this.canvHeight);
        canvas2.parent('page-not-found-sketch-wrapper');
        s.frameRate(7);
      }

      s.draw = () => {
        // s.background('rgba(119, 172, 162, 0.6)');
        s.background('rgba(63, 162, 164, 0.6)');
        this.dotMatrixArr = this.generateDotMatrix(s);
        for (let dot of this.dotMatrixArr) {
          if (!dot.active) {
            continue;
          } else {
            s.strokeWeight(5);
            s.stroke('rgba(0, 0, 0, 0)')
            s.fill('rgba(114, 233, 220, 0.8)')
            s.circle(dot.posX, dot.posY, 10)
          }
        }
      }
    };

    this.canvas = new p5(sketch);
  }

  ngAfterViewInit() {
    this.loadingService.emitAfterViewInitSignal('PAGE-NOT-FOUND');
  }

  ngOnDestroy(): void {
    this.canvas.remove();
    this.subscriptions.unsubscribe();
  }

  private generateDotMatrix (s: p5): DotMatrixPoint[] {
    const resultArr = []
    for (let x = 10; x < this.canvWidth -5; x += 20) {
      for (let y = 10; y < this.canvHeight -5; y += 20) {
        resultArr.push({
          posX: x,
          posY: y,
          active: s.random(0, 1) > 0.85
        })
      }
    }
    return resultArr;
  }

  public navigateHome(): void {
    this.router.navigate(['/']);
  }

}
