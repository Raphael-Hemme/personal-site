import { AfterViewInit, Component, OnInit } from '@angular/core';
import { BlogPostMetaData, BlogService } from 'src/app/shared/services/blog-service/blog.service';
import { orderBy } from 'lodash-es';
import { LoadingService } from 'src/app/shared/services/loading-service/loading.service';

@Component({
  selector: 'app-blog-page',
  templateUrl: './blog-page.component.html',
  styleUrls: ['./blog-page.component.scss']
})
export class BlogPageComponent implements OnInit, AfterViewInit {

  public postsData: BlogPostMetaData[];
  public blogPostsMetaDataSortetByDate: BlogPostMetaData[];
  public isShowingOverview = true;
  public currSelectedPostId = '';

  constructor(
    private blogService: BlogService,
    private loadingService: LoadingService
  ) {
    this.postsData = this.blogService.getAllBlogPostsMetaData()
    this.blogPostsMetaDataSortetByDate = orderBy(this.postsData, 'dateOriginal', 'desc')
  }

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.loadingService.emitAfterViewInitSignal('BLOG');
  }

/*   public handleBlogPreviewReadBtnEvent(id: string) {
    this.isShowingOverview = false;
    this.currSelectedPostId = id;
  }

  public handleBlogPostBackBtnEvent() {
    this.isShowingOverview = true;
    this.currSelectedPostId = '';
  } */

}
