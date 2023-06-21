import { Component, OnInit, OnDestroy } from '@angular/core';
import p5 from 'p5';
import { LoadingService } from '../../services/loading-service/loading.service';
import { WindowSizeService } from '../../services/window-size-service/window-size.service';
import { Subscription } from 'rxjs';

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

  private subscriptions: Subscription = new Subscription();

  constructor(
    private windowSizeService: WindowSizeService,
    private loadingService: LoadingService
  ) {}

  ngOnInit() {

    setTimeout(() => this.loadingService.startLoading(), 0);

    this.subscriptions.add(
      this.windowSizeService.windowResize$.subscribe(() => {
        this.triggerResize();
      })
    );

    const currWindowWidth = window.innerWidth;
    const currWindowHeight = window.innerHeight;

    this.setCorrectCanvDimensions();

    const sketch = (s: any) => {
      let img: any;

      // const bgColor = [53, 30, 87];
      // const bgColor = [8, 84, 94];
      // const bgColor = [35, 14, 59];
      // const bgColor = [70, 129, 137]
      const bgColor = [119, 172, 162];

      s.preload = () => {
        img = s.loadImage('./../../../../../assets/images/own-logo/rh-logo-06.png')
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
        this.loadingService.stopLoading();
        // s.generateBackgroundGradient();
      };

      s.draw = () => {
        s.background(...bgColor)
        // s.generateBackgroundGradient();
        s.image(img, this.imgXStart, this.imgYStart, this.imgWidth, this.imgHeight);

        if (s.random(1) > 0.92) {
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
        }
      };

      s.generateRandomSlice = (): RandomSlice => {
        const randSliceWidth = Math.round(s.random(this.imgWidth / 50, this.imgWidth / 5));
        const randSliceHeight = Math.round(s.random(2, 10));

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

    this.setCorrectCanvDimensions();

    this.canvas.resizeCanvas(this.canvWidth, this.canvHeight);
    this.setImgSize(this.canvWidth, this.canvHeight);
    this.setCenteredPosition(this.canvWidth, this.canvHeight);
  }

  private setCorrectCanvDimensions(): void {
    if (window.innerWidth <= 768) {
      this.canvWidth = window.innerWidth - 35;
      this.canvHeight = window.innerHeight;
    } else if (window.innerWidth < 1000 && window.matchMedia("(orientation: landscape)").matches) {
      // USE NON STANDARD MOBILE BREAKPOINT HERE TO PREVENT CUTING OFF LOGO ON MOBILE IN LANDSCAPE MODE
      this.canvWidth = window.innerHeight;
      this.canvHeight = window.innerHeight;
    } else if (window.innerWidth > 768 && window.innerWidth < 1200) {
      this.canvWidth = window.innerWidth - 160;
      this.canvHeight = window.innerHeight;
    } else {
      this.canvWidth = 1005;
      this.canvHeight = window.innerHeight;
    }
  }

  private setCenteredPosition(canvWidth: number, canvHeight: number): void {
    this.imgXStart = canvWidth / 2 - this.imgWidth / 2;
    this.imgYStart = canvHeight / 2 - this.imgHeight / 2;
  }

  private setImgSize(canvWidth: number, canvHeight: number): void {
    if (canvWidth < 600) {
      this.imgWidth = canvWidth / 10 * 6;
      this.imgHeight = this.imgWidth;
    } else {
      this.imgWidth = 500;
      this.imgHeight = 500;
    }
  }

  ngOnDestroy(): void {
    this.canvas.remove();
    this.subscriptions.unsubscribe();
  }

}
