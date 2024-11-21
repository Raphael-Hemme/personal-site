import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { BlogPostMetaData } from '../../services/blog-service/blog.service';
import { DataService } from '../../services/data-service/data.service';
import { NgClass } from '@angular/common';
import { IoGardenExperimentMetaData } from '../../services/io-garden-service/io-garden.service';

type ImgOrientation = 'top' | 'left' | 'right';
type ImgOrientationClass = 'image-top-preview-card' | 'image-left-preview-card' | 'image-right-preview-card';

@Component({
    selector: 'app-preview-card',
    templateUrl: './preview-card.component.html',
    styleUrls: ['./preview-card.component.scss'],
    imports: [NgClass]
})
export class PreviewCardComponent implements OnInit, OnChanges {

  @Input() imgPosition: ImgOrientation = 'top';
  @Input() metaData!: BlogPostMetaData | IoGardenExperimentMetaData;

  public hslBgColorString: string = ''
  public previewOrintationClass: ImgOrientationClass = 'image-top-preview-card';
  public phaseIteratorArr: string[] = []

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService
  ) { }

  ngOnInit(): void {
    this.previewOrintationClass = this.getPreviewOrientationClass(this.imgPosition);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('metaData' in changes) {
      this.generatePhaseIteratorArr(this.metaData.phase);
    }
  }
  
  /**
   * Generates an array to loop over in the template and display the phase of the current content.
   * @param phase The number of phases.
   */
  private generatePhaseIteratorArr(phase: number): void {
    this.phaseIteratorArr = [];
    for (let i = 0; i < phase; i++) {
      this.phaseIteratorArr.push('i' + i);
    }
  }

  /**
   * Returns the CSS class for the preview card based on the image position input.
   * @param imgPosition The position of the image ('top', 'left', or 'right').
   * @returns The CSS class for the preview card.
   */
  private getPreviewOrientationClass(imgPosition: 'top' | 'left' | 'right'): ImgOrientationClass {
    switch (imgPosition) {
      case ('top'):
        return this.previewOrintationClass = 'image-top-preview-card';
      case ('left'):
        return this.previewOrintationClass = 'image-left-preview-card';
      case ('right'):
        return this.previewOrintationClass = 'image-right-preview-card';
      default:
        return this.previewOrintationClass = 'image-top-preview-card';
    }
  }

  /**
   * Handles the click event on the preview card and navigates to the corresponding page.
   * @param id - The ID of the preview card.
   * @returns void
   */
  public handlePreviewClick(id: string): void {
    const originUrl: string = this.route.snapshot.url.join('');
    this.dataService.originOfNavigation$.next(originUrl);
    const currRouteArr = this.metaData.category === 'post'
      ? ['/blog/post', id]
      : ['/io-garden/experiment', id];

    this.router.navigate([...currRouteArr]);
  }

}
