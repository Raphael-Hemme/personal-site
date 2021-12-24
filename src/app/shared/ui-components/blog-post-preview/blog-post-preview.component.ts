import { Component, Input, OnInit, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { BlogPostMetaData } from '../../services/blog-service/blog.service';

@Component({
  selector: 'app-blog-post-preview',
  templateUrl: './blog-post-preview.component.html',
  styleUrls: ['./blog-post-preview.component.scss']
})
export class BlogPostPreviewComponent implements OnInit {

  @Input() metaData: BlogPostMetaData = {
    'id': '',
    'title': '',
    'subtitle': '',
    'dateOriginal': '',
    'dateLastEdited': '',
    'state': 0,
    'postPath': '',
    'previewImageUrl': '',
    'tags': []
  };
  // @Output() blogPostReadBtnEvent: EventEmitter<string> = new EventEmitter();

  public hslBgColorString: string = ''

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    // console.log(this.metaData.previewImageUrl);
    this.hslBgColorString = this.generateHslBgColorString(this.metaData.previewImageUrl);
    // console.log(this.hslBgColorString);
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
