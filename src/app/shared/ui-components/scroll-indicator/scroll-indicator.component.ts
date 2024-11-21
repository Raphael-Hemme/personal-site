import { AsyncPipe, NgClass } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  BehaviorSubject,
  Subscription,
  combineLatest,
  delay,
  interval,
  tap,
} from 'rxjs';

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
    imports: [NgClass, AsyncPipe],
    templateUrl: './scroll-indicator.component.html',
    styleUrl: './scroll-indicator.component.scss'
})
export class ScrollIndicatorComponent implements OnInit, OnDestroy {
  public height = 230;
  public left = 0;
  public top = 0;

  private dotMatrix$$ = new BehaviorSubject<DotMatrixEntry[]>([]);
  public dotMatrix$ = this.dotMatrix$$.asObservable();

  private currPositionAndDimensions$$ =
    new BehaviorSubject<PositionAndDimensions>({
      left: 0,
      top: 0,
      height: 0,
      rowNum: 0,
      animationActive: false,
    });

  private animationInterval$ = interval(50).pipe(delay(500));

  private combinedAnimationStream$ = combineLatest([
    this.animationInterval$,
    this.currPositionAndDimensions$$,
  ]);

  private readonly ROW_HEIGHT = 5;
  private readonly COLUMN_NUM = 4;

  private subscriptions = new Subscription();

  ngOnInit(): void {
    this.startAnimation();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  /**
   * Updates the dot matrix options - i.e. position and dimensions of the scroll indicator
   * as well as the current animation status (on / off) in animationActive.
   * @param options - The properties for updating the position, dimensions and animation status (on / off).
   */
  public updateOptions(options: {
    left: number;
    top: number;
    height: number;
    animationActive: boolean;
  }): void {
    this.currPositionAndDimensions$$.next({
      left: options.left,
      top: options.top,
      height: options.height,
      rowNum: Math.floor(options.height / this.ROW_HEIGHT),
      animationActive: options.animationActive,
    });
    this.left = options.left;
    this.top = options.top;
    this.height = options.height;
  }

  /**
   * Generates a two-dimensional array of inactive DotMatrixEntry objects.
   * @param colNum The number of columns in the matrix.
   * @param rowNum The number of rows in the matrix.
   * @returns An array of DotMatrixEntry objects representing an inactive dot matrix.
   */
  private generateInactiveDotMatrix(
    colNum: number,
    rowNum: number
  ): DotMatrixEntry[] {
    const matrix = [];
    for (let i = 0; i < rowNum; i++) {
      const row = [];
      for (let j = 0; j < colNum; j++) {
        row.push({
          isActive: false,
          id: `${i}-${j}`,
        });
      }
      matrix.push(row);
    }
    return matrix.flat();
  }

  /**
   * Starts the animation for the scroll indicator by registering a subscription to the combinedAnimationStream$
   * observable, delays the emitted value by 500ms (why again? :)) and then calls getRowIteratorFromIntervalValue()
   * and passes the result on to updateDotMatrixInAnimationLoop() which returns a new dot matrix array that is then
   * emittet on to the dotMatrix$$ BehaviorSubject.
   */
  private startAnimation(): void {
    this.subscriptions.add(
      this.combinedAnimationStream$
        .pipe(
          delay(500),
          tap(([intervalValue, posAndDim]) => {
            const rowIterator = this.getRowIteratorFromIntervalValue(
              intervalValue,
              posAndDim
            );
            this.dotMatrix$$.next(
              this.updateDotMatrixInAnimationLoop(rowIterator, posAndDim)
            );
          })
        )
        .subscribe()
    );
  }

  /**
   * Returns a new dot matrix array each time the method is called in the animation loop.
   * In the returned dot matrix array, the dots in the specified row are randomly activated if the animation is active.
   * Otherwise, the returned dot matrix array contains only inactive dots.
   * @param rowIterator - The iterator for the row.
   * @param posAndDim - The position and dimensions of the dot matrix.
   * @returns An array of DotMatrixEntry representing the updated dot matrix.
   */
  private updateDotMatrixInAnimationLoop(
    rowIterator: number,
    posAndDim: PositionAndDimensions
  ): DotMatrixEntry[] {
    if (!posAndDim.animationActive) {
      return this.generateInactiveDotMatrix(this.COLUMN_NUM, posAndDim.rowNum);
    } else {
      return this.generateInactiveDotMatrix(
        this.COLUMN_NUM,
        posAndDim.rowNum
      ).map((dotMatrixEntry) => {
        const rowIdentifier = dotMatrixEntry.id.split('-')[0];
        if (rowIdentifier === rowIterator.toString()) {
          return {
            ...dotMatrixEntry,
            isActive: Math.random() > 0.8,
          };
        } else {
          return dotMatrixEntry;
        }
      });
    }
  }

  /**
   * Returns the row iterator value based on the interval value and position and dimensions.
   * The row iterator value is the value that is used to determine which row should get potentially active dots.
   * As long as the interval value is smaller than the row number - 1, the interval value is returned.
   * Otherwise, the modulo of the interval value and the row number - 1 is returned which resets
   * the following sequence to start with 0.
   * @param intervalValue - The interval value.
   * @param posAndDim - The position and dimensions.
   * @returns The row iterator value.
   */
  private getRowIteratorFromIntervalValue(
    intervalValue: number,
    posAndDim: PositionAndDimensions
  ): number {
    let result = 0;
    if (intervalValue < posAndDim.rowNum - 1) {
      result = intervalValue;
    } else {
      result = intervalValue % (posAndDim.rowNum - 1);
    }
    return result;
  }
}
