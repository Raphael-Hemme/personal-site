import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { LoadingService } from 'src/app/shared/services/loading-service/loading.service';
import { AsyncPipe, NgClass } from '@angular/common';
import { TagMappingService } from 'src/app/shared/services/tag-mapping-service/tag-mapping.service';
import { TagResultListComponent } from 'src/app/shared/ui-components/tag-result-list/tag-result-list.component';

export interface TagInfoObj {
  name: string;
  isActive: boolean;
  localSourceArr: 'inFocusTagArr' | 'previewTagArr' | 'peripheralUseTagArr' | 'alsoInterestedInTagArr';
}

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

  public readonly inFocusTagArr: TagInfoObj[] = [
    { name: 'TypeScript', isActive: false, localSourceArr: 'inFocusTagArr' },
    { name: 'JavaScript', isActive: false, localSourceArr: 'inFocusTagArr' },
    { name: 'Clojure', isActive: false, localSourceArr: 'inFocusTagArr' },
    { name: 'HMTL', isActive: false, localSourceArr: 'inFocusTagArr' },
    { name: 'CSS / SCSS', isActive: false, localSourceArr: 'inFocusTagArr' },
    { name: 'Angular', isActive: false, localSourceArr: 'inFocusTagArr' },
    { name: 'RxJS', isActive: false, localSourceArr: 'inFocusTagArr' },
    { name: 'Jest', isActive: false, localSourceArr: 'inFocusTagArr' },
    { name: 'Cypress', isActive: false, localSourceArr: 'inFocusTagArr' },
    { name: 'P5', isActive: false, localSourceArr: 'inFocusTagArr' },
  ]

  public readonly previewTagArr: TagInfoObj[] = [
    { name: 'Rust', isActive: false, localSourceArr: 'previewTagArr' },
    { name: 'Qwik', isActive: false, localSourceArr: 'previewTagArr' },
    { name: 'Babashka', isActive: false, localSourceArr: 'previewTagArr' },
    { name: 'D3', isActive: false, localSourceArr: 'previewTagArr' },
    { name: 'Tauri', isActive: false, localSourceArr: 'previewTagArr' },
    { name: 'Deno', isActive: false, localSourceArr: 'previewTagArr' },
    { name: 'Fresh', isActive: false, localSourceArr: 'previewTagArr' }
  ]

  public readonly peripheralUseTagArr: TagInfoObj[] = [
    { name: 'React', isActive: false, localSourceArr: 'peripheralUseTagArr' },
    { name: 'Vue', isActive: false, localSourceArr: 'peripheralUseTagArr' },
    { name: 'Node', isActive: false, localSourceArr: 'peripheralUseTagArr' },
    { name: 'Express', isActive: false, localSourceArr: 'peripheralUseTagArr' },
    { name: 'MongoDB', isActive: false, localSourceArr: 'peripheralUseTagArr' },
    { name: 'PostgresSQL', isActive: false, localSourceArr: 'peripheralUseTagArr' },
    { name: 'Python', isActive: false, localSourceArr: 'peripheralUseTagArr' }
  ]

  public readonly alsoInterestedInTagArr: TagInfoObj[] = [
    { name: 'creative coding', isActive: false, localSourceArr: 'alsoInterestedInTagArr' },
    { name: 'generative art', isActive: false, localSourceArr: 'alsoInterestedInTagArr' },
    { name: 'functional programming', isActive: false, localSourceArr: 'alsoInterestedInTagArr' },
    { name: 'reactive programming', isActive: false, localSourceArr: 'alsoInterestedInTagArr' },
    { name: 'cybernetics', isActive: false, localSourceArr: 'alsoInterestedInTagArr' },
    { name: 'complexity', isActive: false, localSourceArr: 'alsoInterestedInTagArr' },
    { name: 'logo design', isActive: false, localSourceArr: 'alsoInterestedInTagArr' },
    { name: 'type design', isActive: false, localSourceArr: 'alsoInterestedInTagArr' },
    { name: 'mechanical keyboards', isActive: false, localSourceArr: 'alsoInterestedInTagArr' }
  ]

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

  public toggleTagSelection(tagObj: TagInfoObj): void {
    this.tagMappingService.toggleSelectionOfTag(tagObj.name.toLowerCase());
    // this is not the best way to do this because it depends of mutating an object by reference, but it works for now.
    // Todo: refactor this to be more maintainable.
    tagObj.isActive = !tagObj.isActive;
  }
}
