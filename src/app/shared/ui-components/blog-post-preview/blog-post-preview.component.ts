import { Component, Input, OnInit, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { BlogPostMetaData } from '../../services/blog-service/blog.service';

type ImgOrientation = 'top' | 'left' | 'right';

@Component({
  selector: 'app-blog-post-preview',
  templateUrl: './blog-post-preview.component.html',
  styleUrls: ['./blog-post-preview.component.scss']
})
export class BlogPostPreviewComponent implements OnInit {

  @Input() imgPosition: ImgOrientation = 'top';
  @Input() metaData!: BlogPostMetaData;
  // @Output() blogPostReadBtnEvent: EventEmitter<string> = new EventEmitter();

  public hslBgColorString: string = ''
  public previewOrintationClass = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    // console.log(this.metaData.previewImageUrl);
    this.hslBgColorString = this.generateHslBgColorString(this.metaData.previewImageUrl);
    // console.log(this.hslBgColorString);

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

  private generateHslBgColorString(inputString: string): string {
    let removedPath = inputString.replace('assets/images/blog-preview-images/punchCardPattern-','');
    removedPath = removedPath.replace('.png', '');
    const hslArr = removedPath.split('-');
    return `hsl(${hslArr[0]}, ${hslArr[1]}%, ${hslArr[2]}%)`;
  }

  public handleBlogPostPreviewReadBtn(id: string) {
    // console.log('inpreview.component: ', id);
    this.router.navigate(['/blog/post', id]);
    // this.blogPostReadBtnEvent.emit(id);
  }

}
