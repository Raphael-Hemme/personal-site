import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import * as p5 from 'p5';


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

  constructor() {}

  ngOnInit() {
    const sketch = (s: any) => {

      let dots: any[] = [];
      let dots2: any[] = [];
      let dots3: any[] = [];

      let dots4: any[] = [];
      let dots5: any[] = [];

      let dots6: any[] = [];
      let dots7: any[] = [];

      let dots8: any[] = [];

      let dots9: any[] = [];



      s.setup = () => {
        let canvas2 = s.createCanvas(500, 500);
        canvas2.parent('le-a001-sketch-wrapper');

        dots = s.makeDots(200, 100);
        for (let el of dots) {
          const intSubDotArr = s.makeSubDots(el.x, el.y, 10, 20)
          dots2.push(...intSubDotArr);
        }
        for (let el of dots2) {
          const intSubDotArr = s.makeSubDots(el.x, el.y, 5, 10)
          dots3.push(...intSubDotArr);
        }
        dots3.forEach(el => el.size = s.random(4, 10))

        dots4 = s.makeDots(50, 30);
        dots4.forEach(el => el.size = s.random(1, 8))
        for (let el of dots4) {
          const intSubDotArr = s.makeSubDots(el.x, el.y, 30, 10)
          dots5.push(...intSubDotArr);
        }
        dots5.forEach(el => el.size = s.random(3, 15))

        dots6 = s.makeDots(300, 70);
        for (let el of dots6) {
          const intSubDotArr = s.makeSubDots(el.x, el.y, 10, 15)
          dots7.push(...intSubDotArr);
        }


        dots8 = s.makeDots(300, 140);
        dots8.forEach(el => el.size = s.random(1, 5))

        dots9 = s.makeDots(200, 10);
        dots9.forEach(el => el.size = s.random(1, 9))

      }

      s.draw = () => {
        s.background(100);
        s.colorMode('RGBA')

        for (var i = 0; i < dots8.length; i++){
          s.fill(163, 118, 21);
          s.noStroke();
          s.circle(dots8[i].x, dots8[i].y, dots8[i].size);
        }

        for (var i = 0; i < dots2.length; i++){
          s.fill(163, 118, 21);
          s.noStroke();
          s.circle(dots2[i].x, dots2[i].y, 20);
        }
        for (var i = 0; i < dots.length; i++){
          s.fill(135, 87, 14);
          s.stroke(110, 86, 36)
          s.strokeWeight(1);
          s.circle(dots[i].x, dots[i].y, 9);
        }
        for (var i = 0; i < dots3.length; i++){
          s.strokeWeight(1);
          s.fill(196, 152, 39)
          s.stroke(133, 91, 19)
          s.circle(dots3[i].x, dots3[i].y, dots3[i].size);
        }

        // draw dots6 and dots7
        for (var i = 0; i < dots6.length; i++){
          s.fill(189, 145, 32);
          s.noStroke();
          s.circle(dots6[i].x, dots6[i].y, 10);
        }
        for (var i = 0; i < dots7.length; i++){
          // noStroke();
          s.stroke(161, 125, 33, 90)
          s.fill(179, 139, 37)
          s.circle(dots7[i].x, dots7[i].y, 9);
        }


        // draw dots5 and dots4
        for (var i = 0; i < dots5.length; i++){
          s.fill(133, 91, 19);
          s.noStroke();
          s.circle(dots5[i].x, dots5[i].y, dots5[i].size);
        }
        for (var i = 0; i < dots4.length; i++){
          s.fill(174, 134, 36);
          s.noStroke();
          s.circle(dots4[i].x, dots4[i].y, dots4[i].size);
        }

        // draw dots9
        for (var i = 0; i < dots9.length; i++){
          s.fill(107, 76, 33);
          s.noStroke();
          s.circle(dots9[i].x, dots9[i].y, dots9[i].size);
        }


        s.strokeWeight(1);
        s.noFill();
      }

      s.makeDots = (n: number, maxRadius: number) => {
        const internalDotArr = []
      //   choose random radius and angle from the center
        for (var i = 0; i < n; i++){
          const a = s.random(0, 2 * s.PI);

          // https://programming.guide/random-point-within-circle.html
          // we use square root of random for equal distribution of points        from the center
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

    };

    this.canvas = new p5(sketch);
  }

  ngOnDestroy(): void {
    this.canvas.remove();
  }

}
