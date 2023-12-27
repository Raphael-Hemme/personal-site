import { BreakpointObserver } from '@angular/cdk/layout';
import { ComponentRef, Directive, ElementRef, Input, OnChanges, OnDestroy, SimpleChanges, ViewContainerRef } from '@angular/core';
import { ScrollIndicatorComponent } from './scroll-indicator.component';
import { delay, take, tap, timer } from 'rxjs';

@Directive({
  selector: '[scrollIndicator]',
  standalone: true
})
export class ScrollIndicatorDirective implements OnChanges, OnDestroy {
  @Input() scrollIndicator = false;

  private componentRef: ComponentRef<ScrollIndicatorComponent> | null = null;

  private compWidth = 20;

  constructor(
    private readonly elementRef: ElementRef,
    private readonly breakpointObserver: BreakpointObserver,
    private readonly viewRef: ViewContainerRef,
  ) { }

  ngOnChanges(changes: SimpleChanges): void  {
    if ('scrollIndicator' in changes && changes['scrollIndicator'].currentValue) {
      console.log('log from directive on changes', changes);
      this.createOrUpdateScrollIndicatorInstance();
    } else {
      this.destroy();
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
      timer(500).pipe(
        take(1),
        tap(() => {
          const { left, top, bottom } = this.elementRef.nativeElement.getBoundingClientRect();
          this.componentRef!.instance.updateIndicatorFromProps({
            left: left - this.compWidth - 5,
            top: top + window.scrollY,
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
      this.componentRef.destroy();
      this.componentRef = null;
    }
  }
}
