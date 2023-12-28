import { AsyncPipe, NgClass } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Subscription, interval, tap } from 'rxjs';

interface DotMatrixEntry {
  isActive: boolean;
  id: string;
}

@Component({
  selector: 'app-scroll-indicator',
  standalone: true,
  imports: [
    NgClass,
    AsyncPipe
  ],
  templateUrl: './scroll-indicator.component.html',
  styleUrl: './scroll-indicator.component.scss'
})
export class ScrollIndicatorComponent implements OnInit, OnDestroy {

  public height = 230;
  public width = 20;

  public left = 0;
  public top = 0;


  public dotMatrix: DotMatrixEntry[] = [];

  private dotMatrix$$ = new BehaviorSubject<DotMatrixEntry[]>([]);
  public dotMatrix$ = this.dotMatrix$$.asObservable();

  private rowHeight = 5;
  private columnNum = 4;
  private rowNum = Math.floor(this.height / this.rowHeight);

  private subscriptions = new Subscription();

  ngOnInit(): void {
    this.dotMatrix = this.generateInactiveDotMatrix(this.columnNum, this.rowNum);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public updateIndicatorFromProps(props: { left: number, top: number, height: number }): void {
    this.left = props.left;
    this.top = props.top;
    this.height = props.height;
    this.rowNum = Math.floor(this.height / this.rowHeight);
    // this.dotMatrix = this.generateInactiveDotMatrix(this.columnNum, this.rowNum);
    this.startAnimation();
  }

  private generateInactiveDotMatrix(colNum: number, rowNum: number): DotMatrixEntry[] {
    const matrix = [];
    for (let i = 0; i < rowNum; i++) {
      const row = [];
      for (let j = 0; j < colNum; j++) {
        row.push({
          isActive: false,
          id: `${i}-${j}`
        });
      }
      matrix.push(row);
    }
    return matrix.flat();
  }

  private startAnimation(): void {
    this.subscriptions.add(
      interval(35).pipe(
        tap((intervalValue) => {
          const rowIterator = this.getRowIteratorFromIntervalValue(intervalValue);
          this.dotMatrix$$.next(this.updateDotMatrixInAnimationLoop(rowIterator));
        })
      ).subscribe()
    )
  }

  private updateDotMatrixInAnimationLoop(rowIterator: number): DotMatrixEntry[] {
    return this.generateInactiveDotMatrix(this.columnNum, this.rowNum)
      .map((dotMatrixEntry) => {
        const rowIdentifier = dotMatrixEntry.id.split('-')[0];
        if (rowIdentifier === rowIterator.toString()) {
          return {
            ...dotMatrixEntry,
            isActive: Math.random() > 0.8
          }
        } else {
          return dotMatrixEntry
        }
      })
  }

  private getRowIteratorFromIntervalValue(intervalValue: number): number {
    let result = 0;
    if (intervalValue >= this.rowNum) {
      result = intervalValue % this.rowNum - 1;
    } else {
      result = intervalValue;
    }
    return result;
  }
}
