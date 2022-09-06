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

  private trees: any[][] = [];
  private tree: any[] = [];
  // private leaves: any = [];
  private count = 0;

  private amountCircleDir = 13;
  private angle = 360 / this.amountCircleDir;
  private seedRadius = this.canvHeight;


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

      // const colors = ['DarkMagenta', 'SlateBlue', 'DeepPink', 'Green', 'Yellow', 'White', 'Blue', 'Orange', 'SpringGreen', 'Brown']
      const centerX = this.canvWidth / 2;
      const centerY = this.canvHeight / 2;

      s.setup = () => {
        let canvas2 = s.createCanvas(this.canvWidth, this.canvHeight);
        canvas2.parent('le-a003-sketch-wrapper');
        // s.angleMode(s.RADIANS);
        this.seedFirst(s);

        /* for (let i = 0; i < this.amountCircleDir; i++) {
          
          let col = colors[Math.floor(Math.random() * 10)]

          const startV = s.createVector(this.canvWidth / 2, this.canvHeight / 2);
          let endV = s.createVector(this.canvWidth / 2, this.canvHeight / 4);
          endV.rotate(s.radians(this.angle) * i)

          console.log(startV, endV)
          console.log(col)
          s.stroke(col)
          

          const endX = s.cos(s.radians(this.angle * i)) * this.seedRadius / 3;
          const endY = s.sin(s.radians(this.angle * i)) * this.seedRadius / 3;

          s.stroke('white')

          s.line(centerX, centerY, endX + this.seedRadius, endY + this.seedRadius)
        } */
      }

      s.draw = () => {
        s.background(51);
        
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
    // this.canvas.save(`${this.saveFileName}.png`);
  }

  public reload() {
    // this.canvas.clear();
    this.trees = [];
    this.seedFirst(this.canvas)
    this.canvas.loop()
  }

  public grow() {
    for (let i = 0; i < this.amountCircleDir; i++) {
      for (let j = this.trees[i].length -1; j >= 0; j--) {
        if (!this.trees[i][j].finished) {
          this.trees[i].push(this.trees[i][j].branch(true));
          this.trees[i].push(this.trees[i][j].branch(false));
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
      console.log('b: ',b)
      
      let root = new Branch(a, b, s);
      this.trees.push([]);
      this.trees[i][0] = root;
    }
  }

}