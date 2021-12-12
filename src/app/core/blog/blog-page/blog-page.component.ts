import { Component, OnInit } from '@angular/core';
import { BlogService } from 'src/app/shared/services/blog-service/blog.service';

import blogPostsMetaData from 'src/assets/blog-posts/blog-posts-data.json';

@Component({
  selector: 'app-blog-page',
  templateUrl: './blog-page.component.html',
  styleUrls: ['./blog-page.component.scss']
})
export class BlogPageComponent implements OnInit {

  public postsData = blogPostsMetaData;

  constructor(){}

  ngOnInit(): void {}

}
