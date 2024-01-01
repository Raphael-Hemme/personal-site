import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { BlogPostMetaData, BlogService } from 'src/app/shared/services/blog-service/blog.service';
import { IoGardenExperimentMetaData, IoGardenService } from 'src/app/shared/services/io-garden-service/io-garden.service';
import { orderBy } from 'lodash-es';
import { MenuService } from 'src/app/shared/services/menu-service/menu.service';
import { SearchService } from 'src/app/shared/services/search-service/search.service';
import { LoadingService } from 'src/app/shared/services/loading-service/loading.service';
import { PreviewCardComponent } from '../../../shared/ui-components/preview-card/preview-card.component';
import { NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HorizontalGlitchSketchComponent } from '../../../shared/components/horizontal-glitch-sketch/horizontal-glitch-sketch.component';
import { AboutPageComponent } from '../../about/about-page/about-page.component';
import { TagResultListComponent } from 'src/app/shared/ui-components/tag-result-list/tag-result-list.component';
import { TagInfoObj } from 'src/app/shared/services/tag-mapping-service/tag-mapping.service';
import { TagListComponent } from 'src/app/shared/ui-components/tag-list/tag-list.component';
import { LoadingSpinnerComponent } from 'src/app/shared/ui-components/loading-spinner/loading-spinner.component';

interface CountObj {
  [key: string]: number;
}

@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.scss'],
    standalone: true,
    imports: [
      RouterLink,
      NgClass,
      AboutPageComponent,
      HorizontalGlitchSketchComponent,
      PreviewCardComponent,
      TagResultListComponent,
      TagListComponent,
      LoadingSpinnerComponent
    ]
})
export class HomePageComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('glitchSketch') glitchSketch!: ElementRef | undefined;

  public featuredBlogPost!: BlogPostMetaData;
  public featuredIoGardenExperiment!: IoGardenExperimentMetaData;

  public allIoGardenTags: TagInfoObj[] = [];
  public allBlogTags: TagInfoObj[] = [];
  public unifiedAndCountedTagsArr!: TagInfoObj[];

  public blogPostsAndExperimentsSelectedByTag!: (BlogPostMetaData | IoGardenExperimentMetaData)[];

  public tagSelectionListIsExpanded = false;

  public glitchSketchHasLoaded = false;

  constructor(
    private ioGardenService: IoGardenService,
    private blogService: BlogService,
    private menuService: MenuService,
    private searchService: SearchService,
    private loadingService: LoadingService,
    private readonly changeDetectorRef: ChangeDetectorRef
  ) {}

  /**
   * Initiate the component.
   * Sets the featured IoGarden experiment and blog post.
   * Gets all IoGarden experiment and blog tags.
   * Unifies and counts the tags arrays.
   */
  ngOnInit(): void {
    this.featuredIoGardenExperiment = this.ioGardenService.getRandomIoGardenExperimentMetaData();
    this.featuredBlogPost = this.blogService.getRandomBlogPostMetaData();

    this.allIoGardenTags = this.ioGardenService.getAllIoGardenExperimentTags();
    this.allBlogTags = this.blogService.getAllBlogTags();

    const unorderedUnifiedAndCountedArr = this.unifyAndCountTagArrays(this.allIoGardenTags, this.allBlogTags);
    this.unifiedAndCountedTagsArr = orderBy(unorderedUnifiedAndCountedArr, 'count', 'desc');
  }

  /**
   * Lifecycle hook that is called after the view is initialized.
   * It registers an Intersection Observer to handle the visibility of the small logo based on the visibility
   * of the sketch wrapper element. The registerIntersectionObserverAndHandleLogoVisibility method is called in this hook
   * because after the view has been initialized and the view child this.glitchSketch is truthy, the sketch wrapper element
   * is guaranteed to be in the DOM, wherese before, it was not guaranteed.
   */
  ngAfterViewInit(): void {
    if (this.glitchSketch) {
      // this.glitchSketchHasLoaded = true;
      // this.changeDetectorRef.detectChanges();
      this.registerIntersectionObserverAndHandleLogoVisibility();
    }
  }

  /**
   * Lifecycle hook that is called when the component is destroyed.
   * It sets the small logo to visible to true because it should be visible on all other pages and if the HomePageComponent
   * is destroyed the user necessarily navigated to another page.
   */
  ngOnDestroy(): void {
    this.glitchSketchHasLoaded = false;
    this.changeDetectorRef.detectChanges();
    this.menuService.setSmallLogoVisibile(true);
  }

  /**
   * Handles the refresh button click event by updating the featured IoGarden experiment and blog post.
   */
  public handleRefreshFeaturedBtn() {
    this.featuredIoGardenExperiment = this.ioGardenService.getRandomIoGardenExperimentMetaData();
    this.featuredBlogPost = this.blogService.getRandomBlogPostMetaData();
  }
  
  /**
   * Handles the selection of a tag by filtering the blog posts and experiments based on the selected tag.
   * If the same tag is selected twice, the filter is reset.
   * @param tag - The tag to filter by.
   */
  public handleTagSelection(selectedTagObj: TagInfoObj): void {
    const updatedTagObjArr = this.unifiedAndCountedTagsArr.map(tagObj => {
      if (tagObj.name === selectedTagObj.name) {
        tagObj.isActive = !tagObj.isActive;
      }
      return tagObj;
    });
    this.unifiedAndCountedTagsArr = updatedTagObjArr;

    const activeTags = this.unifiedAndCountedTagsArr.filter(tagObj => tagObj.isActive);

    this.blogPostsAndExperimentsSelectedByTag = [];
    const resultArr = activeTags.map(tagObj => {
      return [
        ...this.blogService.getBlogPostsByTag(tagObj.name),
        ...this.ioGardenService.getIoGardenExperimentsByTag(tagObj.name)
      ]
    }).flat();
      
    this.blogPostsAndExperimentsSelectedByTag = orderBy(resultArr, 'phase' ,'desc')
  }

  public handleTagListIsExpandedEvent(isExpanded: boolean): void {
    this.tagSelectionListIsExpanded = isExpanded;
  }
  
  /**
   * Handles the click event of the search button and toggles the visibility of the search component.
   */
  public handleSearchBtnClick(): void {
    this.searchService.toggleSearchComponentIsVisible();
  }
  
  /**
   * Handles the initialization signal emitted by the Glitch component.
   * If the event is 'GLITCH', it emits an afterViewInit signal for the loading service
   * @param event The event emitted by the Glitch component.
   */
  public handleGlitchViewInitSignal(event: string) {
    if (event === 'GLITCH') {
      this.loadingService.emitAfterViewInitSignal('HOME');
      this.glitchSketchHasLoaded = true;
      this.changeDetectorRef.detectChanges();
    }
  }
  
  /**
   * Registers an Intersection Observer to handle the visibility of the small logo based on the visibility
   * of the sketch wrapper element.
   */
  private registerIntersectionObserverAndHandleLogoVisibility() {
    // Select the wrapper element around the sketch element
    const glitchSketchWrapper = document.getElementById('horizontal-glitch-sketch-wrapper') as HTMLElement;
    
    // Callback function for the Intersection Observer
    const callback = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      entries.forEach((entry: IntersectionObserverEntry) => {
        // set the small logo to visible if the sketch wrapper is not in view
        this.menuService.setSmallLogoVisibile(!entry.isIntersecting);
      });
    };
    
    // Create an Intersection Observer with the callback
    const observer = new IntersectionObserver(callback, {
      root: null, // null means the viewport is the root
      rootMargin: '0px',
      threshold: 0 // Trigger when the sketch wrapper is just starting to go out of view
    });
    
    // Start observing the sketch wrapper element
    observer.observe(glitchSketchWrapper);
  }
  
  /**
   * Unifies two arrays of strings and counts the occurrences of each string.
   * @param arr1 - The first array of strings.
   * @param arr2 - The second array of strings.
   * @returns An array of objects containing the name and count of each string.
   */
  private unifyAndCountTagArrays(arr1: TagInfoObj[], arr2: TagInfoObj[]): TagInfoObj[]  {
    const rawCombinedArr = [...arr1, ...arr2];
    const countObj: CountObj = rawCombinedArr.reduce((acc, curr) => ({...acc, [curr.name]:0}), {});
    rawCombinedArr.forEach(entry => countObj[entry.name] += 1);
    const resultArr = Object.keys(countObj).map(el => {
      return {
        name: el,
        count: countObj[el],
        isActive: false
      }
    })
    return resultArr;
  }
}
