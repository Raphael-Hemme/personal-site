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

  constructor(
    private windowSizeService: WindowSizeService
  ) {}

  ngOnInit() {

    const canvasConfig = {
      'isSquare': true,
      'wPercentS': 100,
      'wPercentL': 50,
      'hPercentS': 50,
      'hPercentL': 50
    }

    const canvSizeObj = this.windowSizeService.calculateCanvasSize(canvasConfig);
    this.canvWidth = canvSizeObj.w * 0.6;
    this.canvHeight = canvSizeObj.h * 0.6;
    console.log('canvWidth: ', this.canvWidth, 'canvHeight: ', this.canvHeight)

    this.windowSizeService.windowResize$.subscribe(() => {
      console.log('resized')
      this.windowSizeService.triggerCanvasResize(this.canvas, canvasConfig);
    })

    const sketch = (s: any) => {

      let cells: any[] = [];
      let subCells: any[] = [];

      let canvasCenter = {
        x: 0,
        y: 0
      }
      const distLimit = 300

      s.setup = () => {
        let canvas2 = s.createCanvas(this.canvWidth, this.canvHeight);
        canvas2.parent('le-a002-sketch-wrapper');
        canvasCenter.x = s.width / 2;
        canvasCenter.y = s.height / 2;
        s.frameRate(20);
      }

      s.draw = () => {
        s.background(100);
        

        if (s.frameCount % 30 === 0) {
          console.log('cells length: ', cells.length)
          console.log('subCells length: ', subCells.length)
        }

        const currGenCount = s.round(s.random(3, 25))
        const minSize = 2
        const maxSize = 15
        const maxDist = s.round(s.random(10, distLimit))
        const mainCellMaxAge = s.round(s.random(300, 500));
        s.generateCells(currGenCount, minSize, maxSize, canvasCenter, maxDist, cells, mainCellMaxAge);
      
        s.drawCells(cells);
        s.ageCells(cells);
        s.multiplyCells(cells)
        s.killCells(cells);
        if (subCells.length > 0) {
          s.drawCells(subCells);
          s.ageCells(subCells);
          s.setRandomCellsToHaveBloomShape(subCells)
          s.killCells(subCells);
        }
        
      }

      s.drawCells = (targetCellArr: any[]) => {
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

      s.generateCells = (
        amount: number,
        minSize: number,
        maxSize: number,
        center: any,
        maxDist: number,
        targetCellArr: any,
        maxAge: number) => {
        for(let i = 0; i < amount; i++) {
      
          const x = center.x // width / 2; 
          const y = center.y // height / 2; 
      
          const xSpeed = s.random(-5, 5);
          const ySpeed = s.random(-5, 5);
      
      /*     const xSpeed = random(-1, 1);
          const ySpeed = random(-1, 1); */
      
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
    s.setRandomCellsToHaveBloomShape = (targetCellArr: any) =>  {
      for (let cell of targetCellArr) {
        if (cell.xSpeed === 0 && cell.canBloom) {
          cell.bloom();
        } 
      }
    }

    s.killCells = (targetCellArr: any) => {
      const survivingCellArr = targetCellArr.filter((cell: any) => cell.age < cell.maxAge);
      targetCellArr.splice(0, targetCellArr.length);
      for (let el of survivingCellArr) {
        targetCellArr.push(el);
      }
    }

    s.ageCells = (targetCellArr: any) => {
      for (let cell of targetCellArr) {
        cell.incrementAge();

        cell.hsla.s = s.map(cell.traveledDist, 0, cell.originalMaxDistForColorMap, 30, 90)
        // cell.changeSaturation();
        if (cell.age > cell.maxAge / 2) {
          cell.fade();
        }
      }
    }

    s.multiplyCells = (targetCellArr: any) => {
      for (let cell of targetCellArr) {
        if (cell.xSpeed === 0 
          && cell.age > 170 
          && cell.canReproduce 
          && subCells.length < 6000) {
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
          s.generateCells(
            currGenCount,
            currMinSize,
            currMaxSize,
            currCenter,
            currMaxDist,
            subCells,
            descendentMaxAge
          );
        }
      }
      
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
