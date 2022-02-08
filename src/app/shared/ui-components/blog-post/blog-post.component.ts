import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BlogPostMetaData, BlogService } from '../../services/blog-service/blog.service';
import { DataService } from '../../services/data-service/data.service';

@Component({
  selector: 'app-blog-post',
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.scss']
})
export class BlogPostComponent implements OnInit {

  public currPath = '';
  public currPostId: string = '';
  public currPostMetaData!: BlogPostMetaData;
  private originUrl = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private blogService: BlogService,
    private dataService: DataService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.currPostId = params['id']
      this.currPostMetaData = this.blogService.getBlogPostMetaDataById(this.currPostId);
      // console.log('this.currPostId', this.currPostId, 'this.currPostMetaData', this.currPostMetaData)
    });
    this.dataService.originOfNavigation$.subscribe(origin => this.originUrl = origin);

    this.currPath = '/assets/blog-posts/' + this.currPostId + '.md';
  }
  public handleBackBtn() {
    const currPath = `/${this.originUrl}`;
    this.router.navigate([currPath]);
    /* console.log('this.originUrl: ', this.originUrl)
    if (this.originUrl === '') {
      this.router.navigate(['/']);
    } else {
      this.router.navigate([`/${this.originUrl}`]);
    } */
  }
}