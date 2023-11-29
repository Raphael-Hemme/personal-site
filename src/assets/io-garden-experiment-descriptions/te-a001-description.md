### Description

Typography Experiment - A001 (`TE-A001`) is the first in a series of experiments to procedurally generate alphabetic characters and enable users to enter text in an input field that is then translated into strings of those procedurally generated characters.

This sketch is a prototype. It does not produce a coherent, aesthetically pleasing or even generally usable alphabetic character set. But it might be a step in that direction.

What I found really surprising, however, was that the 'live text' feature in iOS automatically recognized characters in a photo I took of the output a few weeks back, to share with a friend. If you are curious, to see if that works in your operating system, OCR app or photo app as well, go ahead and take a picture.
<br />
<br />

```typescript
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import p5 from 'p5';
import { Subscription } from 'rxjs';
import { WindowSizeService } from 'src/app/shared/services/window-size-service/window-size.service';

interface LineObj {
  start: p5.Vector;
  end: p5.Vector;
  orientation: 'horizontal' | 'vertical' | 'diagonal';
  strokeWidth: number;
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

  private allCurrLines: LineObj[] = [];

  private chars: Map<number, any> = new Map();

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
        
        // Generate the starting line with extra padding
        let startingLine = this.generateRandomLine(s, 15, 85); // 15% padding
        this.allCurrLines = [startingLine];
        
        // First iteration: extend 1 to 2 lines from the starting line
        this.extendLinesFromLine(s, startingLine, this.allCurrLines, 2);
        
        this.chars.set(currCharCode, this.allCurrLines);
      }
    }
  }

  public handleInputTextChange(inputVal: string): void {
    this.updateCharacterMapFromInputVal(this.canvas, inputVal);
  }

  // ------ New Approach including diagonal lines with help of ChatGPT-4

  private drawChar(s: p5, lineArr: LineObj[]) {
    lineArr.forEach((l) => {
      s.stroke(237, 34, 93);
      s.strokeWeight(l.strokeWidth);
      s.line(l.start.x, l.start.y, l.end.x, l.end.y);
    });
  }

  /// newest approach
  
  private generateRandomLine(s: p5, padding: number, size: number): LineObj {
    let x1, y1, x2, y2, orientation, strokeWidth;
    let rand = s.random();
    if (rand < 1/3) {
      // horizontal - potentially shorter but thicker
      x1 = s.random(padding, size - 30); // Allowing for potentially shorter lines
      x2 = s.random(x1 + 10, size); // Ensuring at least some minimal length
      y1 = y2 = s.random(padding, size);
      orientation = 'horizontal';
      strokeWidth = s.int(s.random(3, 6)); // Thicker lines for horizontal
    } else if (rand < 2/3) {
      // vertical - average thickness
      y1 = s.random(padding, size);
      y2 = s.random(y1, size);
      x1 = x2 = s.random(padding, size);
      orientation = 'vertical';
      strokeWidth = s.int(s.random(1, 3)); // Thinnest lines for vertical
    } else {
      // diagonal - with a higher chance of being longer
      let startPoint = s.createVector(s.random(padding, size), s.random(padding, size));
      let angle = s.random([s.QUARTER_PI, -s.QUARTER_PI]); // 45 degrees or -45 degrees
      let minLength = size/2; // Ensuring diagonals are longer on average
      let maxLength = size - s.max(startPoint.x, startPoint.y) - padding;
      let length = s.random(minLength, maxLength);
      let endPoint = p5.Vector.fromAngle(angle).setMag(length).add(startPoint);
      x1 = startPoint.x;
      y1 = startPoint.y;
      x2 = endPoint.x;
      y2 = endPoint.y;
      orientation = 'diagonal';
      strokeWidth = s.int(s.random(1, 4)); // Variable thickness for diagonal
    }
  
    return { 
      start: s.createVector(x1, y1),
      end: s.createVector(x2, y2),
      orientation: orientation as 'horizontal' | 'vertical' | 'diagonal',
      strokeWidth: strokeWidth
    };
  }
  
  private extendLinesFromLine(s: p5, l: LineObj, allLines: LineObj[], depth: number): void {
    if (depth > 2) return; // Limit recursion depth
  
    let numLinesToExtend = s.int(s.random(2, 5)); // 2 to 5 lines
    for (let i = 0; i < numLinesToExtend; i++) {
      // Choose a random point along the line
      let t = s.random();
      let pointOnLine = p5.Vector.lerp(l.start, l.end, t);
      // Generate a new line starting from this point
      let newLine = this.generateRandomLineFromPoint(s, pointOnLine, 10, 90, l.orientation);
      this.allCurrLines.push(newLine);
  
      // Recursive call for the new line
      if (s.random() < 0.7) { // 50% chance to extend further
        this.extendLinesFromLine(s, newLine, this.allCurrLines, depth + 1);
      }
    }
  }
  
  generateRandomLineFromPoint(
    s: p5,
    point: p5.Vector, 
    padding: number,
    size: number,
    excludeOrientation: 'horizontal' | 'vertical' | 'diagonal'
  ): LineObj {
    let x2, y2;
    let orientation: 'horizontal' | 'vertical' | 'diagonal';
    if (excludeOrientation === 'horizontal') {
      // vertical or diagonal
      let rand = s.random();
      if (rand < 0.5) {
        orientation = 'vertical';
        y2 = s.random(padding, size);
        return { 
          start: point,
          end: s.createVector(point.x, y2),
          orientation: orientation,
          strokeWidth: s.int(s.random(1, 2)) // Thinnest lines for vertical
        };
      } else {
        orientation = 'diagonal';
        let angle = s.random([s.QUARTER_PI, -s.QUARTER_PI]);
        let length = s.random(10, size - s.max(point.x, point.y));
        let endPoint = p5.Vector.fromAngle(angle).setMag(length).add(point);
        return { 
          start: point, 
          end: endPoint, 
          orientation: orientation,
          strokeWidth: s.int(s.random(1, 4)) // Variable thickness for diagonal
        };
      }
    } else if (excludeOrientation === 'vertical') {
      // horizontal or diagonal
      orientation = 'horizontal';
      x2 = s.random(padding, size);
      return { 
        start: point,
        end: s.createVector(x2, point.y),
        orientation: orientation,
        strokeWidth: s.int(s.random(1, 4))
      };
    } else {
      // horizontal or vertical
      let rand = s.random();
      if (rand < 0.5) {
        orientation = 'horizontal';
        x2 = s.random(padding, size);
        return { 
          start: point,
          end: s.createVector(x2, point.y), 
          orientation: orientation,
          strokeWidth: s.int(s.random(1, 4)) // Thicker lines for horizontal
        };
      } else {
        orientation = 'vertical';
        y2 = s.random(padding, size);
        return { 
          start: point,
          end: s.createVector(point.x, y2),
          orientation: orientation,
          strokeWidth: s.int(s.random(1, 2)) // Thinnest lines for vertical
        };
      }
    }
  }
}

```
