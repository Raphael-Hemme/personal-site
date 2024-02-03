import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Subscription, filter, tap } from 'rxjs';
import { ReducedSearchIndexEntry, SearchIndexEntry, SearchResult, SearchService } from 'src/app/shared/services/search-service/search.service';
import { HostListener, ElementRef } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { LoadingService } from '../../services/loading-service/loading.service';
import { MarkdownModule } from 'ngx-markdown';
import { FormsModule } from '@angular/forms';
import { IoGardenExperimentMetaData } from '../../services/io-garden-service/io-garden.service';
import { BlogPostMetaData } from '../../services/blog-service/blog.service';

interface HighlightedSearchIndexEntry extends SearchIndexEntry {
  highlightedSearchTerm: HighlightedSearchTermObj;
}

interface ReducedHighlightedSearchIndexEntry extends ReducedSearchIndexEntry {
  highlightedSearchTerm: HighlightedSearchTermObj;
}

interface HighlightedSearchTermObj {
  pre: string;
  match: string;
  post: string;
}

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [
        FormsModule,
        RouterLink,
        MarkdownModule,
    ],
})
export class SearchComponent implements OnInit, AfterViewInit, OnDestroy {

  public searchInputValue= '';
  public searchResults: HighlightedSearchIndexEntry[] = [];
  public reducedSearchResults: ReducedHighlightedSearchIndexEntry[] = [];
  public currPreviewPath = '';
  public currPreviewRoute = '';

  public currPreviewMetaData: IoGardenExperimentMetaData | BlogPostMetaData | null = null;

  private subscriptions: Subscription = new Subscription();

  @HostListener('document:keydown.escape') escKeydownHandler() {
    this.closeSearch();
  }

  @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;

  constructor(
    private searchService: SearchService,
    private router: Router,
    private loadingService: LoadingService
  ) { }

  ngOnInit(): void {
    this.subscriptions.add(
      this.searchService.reducedSearchResults$.subscribe((searchResults: ReducedSearchIndexEntry[]) => {
        this.reducedSearchResults = searchResults.map(el => {
          console.log('el', el);
          const result: ReducedHighlightedSearchIndexEntry = {
            ...el,
            highlightedSearchTerm: this.highlightSearchTerm(el.searchTerm, this.searchInputValue)
          };
          return result;
        });
      })
    );

    this.subscriptions.add(
      this.router.events.pipe(
        filter((e): e is NavigationEnd => e instanceof NavigationEnd),
        tap((e) => {
          if (e.url.includes('io-garden')) {
            this.loadingService.emitAfterViewInitSignal('IO-GARDEN');
          } else {
            this.loadingService.emitAfterViewInitSignal('BLOG-POST');
          }
        })
      ).subscribe(() => {
        this.closeSearch();
      })
    )
  }

  /**
   * Lifecycle hook that is called after Angular has fully initialized the component's view.
   * It is responsible for focusing and selecting the search input element.
   */
  ngAfterViewInit(): void {
    this.searchInput.nativeElement.focus();
    this.searchInput.nativeElement.select();
  }

  /**
   * Lifecycle hook that is called when the component is about to be destroyed.
   * It is responsible for resetting the search results and unsubscribing from any subscriptions.
   */
  ngOnDestroy(): void {
    this.searchService.resetSearchResults();
    this.subscriptions.unsubscribe();
  }

  /**
   * Closes the search component.
   */
  public closeSearch(): void {
    this.searchService.closeSearch();
    this.ngOnDestroy();
  }

  /**
   * Prevents the unwanted close event.
   * @param event - The event object.
   */
  public preventUnwantedCloseEvent(event: Event): void {
    event.stopPropagation();
    return;
  }

  /**
   * Handles the input changes in the search component.
   * @param event The input event value.
   */
  public handleInputChanges(event: string): void {
    this.searchService.search(event);
  }

  /**
   * Handles the click event of a search result.
   * It sets the current preview path and route based on the provided search result and hides the keyboard.
   * @param searchResult The search result object.
   * @returns void
   */
  public handleSearchResultClick(searchResult: SearchResult): void {
    const filePathFragmentsArr = searchResult.file.split('/');
    const fileName = filePathFragmentsArr.slice(filePathFragmentsArr.length - 2).join('/');
    this.currPreviewMetaData = this.searchService.getPreviewMetaData(searchResult.file);
    this.currPreviewPath = '/assets/' + fileName;
    this.currPreviewRoute = this.getCurrPreviewRoute(searchResult.file);
    this.hideKeyboard();
  }

  /**
   * Returns an object to use for assigning CSS classes that highlight the search term within the search result string.
   * @param searchResultStr - The search result string.
   * @param searchTerm - The search term to highlight.
   * @returns An object containing the highlighted search term parts.
   */
  private highlightSearchTerm(searchResultStr: string, searchTerm: string): HighlightedSearchTermObj {
    const origCaseSearchResultIndexStart = searchResultStr.toLowerCase().indexOf(searchTerm.toLowerCase());
    const origCaseSearchResultIndexEnd = origCaseSearchResultIndexStart + searchTerm.length;
    
    return {
      pre: searchResultStr.slice(0, origCaseSearchResultIndexStart),
      match: searchResultStr.slice(origCaseSearchResultIndexStart, origCaseSearchResultIndexEnd),
      post: searchResultStr.slice(origCaseSearchResultIndexEnd)
    };
  }

  /**
   * Hides the keyboard by blurring the search input element. Relevant for mobile devices.
   */
  private hideKeyboard(): void {
    this.searchInput.nativeElement.blur();
  }

  /**
   * Returns the current preview route based on the provided file path.
   * @param filePath The file path to extract the preview route from.
   * @returns The current preview route.
   */
  private getCurrPreviewRoute(filePath: string): string {
    // Todo: Refactor this method to be more robust and less error-prone.
    const filePathFragmentsArr = filePath.split('/');
    const kind = filePathFragmentsArr.some(el => el.includes('blog-posts')) ? 'blog' : 'experiment';
    const subRoute = kind === 'experiment' ? 'io-garden/experiment/' : 'blog/post/'
    const rawFileName = filePathFragmentsArr[filePathFragmentsArr.length - 1];
    const fileName = subRoute === 'io-garden/experiment/' ? rawFileName.replace('-description', '') : rawFileName;
    const result = subRoute + fileName.replace('.md', '');
    return result
  }
}
