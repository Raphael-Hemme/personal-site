import { AsyncPipe, NgClass } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Subscription, combineLatest, delay, interval, tap } from 'rxjs';

interface DotMatrixEntry {
  isActive: boolean;
  id: string;
}

interface PositionAndDimensions {
  left: number;
  top: number;
  height: number;
  rowNum: number;
  animationActive?: boolean;
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
  public left = 0;
  public top = 0;

  private dotMatrix$$ = new BehaviorSubject<DotMatrixEntry[]>([]);
  public dotMatrix$ = this.dotMatrix$$.asObservable();

  private currPositionAndDimensions$$ = new BehaviorSubject<PositionAndDimensions>(
    {
      left: 0,
      top: 0,
      height: 0,
      rowNum: 0,
      animationActive: false
    }
  );

  private animationInterval$ = interval(50).pipe(
    delay(500)
  );

  private combinedAnimationStream$ = combineLatest([this.animationInterval$, this.currPositionAndDimensions$$])

  private readonly ROW_HEIGHT = 5;
  private readonly COLUMN_NUM = 4;

  private subscriptions = new Subscription();

  ngOnInit(): void {
    this.startAnimation();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public updatePositionAndDimensions(props: { left: number, top: number, height: number, animationActive: boolean }): void {
    this.currPositionAndDimensions$$.next({
      left: props.left,
      top: props.top,
      height: props.height,
      rowNum: Math.floor(props.height / this.ROW_HEIGHT),
      animationActive: props.animationActive
    });
    this.left = props.left;
    this.top = props.top;
    this.height = props.height;
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
      this.combinedAnimationStream$
      .pipe(
        delay(500),
        tap(([intervalValue, posAndDim]) => {
          const rowIterator = this.getRowIteratorFromIntervalValue(intervalValue, posAndDim);
          this.dotMatrix$$.next(this.updateDotMatrixInAnimationLoop(rowIterator, posAndDim));
        }),
      ).subscribe()
    )
  }

  private updateDotMatrixInAnimationLoop(rowIterator: number, posAndDim: PositionAndDimensions): DotMatrixEntry[] {
    if (!posAndDim.animationActive) {
      return this.generateInactiveDotMatrix(this.COLUMN_NUM, posAndDim.rowNum)
    } else {
      return this.generateInactiveDotMatrix(this.COLUMN_NUM, posAndDim.rowNum).map((dotMatrixEntry) => {
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
  }

  private getRowIteratorFromIntervalValue(intervalValue: number, posAndDim: PositionAndDimensions): number {
    let result = 0;
    if (intervalValue >= posAndDim.rowNum) {
      result = intervalValue % (posAndDim.rowNum - 1);
    } else {
      result = intervalValue;
    }
    return result;
  }
}
