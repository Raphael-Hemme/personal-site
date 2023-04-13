import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Subscription, timer } from 'rxjs';
import { BlogPostMetaData, BlogService } from 'src/app/shared/services/blog-service/blog.service';
import { IoGardenExperimentMetaData, IoGardenService } from 'src/app/shared/services/io-garden-service/io-garden.service';
// import { SplashScreenService } from 'src/app/shared/services/splash-screen-service/splash-screen.service';
import _ from 'lodash';

interface TagObjNameAndCount {
  name: string;
  count: number;
}
interface CountObj {
  [key: string]: number;
}

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('tagResultOuterContainer') tagResultOuterContainer!: ElementRef;

  private subscriptions: Subscription = new Subscription()

  public featuredBlogPost!: BlogPostMetaData;

  public featuredIoGardenExperiment!: IoGardenExperimentMetaData;

  public allIoGardenTags: string[] = [];
  public allBlogTags: string[] = [];
  public unifiedAndCountedTagsArr!: TagObjNameAndCount[];

  public blogPostsAndExperimentsSelectedByTag!: (BlogPostMetaData | IoGardenExperimentMetaData)[];

  public currNameSelectedTag = '';

  public delayToLoadIsOver = false;


  constructor(
    // private splashScreenService: SplashScreenService,
    private ioGardenService: IoGardenService,
    private blogService: BlogService
  ) {}

  ngOnInit(): void {
    this.subscriptions.add(
      timer(1000)
      .subscribe((t) => {
        this.delayToLoadIsOver = true;
      })
    )

    this.featuredIoGardenExperiment = this.ioGardenService.getRandomIoGardenExperimentMetaData();
    this.featuredBlogPost = this.blogService.getRandomBlogPostMetaData();

    this.allIoGardenTags = this.ioGardenService.getAllIoGardenExperimentTags();
    this.allBlogTags = this.blogService.getAllBlogTags();

    const unorderedUnifiedAndCountedArr = this.unifyAndCountTagArrays(this.allIoGardenTags, this.allBlogTags);
    this.unifiedAndCountedTagsArr = _.orderBy(unorderedUnifiedAndCountedArr, 'count', 'desc');
  }

  ngAfterViewInit(): void {

  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private unifyAndCountTagArrays(arr1: string[], arr2: string[]): TagObjNameAndCount[]  {
    const rawCombinedArr = [...arr1, ...arr2];
    const countObj: CountObj = rawCombinedArr.reduce((acc, curr) => ({...acc, [curr]:0}), {});
    rawCombinedArr.forEach(entry => countObj[entry] += 1);
    const resultArr = Object.keys(countObj).map(el => {
      return {
        name: el,
        count: countObj[el]
      }
    })
    return resultArr;
  }

  public handleRefreshFeaturedBtn() {
    this.featuredIoGardenExperiment = this.ioGardenService.getRandomIoGardenExperimentMetaData();
    this.featuredBlogPost = this.blogService.getRandomBlogPostMetaData();
  }

  public handleTagSelection(tag: string): void {
    if (tag === this.currNameSelectedTag) {
      this.currNameSelectedTag = '';
      this.blogPostsAndExperimentsSelectedByTag = [];
    } else {
      this.blogPostsAndExperimentsSelectedByTag = [];
      const resultArr = [
        ...this.blogService.getIoGardenExperimentsByTag(tag),
        ...this.ioGardenService.getIoGardenExperimentsByTag(tag)
      ]
      this.blogPostsAndExperimentsSelectedByTag = _.orderBy(resultArr, 'phase' ,'desc')
      this.currNameSelectedTag = tag;
    }
    // this.tagResultOuterContainer.nativeElement.scrollIntoView({block: "end", behavior: "smooth"});
  }

}
