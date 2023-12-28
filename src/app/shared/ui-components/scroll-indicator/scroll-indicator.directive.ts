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
      tagSelectionListIsExpanded: false
    };

  private componentRef: ComponentRef<ScrollIndicatorComponent> | null = null;

  private compWidth = 20;
  private tagSelectionListPrevState = false;

  private windowResize$: Observable<any> = fromEvent(window, 'resize');
  private resizeObserver = new ResizeObserver(entries => {
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
        tap(() => this.createOrUpdateScrollIndicatorInstance())
      ).subscribe()
    )
    this.resizeObserver.observe(document.body);
  }

  ngOnChanges(changes: SimpleChanges): void  {
    if ('scrollIndicator' in changes && changes['scrollIndicator']?.currentValue?.tagResultListIsVisible) {
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
          this.componentRef!.instance.updateIndicatorFromProps({
            left: left - this.compWidth - 5,
            top: top + 2 + window.scrollY,
            height: bottom - top
          });
        })
      ).subscribe();

    }
  }

  private destroy(): void {
    if (this.componentRef !== null) {
      this.viewRef.detach();
      this.viewRef.remove();
      this.viewRef.clear();
      this.componentRef.destroy();
      this.componentRef = null;
      this.subscriptions.unsubscribe();
      this.resizeObserver.disconnect();
    }
  }
}
