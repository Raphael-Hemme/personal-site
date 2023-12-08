import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { LoadingService } from 'src/app/shared/services/loading-service/loading.service';
import { NgClass } from '@angular/common';

@Component({
    selector: 'app-about-page',
    templateUrl: './about-page.component.html',
    styleUrls: ['./about-page.component.scss'],
    standalone: true,
    imports: [NgClass]
})
export class AboutPageComponent implements OnInit, AfterViewInit {

  @Input() isFullAboutComponent = true;

  public longAboutIsShown = false;
  public anthropologyIsHighlighted = false;
  public devIsHighlighted = false;

  constructor(
    private loadingService: LoadingService
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.loadingService.emitAfterViewInitSignal('ABOUT');
  }

  public toggleLongAboutIsShown(): void {
    this.longAboutIsShown = !this.longAboutIsShown;
  }

  public toggleAnthropologyHighlight(): void {
    this.anthropologyIsHighlighted = !this.anthropologyIsHighlighted;
  }

  public toggleDevHighlight(): void {
    this.devIsHighlighted = !this.devIsHighlighted;
  }
}
