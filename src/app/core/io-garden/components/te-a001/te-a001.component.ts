import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import p5 from 'p5';
import { Subscription } from 'rxjs';
import { WindowSizeService } from 'src/app/shared/services/window-size-service/window-size.service';

interface LineObj { start: p5.Vector, end: p5.Vector }

class DotTriplet {
  constructor(x1: number, y1: number) {
    this.firstDot.x = x1;
    this.firstDot.y = y1;
    this.secondDot.x = x1 + 10;
    this.secondDot.y = y1;
    this.thirdDot.x = x1;
    this.thirdDot.y = y1 + 10;
  }
  firstDot = {
    x: 0,
    y: 0
  };
  secondDot = {
    x: 0,
    y: 0
  };
  thirdDot = {
    x: 0,
    y: 0
  };
}

@Component({
  selector: 'app-te-a001',
  templateUrl: './te-a001.component.html',
  styleUrls: ['./te-a001.component.scss']
})
export class TeA001Component implements OnInit, OnDestroy {

  public canvWidth = 500;
  public canvHeight = 500;

  public inputText = '';

  public canvas: any;

  private chars: { [key: string]: {} } = {
    a: {},
    b: {},
    c: {},
    d: {},
    e: {},
    f: {},
    g: {},
    h: {},
    i: {},
    j: {},
    k: {},
    l: {},
    m: {},
    n: {},
    o: {},
    p: {},
    q: {},
    r: {},
    s: {},
    t: {},
    u: {},
    v: {},
    w: {},
    x: {},
    y: {},
    z: {},
    'ß': {},
    'ä': {},
    'á': {},
    'é': {},
    'è': {},
    'ì': {},
    'ö': {},
    'ü': {},
    '0': {},
    '1': {},
    '2': {},
    '3': {},
    '4': {},
    '5': {},
    '6': {},
    '7': {},
    '8': {},
    '9': {},
    space: 'space',
    return: 'return',
    '!': {},
    '@': {},
    '#': {},
    '$': {},
    '%': {},
    '^': {},
    '&': {},
    '*': {},
    '(': {},
    ')': {},
    '-': {},
    '_': {},
    '+': {},
    '=': {},
    '[': {},
    ']': {},
    '{': {},
    '}': {},
    ',': {},
    '.': {},
    '?': {},
    '/': {},
    '<': {},
    '>': {},
    '~': {},
    '`': {},
    '"': {},
    "'": {},
    "|": {},
    "\\": {},
  };

  private ioStringArr: any[] = [];

  private yOffset = 100;
  private counter = 0;

  private subscriptions: Subscription = new Subscription();

  constructor(
    private windowSizeService: WindowSizeService
  ) {}

  ngOnInit() {

    const canvasConfig = {
      'isSquare': false,
      'wPercentS': 100,
      'wPercentL': 100,
      'hPercentS': 80,
      'hPercentL': 50
    }

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

        this.generateAlphabet(s);

        s.background(50);
        s.frameRate(20);

        s.fill(237, 34, 93);
        // s.noStroke();
      }

      s.draw = () => {
        s.frameCount === 1 ?? s.translate(0, 10);

        s.background(50);
        this.ioStringArr.splice(0, this.ioStringArr.length);
        this.ioStringArr = this.translateInputStringIntoIoArr(s, this.inputText);

        this.drawString(s, this.ioStringArr);
        // const {start, end} = this.generateDiagonalLineStartAndEnd(s);
        // s.stroke(255);
        // s.strokeWeight(2);
        // s.line(start[0], start[1], end[0], end[1]);
        // s.noLoop();
      }
    };

    this.canvas = new p5(sketch);
  }

  ngOnDestroy(): void {
    this.canvas.remove();
    this.subscriptions.unsubscribe();
  }

  private drawChar(s: p5, charPointArr: any): any {
    // new drawing function: charPointArr is not renamed to be less confusing if old function
    // is restored. It is an object however.
    for (let hbar of charPointArr.horizontalBarArr) {
      s.rect(hbar.x, hbar.y, hbar.w, hbar.h);
    }
    for (let vbar of charPointArr.verticalBarArr) {
      s.rect(vbar.x, vbar.y, vbar.w, vbar.h);
    }
    for (let dot in charPointArr.dotTriplet) {
      // console.log(dot)
      // circle(charPointArr[dot].x, charPointArr[dot].y, charPointArr[dot].w, charPointArr[dot].h)
    }
    s.circle(
      charPointArr.dotTriplet.firstDot.x,
      charPointArr.dotTriplet.firstDot.y,
      5
    );
    s.circle(
      charPointArr.dotTriplet.secondDot.x,
      charPointArr.dotTriplet.secondDot.y,
      5
    )
    s.circle(
      charPointArr.dotTriplet.thirdDot.x,
      charPointArr.dotTriplet.thirdDot.y,
      5
    )
  };

  private drawString(s: p5, stringArr: any[]) {
    if (stringArr.includes('return')) {
      const preSubStringArr = stringArr.map(el => {
        // maybe find a better solution for the substitution characters
        // in order to not block them. Maybe Reg-Ex...
        if (el === 'return') {
          return '~';
        } else if (el === 'space') {
          return '_';
        } else {
          return el;
        }
      })
      const subStringArr = preSubStringArr.join('').split('~');
      for (let i = 0; i < subStringArr.length; i++) {
        const currYOffset = i > 0 ? 150 : 0;
        const currXOffset = i > 0 ? -1 * (subStringArr[i - 1].length * 100) : 0;
        s.translate(currXOffset, currYOffset);
        for (let char of subStringArr[i]) {
          if (char === '_') {
            s.translate(100, 0);
          } else {
            s.translate(100, 0);
            this.drawChar(s, this.chars[char]);
          }
        }
      }
    } else {
      for (let char of stringArr) {
        if (char === 'space') {
          s.translate(100, 0);
        } else {
          s.translate(100, 0);
          this.drawChar(s, this.chars[char]);
        }
      }
    }
  };

  private generateHorizontalBarArr(s: p5, n: number) {
    const result = [];
    for(let i = 0; i < n; i++) {
      const currX = s.int(s.random(0, 80));
      result.push({
        x: currX,
        y: s.int(s.random(0, 90)),
        w: s.int(s.random(10, 100 - currX)),
        h: 5
      });
    };
    return result;
  }

  private generateVerticalBarArr(s: p5, n: number): any[]{
    const result = [];
    for(let i = 0; i < n; i++) {
      const currY = s.int(s.random(0, 80));
      result.push({
        x: s.int(s.random(0, 90)),
        y: currY,
        w: 5,
        h: s.int(s.random(10, 100 - currY))
      });
    };
    return result;
  }

  private generateLetter(s: p5): {horizontalBarArr: any[], verticalBarArr: any[], dotTriplet: DotTriplet} {
    // New shape-data generation:
    const horizontalBarCount = s.random(0, 5);
    const dotTriplet = new DotTriplet(s.int(s.random(10, 91)), s.int(s.random(10, 91)));
    const verticalBarCount = s.random(0, 5);
    return {
      horizontalBarArr: this.generateHorizontalBarArr(s, horizontalBarCount),
      verticalBarArr: this.generateVerticalBarArr(s, verticalBarCount),
      dotTriplet: dotTriplet
    }
  }

  private generateAlphabet(s: p5): void {
    for (let char in this.chars) {
      if (char === 'space' ||  char === 'return') {
        //chars[char] = char;
        continue;
      };
      const currLetter = this.generateLetter(s)
      this.chars[char] = currLetter;
    }
  }

  private translateInputStringIntoIoArr(s: p5, inputStr: string): any[] {
    const strAsArr = inputStr.split('');
    const outputArr = strAsArr.map(char => {
      let switchedChar = ''
      switch (char) {
        case '\n':
          switchedChar = 'return';
          break;
        case ' ':
          switchedChar = 'space';
          break;
        default:
          switchedChar = char.toLowerCase();
      }
      return switchedChar;
    })
    return outputArr
  }

  /* private generateDiagonalLineStartAndEnd(s: p5): {start: number[], end: number[]} {
    // Generate random start point within canvas
    const startX = s.random(10, 90);
    const startY = s.random(10, 90);
  
    // Generate random line length between 10 and 100
    const length = s.random(20, 80);
  
    // Calculate end point
    const endX = startX + length;
    const endY = Math.random() < 0.5 ? startY - length : startY + length;
  
    // Ensure end point is within canvas
    if (endX > 90 || endY > 90 || endY < 10) {
      return this.generateDiagonalLineStartAndEnd(s);
    }
  
    return {
      start: [startX, startY],
      end: [endX, endY]
    };
  } */

  // ------ New Approach including diagonal lines with help of ChatGPT-4

  // Each line is represented as an object with a start and end point
  private createLine(s: p5, x1: number, y1: number, x2: number, y2: number): LineObj {
    return { start: s.createVector(x1, y1), end: s.createVector(x2, y2) };
  }

  // Function to generate a random line within the canvas constraints
  private generateRandomLine(s: p5, padding: number, size: number) {
    let x1, y1, x2, y2!: number;
    switch (s.int(s.random(3))) { // 0: horizontal, 1: vertical, 2: diag down-right, 3: diag up-right
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
      case 3: // diagona2
        let length = s.random(5, size/2 - padding);
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
    return this.createLine(s, x1 as number, y1 as number, x2 as number, y2 as number);
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
    if (intersection.x < s.min(p1.x, p2.x) || intersection.x > s.max(p1.x, p2.x) ||
        intersection.x < s.min(p3.x, p4.x) || intersection.x > s.max(p3.x, p4.x) ||
        intersection.y < s.min(p1.y, p2.y) || intersection.y > s.max(p1.y, p2.y) ||
        intersection.y < s.min(p3.y, p4.y) || intersection.y > s.max(p3.y, p4.y)) {
      // Intersection point is outside the line segments
      return false;
    }
    
    // If the intersection point is within both line segments, they cross
    return true;
  }

  // Main function to create an array of touching lines
  private createTouchingLines(s: p5, maxLines: number, padding: number, size: number) {
    let lines = [];
    while (lines.length < maxLines) {
      let newLine = this.generateRandomLine(s, padding, size);
      let doesTouchOrCross = lines.some(line => this.linesTouchOrCross(s, line, newLine));
      if (!doesTouchOrCross) {
        lines.push(newLine);
      }
    }
    return lines;
  }

  // p5.js setup function
  setupMethod(s: p5) {
    s.createCanvas(100, 100);
    s.background(255);
    s.stroke(0);
    

    let padding = 10;
    let maxLines = 6;
    let lines = this.createTouchingLines(s, maxLines, padding, 100);

    lines.forEach(l => {
      // console.log(l.start.x, l.start.y)
      s.strokeWeight(s.random(1, 3));
      s.line(l.start.x, l.start.y, l.end.x, l.end.y);
    });
  }

  // p5.js draw function
  drawMethod(s: p5) {
    // The drawing logic is handled in setup
    s.noLoop(); // No need to loop since the drawing only needs to happen once
  }

}