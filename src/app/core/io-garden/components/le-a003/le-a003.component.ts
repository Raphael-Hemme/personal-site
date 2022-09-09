import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterState } from '@angular/router';
import * as p5 from 'p5';
import { WindowSizeService } from 'src/app/shared/services/window-size-service/window-size.service';
import { Branch } from './branch';

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
  private tree: any[] = [];
  private count = 0;

  private amountCircleDir = 13;
  private angle = 360 / this.amountCircleDir;
  private seedRadius = this.canvHeight;

  private generationCounter = 0;

  private redrawBackground = false;


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

      const centerX = this.canvWidth / 2;
      const centerY = this.canvHeight / 2;

      s.setup = () => {
        let canvas2 = s.createCanvas(this.canvWidth, this.canvHeight);
        canvas2.parent('le-a003-sketch-wrapper');
        // s.angleMode(s.RADIANS);
        this.seedFirst(s);
        s.background(89, 89, 89)
      }

      s.draw = () => {
        if (this.redrawBackground) {
          s.background(89, 89, 89);
          this.toggleBackroundRedrawing();
        }
        for (let i = 0; i < this.amountCircleDir; i++) {
          for (let j = 0; j < this.trees[i].length; j++) {
            /* if (j > 0) {
              this.trees[i][j].show();
            } */
/*             if (j > 2) {
              this.trees[i][j].show();
            }  */

            this.trees[i][j].show();

          }
        }
        s.noLoop();
      }
    }
    this.canvas = new p5(sketch);
  }


  ngOnDestroy(): void {
    this.canvas.remove();
  }

  public saveSketch() {
    this.canvas.save(`${this.saveFileName}${this.saveCounter}.png`);
    this.saveCounter++
  }

  public reload() {
    // this.canvas.clear();
    this.trees = [];
    this.generationCounter = 0;
    this.seedFirst(this.canvas)
    this.toggleBackroundRedrawing();
    this.canvas.loop()
  }

  private toggleBackroundRedrawing(): void {
    this.redrawBackground = !this.redrawBackground;
  }

  public grow() {
    this.generationCounter++;

    for (let i = 0; i < this.amountCircleDir; i++) {
      for (let j = this.trees[i].length -1; j >= 0; j--) {
        if (!this.trees[i][j].finished) {
          this.trees[i].push(this.trees[i][j].branch(true, this.generationCounter));
          this.trees[i].push(this.trees[i][j].branch(false, this.generationCounter));
        }
        this.trees[i][j].finished = true;
      }
    }
    this.canvas.loop();
  }

  private seedFirst(s: p5) {
    for (let i = 0; i < this.amountCircleDir; i++) {

      const endX = s.cos(s.radians(this.angle * i)) * this.seedRadius / 3;
      const endY = s.sin(s.radians(this.angle * i)) * this.seedRadius / 3;
  
      let a = s.createVector(this.canvWidth / 2, this.canvHeight / 2);
      let b = s.createVector(endX + this.seedRadius, endY + this.seedRadius);
      
      let root = new Branch(a, b, s, this.generationCounter);
      this.trees.push([]);
      this.trees[i][0] = root;
    }
  }

}