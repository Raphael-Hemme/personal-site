import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BlogPostMetaData, BlogService } from '../../services/blog-service/blog.service';
import { DataService } from '../../services/data-service/data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-blog-post',
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.scss']
})
export class BlogPostComponent implements OnInit, OnDestroy {

  public currPath = '';
  public currPostId: string = '';
  public currPostMetaData!: BlogPostMetaData;
  private originUrl = '';

  private subscriptions: Subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private blogService: BlogService,
    private dataService: DataService
  ) { }

  ngOnInit(): void {
    this.subscriptions.add(
      this.route.params.subscribe(params => {
        this.currPostId = params['id']
        this.currPath = '/assets/blog-posts/' + this.currPostId + '.md';
        this.currPostMetaData = this.blogService.getBlogPostMetaDataById(this.currPostId);
      })
    );

    this.subscriptions.add(
      this.dataService.originOfNavigation$.subscribe(origin => this.originUrl = origin)
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public handleBackBtn() {
    const currPath = `/${this.originUrl}`;
    this.router.navigate([currPath]);
  }
}