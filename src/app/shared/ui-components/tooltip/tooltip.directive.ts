import {
  ComponentRef,
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnDestroy,
  ViewContainerRef,
} from '@angular/core';
import { TooltipComponent } from './tooltip.component';
import { BreakpointObserver } from '@angular/cdk/layout';

/**
 * Based on this tutorial: https://accesto.com/blog/how-to-create-angular-tooltip-directive/
 */
@Directive({
  selector: '[tooltip]',
  standalone: true,
})
export class TooltipDirective implements OnDestroy {
  @Input() tooltip = '';

  private componentRef: ComponentRef<TooltipComponent> | null = null;
  private isMobile = this.breakpointObserver.isMatched('(max-width: 768px)');

  constructor(
    private elementRef: ElementRef,
    private readonly viewRef: ViewContainerRef,
    private breakpointObserver: BreakpointObserver
  ) {}

  ngOnDestroy(): void {
    this.destroy();
  }

  @HostListener('mouseenter')
  onMouseEnter(): void {
    if (!this.isMobile && this.componentRef === null) {
      this.componentRef = this.viewRef.createComponent(TooltipComponent);
      this.setTooltipComponentProperties();
    }
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.destroy();
  }

  private setTooltipComponentProperties(): void {
    if (this.componentRef !== null) {
      this.componentRef.instance.tooltipText = this.tooltip;
      const { left, right, bottom } = this.elementRef.nativeElement.getBoundingClientRect();
      this.componentRef.instance.left = (right - left) / 2 + left;
      this.componentRef.instance.top = bottom;
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
