import { Component, OnInit } from '@angular/core';
import { BlogPostMetaData, BlogService } from 'src/app/shared/services/blog-service/blog.service';
import _ from 'lodash';

@Component({
  selector: 'app-blog-page',
  templateUrl: './blog-page.component.html',
  styleUrls: ['./blog-page.component.scss']
})
export class BlogPageComponent implements OnInit {

  public postsData: BlogPostMetaData[];
  public blogPostsMetaDataSortetByDate: BlogPostMetaData[];
  public isShowingOverview = true;
  public currSelectedPostId = '';

  constructor(
    private blogService: BlogService
  ) {
    this.postsData = this.blogService.getAllBlogPostsMetaData()
    this.blogPostsMetaDataSortetByDate = _.orderBy(this.postsData, 'dateOriginal', 'desc')
  }

  ngOnInit(): void {}

  public handleBlogPreviewReadBtnEvent(id: string) {
    this.isShowingOverview = false;
    this.currSelectedPostId = id;
  }

  public handleBlogPostBackBtnEvent() {
    this.isShowingOverview = true;
    this.currSelectedPostId = '';
  }

}
