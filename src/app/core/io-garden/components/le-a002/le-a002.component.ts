import { Component, OnInit, OnDestroy } from '@angular/core';
import * as p5 from 'p5';
import _ from 'lodash';
import { WindowSizeService } from 'src/app/shared/services/window-size-service/window-size.service';
import { Subscription } from 'rxjs';


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
    this.hsla.h = 26 // 19;
    this.hsla.s = Math.round(_.random(40, 70, true))
  }
/*   changeSaturation() {
    this.hsla.s = map(this.traveledDist, 0, this.originalMaxDistForColorMap, 30, 90)
  } */
}

@Component({
  selector: 'app-le-a002',
  templateUrl: './le-a002.component.html',
  styleUrls: ['./le-a002.component.scss']
})
export class LeA002Component implements OnInit, OnDestroy {

  public canvas: any;

  public canvWidth = 300;
  public canvHeight = 300;

  public canvasCenter = {
    x: 0,
    y: 0
  }

  private distLimit = (this.canvWidth / 2) - this.canvWidth / 5; // 300

  private cells: any[] = [];
  private subCells: any[] = [];

  public drawIsPaused = false;

  private subscriptions: Subscription = new Subscription();

  constructor(
    private windowSizeService: WindowSizeService
  ) {}

  ngOnInit() {

    const canvasConfig = {
      'isSquare': true,
      'wPercentS': 100,
      'wPercentL': 60,
      'hPercentS': 50,
      'hPercentL': 50
    }

    const canvSizeObj = this.windowSizeService.calculateCanvasSize(canvasConfig);
    this.canvWidth = canvSizeObj.w; // * 0.6;
    this.canvHeight = canvSizeObj.h; //  * 0.6;

    this.distLimit = (this.canvWidth / 2) - this.canvWidth / 10;

    this.subscriptions.add(
      this.windowSizeService.windowResize$.subscribe(() => {
        const canvSizeObj = this.windowSizeService.calculateCanvasSize(canvasConfig);
        this.canvWidth = canvSizeObj.w; // * 0.6;
        this.canvHeight = canvSizeObj.h; // * 0.6;
  
        // console.log('this.canvWidth, this.canvHeight in subscription: ', this.canvWidth, this.canvHeight)
  
        this.canvas.clear();
        this.canvasCenter.x = this.canvWidth / 2; // canvSizeObj.w / 2;
        this.canvasCenter.y = this.canvHeight / 2; // canvSizeObj.h / 2;
        this. distLimit = (canvSizeObj.w / 2) - canvSizeObj.w / 5;
        this.eraseCellsForRedraw();
        this.windowSizeService.triggerCanvasResize(this.canvas, canvasConfig);
      })
    );

    const sketch = (s: p5) => {

      // CUSTOM FUNCTION DECLARATIONS
      const drawCells = (targetCellArr: any[]) => {
        for(let cell of targetCellArr){
          let oldX = cell.x;
          let oldY = cell.y;
      
          cell.x += cell.xSpeed;
          cell.y += cell.ySpeed;
      
          cell.traveledDist += s.dist(oldX, oldY, cell.x, cell.y);
       
          if (cell.traveledDist > cell.maxDist){
            cell.xSpeed = 0;
            cell.ySpeed = 0;
          }
      
          let c = s.color(`hsla(${cell.hsla.h}, ${cell.hsla.s}%, ${cell.hsla.l}%, ${cell.hsla.a})`);
          if (!cell.blooming) {
            s.noStroke();
            s.fill(c);
          } else {
            s.noFill()
            s.strokeWeight(2);
            s.stroke(c);
          }
          s.ellipse(cell.x, cell.y, cell.size, cell.size);
        }
      }

      const generateCells = (
        amount: number,
        minSize: number,
        maxSize: number,
        center: any,
        maxDist: number,
        targetCellArr: any,
        maxAge: number) => {
        for(let i = 0; i < amount; i++) {
      
          const x = center.x; 
          const y = center.y;
      
          const xSpeed = s.random(-5, 5);
          const ySpeed = s.random(-5, 5);
      
          const maxTravelDist = s.round(s.random(maxDist / 2, maxDist))
          const traveledDist = 0;
          const size = s.random(minSize, maxSize);
      
          const hsla = {
            h: 40,
            s: 90, // random(30, 90),
            l: 40,
            a: 1.0
          };
      
          targetCellArr.push(new Cell(
            x,
            y,
            size,
            xSpeed,
            ySpeed,
            traveledDist,
            maxTravelDist,
            maxDist,
            hsla,
            maxAge
          ))
        }
      }

    // Not for generating new cells (rename later) just visual
    const setRandomCellsToHaveBloomShape = (targetCellArr: any) =>  {
      for (let cell of targetCellArr) {
        if (cell.xSpeed === 0 && cell.canBloom) {
          cell.bloom();
        } 
      }
    }

    const killCells = (targetCellArr: any) => {
      const survivingCellArr = targetCellArr.filter((cell: any) => cell.age < cell.maxAge);
      targetCellArr.splice(0, targetCellArr.length);
      for (let el of survivingCellArr) {
        targetCellArr.push(el);
      }
    }

    const ageCells = (targetCellArr: any) => {
      for (let cell of targetCellArr) {
        cell.incrementAge();

        cell.hsla.s = s.map(cell.traveledDist, 0, cell.originalMaxDistForColorMap, 30, 90)
        // cell.changeSaturation();
        if (cell.age > cell.maxAge / 2) {
          cell.fade();
        }
      }
    }

    const multiplyCells = (targetCellArr: any) => {
      for (let cell of targetCellArr) {
        if (cell.xSpeed === 0 
          && cell.age > 170 
          && cell.canReproduce 
          && this.subCells.length < 6000) {
            cell.bloom()
            cell.canReproduce = false;
            const currGenCount = s.round(s.random(20, 40))
            const currMinSize = 2
            const currMaxSize = 15
            const currMaxDist = s.round(s.random(10, 50))
            const currCenter = {
              x: cell.x,
              y: cell.y
          }
          const descendentMaxAge = s.round(s.random(100, 200))
          generateCells(
            currGenCount,
            currMinSize,
            currMaxSize,
            currCenter,
            currMaxDist,
            this.subCells,
            descendentMaxAge
          );
        }
      }
    }


      // P5 SCRIPT
      s.setup = () => {
        // console.log('this.canvWidth, this.canvHeight in setup: ', this.canvWidth, this.canvHeight)
        let canvas2 = s.createCanvas(this.canvWidth, this.canvHeight);
        canvas2.parent('le-a002-sketch-wrapper');
        this.canvasCenter.x = s.width / 2;
        this.canvasCenter.y = s.height / 2;
        s.frameRate(20);
      }

      s.draw = () => {
        s.background(100);

        if (s.frameCount % 30 === 0) {
          /* console.log('cells length: ', this.cells.length)
          console.log('subCells length: ', this.subCells.length) */
        }

        const currGenCount = s.round(s.random(3, 25))
        const minSize = 2
        const maxSize = 15
        const maxDist = s.round(s.random(10, this.distLimit))
        const mainCellMaxAge = s.round(s.random(300, 500));
        generateCells(currGenCount, minSize, maxSize, this.canvasCenter, maxDist, this.cells, mainCellMaxAge);
      
        drawCells(this.cells);
        ageCells(this.cells);
        multiplyCells(this.cells)
        killCells(this.cells);
        if (this.subCells.length > 0) {
          drawCells(this.subCells);
          ageCells(this.subCells);
          setRandomCellsToHaveBloomShape(this.subCells)
          killCells(this.subCells);
        }
      }
    };

    this.canvas = new p5(sketch);
  }

  ngOnDestroy(): void {
    this.canvas.remove();
    this.subscriptions.unsubscribe();
  }

  public togglePause() {
    this.drawIsPaused = !this.drawIsPaused;
    // console.log('this.drawIsPaused: ', this.drawIsPaused)
    this.drawIsPaused ? this.canvas.noLoop() :  this.canvas.loop()
  }

  public reload() {
    this.canvas.clear();
    this.drawIsPaused = false;
    this.eraseCellsForRedraw();
    this.canvas.loop()
  }

  private eraseCellsForRedraw = () => {
    this.cells = [];
    this.subCells = []
  }

}
