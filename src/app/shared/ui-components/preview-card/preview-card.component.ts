import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { BlogPostMetaData } from '../../services/blog-service/blog.service';
import { DataService } from '../../services/data-service/data.service';
import { NgClass } from '@angular/common';

type ImgOrientation = 'top' | 'left' | 'right';

@Component({
    selector: 'app-preview-card',
    templateUrl: './preview-card.component.html',
    styleUrls: ['./preview-card.component.scss'],
    standalone: true,
    imports: [NgClass]
})
export class PreviewCardComponent implements OnInit {

  @Input() imgPosition: ImgOrientation = 'top';
  @Input() metaData!: BlogPostMetaData;

  public hslBgColorString: string = ''
  public previewOrintationClass = '';
  public phaseIteratorArr: string[] = []

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService
  ) { }

  ngOnInit(): void {
    for (let i = 0; i < this.metaData.phase; i++) {
      this.phaseIteratorArr.push('i' + i);
    }

    switch (this.imgPosition) {
      case ('top'):
        this.previewOrintationClass = 'image-top-preview-card';
        break;
      case ('left'):
        this.previewOrintationClass = 'image-left-preview-card';
        break;
      case ('right'):
        this.previewOrintationClass = 'image-right-preview-card';
        break;
      default:
        this.previewOrintationClass = 'image-top-preview-card';
    }
  }

  public handlePreviewClick(id: string) {
    const originUrl: string = this.route.snapshot.url.join('');
    this.dataService.originOfNavigation$.next(originUrl);
    const currRouteArr = this.metaData.category === 'post'
      ? ['/blog/post', id]
      : ['/io-garden/experiment', id];

    this.router.navigate([...currRouteArr]);
  }

}
