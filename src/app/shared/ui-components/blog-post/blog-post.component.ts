import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BlogPostMetaData, BlogService } from '../../services/blog-service/blog.service';

@Component({
  selector: 'app-blog-post',
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.scss']
})
export class BlogPostComponent implements OnInit {

  public currPath = '';
  public currPostId: string = '';
  public currPostMetaData!: BlogPostMetaData;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private blogService: BlogService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.currPostId = params['id']
      this.currPostMetaData = this.blogService.getBlogPostMetaDataById(this.currPostId);
      console.log('this.currPostId', this.currPostId, 'this.currPostMetaData', this.currPostMetaData)
    });



    this.currPath = '/assets/blog-posts/' + this.currPostId + '.md';
  }
  public handleBlogPostBackBtn() {
    this.router.navigate(['/blog']);
  }

}
