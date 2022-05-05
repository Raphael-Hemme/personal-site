import { Component, OnInit, OnDestroy } from '@angular/core';
import * as p5 from 'p5';
import _ from 'lodash';
import { WindowSizeService } from 'src/app/shared/services/window-size-service/window-size.service';


interface DotArrElement {
  xPos: number;
  yPos: number;
}

@Component({
  selector: 'app-pce-a001',
  templateUrl: './pce-a001.component.html',
  styleUrls: ['./pce-a001.component.scss']
})
export class PceA001Component implements OnInit {

  public canvas: any;

  public canvWidth = 300;
  public canvHeight = 300;

  private dotArr: DotArrElement[] = [];
  public saveFileName = '';
  public colorText = '';

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


    this.windowSizeService.windowResize$.subscribe(() => {
      const canvSizeObj = this.windowSizeService.calculateCanvasSize(canvasConfig);
      this.canvWidth = canvSizeObj.w; // * 0.6;
      this.canvHeight = canvSizeObj.h; // * 0.6;

      this.canvas.clear();

      this.windowSizeService.triggerCanvasResize(this.canvas, canvasConfig);
    })

    const sketch = (s: p5) => {

      
      // P5 SCRIPT
      this.setup(s);
      this.draw(s);

    this.canvas = new p5(sketch);
  }
}

  ngOnDestroy(): void {
    this.canvas.remove();
  }

  private setup(s: p5): void {
    // console.log('this.canvWidth, this.canvHeight in setup: ', this.canvWidth, this.canvHeight)
    let canvas2 = s.createCanvas(this.canvWidth, this.canvHeight);
    canvas2.parent('pce-a001-sketch-wrapper');
    
    // NEW
  // s.createCanvas(800, 300);

    const randH = Math.floor(s.random(0, 361))
    const sBg = 20;
    const sDots = 100
    const randLBg = Math.floor(s.random(10, 90))
    const randLDots = randLBg < 50 ? Math.floor(s.random(50, 80)) : Math.floor(s.random(20, 50))

    this.colorText = randH.toString() + '-' + sDots.toString() + '-' + randLDots.toString()
    let dateStr = new Date;
    dateStr.toString()
    this.saveFileName = 'punchCardPattern' + '-' + this.colorText;
    
    s.colorMode(s.HSL)
    s.background(randH, sBg, randLBg);

    for (let i = 20; i < 740; i+= 20) {
      for (let j = 20; j < s.height; j+= 20) {
        if(Math.random() > 0.7) {
          this.dotArr.push({
            xPos: i,
            yPos: j
          });
        }
      }
    }
    s.fill(randH, sDots, randLDots);
    s.noStroke();
    for(let el of this.dotArr) {
      s.circle(el.xPos, el.yPos, 10)
    }

    s.fill(randH, sBg, randLBg);
    s.noStroke();
    s.rect(745, 0, 50, 300)

    s.fill(randH, sDots, randLDots);
    s.noStroke();
    s.rect(751, 0, 1, 300)

    s.fill(randH, sDots, randLDots);
    s.noStroke();
    s.rect(747, 0, 2, 300)

    s.fill(randH, sDots, randLDots);
    s.noStroke();
    s.rect(780, 0, 20, 300)

    s.translate(850,50);
    s.rotate(s.radians(90) );
    s.fill(randH, sDots, randLDots);
    s.text(this.colorText, 0, 90);
    /*text(dateStr, 20, 90); */


  }

  private draw(s: p5): void {}

  public saveSketch() {
    this.canvas.saveFile();
  }

  public reload() {
    this.canvas.clear();
    this.canvas.loop()
  }

}
