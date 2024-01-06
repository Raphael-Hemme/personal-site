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
    standalone: true,
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
/*     for (let i = 0; i < this.metaData.phase; i++) {
      this.phaseIteratorArr.push('i' + i);
    } */

    this.previewOrintationClass = this.getPreviewOrientationClass(this.imgPosition);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('metaData' in changes) {
      this.generatePhaseIteratorArr(this.metaData.phase);
    }
  }
  
  private generatePhaseIteratorArr(phase: number): void {
    this.phaseIteratorArr = [];
    for (let i = 0; i < phase; i++) {
      this.phaseIteratorArr.push('i' + i);
    }
  }

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

  public handlePreviewClick(id: string): void {
    const originUrl: string = this.route.snapshot.url.join('');
    this.dataService.originOfNavigation$.next(originUrl);
    const currRouteArr = this.metaData.category === 'post'
      ? ['/blog/post', id]
      : ['/io-garden/experiment', id];

    this.router.navigate([...currRouteArr]);
  }

}
