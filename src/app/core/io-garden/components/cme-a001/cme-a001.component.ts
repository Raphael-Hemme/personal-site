import { Component, OnInit, OnDestroy } from '@angular/core';
import p5 from 'p5';
import { WindowSizeService } from 'src/app/shared/services/window-size-service/window-size.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cme-a001',
  templateUrl: './cme-a001.component.html',
  styleUrls: ['./cme-a001.component.scss']
})
export class CmeA001Component implements OnInit, OnDestroy {

  public canvWidth = 500;
  public canvHeight = 500;

  public canvas: any;
  public curs: any;

  private subscriptions: Subscription = new Subscription();

  constructor(
    private windowSizeService: WindowSizeService
  ) {}

  ngOnInit() {

    const canvasConfig = {
      'isSquare': false,
      'wPercentS': 100,
      'wPercentL': 100,
      'hPercentS': 80,
      'hPercentL': 50
    }

    const canvSizeObj = this.windowSizeService.calculateCanvasSize(canvasConfig);
    this.canvWidth = canvSizeObj.w;
    this.canvHeight = canvSizeObj.h;

    this.subscriptions.add(
      this.windowSizeService.windowResize$.subscribe(() => {
        this.windowSizeService.triggerCanvasResize(this.canvas, canvasConfig);
      })
    );

    const sketch = (s: any) => {

      const cursorArr: any[] = [];

      const currMultiplyerXArr: any[] = [];
      const currMultiplyerYArr: any[] = [];

      s.preload = () => {
        this.curs = s.loadImage('assets/images/io-garden-assets/cursor_img_2.png');
      }

      s.setup = () => {
        let canvas2 = s.createCanvas(this.canvWidth, this.canvHeight);
        canvas2.parent('cme-a001-sketch-wrapper');

        s.frameRate(60);
        let intermediateCursorArr = s.makeDots(50, this.canvHeight / 2);
        for (let cursor of intermediateCursorArr) {
          cursorArr.push(cursor);
        }
        for (let el of cursorArr) {
          currMultiplyerXArr.push(1)
          currMultiplyerYArr.push(1)
        }
      }

      s.draw = () => {
        s.background(80);
        s.colorMode('RGBA')

        for (let i = 0; i < cursorArr.length; i++){
          s.fill(163, 118, 21);
          s.noStroke();
          s.image(this.curs, cursorArr[i].x, cursorArr[i].y, 21, 22);
          s.moveCursor(i)
        }
      }

      s.makeDots = (n: number) => {
        const internalDotArr = []

        for (var i = 0; i < n; i++){
          let x = s.random(10, this.canvWidth -10);
          let y = s.random(10, this.canvHeight -10);
          var newDot = {x: x, y: y};
          internalDotArr.push(newDot);
        }
        return internalDotArr;
      }

      s.moveCursor = (currCursorIndex: number) => {
        if (cursorArr[currCursorIndex].x > this.canvWidth) {
          cursorArr[currCursorIndex].x = 0;
        }
        if (cursorArr[currCursorIndex].x < 0) {
          cursorArr[currCursorIndex].x = this.canvWidth;
        }
        if (cursorArr[currCursorIndex].y > this.canvHeight) {
          cursorArr[currCursorIndex].y = 0;
        }
        if (cursorArr[currCursorIndex].y < 0) {
          cursorArr[currCursorIndex].y = this.canvHeight;
        }
        if (s.frameCount % 60 === 0) {
          currMultiplyerXArr[currCursorIndex] = s.random(1) > 0.5 ? 1 : -1;
          currMultiplyerYArr[currCursorIndex] = s.random(1) > 0.5 ? 1 : -1;
        }

        const currRandDeviation = s.random(-5, 5);

        let movementX = s.abs(s.winMouseX - s.pwinMouseX);
        let movementY = s.abs(s.winMouseY - s.pwinMouseY);

        // Completely crazy mode
        if (s.random(1) > 0.8) {
          const intermediary = [movementX, movementY];
          movementX = intermediary[1];
          movementY = intermediary[0];
        }
        // end

        if (movementX !== 0) {
          const speedX = movementX * currMultiplyerXArr[currCursorIndex] + currRandDeviation;
          cursorArr[currCursorIndex].x = cursorArr[currCursorIndex].x + speedX;
        }
        if (movementY !== 0) {
          const speedY = movementY * currMultiplyerYArr[currCursorIndex] + currRandDeviation;
          cursorArr[currCursorIndex].y = cursorArr[currCursorIndex].y + speedY;
        }
      }
    };

    this.canvas = new p5(sketch);
  }

  ngOnDestroy(): void {
    this.canvas.remove();
    this.subscriptions.unsubscribe();
  }
}
