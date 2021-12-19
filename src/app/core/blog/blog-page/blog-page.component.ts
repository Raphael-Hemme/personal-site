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

  constructor(
    private blogService: BlogService
  ) {
    this.postsData = this.blogService.getBlogPostsMetaData()
    this.blogPostsMetaDataSortetByDate = _.orderBy(this.postsData, 'dateOriginal', 'desc')
  }

  ngOnInit(): void {
  }

}
