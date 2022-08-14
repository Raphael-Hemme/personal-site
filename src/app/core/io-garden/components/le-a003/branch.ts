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
        this.s.stroke(2500);
        this.s.line(this.begin.x, this.begin.y, this.end.x, this.end.y);
    }

    branch(first: boolean) {
        let dir = p5.Vector.sub(this.end, this.begin);
        if (first) {
            dir.rotate(this.s.PI / 6);
            dir.mult(0.67);
        } else {
            dir.rotate(-this.s.PI / 4);
            dir.mult(0.67);
        }
        let newEnd = p5.Vector.add(this.end, dir);
        let result = new Branch(this.end, newEnd, this.s);
        return result; 
    }  
}