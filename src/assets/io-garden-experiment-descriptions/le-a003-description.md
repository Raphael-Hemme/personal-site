### Description

Lichen Experiment - A003 (`LE-A003`) aka 'BroccoLichens' is a completely new approach at drawing lichens with p5.js.
The sketch builds on fractal trees and a fantastic tutorial by Danial Schiffman of Coding Train fame. Essentially, I take a fractal tree, multiply it a few times and then rotate those trees around the center of the canvas until the angles between the trees add up to 360 degrees. 
<br/><br/>

#### le-a003.component.ts
```typescript
import { Component, OnInit, OnDestroy } from '@angular/core';
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
  // private tree: any[] = [];
  // private count = 0;

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
    if (this.generationCounter > 11) {
      console.log('Sorry! Growing further is to dangerous and compute intensive.')
      return
    }
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

```

#### branch.ts
```typescript
import p5 from "p5";

export class Branch {
    begin
    end
    finished: boolean;
    private generation: number;
    s
    private currHslaArr = this.increaseColorAlphaOnIteration([162, 23, 61, 0.0], 0)

    constructor(begin: any, end: any, sketch: p5, generation: number) {
        this.begin = begin;
        this.end = end;
        this.finished = false;
        this.s = sketch
        this.generation  = generation
    }

    show() {
        // Branches that are finished will not be increased in color opacity (alpha)
        if (!this.finished) {
            this.currHslaArr = this.increaseColorAlphaOnIteration(this.currHslaArr, this.generation);
        }
        // Branches that are finished will be decreased in color lightness
        if (this.finished) {
            this.currHslaArr = this.decreaseColorLightnessOnIteration(this.currHslaArr, this.generation);
        }

        // Generate a hsla color string and transform it into a p5 color (object?)
        const currColor = this.s.color(`hsla(${this.currHslaArr[0]}, ${this.currHslaArr[1]}%, ${this.currHslaArr[2]}%, ${this.currHslaArr[3]})`)
        console.log(this.generation, this.currHslaArr)

        this.s.stroke(currColor);
        this.s.line(this.begin.x, this.begin.y, this.end.x, this.end.y);
    }

    branch(first: boolean, gen: number) {
        let dir = p5.Vector.sub(this.end, this.begin);
        if (first) {
            dir.rotate(this.s.PI / this.s.random(2, 7));
            dir.mult(this.s.random(0.64, 0.7));
        } else {
            dir.rotate(-this.s.PI / this.s.random(2, 7));
            dir.mult(this.s.random(0.64, 0.7));
        }
        let newEnd = p5.Vector.add(this.end, dir);
        let result = new Branch(this.end, newEnd, this.s, gen);
        return result; 
    }  

    private increaseColorAlphaOnIteration(colorArr: number[], i: number): number[] {
        let result = colorArr.slice();
        if (result[3] + i * 0.1 <= 0.8) {
            result[3] += (i > 1 ? 0.05 : 0.025) * i;
        } else {
            result[3] = 0.8;
        }
        return result;
    }

    private decreaseColorLightnessOnIteration(colorArr: number[], i: number): number [] {
        let result = colorArr.slice();
        if (result[2] - 5 > 20) {
            result[2] -= 5;
        }
        return result;
    }
}
```