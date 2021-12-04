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
  private forceExit = false;

  constructor() {}

  ngOnInit() {
    const sketch = (s: any) => {

      let img: any;
      let imgXStart = 0;
      let imgYStart = 0;
      const imgWidth = 500;
      const imgHeight = 500;

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

        s.background(30, 67, 68)
        s.image(img, imgXStart, imgYStart, imgWidth, imgHeight);
      };

      s.draw = () => {
        if (this.forceExit) {
          return;
        }

        s.background(30, 67, 68)
        s.image(img, imgXStart, imgYStart, imgWidth, imgHeight);

        if (s.random(1) > 0.85) {
          const randSlicesCount = s.int(s.random(5, 30))
          for (let i = 0; i <= randSlicesCount; i++) {
            const currSliceDataObj = s.generateRandomSlice();
            console.log(currSliceDataObj);
              const currImgSlice = s.get(
                currSliceDataObj.sliceXStart,
                currSliceDataObj.sliceYStart,
                currSliceDataObj.sliceWidth,
                currSliceDataObj.sliceHeight,
              )
              s.image(
                currImgSlice,
                s.generateSliceShiftXStartPosition(currSliceDataObj.sliceXStart),
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

      s.generateSliceShiftXStartPosition = (currXStart: number): number => {
        // shiftedXStart
        const randShiftLength = s.int(s.random(50, 200));
        return s.random(1) > 0.5
        ? currXStart + randShiftLength
        : currXStart - randShiftLength;
      }
    };

    this.canvas = new p5(sketch);
  }

  ngOnDestroy(): void {
    this.forceExit = true;
  }

}
