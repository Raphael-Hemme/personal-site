import { BreakpointObserver } from '@angular/cdk/layout';
import { ComponentRef, Directive, ElementRef, Input, OnChanges, OnDestroy, SimpleChanges, ViewContainerRef } from '@angular/core';
import { ScrollIndicatorComponent } from './scroll-indicator.component';
import { Observable, Subscription, fromEvent, take, tap, timer } from 'rxjs';

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

  private windowResize$: Observable<any> = fromEvent(window, 'resize');
  private isMobile = this.breakpointObserver.isMatched('(max-width: 768px)');

  private resizeObserver = new ResizeObserver(() => {
    this.setScrollIndicatorComponentProperties();
  });

  private subscriptions = new Subscription();

  constructor(
    private readonly elementRef: ElementRef,
    private readonly breakpointObserver: BreakpointObserver,
    private readonly viewRef: ViewContainerRef,
  ) { 
    this.subscriptions.add(
      this.windowResize$.pipe(
        tap(() => {
          this.isMobile = this.breakpointObserver.isMatched('(max-width: 768px)');
          this.createOrUpdateScrollIndicatorInstance()
        })
      ).subscribe()
    )
    this.resizeObserver.observe(document.body);
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
      this.setScrollIndicatorComponentProperties();
      this.tagSelectionListPrevState = changes['scrollIndicator']?.currentValue?.tagSelectionListIsExpanded;
    }
  }

  ngOnDestroy(): void {
    this.destroy();
  }

  private createOrUpdateScrollIndicatorInstance(): void {
    if (this.componentRef === null) {
      this.componentRef = this.viewRef.createComponent(ScrollIndicatorComponent);
      this.setScrollIndicatorComponentProperties();
    } else {
      this.setScrollIndicatorComponentProperties();
    }
  }

  private setScrollIndicatorComponentProperties(): void {
    if (this.componentRef !== null) {
      this.componentRef.instance.stopAnimation();
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

          this.componentRef!.instance.updateIndicatorFromProps({
            left: leftPos,
            top: topPos,
            height: bottom - top
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
      this.resizeObserver.disconnect();
    }
  }
}
