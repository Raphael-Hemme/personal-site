import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import p5 from 'p5';
import { Subscription } from 'rxjs';
import { WindowSizeService } from 'src/app/shared/services/window-size-service/window-size.service';

interface LineObj {
  start: p5.Vector;
  end: p5.Vector;
}

@Component({
  selector: 'app-te-a001',
  templateUrl: './te-a001.component.html',
  styleUrls: ['./te-a001.component.scss'],
})
export class TeA001Component implements OnInit, OnDestroy {
  public canvWidth = 500;
  public canvHeight = 500;

  private charWidth = 100;

  public inputText = '';

  public canvas: any;

  private chars: Map<number, any> = new Map();

  private ioStringArr: any[] = [];

  private yOffset = 100;
  private counter = 0;

  private subscriptions: Subscription = new Subscription();

  constructor(private windowSizeService: WindowSizeService) {}

  ngOnInit() {
    const canvasConfig = {
      isSquare: false,
      wPercentS: 100,
      wPercentL: 100,
      hPercentS: 80,
      hPercentL: 50,
    };

    const canvSizeObj = this.windowSizeService.calculateCanvasSize(canvasConfig);
    this.canvWidth = canvSizeObj.w;
    this.canvHeight = canvSizeObj.h;

    this.subscriptions.add(
      this.windowSizeService.windowResize$.subscribe(() => {
        this.windowSizeService.triggerCanvasResize(this.canvas, canvasConfig);
      })
    );

    const sketch = (s: any) => {
      s.setup = () => {
        let canvas2 = s.createCanvas(this.canvWidth, this.canvHeight);
        canvas2.parent('te-a001-sketch-wrapper');

        s.background(50);
        s.frameRate(10);

        s.fill(237, 34, 93);
        // s.noStroke();
      };

      s.draw = () => {
        s.frameCount === 1 ?? s.translate(0, 10);

        s.background(50);
        this.drawString(s, this.inputText);
      };
    };

    this.canvas = new p5(sketch);
  }

  ngOnDestroy(): void {
    this.canvas.remove();
    this.subscriptions.unsubscribe();
  }

  private drawString(s: p5, inputStr: string) {
    // split inputStr into array of strings for each line.
    const gap = 20
    const lineHeight = 120;
    const charWidth = 100;
    let currLine  = 1;
    const lineStrArr = inputStr.split('\n');
    for (const [i, line] of lineStrArr.entries()) {
      const currYOffset = currLine < 2 ? gap : (currLine - 1) * lineHeight + gap;
      for (const [j, char] of line.split('').entries()) {
        const currXOffset = j < 1 ? gap : j * charWidth + gap;;
        const currCharCode = char.toLowerCase().charCodeAt(0);
        if (this.chars.has(currCharCode)) {
          s.push();
            s.translate(currXOffset, currYOffset);
            this.drawChar(s, this.chars.get(currCharCode));
          s.pop();
        }
      }
      currLine++;
    }
  }

  private updateCharacterMapFromInputVal(s: p5, inputVal: string): void {
    const cleanedInputVal = inputVal.replace(/(\r\n|\n|\r|\s)/gm, '');
    const inputValArr = cleanedInputVal.split('');
    for (const char of inputValArr) {
      const currCharCode = char.toLowerCase().charCodeAt(0);
      if (!this.chars.has(currCharCode)) {
        const maxLines = s.int(s.random(3, 6));
        const padding = 10;
        const charSize = 100;
        this.chars.set(currCharCode, this.createTouchingLines(s, maxLines, padding, charSize));
      }
    }
  }

  public handleInputTextChange(inputVal: string): void {
    this.updateCharacterMapFromInputVal(this.canvas, inputVal);
  }

  // ------ New Approach including diagonal lines with help of ChatGPT-4

  // Each line is represented as an object with a start and end point
  private createLine(
    s: p5,
    x1: number,
    y1: number,
    x2: number,
    y2: number
  ): LineObj {
    return { start: s.createVector(x1, y1), end: s.createVector(x2, y2) };
  }

  // Function to generate a random line within the canvas constraints
  private generateRandomLine(s: p5, padding: number, size: number) {
    let x1, y1, x2, y2!: number;
    switch (
      s.int(s.random(3)) // 0: horizontal, 1: vertical, 2: diagonal
    ) {
      case 0: // horizontal
        x1 = s.random(padding, size - padding);
        x2 = s.random(x1, size - padding);
        y1 = y2 = s.random(padding, size - padding);
        break;
      case 1: // vertical
        y1 = s.random(padding, size - padding);
        y2 = s.random(y1, size - padding);
        x1 = x2 = s.random(padding, size - padding);
        break;
      case 2: // diagona2
        console.log('case 3');
        let length = s.random(5, size / 2 - padding);
        x1 = s.random(padding, size - padding - length);
        y1 = s.random(padding, size - padding - length);
        if (s.random(1) < 0.5) {
          // diagonal down-right
          x2 = x1 + length;
          y2 = y1 + length;
        } else {
          // diagonal up-right
          x2 = x1 + length;
          y2 = y1 - length;
        }
        break;
    }
    return this.createLine(
      s,
      x1 as number,
      y1 as number,
      x2 as number,
      y2 as number
    );
  }

  // Function to check if two lines touch or cross
  // This function returns true if the two lines intersect
  private linesTouchOrCross(s: p5, l1: LineObj, l2: LineObj) {
    // Convert points to vectors for easier calculation
    let p1 = l1.start.copy();
    let p2 = l1.end.copy();
    let p3 = l2.start.copy();
    let p4 = l2.end.copy();

    // Get the vectors for the lines themselves
    let line1 = p2.copy().sub(p1);
    let line2 = p4.copy().sub(p3);

    // Calculate denominators for the line equations
    let denom = line1.x * line2.y - line1.y * line2.x;

    // Lines are parallel if denominator is 0; here, we assume they don't overlap if parallel
    if (denom === 0) return false;

    // Calculate the numerator for the equations
    let num1 = p1.x * p2.y - p1.y * p2.x;
    let num2 = p3.x * p4.y - p3.y * p4.x;

    // Intersection point
    let ix = (num1 * line2.x - line1.x * num2) / denom;
    let iy = (num1 * line2.y - line1.y * num2) / denom;

    // Check if intersection point is within the line segments
    let intersection = s.createVector(ix, iy);
    if (
      intersection.x < s.min(p1.x, p2.x) ||
      intersection.x > s.max(p1.x, p2.x) ||
      intersection.x < s.min(p3.x, p4.x) ||
      intersection.x > s.max(p3.x, p4.x) ||
      intersection.y < s.min(p1.y, p2.y) ||
      intersection.y > s.max(p1.y, p2.y) ||
      intersection.y < s.min(p3.y, p4.y) ||
      intersection.y > s.max(p3.y, p4.y)
    ) {
      // Intersection point is outside the line segments
      return false;
    }

    // If the intersection point is within both line segments, they cross
    return true;
  }

  // Main function to create an array of touching lines
  private createTouchingLines(
    s: p5,
    maxLines: number,
    padding: number,
    size: number
  ) {
    let lines = [];
    while (lines.length < maxLines) {
      let newLine = this.generateRandomLine(s, padding, size);
      let doesTouchOrCross = lines.some((line) =>
        this.linesTouchOrCross(s, line, newLine)
      );
      if (!doesTouchOrCross) {
        lines.push(newLine);
      }
    }
    return lines;
  }

  private drawChar(s: p5, lineArr: any[]) {
    lineArr.forEach((l) => {
      s.strokeWeight(2);
      s.stroke(237, 34, 93);
      s.line(l.start.x, l.start.y, l.end.x, l.end.y);
    });
  }

  // p5.js setup function
  private setupMethod(s: p5) {
    s.createCanvas(100, 100);
    s.background(255);
    s.stroke(0);

    let padding = 10;
    let maxLines = 6;
    let lines = this.createTouchingLines(s, maxLines, padding, 50);

    this.drawChar(s, lines);
  }

  // p5.js draw function
  private drawMethod(s: p5) {
    // The drawing logic is handled in setup
    s.noLoop(); // No need to loop since the drawing only needs to happen once
  }
}
