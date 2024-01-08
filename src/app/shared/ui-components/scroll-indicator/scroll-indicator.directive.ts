import { BreakpointObserver } from '@angular/cdk/layout';
import { ComponentRef, Directive, ElementRef, Input, OnChanges, OnDestroy, SimpleChanges, ViewContainerRef } from '@angular/core';
import { ScrollIndicatorComponent } from './scroll-indicator.component';
import { Observable, Subscription, take, tap, timer, debounceTime, BehaviorSubject } from 'rxjs';

@Directive({
  selector: '[scrollIndicator]',
  standalone: true
})
export class ScrollIndicatorDirective implements OnChanges, OnDestroy {
  @Input() scrollIndicator = {
      tagResultListIsVisible: false,
      tagSelectionListIsExpanded: false,
      tagResultListLength: 0,
    };

  private componentRef: ComponentRef<ScrollIndicatorComponent> | null = null;

  private compWidth = 20;
  private tagSelectionListPrevState = false;

  // private windowResize$: Observable<any> = fromEvent(window, 'resize');
  private isMobile = this.breakpointObserver.isMatched('(max-width: 768px)');

  private bodyHeightByExpansionResize$$ = new BehaviorSubject<number>(document.body.scrollHeight);
  private bodyResizeByExpansionObserver = new ResizeObserver(() => {
    this.bodyHeightByExpansionResize$$.next(document.body.scrollHeight)
  });

  private subscriptions = new Subscription();

  constructor(
    private readonly elementRef: ElementRef,
    private readonly breakpointObserver: BreakpointObserver,
    private readonly viewRef: ViewContainerRef,
  ) { 
    this.bodyResizeByExpansionObserver.observe(document.body);

    this.subscriptions.add(
      this.bodyHeightByExpansionResize$$.pipe(
        debounceTime(50),
        tap(() => {
          this.isMobile = this.breakpointObserver.isMatched('(max-width: 768px)');
          this.setScrollIndicatorComponentProperties(this.scrollIndicator.tagResultListLength > 1)
        })
        // tap(() => this.createOrUpdateScrollIndicatorInstance())
      ).subscribe()
    )
  }

  ngOnChanges(changes: SimpleChanges): void  {
    if ('scrollIndicator' in changes 
      && changes['scrollIndicator']?.currentValue?.tagResultListIsVisible
    ) {
      this.createOrUpdateScrollIndicatorInstance();
    } else {
      this.destroy();
    }

    if ('scrollIndicator' in changes 
      && changes['scrollIndicator']?.currentValue?.tagSelectionListIsExpanded !== this.tagSelectionListPrevState
      && changes['scrollIndicator']?.currentValue?.tagResultListIsVisible
    ) {
      this.setScrollIndicatorComponentProperties(this.scrollIndicator.tagResultListLength > 1);
      this.tagSelectionListPrevState = changes['scrollIndicator']?.currentValue?.tagSelectionListIsExpanded;
    }
  }

  ngOnDestroy(): void {
    this.destroy();
  }

  private createOrUpdateScrollIndicatorInstance(): void {
    /* if (!this.componentRef && this.scrollIndicator.tagResultListLength > 1) {
      this.componentRef = this.viewRef.createComponent(ScrollIndicatorComponent);
      this.setScrollIndicatorComponentProperties(true);
    } else if (this.componentRef && this.scrollIndicator.tagResultListLength > 1) {
      this.setScrollIndicatorComponentProperties(true);
    } else {
      this.setScrollIndicatorComponentProperties(false);
    } */

    if (!this.componentRef) {
      this.componentRef = this.viewRef.createComponent(ScrollIndicatorComponent);
    }
    this.setScrollIndicatorComponentProperties(this.scrollIndicator.tagResultListLength > 1);
  }

  private setScrollIndicatorComponentProperties(animationActive: boolean): void {
    if (this.componentRef !== null) {
      timer(500).pipe(
        take(1),
        tap(() => {
          const { left, top, bottom } = this.elementRef.nativeElement.getBoundingClientRect();

          // On mobile, the scroll indicator should be placed over the preview image of the card.
          // On every width bigger than mobile, the scroll indicator should be placed to the left of the conainer.
          const leftPos = this.isMobile 
            ? left + 5 // mobile
            : left - this.compWidth - 5; // everything up from mobile

          // Calculate the top position by adding 5px to the top to account for the border radius of the card 
          // and add scrollY to account for the current scroll-position
          const topPos = top + 5 + window.scrollY 

          this.componentRef!.instance.updatePositionAndDimensions({
            left: leftPos,
            top: topPos,
            height: bottom - top,
            animationActive: animationActive
          });
        })
      ).subscribe();
    } 
  }

  private destroy(): void {
    if (this.componentRef !== null) {
      // this.viewRef.detach();
      // this.viewRef.remove();
      this.viewRef.clear();
      this.componentRef.destroy();
      this.componentRef = null;
      this.subscriptions.unsubscribe();
      this.bodyResizeByExpansionObserver.disconnect();
    }
  }
}
