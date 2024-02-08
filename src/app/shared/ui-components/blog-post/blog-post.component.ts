import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogPostMetaData, BlogService } from '../../services/blog-service/blog.service';
import { Subscription } from 'rxjs';
import { LoadingService } from '../../services/loading-service/loading.service';
import { MarkdownModule } from 'ngx-markdown';
import { TagListComponent } from '../tag-list/tag-list.component';
import { TagInfoObj } from '../../services/tag-mapping-service/tag-mapping.service';
import { NavigationService } from '../../services/navigation-service/navigation.service';

@Component({
    selector: 'app-blog-post',
    templateUrl: './blog-post.component.html',
    styleUrls: ['./blog-post.component.scss'],
    standalone: true,
    imports: [
      TagListComponent,
      MarkdownModule
    ]
})
export class BlogPostComponent implements OnInit, AfterViewInit, OnDestroy {

  public currPath = '';
  public currPostId: string = '';
  public currPostMetaData!: BlogPostMetaData;
  public currPostTags!: TagInfoObj[];

  private subscriptions: Subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private blogService: BlogService,
    private loadingService: LoadingService,
    private navigationService: NavigationService
  ) { }

  ngOnInit(): void {
    this.subscriptions.add(
      this.route.params.subscribe(params => {
        this.currPostId = params['id']
        this.currPath = '/assets/blog-posts/' + this.currPostId + '.md';
        this.currPostMetaData = this.blogService.getBlogPostMetaDataById(this.currPostId);
        this.currPostTags = this.addAdditionalInfoToTagObjsInArr(this.currPostMetaData.tags);
      })
    );
  }

  ngAfterViewInit() {
    this.loadingService.emitAfterViewInitSignal('BLOG-POST');
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public handleBackBtn() {
    this.navigationService.navigateBack();
  }

  private addAdditionalInfoToTagObjsInArr(tagStrArr: string[]): TagInfoObj[] {
    return tagStrArr.map(tagName => {
      return {
        name: tagName,
        isActive: false,
        count: this.blogService.getBlogPostCountByTag(tagName.toLowerCase())
      };
    })
  }
}