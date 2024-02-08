import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { LoadingService } from 'src/app/shared/services/loading-service/loading.service';
import { AsyncPipe, NgClass } from '@angular/common';
import { TagInfoObj, TagMappingService } from 'src/app/shared/services/tag-mapping-service/tag-mapping.service';
import { TagResultListComponent } from 'src/app/shared/ui-components/tag-result-list/tag-result-list.component';


@Component({
  selector: 'app-about-page',
  templateUrl: './about-page.component.html',
  styleUrls: ['./about-page.component.scss'],
  standalone: true,
  imports: [NgClass, AsyncPipe, TagResultListComponent],
})
export class AboutPageComponent implements OnInit, AfterViewInit {
  @Input() isFullAboutComponent = true;

  public longAboutIsShown = false;
  public anthropologyIsHighlighted = false;
  public devIsHighlighted = false;

  private readonly inFocusTagNameArr = [
    'TypeScript',
    'JavaScript',
    'Clojure',
    'HMTL',
    'CSS / SCSS',
    'Angular',
    'RxJS',
    'Jest',
    'Cypress',
    'P5JS',
  ];
  private readonly previewTagNameArr = [
    'Babashka',
    'HTMX',
    'Rust',
    'Qwik',
    'D3',
    'Tauri',
    'Deno',
    'Fresh',
  ];
  private readonly peripheralUseTagNameArr = [
    'React',
    'Vue',
    'Node',
    'Express',
    'MongoDB',
    'PostgresSQL',
    'Python',
  ];
  private readonly alsoInterestedInTagNameArr = [
    'Functional Programming',
    'Reactive Programming',
    'Creative coding',
    'Linux',
    'Complexity',
    'Cybernetics',
    'Logo Design',
    'Mechanical Keyboards',
  ];

  public inFocusTagArr: TagInfoObj[] = [];
  public previewTagArr: TagInfoObj[] = [];
  public peripheralUseTagArr: TagInfoObj[] = [];
  public alsoInterestedInTagArr: TagInfoObj[] = [];

  constructor(
    private loadingService: LoadingService,
    public tagMappingService: TagMappingService
  ) {}

  ngOnInit(): void {
    this.inFocusTagArr = this.generateExtendedTagObjArr(this.inFocusTagNameArr);
    this.previewTagArr = this.generateExtendedTagObjArr(this.previewTagNameArr);
    this.peripheralUseTagArr = this.generateExtendedTagObjArr(this.peripheralUseTagNameArr);
    this.alsoInterestedInTagArr = this.generateExtendedTagObjArr(this.alsoInterestedInTagNameArr);
  }

  ngAfterViewInit() {
    this.loadingService.emitAfterViewInitSignal('ABOUT');
  }

  ngOnDestroy(): void {
    this.tagMappingService.resetTagSelection();
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

  public toggleTagSelection(tagObj: TagInfoObj): void {
    this.tagMappingService.toggleSelectionOfTag(tagObj.name.toLowerCase());
    // Todo: refactor this to be more maintainable.
    //  This is not the best way to do this because it depends on mutating an object by reference, but it works for now.
    tagObj.isActive = !tagObj.isActive;
  }

  private generateExtendedTagObjArr(
    tagNameArr: string[],
  ): TagInfoObj[] {
    return tagNameArr.map((tagName) => {
      const resultTagObj = {
        name: tagName,
        isActive: false,
        count: this.tagMappingService.getResultCountForTag(
          tagName.toLowerCase()
        ),
      };

      return resultTagObj;
    });
  }
}
