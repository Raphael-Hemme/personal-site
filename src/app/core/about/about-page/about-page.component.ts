import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { LoadingService } from 'src/app/shared/services/loading-service/loading.service';
import { AsyncPipe, NgClass } from '@angular/common';
import { TagMappingService } from 'src/app/shared/services/tag-mapping-service/tag-mapping.service';
import { TagResultListComponent } from 'src/app/shared/ui-components/tag-result-list/tag-result-list.component';

@Component({
    selector: 'app-about-page',
    templateUrl: './about-page.component.html',
    styleUrls: ['./about-page.component.scss'],
    standalone: true,
    imports: [
      NgClass,
      AsyncPipe,
      TagResultListComponent
    ]
})
export class AboutPageComponent implements OnInit, AfterViewInit {

  @Input() isFullAboutComponent = true;

  public longAboutIsShown = false;
  public anthropologyIsHighlighted = false;
  public devIsHighlighted = false;

  constructor(
    private loadingService: LoadingService,
    public tagMappingService: TagMappingService
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
