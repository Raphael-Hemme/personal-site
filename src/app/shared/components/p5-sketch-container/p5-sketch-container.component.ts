import { Component, OnDestroy, OnInit } from '@angular/core';
import * as p5 from 'p5';
// const p5 = require('p5');

@Component({
  selector: 'app-p5-sketch-container',
  templateUrl: './p5-sketch-container.component.html',
  styleUrls: ['./p5-sketch-container.component.scss']
})
export class P5SketchContainerComponent implements OnInit, OnDestroy {

  public canvas: any;

  constructor() {}

  ngOnInit() {
    const sketch = (s: any) => {
      s.setup = () => {
        let canvas2 = s.createCanvas(s.windowWidth - 200, s.windowHeight - 200);
        canvas2.parent('sketch-wrapper');

        s.background(23, 18, 43, 255);
      };

      s.draw = () => {
        if(s.frameCount % 2 === 0) {
        s.background(23, 18, 43, 255);
        s.noFill()
        s.stroke(123, 212, 15, 255);
        //s.circle(s.width /2, s.height / 2, this.circleSize);
        s.circle(s.width /2, s.height / 2, 50);
        }
      };
    };

    this.canvas = new p5(sketch);
  }

  ngOnDestroy(): void {
    this.canvas.remove();
  }

}
