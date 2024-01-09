import { BreakpointObserver } from '@angular/cdk/layout';
import {
  ComponentRef,
  Directive,
  ElementRef,
  Input,
  OnInit,
  OnChanges,
  OnDestroy,
  SimpleChanges,
  ViewContainerRef,
} from '@angular/core';
import { ScrollIndicatorComponent } from './scroll-indicator.component';
import {
  Subscription,
  take,
  tap,
  timer,
  debounceTime,
  BehaviorSubject,
} from 'rxjs';

@Directive({
  selector: '[scrollIndicator]',
  standalone: true,
})
export class ScrollIndicatorDirective implements OnInit, OnChanges, OnDestroy {
  @Input() scrollIndicator = {
    tagResultListIsVisible: false,
    tagSelectionListIsExpanded: false,
    tagResultListLength: 0,
  };

  private componentRef: ComponentRef<ScrollIndicatorComponent> | null = null;

  private compWidth = 20;
  private tagSelectionListPrevState = false;

  private isMobile = this.breakpointObserver.isMatched('(max-width: 768px)');

  private bodyHeightByExpansionResize$$ = new BehaviorSubject<number>(
    document.body.scrollHeight
  );
  private bodyResizeByExpansionObserver = new ResizeObserver(() => {
    this.bodyHeightByExpansionResize$$.next(document.body.scrollHeight);
  });

  private subscriptions = new Subscription();

  constructor(
    private readonly elementRef: ElementRef,
    private readonly breakpointObserver: BreakpointObserver,
    private readonly viewRef: ViewContainerRef
  ) {}

  ngOnInit(): void {
    this.registerBodyResizeObserverAndTriggerComponentUpdates();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      'scrollIndicator' in changes &&
      changes['scrollIndicator']?.currentValue?.tagResultListIsVisible
    ) {
      this.createOrUpdateScrollIndicatorInstance();
    } else {
      this.destroy();
    }

    if (
      'scrollIndicator' in changes &&
      changes['scrollIndicator']?.currentValue?.tagSelectionListIsExpanded !==
        this.tagSelectionListPrevState &&
      changes['scrollIndicator']?.currentValue?.tagResultListIsVisible
    ) {
      this.setScrollIndicatorComponentProperties(
        this.scrollIndicator.tagResultListLength > 1
      );
      this.tagSelectionListPrevState =
        changes['scrollIndicator']?.currentValue?.tagSelectionListIsExpanded;
    }
  }

  ngOnDestroy(): void {
    this.destroy();
  }

  /**
   * Creates or updates the scroll indicator instance.
   * If the component reference is not already created, it creates a new instance of the scroll indicator component.
   * It then sets the properties of the scroll indicator component based on the tag result list length.
   */
  private createOrUpdateScrollIndicatorInstance(): void {
    if (!this.componentRef) {
      this.componentRef = this.viewRef.createComponent(
        ScrollIndicatorComponent
      );
    }
    this.setScrollIndicatorComponentProperties(
      this.scrollIndicator.tagResultListLength > 1
    );
  }

  /**
   * Sets the properties of the scroll indicator component.
   * - If we are on mobile, the scroll indicator component is positioned over the preview image
   *   of the card since there is too little space to the left of the container.
   * - Else, the position of the scroll indicator component is set to the left of the container.
   * @param animationActive - Indicates whether the animation is active.
   */
  private setScrollIndicatorComponentProperties(
    animationActive: boolean
  ): void {
    if (this.componentRef !== null) {
      // Use a self-closing timer to wait for the CSS animations of expansion Elements to finish
      // before getting the bounding client rect. 
      // This is necessary to get the correct position of the scroll indicator.
      timer(500)
        .pipe(
          take(1),
          tap(() => {
            const { left, top, bottom } =
              this.elementRef.nativeElement.getBoundingClientRect();

            // On mobile, the scroll indicator should be placed over the preview image of the card.
            // On every width bigger than mobile, the scroll indicator should be placed to the left of the conainer.
            const leftPos = this.isMobile
              ? left + 5 // mobile
              : left - this.compWidth - 5; // everything up from mobile

            // Calculate the top position by adding 5px to the top to account for the border radius of the card
            // and add scrollY to account for the current scroll-position
            const topPos = top + 5 + window.scrollY;

            this.componentRef!.instance.updatePositionAndDimensions({
              left: leftPos,
              top: topPos,
              height: bottom - top,
              animationActive: animationActive,
            });
          })
        )
        .subscribe();
    }
  }

  /**
   * Registers the body resize by expansion observer and calls setScrollIndicatorComponentProperties
   * to pass the position properties to the component.
   * It also updates the isMobile property based on the current breakpoint.
   * This method observes the resize of the document body and updates the component properties accordingly.
   */
  private registerBodyResizeObserverAndTriggerComponentUpdates(): void {
    this.bodyResizeByExpansionObserver.observe(document.body);

    this.subscriptions.add(
      this.bodyHeightByExpansionResize$$
        .pipe(
          debounceTime(50),
          tap(() => {
            this.isMobile =
              this.breakpointObserver.isMatched('(max-width: 768px)');
            this.setScrollIndicatorComponentProperties(
              this.scrollIndicator.tagResultListLength > 1
            );
          })
        )
        .subscribe()
    );
  }

  /**
   * Destroys the scroll indicator component and cleans up any associated resources and processes.
   */
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
