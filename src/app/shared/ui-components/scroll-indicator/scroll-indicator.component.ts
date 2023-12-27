import { NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';

interface DotMatrixEntry {
  isActive: boolean;
  id: string;
}

@Component({
  selector: 'app-scroll-indicator',
  standalone: true,
  imports: [NgClass],
  templateUrl: './scroll-indicator.component.html',
  styleUrl: './scroll-indicator.component.scss'
})
export class ScrollIndicatorComponent implements OnInit {

  public height = 230;
  public width = 20;

  public left = 0;
  public top = 0;


  public dotMatrix: DotMatrixEntry[] = [];

  private rowHeight = 5;
  private columnNum = 4;
  private rowNum = Math.floor(this.height / this.rowHeight);

  ngOnInit(): void {
    this.dotMatrix = this.generateDotMatrix(this.columnNum, this.rowNum);
  }

  public updateIndicatorFromProps(props: { left: number, top: number, height: number }): void {
    this.left = props.left;
    this.top = props.top;
    this.height = props.height;
    this.rowNum = Math.floor(this.height / this.rowHeight);
    this.dotMatrix = this.generateDotMatrix(this.columnNum, this.rowNum);
  }

  private generateDotMatrix(colNum: number, rowNum: number): DotMatrixEntry[] {
    const matrix = [];
    for (let i = 0; i < rowNum; i++) {
      const row = [];
      for (let j = 0; j < colNum; j++) {
        row.push({
          isActive: Math.random() > 0.7 ? true : false,
          id: `${i}-${j}`
        });
      }
      matrix.push(row);
    }
    return matrix.flat();
  }
}
