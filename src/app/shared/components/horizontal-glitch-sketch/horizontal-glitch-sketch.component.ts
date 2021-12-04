import { Component, OnInit } from '@angular/core';
import * as p5 from 'p5';

@Component({
  selector: 'app-horizontal-glitch-sketch',
  templateUrl: './horizontal-glitch-sketch.component.html',
  styleUrls: ['./horizontal-glitch-sketch.component.scss']
})
export class HorizontalGlitchSketchComponent implements OnInit {

  public canvas: any;

  constructor() {}

  ngOnInit() {
    const sketch = (s: any) => {
      // Inspired by this sketch: https://editor.p5js.org/aferriss/sketches/KllcEgx5W

      let img: any;
      s.preload = () => {
        img = s.loadImage('./../../../../../assets/images/own-logo/rh-logo-05-negative.png')
      }

      s.setup = () => {
        let canvas2 = s.createCanvas(s.windowWidth, s.windowHeight);
        canvas2.parent('horizontal-glitch-sketch-wrapper');

        s.pixelDensity(1);
        // s.background('#353a40');

        // img.loadPixels();

        // s.tint(43, 175, 147, 200);
        // s.image(img, 0, 0, 300, 300);
        // s.filter(s.GRAY);

        // s.strokeWeight(1);
        // s.stroke(43, 175, 147)
        // s.noFill();
        // s.circle(s.width / 2, s.height / 2, 290);
        // s.frameRate(10);
      };

      s.draw = () => {
        img.loadPixels();
        const newPixelArr = [];

        for (let y = 0; y < s.height; y++) {
          for (let x = 0; x < s.width; x++) {

            const index = (y * s.width + x) * 4;

            let nxtIndex = (y * s.width + x) * 4 + (4 * s.int(s.random(-2, 2)));
            nxtIndex = nxtIndex % (s.width * s.height * 4);

            const r = img.pixels[nxtIndex + 0];
            const g = img.pixels[nxtIndex + 1];
            const b = img.pixels[nxtIndex + 2];

            newPixelArr.push(r, g, b, 255);
          }
        }

        for (let i = 0; i < newPixelArr.length; i++) {
          img.pixels[i] = newPixelArr[i];
        }

        img.updatePixels();

        s.image(img, (s.width / 2 -250), (s.height / 2 -250), 500, 500)
      };
    };

    this.canvas = new p5(sketch);
  }

}
