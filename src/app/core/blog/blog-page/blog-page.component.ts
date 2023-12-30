import { AfterViewInit, Component, OnInit } from '@angular/core';
import { BlogPostMetaData, BlogService } from 'src/app/shared/services/blog-service/blog.service';
import { orderBy } from 'lodash-es';
import { LoadingService } from 'src/app/shared/services/loading-service/loading.service';
import { PreviewCardComponent } from '../../../shared/ui-components/preview-card/preview-card.component';

@Component({
    selector: 'app-blog-page',
    templateUrl: './blog-page.component.html',
    styleUrls: ['./blog-page.component.scss'],
    standalone: true,
    imports: [PreviewCardComponent]
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
}
