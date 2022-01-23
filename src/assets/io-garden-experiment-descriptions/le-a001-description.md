### Description

Lichen Experiment - A001 (`LE-A001`) is a first, 'brute force' attempt to approximate the visual appearance of lichen growing on stones ([Caloplaca mariana](https://en.wikipedia.org/wiki/Caloplaca_marina)) using the p5.js library.

The code to generate random points within a circle is adapted from [here](https://editor.p5js.org/zapra/sketches/rjIJR18fT).

The code below is still very convoluted and rough. It will be refactored once I am satisfied with the visual resemblance.

```typescript
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import * as p5 from 'p5';
import { WindowSizeService } from 'src/app/shared/services/window-size-service/window-size.service';


// Based on this this sketch to generate randomly distributed dots inside a circle:
// https://editor.p5js.org/zapra/sketches/rjIJR18fT

// This sketch (my improvisation on the linked sketch above) is still in the early stages of playful experimentation.
// Therefore my current version is highly inefficient and duplicates code etc. withouth geting the result nearly right.
// This might be addressed later.

@Component({
  selector: 'app-le-a001',
  templateUrl: './le-a001.component.html',
  styleUrls: ['./le-a001.component.scss']
})
export class LeA001Component implements OnInit {

  public canvas: any;

  private dots: any[] = [];
  private dots2: any[] = [];
  private dots3: any[] = [];

  private dots4: any[] = [];
  private dots5: any[] = [];

  private dots6: any[] = [];
  private dots7: any[] = [];

  private dots8: any[] = [];

  private dots9: any[] = [];

  public canvasWidth = 300;
  public canvasHeight = 300;

  constructor(
    private windowSizeService: WindowSizeService
  ) {}

  ngOnInit() {

    const currMainContainerWidth = this.windowSizeService.getCurrentMainContainerWidth();
    if (currMainContainerWidth >= 992) {
      this.canvasWidth = currMainContainerWidth / 2;
      this.canvasHeight = this.canvasWidth;
    } else {
      this.canvasWidth = currMainContainerWidth - 60;
      this.canvasHeight = this.canvasWidth;
    }

    const sketch = (s: any) => {

      s.setup = () => {
        let canvas2 = s.createCanvas(this.canvasWidth, this.canvasHeight);
        canvas2.parent('le-a001-sketch-wrapper');
      }

      s.draw = () => {
        s.setupDotArrays();
        s.background(100);
        s.colorMode('RGBA')

        for (var i = 0; i < this.dots8.length; i++){
          s.fill(163, 118, 21);
          s.noStroke();
          s.circle(this.dots8[i].x, this.dots8[i].y, this.dots8[i].size);
        }

        for (var i = 0; i < this.dots2.length; i++){
          s.fill(163, 118, 21);
          s.noStroke();
          s.circle(this.dots2[i].x, this.dots2[i].y, s.width / 30);
        }
        for (var i = 0; i < this.dots.length; i++){
          s.fill(135, 87, 14);
          s.stroke(110, 86, 36)
          s.strokeWeight(1);
          s.circle(this.dots[i].x, this.dots[i].y, s.width / 66.7);
        }
        for (var i = 0; i < this.dots3.length; i++){
          s.strokeWeight(1);
          s.fill(196, 152, 39)
          s.stroke(133, 91, 19)
          s.circle(this.dots3[i].x, this.dots3[i].y, this.dots3[i].size);
        }

        // draw dots6 and dots7
        for (var i = 0; i < this.dots6.length; i++){
          s.fill(189, 145, 32);
          s.noStroke();
          s.circle(this.dots6[i].x, this.dots6[i].y, s.width / 60);
        }
        for (var i = 0; i < this.dots7.length; i++){
          // noStroke();
          s.stroke(161, 125, 33, 90)
          s.fill(179, 139, 37)
          s.circle(this.dots7[i].x, this.dots7[i].y, s.width / 66.7);
        }

        // draw dots5 and dots4
        for (var i = 0; i < this.dots5.length; i++){
          s.fill(133, 91, 19);
          s.noStroke();
          s.circle(this.dots5[i].x, this.dots5[i].y, this.dots5[i].size);
        }
        for (var i = 0; i < this.dots4.length; i++){
          s.fill(174, 134, 36);
          s.noStroke();
          s.circle(this.dots4[i].x, this.dots4[i].y, this.dots4[i].size);
        }

        // draw dots9
        for (var i = 0; i < this.dots9.length; i++){
          s.fill(107, 76, 33);
          s.noStroke();
          s.circle(this.dots9[i].x, this.dots9[i].y, this.dots9[i].size);
        }


        s.strokeWeight(1);
        s.noFill();

        console.log('dots: ', this.dots)

        s.noLoop();
      }

      s.makeDots = (n: number, maxRadius: number) => {
        const internalDotArr = []
      //   choose random radius and angle from the center
        for (var i = 0; i < n; i++){
          const a = s.random(0, 2 * s.PI);

          // https://programming.guide/random-point-within-circle.html
          // we use square root of random for equal distribution of points from the center
          let r = 20 * s.sqrt(s.random(0, maxRadius));

          let x = s.width/2 + r * s.cos(a);
          let y = s.height / 2 + r * s.sin(a);
          var newDot = {x: x, y: y};
          internalDotArr.push(newDot);
        }
        return internalDotArr;
      }

      s.makeSubDots = (subDotCenterX: number, subDotCenterY: number, maxAmount: number, rRange: number) => {
        //   choose random radius and angle from the center
        const amount = s.random(0, maxAmount);
        const subDots = [];
        for (var i = 0; i < amount; i++){

          const a = s.random(0, 2 * s.PI);
          const r = s.random(5, rRange);

          let x = subDotCenterX + r * s.cos(a);
          let y = subDotCenterY + r * s.sin(a);
          var newDot = {x: x, y: y};
          subDots.push(newDot);
        }
        return subDots;
      }

      s.setupDotArrays = () => {
        this.dots.splice(0, this.dots.length);
        this.dots2.splice(0, this.dots2.length);
        this.dots3.splice(0, this.dots3.length);
        this.dots4.splice(0, this.dots4.length);
        this.dots5.splice(0, this.dots5.length);
        this.dots6.splice(0, this.dots6.length);
        this.dots7.splice(0, this.dots7.length);
        this.dots8.splice(0, this.dots8.length);
        this.dots9.splice(0, this.dots9.length);

        this.dots = s.makeDots(200, s.width  / 6);
        for (let el of this.dots) {
          const intSubDotArr = s.makeSubDots(el.x, el.y, 10, s.width / 30);
          this.dots2.push(...intSubDotArr);
        }
        for (let el of this.dots2) {
          const intSubDotArr = s.makeSubDots(el.x, el.y, 5, s.width / 60);
          this.dots3.push(...intSubDotArr);
        }
        this.dots3.forEach(el => el.size = s.random(s.width / 150, s.width / 60));

        this.dots4 = s.makeDots(50, s.width / 20);
        this.dots4.forEach(el => el.size = s.random(1, s.width / 75));
        for (let el of this.dots4) {
          const intSubDotArr = s.makeSubDots(el.x, el.y, 30, s.width / 60);
          this.dots5.push(...intSubDotArr);
        }
        this.dots5.forEach(el => el.size = s.random(s.width / 200, s.width / 40));

        this.dots6 = s.makeDots(300, s.width / 8.6);
        for (let el of this.dots6) {
          const intSubDotArr = s.makeSubDots(el.x, el.y, 10, s.width / 40);
          this.dots7.push(...intSubDotArr);
        }


        this.dots8 = s.makeDots(300, s.width / 4.3);
        this.dots8.forEach(el => el.size = s.random(1, 5));

        this.dots9 = s.makeDots(200, s.width / 60);
        this.dots9.forEach(el => el.size = s.random(1, 9));
      }

    };

    this.canvas = new p5(sketch);
  }

  ngOnDestroy(): void {
    this.canvas.remove();
  }

  public handleReloadBtn() {
    this.canvas.clear();
    this.canvas.redraw(1);
  }

}

```
