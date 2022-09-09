import p5 from "p5";


export class Branch {
    begin
    end
    finished: boolean;
    private generation: number;
    s
    private currHslaArr = this.changeColorOnIteration([162, 23, 61, 0.0], 0)

    constructor(begin: any, end: any, sketch: p5, generation: number) {
        this.begin = begin;
        this.end = end;
        this.finished = false;
        this.s = sketch
        this.generation  = generation
    }

    show() {
        this.currHslaArr = this.changeColorOnIteration(this.currHslaArr, this.generation);
        const currColor = this.s.color(`hsla(${this.currHslaArr[0]}, ${this.currHslaArr[1]}%, ${this.currHslaArr[2]}%, ${this.currHslaArr[3]})`)
        if (!this.finished) {
            console.log(this.generation, this.currHslaArr)
            this.s.stroke(currColor);
            this.s.line(this.begin.x, this.begin.y, this.end.x, this.end.y);
        }
        
    }

    branch(first: boolean, gen: number) {
        let dir = p5.Vector.sub(this.end, this.begin);
        if (first) {
            dir.rotate(this.s.PI / this.s.random(2, 7));
            dir.mult(this.s.random(0.64, 0.7));
        } else {
            dir.rotate(-this.s.PI / this.s.random(2, 7));
            dir.mult(this.s.random(0.64, 0.7));
        }
        let newEnd = p5.Vector.add(this.end, dir);
        let result = new Branch(this.end, newEnd, this.s, gen);
        return result; 
    }  

    private changeColorOnIteration(colorArr: number[], i: number): number[] {
        let result = colorArr.slice();
        if (result[3] + i * 0.1 <= 1) {
            result[3] += (i > 1 ? 0.1 : 0.05) * i;
        } else {
            result[3] = 1;
        }
        // result[2] -= 5;
        return result;
      }
}