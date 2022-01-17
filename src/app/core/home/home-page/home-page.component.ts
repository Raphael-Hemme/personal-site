import { Component, OnInit } from '@angular/core';
// import { Subscription } from 'rxjs';
import { BlogPostMetaData, BlogService } from 'src/app/shared/services/blog-service/blog.service';
import { IoGardenExperimentMetaData, IoGardenService } from 'src/app/shared/services/io-garden-service/io-garden.service';
import { SplashScreenService } from 'src/app/shared/services/splash-screen-service/splash-screen.service';
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
export class HomePageComponent implements OnInit {

  // private subscriptions: Subscription = new Subscription()

  public featuredBlogPost!: BlogPostMetaData;

  public featuredIoGardenExperiment!: IoGardenExperimentMetaData;

  public allIoGardenTags: string[] = [];
  public allBlogTags: string[] = [];
  public unifiedAndCountedTagsArr!: TagObjNameAndCount[];

  public blogPostsAndExperimentsSelectedByTag!: (BlogPostMetaData | IoGardenExperimentMetaData)[];


  constructor(
    private splashScreenService: SplashScreenService,
    private ioGardenService: IoGardenService,
    private blogService: BlogService
  ) {}

  ngOnInit(): void {
    /* this.subscriptions.add(
      this.splashScreenService.splashScreenTimer$.subscribe(next => {
        this.splashScreenService.splashScreenStatus.next('off');
      })
    ) */

    this.featuredIoGardenExperiment = this.ioGardenService.getRandomIoGardenExperimentMetaData();
    this.featuredBlogPost = this.blogService.getRandomBlogPostMetaData();

    this.allIoGardenTags = this.ioGardenService.getAllIoGardenExperimentTags();
    console.log('this.allIoGardenTags: ', this.allIoGardenTags);

    this.allBlogTags = this.blogService.getAllBlogTags();
    console.log('this.allBlogTags: ', this.allBlogTags);

    const unorderedUnifiedAndCountedArr = this.unifyAndCountTagArrays(this.allIoGardenTags, this.allBlogTags);
    this.unifiedAndCountedTagsArr = _.orderBy(unorderedUnifiedAndCountedArr, 'count', 'desc');
    console.log('this.unifiedAndCountedTagsArr: ', this.unifiedAndCountedTagsArr);
  }

  ngOnDestroy(): void {
    /* this.subscriptions.unsubscribe(); */
  }

  private unifyAndCountTagArrays(arr1: string[], arr2: string[]): TagObjNameAndCount[]  {
    const rawCombinedArr = [...arr1, ...arr2];
    // console.log('rawCombinedArr: ', rawCombinedArr);
    const countObj: CountObj = rawCombinedArr.reduce((acc, curr) => ({...acc, [curr]:0}), {});
    rawCombinedArr.forEach(entry => countObj[entry] += 1);
    // console.log('countObj: ', countObj);
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
    const resultArr = [
      ...this.blogService.getIoGardenExperimentsByTag(tag),
      ...this.ioGardenService.getIoGardenExperimentsByTag(tag)
    ]
    this.blogPostsAndExperimentsSelectedByTag = _.orderBy(resultArr, 'phase' ,'desc')
  }

}
