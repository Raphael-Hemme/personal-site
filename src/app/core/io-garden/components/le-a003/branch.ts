import p5 from "p5";

export class Branch {
  begin
  end
  finished: boolean;
  private generation: number;
  s;
  private currHslaArr = this.increaseColorAlphaOnIteration([162, 23, 61, 0], 0)

  constructor(begin: any, end: any, sketch: p5, generation: number) {
    this.begin = begin;
    this.end = end;
    this.finished = false;
    this.s = sketch
    this.generation = generation
  }

  show() {
    // Branches that are finished will not be increased in color opacity (alpha)
    if (!this.finished) {
      this.currHslaArr = this.increaseColorAlphaOnIteration(this.currHslaArr, this.generation);
    }
    // Branches that are finished will be decreased in color lightness
    if (this.finished) {
      this.currHslaArr = this.decreaseColorLightnessOnIteration(this.currHslaArr, this.generation);
    }

    // Generate a hsla color string and transform it into a p5 color (object?)
    const currColor = this.s.color(`hsla(${this.currHslaArr[0]}, ${this.currHslaArr[1]}%, ${this.currHslaArr[2]}%, ${this.currHslaArr[3]})`)

    this.s.stroke(currColor);
    this.s.line(this.begin.x, this.begin.y, this.end.x, this.end.y);
  }

  branch(first: boolean, gen: number) {
    let dir = p5.Vector.sub(this.end, this.begin);
    if (first) {
      dir.rotate(this.s.PI / this.s.random(2, 9));
    } else {
      dir.rotate(-this.s.PI / this.s.random(2, 9));
    }
    dir = this.multiplyBranchLengthDependingOnGen(dir, this.generation);

    let newEnd = p5.Vector.add(this.end, dir);
    let result = new Branch(this.end, newEnd, this.s, gen);
    return result;
  }

  private multiplyBranchLengthDependingOnGen(vector: p5.Vector, gen: number): p5.Vector {
    switch (gen) {
      case 1:
        return vector.mult(this.s.random(1, 1.7));
      case 2:
        return vector.mult(this.s.random(0.7, 1.5));
      case 3:
        return vector.mult(this.s.random(0.8, 1));
      default:
        return vector.mult(this.s.random(0.6, 0.7));
    }
  }

  private increaseColorAlphaOnIteration(colorArr: number[], i: number): number[] {
    let result = colorArr.slice();
    if (result[3] + i * 0.1 <= 0.8) {
      result[3] += (i > 2 ? 0.05 : 0.025) * i;
    } else {
      result[3] = 0.7;
    }
    return result;
  }

  private decreaseColorLightnessOnIteration(colorArr: number[], i: number): number[] {
    let result = colorArr.slice();
    if (result[2] - 5 > 20) {
      result[2] -= 8;
    }
    return result;
  }
}