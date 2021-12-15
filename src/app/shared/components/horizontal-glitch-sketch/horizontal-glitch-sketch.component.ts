import { Component, OnInit, OnDestroy } from '@angular/core';
import * as p5 from 'p5';

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
  // private forceExit = false;

  constructor() {}

  ngOnInit() {
    const sketch = (s: any) => {
      let img: any;
      let imgXStart = 0;
      let imgYStart = 0;
      const imgWidth = 500;
      const imgHeight = 500;

      // const bgColor = [53, 30, 87];
      // const bgColor = [8, 84, 94];

      const bgColor = [70, 129, 137]
      //const bgColor = [35, 14, 59];

      s.preload = () => {
        img = s.loadImage('./../../../../../assets/images/own-logo/rh-logo-05.png')
        // img = s.loadImage('./../../../../../assets/images/photos/profile-photo-01-glitch-500.jpg')
      }

      s.setup = () => {
        let canvas2 = s.createCanvas(s.windowWidth, s.windowHeight);
        canvas2.parent('horizontal-glitch-sketch-wrapper');

        imgXStart = s.width / 2 -250;
        imgYStart = s.height / 2 -250;

        s.frameRate(15)
        s.pixelDensity(1);

        s.background(...bgColor);
      };

      s.draw = () => {
        s.background(...bgColor)
        s.tint(186, 255, 41);
        s.image(img, imgXStart, imgYStart, imgWidth, imgHeight);

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
              s.generateSliceShiftXStartPosition(currSliceDataObj.sliceXStart, 600),
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
          sliceXStart: s.int(s.random(imgXStart, (imgXStart + (imgWidth - randSliceWidth)))),
          sliceYStart: s.int(s.random(imgYStart, (imgYStart + (imgHeight - randSliceHeight)))),
          sliceWidth: randSliceWidth,
          sliceHeight: randSliceHeight
        }
      }

      s.generateSliceShiftXStartPosition = (currXStart: number, maxDist: number): number => {
        // shiftedXStart
        const randShiftLength = s.int(s.random(50, maxDist));
        return s.random(1) > 0.5
        ? currXStart + randShiftLength
        : currXStart - randShiftLength;
      }
    };

    this.canvas = new p5(sketch);
  }

  ngOnDestroy(): void {
    // this.forceExit = true;
    this.canvas.remove();
  }

}
