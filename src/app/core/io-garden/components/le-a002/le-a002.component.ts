import { Component, OnInit, OnDestroy } from '@angular/core';
import * as p5 from 'p5';
import _ from 'lodash';
import { WindowSizeService } from 'src/app/shared/services/window-size-service/window-size.service';


class Cell {
  constructor(
    x: number,
    y: number,
    size: number,
    xSpeed: number, 
    ySpeed: number,
    traveledDist: number,
    maxDist: number,
    originalMaxDistForColorMap: number,
    hsla: any,
    maxAge: number) {
      this.x = x;
      this.y = y;
      this.size = size;
      this.xSpeed = xSpeed;
      this.ySpeed = ySpeed;
      this.traveledDist = traveledDist;
      this.maxDist = maxDist;
      this.originalMaxDistForColorMap = originalMaxDistForColorMap;
      this.hsla = hsla;
      this.maxAge = maxAge;
    }
  x = 0;
  y = 0;
  size = 0;
  xSpeed = 0;
  ySpeed = 0;
  traveledDist = 0;
  maxDist = 0;
  originalMaxDistForColorMap = 0;
  hsla = {h: 0, s: 0, l: 0, a: 0};
  maxAge = 0;
  age = 0;

  blooming = false;
  canBloom = Math.random() > 0.8;
  canReproduce = Math.random() > 0.8;
  
  incrementAge() {
    this.age++;
  }
  fade() {
    if ((this.maxAge - this.age < 50) && this.hsla.a > 0.05) {
      this.hsla.a -= 0.02;
    }
  }
  bloom() {
    this.blooming = true;
    this.hsla.h = 19;
    this.hsla.s = Math.round(_.random(40, 70, true))
  }
  changeSaturation() {
    // this.hsla.s = map(this.traveledDist, 0, this.originalMaxDistForColorMap, 30, 90)
    
  }
}

@Component({
  selector: 'app-le-a002',
  templateUrl: './le-a002.component.html',
  styleUrls: ['./le-a002.component.scss']
})
export class LeA002Component implements OnInit, OnDestroy {

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

  public canvWidth = 300;
  public canvHeight = 300;

  constructor(
    private windowSizeService: WindowSizeService
  ) {}

  ngOnInit() {

    const canvasConfig = {
      'isSquare': true,
      'wPercentS': 100,
      'wPercentL': 70,
      'hPercentS': 100,
      'hPercentL': 100
    }

    const canvSizeObj = this.windowSizeService.calculateCanvasSize(canvasConfig);
    this.canvWidth = canvSizeObj.w;
    this.canvHeight = canvSizeObj.h;

    this.windowSizeService.windowResize$.subscribe(() => {
      this.windowSizeService.triggerCanvasResize(this.canvas, canvasConfig);
    })

    const sketch = (s: any) => {

      s.setup = () => {
        let canvas2 = s.createCanvas(this.canvWidth, this.canvHeight);
        canvas2.parent('le-a002-sketch-wrapper');
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

        // console.log('dots: ', this.dots)

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
