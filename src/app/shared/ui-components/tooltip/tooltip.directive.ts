import { ApplicationRef, ChangeDetectorRef, ComponentRef, Directive, ElementRef, EmbeddedViewRef, HostListener, Input, OnDestroy, ViewContainerRef, inject } from '@angular/core';
import { TooltipComponent } from './tooltip.component';

/**
 * Based on this tutorial: https://accesto.com/blog/how-to-create-angular-tooltip-directive/
 */
@Directive({
  selector: '[tooltip]',
  standalone: true,
})
export class TooltipDirective implements OnDestroy {

  @Input() tooltip = '';

  private componentRef: ComponentRef<any> | null = null;

  constructor(
    private elementRef: ElementRef,
    private readonly viewRef: ViewContainerRef,
    private readonly changeDetectorRef: ChangeDetectorRef
  ) { 

    console.log('TooltipDirective constructor', this.tooltip);
  }

  ngOnDestroy(): void {
    this.destroy();
  }

  @HostListener('mouseenter')
  onMouseEnter(): void {
    if (this.componentRef === null) {
        console.log('test', this.tooltip);
        this.componentRef = this.viewRef.createComponent(TooltipComponent);
        // this.viewRef.insert(this.componentRef);
        const domElem = 
              (this.componentRef.hostView as EmbeddedViewRef<any>)
              .rootNodes[0] as HTMLElement;
        console.log('domElem', domElem);       
        document.body.appendChild(domElem);
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
      const {left, right, bottom} = 		  	
      this.elementRef.nativeElement.getBoundingClientRect();
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
