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

  private tree: any = [];
  private leaves: any = [];
  private count = 0;


  constructor(
    private windowSizeService: WindowSizeService
  ) {}

  ngOnInit(): void {

    const canvasConfig = {
      'isSquare': false,
      'wPercentS': 100,
      'wPercentL': 100,
      'hPercentS': 50,
      'hPercentL': 50
    }

    const canvSizeObj = this.windowSizeService.calculateCanvasSize(canvasConfig);
    this.canvWidth = canvSizeObj.w;
    this.canvHeight = canvSizeObj.w  * 0.36;
    console.log(this.canvHeight, this.canvWidth)


    this.windowSizeService.windowResize$.subscribe(() => {
      const canvSizeObj = this.windowSizeService.calculateCanvasSize(canvasConfig);
      this.canvWidth = canvSizeObj.w;
      this.canvHeight = canvSizeObj.w * 0.36;

      this.canvas.clear();

      this.windowSizeService.triggerCanvasResize(this.canvas, canvasConfig);
    })

    const sketch = (s: p5) => {

      s.setup = () => {
        let canvas2 = s.createCanvas(this.canvWidth, this.canvHeight);
        canvas2.parent('le-a003-sketch-wrapper');

        let a = s.createVector(this.canvWidth / 2, this.canvHeight);
        let b = s.createVector(this.canvWidth / 2, this.canvHeight - 100);
        let root = new Branch(a, b, s);

        this.tree[0] = root;
      }

      // P5 SCRIPT
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
    this.canvas.clear();
    this.canvas.loop()
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

}