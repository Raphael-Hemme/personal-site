import { Component, OnInit, OnDestroy } from '@angular/core';
import * as p5 from 'p5';
import { WindowSizeService } from '../../services/window-size-service/window-size.service';

interface RandomSlice {
  sliceXStart: number;
  sliceYStart: number;
  sliceWidth: number;
  sliceHeight: number;
}


@Component({
  selector: 'app-horizontal-glitch-sketch',
  templateUrl: './horizontal-glitch-sketch.component.html',
  styleUrls: ['./horizontal-glitch-sketch.component.scss']
})
export class HorizontalGlitchSketchComponent implements OnInit, OnDestroy {

  public canvas: any;

  public canvWidth = 500;
  public canvHeight = 500;

  private imgWidth = 500;
  private imgHeight = 500;

  private imgXStart: number = this.canvWidth / 2 - 250;
  private imgYStart: number = this.canvWidth / 2 - 250;

  constructor(
    private windowSizeService: WindowSizeService
  ) {}

  ngOnInit() {

    this.windowSizeService.windowWidth$.subscribe(() => {
      this.triggerResize();
    })

    const currWindowWidth = window.innerWidth;
    const currWindowHeight = window.innerHeight;
    // ToDo: Use rxjs subscription on behavior subject / subject to be provided in windowSizeService
    // that emits new events when window is resized instead of fixed window.innerWidth and -Height. Later.

    currWindowWidth < 992 ? this.canvWidth = currWindowWidth - 20 : this.canvWidth = currWindowWidth - 35;
    this.canvHeight = currWindowHeight;

    const sketch = (s: any) => {
      let img: any;
/*       let imgXStart = 0;
      let imgYStart = 0; */


      // const bgColor = [53, 30, 87];
      // const bgColor = [8, 84, 94];
      // const bgColor = [35, 14, 59];

      const bgColor = [70, 129, 137]

      s.preload = () => {
        img = s.loadImage('./../../../../../assets/images/own-logo/rh-logo-06-green.png')
        // img = s.loadImage('./../../../../../assets/images/photos/profile-photo-01-glitch-500.jpg')
      }

      s.setup = () => {
        let canvas2 = s.createCanvas(this.canvWidth, this.canvHeight);
        canvas2.parent('horizontal-glitch-sketch-wrapper');
        const currSketchWidth = s.width;
        this.setImgSize(this.canvWidth, this.canvHeight);
        this.setCenteredPosition(this.canvWidth, this.canvHeight);

        s.frameRate(15)
        s.pixelDensity(1);

        s.background(...bgColor);
        // s.generateBackgroundGradient();
      };

      s.draw = () => {
        s.background(...bgColor)
        // s.generateBackgroundGradient();
        s.image(img, this.imgXStart, this.imgYStart, this.imgWidth, this.imgHeight);

        if (s.random(1) > 0.95) {
          const randSlicesCount = s.int(s.random(5, 30))
          for (let i = 0; i <= randSlicesCount; i++) {
            const currSliceDataObj = s.generateRandomSlice();
            const currImgSlice = s.get(
              currSliceDataObj.sliceXStart,
              currSliceDataObj.sliceYStart,
              currSliceDataObj.sliceWidth,
              currSliceDataObj.sliceHeight,
            )
            s.image(
              currImgSlice,
              s.generateSliceShiftXStartPosition(currSliceDataObj.sliceXStart, 200),
              currSliceDataObj.sliceYStart,
              currSliceDataObj.sliceWidth,
              currSliceDataObj.sliceHeight
            )
          };
/*           for (let i = 0; i <= randSlicesCount / 2; i++) {
            const currSliceDataObj = s.generateRandomSlice();
              s.noStroke()
              s.fill(100, 40)
              s.rect(
                s.generateSliceShiftXStartPosition(currSliceDataObj.sliceXStart),
                currSliceDataObj.sliceYStart,
                currSliceDataObj.sliceWidth,
                currSliceDataObj.sliceHeight
              )
          }; */
          /* for (let i = 0; i <= randSlicesCount / 4; i++) {
            const currSliceDataObj = s.generateRandomSlice();
              s.noStroke()
              s.fill(bgColor)
              s.rect(
                s.generateSliceShiftXStartPosition(currSliceDataObj.sliceXStart),
                currSliceDataObj.sliceYStart,
                currSliceDataObj.sliceWidth,
                currSliceDataObj.sliceHeight
              )
          }; */
        }

        if (s.random(1) > 0.98) {
          const randSlicesCount = s.int(s.random(5, 10))
          for (let i = 0; i <= randSlicesCount; i++) {
            const currSliceDataObj = s.generateRandomSlice();
            s.noStroke()
            s.fill(100, 40)
            s.rect(
/*            s.generateSliceShiftXStartPosition(currSliceDataObj.sliceXStart, 600), */
              s.generateSliceShiftXStartPosition(currSliceDataObj.sliceXStart, s.width - s.width / 6),
              currSliceDataObj.sliceYStart,
              currSliceDataObj.sliceWidth,
              currSliceDataObj.sliceHeight
            )
          };
        }
      };

      s.generateRandomSlice = (): RandomSlice => {
        const randSliceWidth = s.int(s.random(10, 100));
        const randSliceHeight = s.int(s.random(2, 10));
        return {
          sliceXStart: s.int(s.random(this.imgXStart, (this.imgXStart + (this.imgWidth - randSliceWidth)))),
          sliceYStart: s.int(s.random(this.imgYStart, (this.imgYStart + (this.imgHeight - randSliceHeight)))),
          sliceWidth: randSliceWidth,
          sliceHeight: randSliceHeight
        }
      }

      s.generateSliceShiftXStartPosition = (currXStart: number, maxDist: number): number => {
        const randShiftLength = s.int(s.random(50, maxDist));
        return s.random(1) > 0.5
        ? currXStart + randShiftLength
        : currXStart - randShiftLength;
      }

      s.generateBackgroundGradient = () => {
        let c1,c2;
        c1 = s.color(70, 129, 137);
        c2 = s.color(119, 172, 162);

        for(let y=0; y < s.height; y++){
          let n = s.map(y, 0, s.height, 0, 1);
          let newc = s.lerpColor(c1, c2, n);
          s.stroke(newc);
          s.line(0, y, s.width, y);
        }

      }
    };

    this.canvas = new p5(sketch);
  }

  private triggerResize(): void {
    window.innerWidth < 992 ? this.canvWidth = window.innerWidth - 20 : this.canvWidth = window.innerWidth - 35;
    this.canvHeight = window.innerHeight;

    // this.canvas.resizeCanvas(50, 50);
    this.canvas.resizeCanvas(this.canvWidth, this.canvHeight);
    this.setImgSize(this.canvWidth, this.canvHeight);
    this.setCenteredPosition(this.canvWidth, this.canvHeight);

  }

  private setCenteredPosition(canvWidth: number, canvHeight: number): void {
    this.imgXStart = canvWidth / 2 - this.imgWidth / 2;
    this.imgYStart = canvHeight / 2 - this.imgHeight / 2;
    console.log(this.imgXStart, this.imgYStart)
  }

  private setImgSize(canvWidth: number, canvHeight: number): void {
    if (canvWidth < 600) {
      this.imgWidth = canvWidth / 10 * 6;
      this.imgHeight = canvWidth / 10 * 6;
    } else {
      this.imgWidth = 500;
      this.imgHeight = 500;
    }
  }

  ngOnDestroy(): void {
    console.log('removing "splash screen"');
    this.canvas.remove();
  }

}
