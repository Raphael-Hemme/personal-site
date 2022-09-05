import p5 from "p5";


export class Branch {
    begin
    end
    finished
    s

    constructor(begin: any, end: any, sketch: p5) {
        this.begin = begin;
        this.end = end;
        this.finished = false;
        this.s = sketch
    }

    show() {
        this.s.stroke(250);
        this.s.line(this.begin.x, this.begin.y, this.end.x, this.end.y);
    }

    branch(first: boolean) {
        let dir = p5.Vector.sub(this.end, this.begin);
        if (first) {
            dir.rotate(this.s.PI / this.s.random(2, 7));
            dir.mult(this.s.random(0.64, 0.7));
        } else {
            dir.rotate(-this.s.PI / this.s.random(2, 7));
            dir.mult(this.s.random(0.64, 0.7));
        }
        let newEnd = p5.Vector.add(this.end, dir);
        let result = new Branch(this.end, newEnd, this.s);
        return result; 
    }  
}