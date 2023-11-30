import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BlogPostMetaData, BlogService } from '../../services/blog-service/blog.service';
import { DataService } from '../../services/data-service/data.service';
import { Subscription } from 'rxjs';
import { LoadingService } from '../../services/loading-service/loading.service';
import { MarkdownModule } from 'ngx-markdown';
import { TagListComponent } from '../tag-list/tag-list.component';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-blog-post',
    templateUrl: './blog-post.component.html',
    styleUrls: ['./blog-post.component.scss'],
    standalone: true,
    imports: [NgIf, TagListComponent, MarkdownModule]
})
export class BlogPostComponent implements OnInit, AfterViewInit, OnDestroy {

  public currPath = '';
  public currPostId: string = '';
  public currPostMetaData!: BlogPostMetaData;
  private originUrl = '';

  private subscriptions: Subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private blogService: BlogService,
    private dataService: DataService,
    private loadingService: LoadingService
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

  ngAfterViewInit() {
    this.loadingService.emitAfterViewInitSignal('BLOG-POST');
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public handleBackBtn() {
    const currPath = `/${this.originUrl}`;
    this.router.navigate([currPath]);
  }
}