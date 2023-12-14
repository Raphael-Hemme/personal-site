import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { LoadingService } from 'src/app/shared/services/loading-service/loading.service';
import { AsyncPipe, NgClass } from '@angular/common';
import { TagMappingService } from 'src/app/shared/services/tag-mapping-service/tag-mapping.service';
import { TagResultListComponent } from 'src/app/shared/ui-components/tag-result-list/tag-result-list.component';

export type LocalSrcRef =
  | 'inFocusTagArr'
  | 'previewTagArr'
  | 'peripheralUseTagArr'
  | 'alsoInterestedInTagArr';
export interface TagInfoObj {
  name: string;
  isActive: boolean;
  localSourceArr: LocalSrcRef;
  count: number;
}

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

  public inFocusTagNameArr = [
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
  public previewTagNameArr = [
    'Rust',
    'Qwik',
    'Babashka',
    'D3',
    'Tauri',
    'Deno',
    'Fresh',
  ];
  public peripheralUseTagNameArr = [
    'React',
    'Vue',
    'Node',
    'Express',
    'MongoDB',
    'PostgresSQL',
    'Python',
  ];
  public alsoInterestedInTagNameArr = [
    'creative coding',
    'generative art',
    'functional programming',
    'reactive programming',
    'cybernetics',
    'complexity',
    'logo design',
    'typography',
    'mechanical keyboards',
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
    this.inFocusTagArr = this.generateExtendedTagObjArr(this.inFocusTagNameArr, 'inFocusTagArr');
    this.previewTagArr = this.generateExtendedTagObjArr(this.previewTagNameArr, 'previewTagArr');
    this.peripheralUseTagArr = this.generateExtendedTagObjArr(this.peripheralUseTagNameArr, 'peripheralUseTagArr');
    this.alsoInterestedInTagArr = this.generateExtendedTagObjArr(this.alsoInterestedInTagNameArr, 'alsoInterestedInTagArr');
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

  public toggleTagSelection(tagObj: TagInfoObj): void {
    this.tagMappingService.toggleSelectionOfTag(tagObj.name.toLowerCase());
    // this is not the best way to do this because it depends of mutating an object by reference, but it works for now.
    // Todo: refactor this to be more maintainable.
    tagObj.isActive = !tagObj.isActive;
  }

  private generateExtendedTagObjArr(
    tagNameArr: string[],
    localSrcRef: LocalSrcRef
  ): TagInfoObj[] {
    return tagNameArr.map((tagName) => {
      const resultTagObj = {
        name: tagName,
        isActive: false,
        localSourceArr: localSrcRef,
        count: this.tagMappingService.getResultCountForTag(
          tagName.toLowerCase()
        ),
      };

      return resultTagObj;
    });
  }
}
