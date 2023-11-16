import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import p5 from 'p5';
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

  @Output() viewInitSignal = new EventEmitter<string>();

  public canvas!: p5;

  public canvWidth = 500;
  public canvHeight = 500;

  private imgWidth = 500;
  private imgHeight = 500;

  private imgXStart: number = this.canvWidth / 2 - 250;
  private imgYStart: number = this.canvWidth / 2 - 250;

  private bgColor = [63, 162, 164];
  private img!: p5.Image;

  private subscriptions: Subscription = new Subscription();

  constructor(
    private windowSizeService: WindowSizeService,
  ) {}

  ngOnInit() {

    this.subscriptions.add(
      this.windowSizeService.windowResize$.subscribe(() => {
        this.triggerResize();
      })
    );

    this.setCorrectCanvDimensions();

    this.canvas = new p5(this.sketchMethod);
  }

  ngOnDestroy(): void {
    this.canvas.remove();
    this.subscriptions.unsubscribe();
  }

  private sketchMethod = (s: p5): void => {
    s.preload = () => {
      this.img = s.loadImage('./../../../../../assets/images/own-logo/rh-logo-06.png')
    }

    s.setup = () => {
      this.setupMethod(s);
    };

    s.draw = () => {
      this.drawMethod(s);
    };
  }

  private setupMethod = (s: p5): void => {
    let canvas2 = s.createCanvas(this.canvWidth, this.canvHeight);
    canvas2.parent('horizontal-glitch-sketch-wrapper');
    this.setImgSize(this.canvWidth, this.canvHeight);
    this.setCenteredPosition(this.canvWidth, this.canvHeight);

    s.frameRate(15)
    s.pixelDensity(1);

    s.background(this.bgColor[0], this.bgColor[1], this.bgColor[2]);
  }

  private drawMethod = (s: p5): void => {
    s.background(this.bgColor[0], this.bgColor[1], this.bgColor[2])
    s.image(this.img, this.imgXStart, this.imgYStart, this.imgWidth, this.imgHeight);

    if (s.frameCount === 3) {
      this.viewInitSignal.emit('GLITCH');
    }

    if (s.random(1) > 0.92) {
      const randSlicesCount = s.int(s.random(5, 30))
      for (let i = 0; i <= randSlicesCount; i++) {
        const currSliceDataObj = this.generateRandomSlice(s);
        const currImgSlice = s.get(
          currSliceDataObj.sliceXStart,
          currSliceDataObj.sliceYStart,
          currSliceDataObj.sliceWidth,
          currSliceDataObj.sliceHeight,
        )
        s.image(
          currImgSlice,
          this.generateSliceShiftXStartPosition(
            s,
            currSliceDataObj.sliceXStart, 
            200
          ),
          currSliceDataObj.sliceYStart,
          currSliceDataObj.sliceWidth,
          currSliceDataObj.sliceHeight
        )
      };
    }
  }

  private generateRandomSlice = (s: p5): RandomSlice => {
    const randSliceWidth = Math.round(s.random(this.imgWidth / 50, this.imgWidth / 5));
    const randSliceHeight = Math.round(s.random(2, 10));

    return {
      sliceXStart: s.int(s.random(this.imgXStart, (this.imgXStart + (this.imgWidth - randSliceWidth)))),
      sliceYStart: s.int(s.random(this.imgYStart, (this.imgYStart + (this.imgHeight - randSliceHeight)))),
      sliceWidth: randSliceWidth,
      sliceHeight: randSliceHeight
    }
  }

  private generateSliceShiftXStartPosition = (
    s: p5,
    currXStart: number,
    maxDist: number
  ): number => {
    const randShiftLength = s.int(s.random(50, maxDist));
    return s.random(1) > 0.5
    ? currXStart + randShiftLength
    : currXStart - randShiftLength;
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
      // USE NON STANDARD MOBILE BREAKPOINT HERE TO PREVENT CUTING OFF OF LOGO ON MOBILE IN LANDSCAPE MODE
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
}
