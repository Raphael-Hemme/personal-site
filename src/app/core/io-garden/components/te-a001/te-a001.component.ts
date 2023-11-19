import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import p5 from 'p5';
import { Subscription } from 'rxjs';
import { WindowSizeService } from 'src/app/shared/services/window-size-service/window-size.service';

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
        s.noStroke();
      }

      s.draw = () => {
        s.frameCount === 1 ?? s.translate(0, 10);

        s.background(50);
        this.ioStringArr.splice(0, this.ioStringArr.length);
        this.ioStringArr = this.translateInputStringIntoIoArr(s, this.inputText);

        this.drawString(s, this.ioStringArr);
      }
    };

    this.canvas = new p5(sketch);
  }

  ngOnDestroy(): void {
    this.canvas.remove();
    this.subscriptions.unsubscribe();
  }

  private drawChar = (s: p5, charPointArr: any) => {

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

  private drawString = (s: p5, stringArr: any[]) => {
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

}
