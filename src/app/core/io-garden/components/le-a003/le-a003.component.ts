import { Component, OnInit, OnDestroy } from '@angular/core';
import p5 from 'p5';
import { WindowSizeService } from 'src/app/shared/services/window-size-service/window-size.service';
import { Branch } from './branch';
import { debounceTime, delay, interval, Subscription, take } from 'rxjs'
import { DateTime } from 'luxon'
@Component({
    selector: 'app-le-a003',
    templateUrl: './le-a003.component.html',
    styleUrls: ['./le-a003.component.scss'],
    imports: []
})
export class LeA003Component implements OnInit, OnDestroy {

  public canvas: any;

  public canvWidth = 300;
  public canvHeight = 300;

  private saveFileName = 'le-a003-save-'

  private trees: any[][] = [];

  private amountCircleDir = 13;
  private angle = 360 / this.amountCircleDir;

  public generationCounter = 0;

  private redrawBackground = false;
  public isGrowing = false;

  private interval$ = interval(100);
  private subscriptions: Subscription = new Subscription();

  public autoGenerationNumber = 7;

  public growingIsDisabled = false;
  public showNoGrowWarning = false;

  private signatureImg: any;
  private signatureInsertionTrigger = false;
  private signatureInsertionTriggerPrev = false;

  private windowWidth = window.innerWidth;


  constructor(
    private windowSizeService: WindowSizeService
  ) {}

  ngOnInit(): void {

    const canvasConfig = {
      'isSquare': true,
      'wPercentS': 100,
      'wPercentL': 60,
      'hPercentS': 50,
      'hPercentL': 50
    }

    const canvSizeObj = this.windowSizeService.calculateCanvasSize(canvasConfig);
    this.canvWidth = canvSizeObj.w;
    this.canvHeight = canvSizeObj.w;

    this.subscriptions.add(
      this.windowSizeService.windowResize$
      .pipe(
        debounceTime(800)
      )
      .subscribe((event) => {
        if (event?.target?.innerWidth === this.windowWidth) {
          return
        }
        this.windowWidth = window.innerWidth;
        
        const canvSizeObj = this.windowSizeService.calculateCanvasSize(canvasConfig);
        this.canvWidth = canvSizeObj.w;
        this.canvHeight = canvSizeObj.w;
  
        this.canvas.clear();
  
        this.windowSizeService.triggerCanvasResize(this.canvas, canvasConfig);
        this.reload()
      })
    );

    const sketch = (s: p5) => {

      s.preload = () => {
        this.signatureImg = s.loadImage('assets/images/own-logo/RH-Logo-06-watermark.png')
      }

      s.setup = () => {
        let canvas2 = s.createCanvas(this.canvWidth, this.canvHeight);
        canvas2.parent('le-a003-sketch-wrapper');
        this.seedFirst(s);
        s.background(89, 89, 89);
      }

      s.draw = () => {
        if (this.redrawBackground) {
          s.background(89, 89, 89);
          this.toggleBackroundRedrawing();
        }

        if (this.signatureInsertionTrigger) {
          s.push();
            s.tint(255, 50)
            s.image(
              this.signatureImg,
              this.canvWidth - 70,
              this.canvHeight -70,
              50,
              50
            );
          s.pop();
          // s.noLoop();
          this.signatureInsertionTriggerPrev = this.signatureInsertionTrigger;
          this.signatureInsertionTrigger = false;
        }
        
        // This setTimeout-0 workaround is unfortunately the only working solution I could find so far that prevents the first gen (the root) 
        // to be drawn with full opacity after a reload (especially on window resize and only on Safari).
        // -> Tried to fix it with various combinations of delays and timeouts in the call stack of the grow and growNTimesOnInterval as well 
        // as the reload methods but pushing the whole show loop inside the draw function to the callback queue so far is the only working fix.
        setTimeout(() => {
          if (!this.signatureInsertionTrigger && !this.signatureInsertionTriggerPrev) {
            for (let i = 0; i < this.amountCircleDir; i++) {
              for (let j = 0; j < this.trees[i].length; j++) {
                this.trees[i][j].show();
              }
            }
          }
        }, 0)
        
        s.noLoop();
      }
    }
    this.canvas = new p5(sketch);
  }


  ngAfterViewInit(): void {
    this.growNTimesOnInterval(this.autoGenerationNumber);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
    this.canvas.remove();
  }

  public saveSketch() {
    this.signatureInsertionTrigger = true;
    this.canvas.loop();

    const currTimeStampStr: string = DateTime.now().toFormat('yyyy-LL-dd-HH-mm-ss')
    this.canvas.save(`${this.saveFileName}${currTimeStampStr}.png`);

    this.signatureInsertionTrigger = false;
    this.signatureInsertionTriggerPrev = false;
  }

  public reload() {
    this.canvas.clear();

    this.growingIsDisabled = false;
    this.generationCounter = 0;
    this.trees = [];

    this.signatureInsertionTrigger = false;
    this.signatureInsertionTriggerPrev = false;

    this.toggleBackroundRedrawing();

    this.seedFirst(this.canvas);    
    this.growNTimesOnInterval(this.autoGenerationNumber)
  }

  private toggleBackroundRedrawing(): void {
    this.redrawBackground = !this.redrawBackground;
  }

  public grow() {
    if (this.growingIsDisabled || this.generationCounter > 11) {
      this.growingIsDisabled = true;
      this.showNoGrowWarning = true;
      return
    }
    this.generationCounter++;

    this.isGrowing = true;
    for (let i = 0; i < this.amountCircleDir; i++) {
      for (let j = this.trees[i].length -1; j >= 0; j--) {
        if (!this.trees[i][j].finished) {
          this.trees[i].push(this.trees[i][j].branch(true, this.generationCounter));
          this.trees[i].push(this.trees[i][j].branch(false, this.generationCounter));
        }
        this.trees[i][j].finished = true;

        if (i === this.amountCircleDir - 1 && j === 1) {
          this.isGrowing = false;
        }
      }
    }
    this.canvas.loop();
  }

  private seedFirst(s: p5) {
    const seedRadius = this.canvHeight / 20;
    let i = 0

    for (let angle = 360; angle < 720; angle += this.angle) {
      const outerEndX = s.cos(s.radians(angle)) * seedRadius;
      const outerEndY = s.sin(s.radians(angle)) * seedRadius;

      let a = s.createVector(this.canvWidth / 2, this.canvHeight / 2);
      let b = s.createVector(outerEndX + seedRadius * 10, outerEndY + seedRadius * 10);
      
      let root = new Branch(a, b, s, this.generationCounter);
      this.trees.push([]);
      this.trees[i][0] = root;
      i++;
    }
  }

  private growNTimesOnInterval(n: number): void {
    this.subscriptions.add(
      this.interval$.pipe(
        delay(50),
        take(n)
      ).subscribe(() => {
        this.grow();
      })
    )
  }

  public hideNoGrowWarning() {
    this.showNoGrowWarning = false;
  }

}