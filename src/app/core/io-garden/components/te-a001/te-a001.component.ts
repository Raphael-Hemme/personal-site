import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import * as p5 from 'p5';

@Component({
  selector: 'app-te-a001',
  templateUrl: './te-a001.component.html',
  styleUrls: ['./te-a001.component.scss']
})
export class TeA001Component implements OnInit, OnDestroy {

  @Input() componentWidth: number = 1000;
  @Input() componentHeight: number = 600;

  public canvWidth = (this.componentWidth / 100) * 80;
  public canvHeight = (this.componentHeight / 100) * 90;

  public canvas: any;

  constructor() {}

  ngOnInit() {
    const sketch = (s: any) => {
      const chars: { [key: string]: {} } = {
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
        space: 'space',
        return: 'return'
      }

      let ioStringArr: any[] = [];

      let yOffset = 100;
      let counter = 0;

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

      s.setup = () => {
        let canvas2 = s.createCanvas(this.canvWidth, this.canvHeight);
        canvas2.parent('te-a001-sketch-wrapper');

        s.generateAlphabet();

        s.background(50);
        s.frameRate(60);

        s.fill(237, 34, 93);
        s.noStroke();
      }

      s.draw = () => {
      /*     push();
            translate(100, yOffset)
          pop(); */
        s.drawString(ioStringArr);
      }

      s.generateHorizontalBarArr = (n: number) => {
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

      s.generateVerticalBarArr = (n: number) => {
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

      s.generateLetter= () => {
        // Old shape-data generation:
        /*   const pointCount = random(5, 10)
        const points = [];
        for (let i = 0; i < pointCount; i++) {
          points.push({
            x: random(5, 95),
            y: random(5, 95)
          })
        }
        return points; */

        // New shape-data generation:
        const horizontalBarCount = s.random(0, 5);
        const dotTriplet = new DotTriplet(s.int(s.random(10, 91)), s.int(s.random(10, 91)));
        const verticalBarCount = s.random(0, 5);
        return {
          horizontalBarArr: s.generateHorizontalBarArr(horizontalBarCount),
          verticalBarArr: s.generateVerticalBarArr(verticalBarCount),
          dotTriplet: dotTriplet
        }
      }

      s.generateAlphabet =() => {
        for (let char in chars) {
          if (char === 'space' ||  char === 'return') {
            //chars[char] = char;
            continue;
          };
          const currLetter = s.generateLetter()
          chars[char] = currLetter;
        }
      }

      s.drawChar = (charPointArr: any) => {
        // old drawing function:
        /* beginShape();
          for (let point of charPointArr) {
            vertex(point.x, point.y);
          }
          vertex(charPointArr[0].x, charPointArr[0].y)
        endShape(); */

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

      s.drawString = (stringArr: any[]) => {
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
                s.drawChar(chars[char]);
              }
            }
          }
        } else {
          for (let char of stringArr) {
            if (char === 'space') {
              s.translate(100, 0);
            } else {
              s.translate(100, 0);
              s.drawChar(chars[char]);
            }
          }
        }

      };

      s.keyTyped = () => {
        if (s.key === ' ') {
          ioStringArr.push('space')
        } else if (s.key === 'Enter') {
          ioStringArr.push('return');
        } else {
          const currKey = s.key;
          currKey.toLowerCase(); // ToDo: not working
          ioStringArr.push(currKey)
        }
      };

      s.keyPressed = () => {
        if (s.keyCode === s.BACKSPACE) {
          s.ioStringArr.pop()
          s.background(50);
        };
      };

    };

    this.canvas = new p5(sketch);
  }

  ngOnDestroy(): void {
    this.canvas.remove();
  }

}
