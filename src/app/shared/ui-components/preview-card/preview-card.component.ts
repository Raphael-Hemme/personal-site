import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { BlogPostMetaData } from '../../services/blog-service/blog.service';
import { DataService } from '../../services/data-service/data.service';

type ImgOrientation = 'top' | 'left' | 'right';

@Component({
  selector: 'app-preview-card',
  templateUrl: './preview-card.component.html',
  styleUrls: ['./preview-card.component.scss']
})
export class PreviewCardComponent implements OnInit {

  @Input() imgPosition: ImgOrientation = 'top';
  @Input() metaData!: BlogPostMetaData;
//  @Input() routingConfig
  // @Output() blogPostReadBtnEvent: EventEmitter<string> = new EventEmitter();

  public hslBgColorString: string = ''
  public previewOrintationClass = '';
  public phaseIteratorArr: string[] = []

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService
  ) { }

  ngOnInit(): void {
    // console.log(this.metaData.previewImageUrl);
    // this.hslBgColorString = this.generateHslBgColorString(this.metaData.previewImageUrl);
    // console.log(this.hslBgColorString);

    for (let i = 0; i < this.metaData.phase; i++) {
      this.phaseIteratorArr.push('i');
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

/*   private generateHslBgColorString(inputString: string): string {
    let removedPath = inputString.replace('assets/images/blog-preview-images/punchCardPattern-','');
    removedPath = removedPath.replace('.png', '');
    const hslArr = removedPath.split('-');
    return `hsl(${hslArr[0]}, ${hslArr[1]}%, ${hslArr[2]}%)`;
  } */

  public handlePreviewClick(id: string) {
    const originUrl: string = this.route.snapshot.url.join('');
    this.dataService.originOfNavigation$.next(originUrl);
    const currRouteArr = this.metaData.category === 'post'
      ? ['/blog/post', id]
      : ['/io-garden', id, id];

    this.router.navigate([...currRouteArr]);
    // this.router.navigate(['/blog/post', id]);
    // this.blogPostReadBtnEvent.emit(id);
  }

}
