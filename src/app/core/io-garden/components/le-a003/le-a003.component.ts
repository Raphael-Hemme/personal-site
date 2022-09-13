import { Component, OnInit, OnDestroy } from '@angular/core';
import * as p5 from 'p5';
import { WindowSizeService } from 'src/app/shared/services/window-size-service/window-size.service';
import { Branch } from './branch';
import { interval, Subscription, take } from 'rxjs'
 
@Component({
  selector: 'app-le-a003',
  templateUrl: './le-a003.component.html',
  styleUrls: ['./le-a003.component.scss']
})
export class LeA003Component implements OnInit, OnDestroy {

  public canvas: any;

  public canvWidth = 300;
  public canvHeight = 300;

  private saveFileName = 'le-a003-save-'
  private saveCounter = 1

  private trees: any[][] = [];

  private amountCircleDir = 13;
  private angle = 360 / this.amountCircleDir;
  private seedRadius = this.canvHeight;

  private generationCounter = 0;

  private redrawBackground = false;
  public isGrowing = false;

  private interval$ = interval(100);
  private subscriptions: Subscription = new Subscription();

  public autoGenerationNumber = 10;

  public growingIsDisabled = false


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
    console.log(this.canvHeight, this.canvWidth)


    this.windowSizeService.windowResize$.subscribe(() => {
      const canvSizeObj = this.windowSizeService.calculateCanvasSize(canvasConfig);
      this.canvWidth = canvSizeObj.w;
      this.canvHeight = canvSizeObj.w;

      this.canvas.clear();

      this.windowSizeService.triggerCanvasResize(this.canvas, canvasConfig);
    })

    const sketch = (s: p5) => {

      s.setup = () => {
        let canvas2 = s.createCanvas(this.canvWidth, this.canvHeight);
        canvas2.parent('le-a003-sketch-wrapper');
        this.seedFirst(s);
        s.background(89, 89, 89);
        // s.background(100, 100, 100);
      }

      s.draw = () => {
        if (this.redrawBackground) {
          s.background(89, 89, 89);
          // s.background(100, 100, 100);
          this.toggleBackroundRedrawing();
        }

        for (let i = 0; i < this.amountCircleDir; i++) {
          for (let j = 0; j < this.trees[i].length; j++) {
            this.trees[i][j].show();
          }
        }
        s.noLoop();
      }
    }
    this.canvas = new p5(sketch);
  }


  ngAfterViewInit(): void {
    this.growNTimesOnInterval(this.autoGenerationNumber);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe;
    this.canvas.remove();
  }

  public saveSketch() {
    this.canvas.save(`${this.saveFileName}${this.saveCounter}.png`);
    this.saveCounter++
  }

  public reload() {
    this.trees = [];
    this.generationCounter = 0;
    this.growingIsDisabled = false;
    this.seedFirst(this.canvas);
    this.toggleBackroundRedrawing();
    this.canvas.loop();
    this.growNTimesOnInterval(this.autoGenerationNumber);
  }

  private toggleBackroundRedrawing(): void {
    this.redrawBackground = !this.redrawBackground;
  }

  public grow() {
    if (this.growingIsDisabled || this.generationCounter > 11) {
      // console.log('Sorry! Growing further is to dangerous and compute intensive.')
      this.growingIsDisabled = true;
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
          console.log('now')
          this.isGrowing = false;
        }
      }
    }
    
    this.canvas.loop();
  }

  private seedFirst(s: p5) {
    for (let i = 0; i < this.amountCircleDir; i++) {

      // const endX = s.cos(s.radians(this.angle * i)) * this.seedRadius / 3;
      // const endY = s.sin(s.radians(this.angle * i)) * this.seedRadius / 3;
  
      /* const outerEndX = s.cos(s.radians(this.angle * i)) * this.seedRadius / 3.5;
      const outerEndY = s.sin(s.radians(this.angle * i)) * this.seedRadius / 3.5; */

      const outerEndX = s.cos(s.radians(this.angle * i)) * this.seedRadius / 30;
      const outerEndY = s.sin(s.radians(this.angle * i)) * this.seedRadius / 30;

      let a = s.createVector(this.canvWidth / 2, this.canvHeight / 2);
      let b = s.createVector(outerEndX + this.seedRadius, outerEndY + this.seedRadius);
      
      let root = new Branch(a, b, s, this.generationCounter);
      this.trees.push([]);
      this.trees[i][0] = root;
    }
  }

  private growNTimesOnInterval(n: number): void {
    this.subscriptions.add(
      this.interval$.pipe(
        take(n)
      ).subscribe(() => {
        console.log(this.generationCounter);
        this.grow();
      })
    )
  }

}