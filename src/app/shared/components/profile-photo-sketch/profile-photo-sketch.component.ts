import { Component, OnInit } from '@angular/core';
import * as p5 from 'p5';
// const p5 = require('p5');

@Component({
  selector: 'app-profile-photo-sketch',
  templateUrl: './profile-photo-sketch.component.html',
  styleUrls: ['./profile-photo-sketch.component.scss']
})
export class ProfilePhotoSketchComponent implements OnInit {

  public canvas: any;

  constructor() {}

  ngOnInit() {
    const sketch = (s: any) => {
      let img: any;
      s.preload = () => {
        img = s.loadImage('./../../../../../assets/images/profile-photo-01.jpg')
      }

      s.setup = () => {
        let canvas2 = s.createCanvas(300, 300);
        canvas2.parent('sketch-wrapper');

        s.background(23, 18, 43, 255);

        img.loadPixels();

        s.tint(43, 175, 147, 200);
        s.image(img, 0, 0, 300, 300);
        // s.filter(s.GRAY);

        s.frameRate(10);
      };

      s.draw = () => {};
    };

    this.canvas = new p5(sketch);
  }

}
