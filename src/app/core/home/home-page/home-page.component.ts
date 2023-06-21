import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subscription, fromEvent, timer } from 'rxjs';
import { BlogPostMetaData, BlogService } from 'src/app/shared/services/blog-service/blog.service';
import { IoGardenExperimentMetaData, IoGardenService } from 'src/app/shared/services/io-garden-service/io-garden.service';
import { orderBy } from 'lodash';
import { MenuService } from 'src/app/shared/services/menu-service/menu.service';

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
export class HomePageComponent implements OnInit, OnDestroy {

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

  private scrollEventObserver = fromEvent(document, 'scroll');
  private currScrollY$$: BehaviorSubject<number> = new BehaviorSubject(0);


  constructor(
    private ioGardenService: IoGardenService,
    private blogService: BlogService,
    private menuService: MenuService
  ) {}

  ngOnInit(): void {
    this.subscriptions.add(
      timer(1000)
      .subscribe((t) => {
        this.delayToLoadIsOver = true;
      })
    )

    this.subscriptions.add(
      this.scrollEventObserver.subscribe(() => this.currScrollY$$.next(window.scrollY))
    )

    this.subscriptions.add(
      this.currScrollY$$.subscribe((currScrollY: number) => {
        if (currScrollY <= window.innerHeight) {
          this.menuService.setSmallLogoVisibile(false);
        } else {
          this.menuService.setSmallLogoVisibile(true);
        }
      })
    );

    this.featuredIoGardenExperiment = this.ioGardenService.getRandomIoGardenExperimentMetaData();
    this.featuredBlogPost = this.blogService.getRandomBlogPostMetaData();

    this.allIoGardenTags = this.ioGardenService.getAllIoGardenExperimentTags();
    this.allBlogTags = this.blogService.getAllBlogTags();

    const unorderedUnifiedAndCountedArr = this.unifyAndCountTagArrays(this.allIoGardenTags, this.allBlogTags);
    this.unifiedAndCountedTagsArr = orderBy(unorderedUnifiedAndCountedArr, 'count', 'desc');
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
    this.menuService.setSmallLogoVisibile(true);
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
      this.blogPostsAndExperimentsSelectedByTag = orderBy(resultArr, 'phase' ,'desc')
      this.currNameSelectedTag = tag;
    }
  }

}
