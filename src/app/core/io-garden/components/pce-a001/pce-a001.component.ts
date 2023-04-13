import { Component, OnInit, OnDestroy } from '@angular/core';
import * as p5 from 'p5';
import _ from 'lodash';
import { WindowSizeService } from 'src/app/shared/services/window-size-service/window-size.service';
import { Subscription } from 'rxjs';


interface DotArrElement {
  xPos: number;
  yPos: number;
}

@Component({
  selector: 'app-pce-a001',
  templateUrl: './pce-a001.component.html',
  styleUrls: ['./pce-a001.component.scss']
})
export class PceA001Component implements OnInit, OnDestroy {

  public canvas: any;

  public canvWidth = 300;
  public canvHeight = 300;

  private dotArr: DotArrElement[] = [];
  public saveFileName = '';
  public colorText = '';

  private subscriptions: Subscription = new Subscription();

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

    this.subscriptions.add(
      this.windowSizeService.windowResize$.subscribe(() => {
        const canvSizeObj = this.windowSizeService.calculateCanvasSize(canvasConfig);
        this.canvWidth = canvSizeObj.w;
        this.canvHeight = canvSizeObj.w * 0.36;
  
        this.canvas.clear();
        this.dotArr.splice(1);
  
        this.windowSizeService.triggerCanvasResize(this.canvas, canvasConfig);
      })
    );

    const sketch = (s: p5) => {

      // P5 SCRIPT
      s.draw = () => {
        // console.log('this.canvWidth, this.canvHeight in setup: ', this.canvWidth, this.canvHeight)
        let canvas2 = s.createCanvas(this.canvWidth, this.canvHeight);
        canvas2.parent('pce-a001-sketch-wrapper');


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

        for (let i = 20; i < this.canvWidth * 0.9; i+= 20) {
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
        s.rect(this.canvWidth - 50, 0, 50, this.canvHeight)

        s.fill(randH, sDots, randLDots);
        s.noStroke();
        s.rect(this.canvWidth - 50, 0, 1, this.canvHeight)

        s.fill(randH, sDots, randLDots);
        s.noStroke();
        s.rect(this.canvWidth - 45, 0, 2, this.canvHeight)

        s.fill(randH, sDots, randLDots);
        s.noStroke();
        s.rect(this.canvWidth - 20, 0, 20, this.canvHeight)

        s.translate(this.canvWidth + 53, 50);
        s.rotate(s.radians(90) );
        s.fill(randH, sDots, randLDots);
        s.text(this.colorText, 0, 90);
        /*text(dateStr, 20, 90); */
        s.noLoop();
      }
    }

    this.canvas = new p5(sketch);
  }


  ngOnDestroy(): void {
    this.canvas.remove();
    this.subscriptions.unsubscribe();
  }

  public saveSketch() {
    this.canvas.save(`${this.saveFileName}.png`);
  }

  public reload() {
    this.dotArr.splice(1);
    this.canvas.clear();
    this.canvas.loop()
  }

}
