import { Component, OnInit, OnDestroy } from '@angular/core';
import * as p5 from 'p5';

@Component({
  selector: 'app-profile-photo-sketch',
  templateUrl: './profile-photo-sketch.component.html',
  styleUrls: ['./profile-photo-sketch.component.scss']
})
export class ProfilePhotoSketchComponent implements OnInit, OnDestroy {

  public canvas: any;

  constructor() {}

  ngOnInit() {
    const sketch = (s: any) => {
      // Inspired by this sketch.

      let img: any;
      let currWidth = 0;
      let currHeight = 0;


      s.preload = () => {
        img = s.loadImage('./../../../../../assets/images/photos/profile-photo-01-medium.jpg')
      }

      s.setup = () => {
        let canvas2 = s.createCanvas(300, 300);
        canvas2.parent('profile-photo-sketch-wrapper');

        s.pixelDensity(1);
        // s.background(23, 18, 43, 255);

        img.loadPixels();

        // s.tint(43, 175, 147, 200);
        s.image(img, 0, 0, 300, 300);
        s.filter(s.GRAY);

        s.strokeWeight(1);
        s.stroke(43, 175, 147)
        s.noFill();
        s.circle(s.width / 2, s.height / 2, 290);
      };

      s.draw = () => {};

      s.windowResized = () => {
/*         console.log('window-resize')
        s.resizeCanvas((300 * s.windowWidth) / 100, (300 * s.windowWidth) / 100); */
      }
    };

    this.canvas = new p5(sketch);
  }

  ngOnDestroy(): void {
    this.canvas.remove();
  }

}
