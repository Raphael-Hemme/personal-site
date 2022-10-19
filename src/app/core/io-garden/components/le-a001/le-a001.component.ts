import { Component, OnInit, OnDestroy } from '@angular/core';
import * as p5 from 'p5';
import { Subscription } from 'rxjs';
import { WindowSizeService } from 'src/app/shared/services/window-size-service/window-size.service';


// Based on this this sketch to generate randomly distributed dots inside a circle:
// https://editor.p5js.org/zapra/sketches/rjIJR18fT

// This sketch (my improvisation on the linked sketch above) is still in the early stages of playful experimentation.
// Therefore my current version is highly inefficient and duplicates code etc. withouth geting the result nearly right.
// This might be addressed later.

interface CellObj {
  x: number;
  y: number;
  size: number;
  color: {
    fill: number[];
    stroke: number[] | null
  }
}

interface CellConfigObj {
  number: number;
  maxRadius: number;
  minSize: number;
  maxSize: number;
  color: {
    fill: number[];
    stroke: number[] | null;
  }
}

interface SubCellConfigObj {
  maxAmount: number;
  centerX: number;
  centerY: number;
  rRange: number;
  minSize: number;
  maxSize: number;
  color: {
    fill: number[];
    stroke: number[] | null;
  }
}

@Component({
  selector: 'app-le-a001',
  templateUrl: './le-a001.component.html',
  styleUrls: ['./le-a001.component.scss']
})
export class LeA001Component implements OnInit, OnDestroy {

  public canvas: any;

  private newDotsArr: any[][] = [];

  private newCellsArrReOrdered: CellObj[][] = [];


  public canvWidth = 300;
  public canvHeight = 300;

  private subscriptions: Subscription = new Subscription();

  constructor(
    private windowSizeService: WindowSizeService
  ) { }

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
        canvas2.parent('le-a001-sketch-wrapper');
      }

      s.draw = () => {
        s.setupDotArrays();
        s.background(100);
        s.colorMode(s.RGBA)

        for (let cellArr of this.newDotsArr) {
          console.log('cellArr.length', cellArr.length);
          for (let cell of cellArr) {
            // s.fill('deepPink')
            s.fill(...cell.color.fill);
            if (cell.color.stroke?.length) {
              s.stroke(...cell.color.stroke);
              s.strokeWeight(1);
            } else {
              s.noStroke();
            }
            s.circle(cell.x, cell.y, cell.size);
          }
        }

        /* for (let cell of this.newDotsArr[1]) {
          s.fill('deepPink')
          // s.fill(...cell.color.fill);
          if (cell.color.stroke?.length) {
            s.stroke(...cell.color.stroke);
            s.strokeWeight(1);
          } else {
            s.noStroke();
          }
          s.circle(cell.x, cell.y, cell.size);
        } */

        s.strokeWeight(1);
        s.noFill();

        // console.log('dots: ', this.dots)

        s.noLoop();
      }

      // s.makeDots = (n: number, maxRadius: number): any[] => {
      s.makeDots = (cellConfigObj: CellConfigObj): CellObj[] => {
        const internalDotArr = []
        //   choose random radius and angle from the center
        for (var i = 0; i < cellConfigObj.number; i++) {
          const a = s.random(0, 2 * s.PI);

          // https://programming.guide/random-point-within-circle.html
          // we use square root of random for equal distribution of points from the center
          let r = 20 * s.sqrt(s.random(0, cellConfigObj.maxRadius));

          let x = s.width / 2 + r * s.cos(a);
          let y = s.height / 2 + r * s.sin(a);

          var newDot = {
            x: x,
            y: y,
            size: s.random(cellConfigObj.minSize, cellConfigObj.maxSize),
            color: {
              fill: cellConfigObj.color.fill,
              stroke: cellConfigObj.color.stroke
            }
          };

          internalDotArr.push(newDot);
        }
        return internalDotArr;
      }

      // s.makeSubDots = (subDotCenterX: number, subDotCenterY: number, maxAmount: number, rRange: number): any[] => {
      s.makeSubCells = (subCellConfigObj: SubCellConfigObj): CellObj[] => {
        const amount = s.random(0, subCellConfigObj.maxAmount);
        const subCells = [];

        //   choose random radius and angle from the center
        for (var i = 0; i < amount; i++) {

          const a = s.random(0, 2 * s.PI);
          const r = s.random(5, subCellConfigObj.rRange);

          let x = subCellConfigObj.centerX + r * s.cos(a);
          let y = subCellConfigObj.centerY + r * s.sin(a);
          let size = s.random(subCellConfigObj.minSize, subCellConfigObj.maxSize);
          var newDot = {
            x: x,
            y: y,
            size: size,
            color: {
              fill: subCellConfigObj.color.fill,
              stroke: subCellConfigObj.color.stroke
            }
          };
          subCells.push(newDot);
        }
        return subCells;
      }

      s.setupDotArrays = () => {

        this.newDotsArr.forEach(arr => arr.splice(0, arr.length - 1))

        this.newDotsArr[0] = s.makeDots({
          number: 200,
          maxRadius: s.width / 6,
          minSize: s.width / 66.7,
          maxSize: s.width / 66.7,
          color: {
            fill: [135, 87, 14, 200],
            stroke: [110, 86, 36, 200]
          }
        });

        this.newDotsArr[1] = this.newDotsArr[0]
          .map(el => s.makeSubCells({
            centerX: el.x,
            centerY: el.y,
            maxAmount: 10,
            rRange: s.width / 30,
            minSize: s.width / 30,
            maxSize: s.width / 30,
            color: {
              fill: [163, 118, 21, 200],
              stroke: [120, 91, 29, 150]
            }
          }))
          .flat();

        this.newDotsArr[2] = this.newDotsArr[1]
          .map(el => s.makeSubCells({
            centerX: el.x,
            centerY: el.y,
            maxAmount: 2,
            rRange: s.width / 50,
            minSize: s.width / 150,
            maxSize: s.width / 60,
            color: {
              fill: [196, 152, 39, 160],
              stroke: [133, 91, 19, 160]
            }
          }))
          .flat();

        this.newDotsArr[3] = s.makeDots({
          number: 50,
          maxRadius: s.width / 20,
          minSize: 1,
          maxSize: s.width / 75,
          color: {
            fill: [174, 134, 36, 100],
            stroke: null
          }
        });

        this.newDotsArr[4] = this.newDotsArr[3]
          .map(el => s.makeSubCells({
            centerX: el.x,
            centerY: el.y,
            maxAmount: 30,
            rRange: s.width / 60,
            minSize: s.width / 200,
            maxSize: s.width / 40,
            color: {
              fill: [122, 102, 67, 30],
              stroke: null
            }
          }))
          .flat();

        this.newDotsArr[5] = s.makeDots({
          number: 100,
          maxRadius: s.width / 8.6,
          minSize: 1,
          maxSize: 1,
          color: {
            fill: [0, 0, 0, 0],
            stroke: null
          }
        });

        this.newDotsArr[6] = this.newDotsArr[5]
          .map(el => s.makeSubCells({
            centerX: el.x,
            centerY: el.y,
            maxAmount: 10,
            rRange: s.width / 40,
            minSize: s.width / 66.7,
            maxSize: s.width / 66.7,
            color: {
              fill: [179, 139, 37, 170],
              stroke: [161, 125, 33, 90, 170]
            }
          }))
          .flat();

        this.newDotsArr[7] = s.makeDots({
          number: 300,
          maxRadius: s.width / 4.3,
          minSize: 1,
          maxSize: 5,
          color: {
            fill: [163, 118, 21, 200],
            stroke: null
          }
        });

        this.newDotsArr[7] = s.makeDots({
          number: 300,
          maxRadius: s.width / 4.3,
          minSize: 1,
          maxSize: 5,
          color: {
            fill: [163, 118, 21, 200],
            stroke: null
          }
        });

        this.newDotsArr[8] = s.makeDots({
          number: 300,
          maxRadius: s.width / 20,
          minSize: 1,
          maxSize: 14,
          color: {
            fill: [100, 100, 100, 170],
            stroke: null
          }
        });

        this.newDotsArr[9] = s.makeDots({
          number: 150,
          maxRadius: s.width / 60,
          minSize: 1,
          maxSize: 14,
          color: {
            fill: [100, 100, 100, 170],
            stroke: null
          }
        });

        this.newDotsArr[10] = s.makeDots({
          number: 50,
          maxRadius: s.width / 100,
          minSize: 1,
          maxSize: 16,
          color: {
            fill: [100, 100, 100, 150],
            stroke: null
          }
        });


        this.newCellsArrReOrdered = [this.newDotsArr[0]]
      }

    };

    this.canvas = new p5(sketch);
  }

  ngOnDestroy(): void {
    this.canvas.remove();
    this.subscriptions.unsubscribe()
  }

  public handleReloadBtn() {
    this.canvas.clear();
    this.canvas.redraw(1);
  }

}
