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

  private trees: any = [];
  private tree: any = [];
  private leaves: any = [];
  private count = 0;

  private amountCircleDir = 20;


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
        s.angleMode(s.RADIANS);
        this.seedFirst(s);
      }

      s.draw = () => {
        s.background(51);

        for (let i = 0; i < this.tree.length; i++) {
          this.tree[i].show();
        }
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
    this.tree = [];
    this.seedFirst(this.canvas)
    this.leaves = [];
    // this.canvas.loop()
  }

  public grow() {
    for (let i = this.tree.length -1; i >= 0; i --) {
      if (!this.tree[i].finished) {
        this.tree.push(this.tree[i].branch(true));
        this.tree.push(this.tree[i].branch(false));
      }
      this.tree[i].finished = true;
    }
    this.count += 1;

    if (this.count === 6) {
      for (let i = 0; i < this.tree.length; i++) {
        if (!this.tree[i].finished) {
          let leaf = this.tree[i].end.copy();
          this.leaves.push(leaf);
        }
      }
    }
  }

  private seedFirst(s: p5) {
    // I Think this has to be moved to the branch class to be able to iterate over the angles and end points recursively and I currently
    // don't see a way how to do it with the vector implementation.
    
/*     let angle = 360 / this.amountCircleDir;
    let endX = this.canvWidth / 2;
    let endY = this.canvHeight  - this.canvHeight / 3
    for (let i = 0; i < this.amountCircleDir; i++) {
      endX = endX + s.cos()
    } */

    let a = s.createVector(this.canvWidth / 2, this.canvHeight / 2);
    let b = s.createVector(this.canvWidth / 2, this.canvHeight  - this.canvHeight / 3);
    let root = new Branch(a, b, s);

    this.tree[0] = root;
  }

}