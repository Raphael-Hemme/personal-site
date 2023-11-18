import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Subscription, filter, tap } from 'rxjs';
import { SearchIndexEntry, SearchResult, SearchService } from 'src/app/shared/services/search-service/search.service';
import { HostListener, ElementRef } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { LoadingService } from '../../services/loading-service/loading.service';

interface HighlightedSearchIndexEntry extends SearchIndexEntry {
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
})
export class SearchComponent implements OnInit, AfterViewInit, OnDestroy {

  public searchInputValue= '';
  public searchResults: HighlightedSearchIndexEntry[] = [];
  public currPreviewPath = '';
  public currPreviewRoute = '';

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
      this.searchService.searchResults$.subscribe((searchResults: SearchIndexEntry[]) => {
        this.searchResults = searchResults.map(el => {
          const result: HighlightedSearchIndexEntry = {
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
          // console.log('event: ', e)
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

  ngAfterViewInit(): void {
    this.searchInput.nativeElement.focus();
    this.searchInput.nativeElement.select();
  }

  ngOnDestroy(): void {
    this.searchService.resetSearchResults();
    this.subscriptions.unsubscribe();
  }

  public closeSearch(): void {
    this.searchService.closeSearch();
    this.ngOnDestroy();
  }

  public preventUnwantedCloseEvent(event: Event): void {
    event.stopPropagation();
    return;
  }

  public handleInputChanges(event: string): void {
    this.searchService.search(event);
  }

  public handleSearchResultClick(searchResult: SearchResult): void {
    // console.log('searchResult: ', searchResult);
    const fileName = searchResult.file.slice(2);
    this.currPreviewPath = '/assets/' + fileName;
    // console.log('selectedPath: ', this.currPreviewPath)
    this.currPreviewRoute = this.getCurrPreviewRoute(searchResult.file);
    this.hideKeyboard();
  }

  private highlightSearchTerm(searchResultStr: string, searchTerm: string): HighlightedSearchTermObj {
    const origCaseSearchResultIndexStart = searchResultStr.toLowerCase().indexOf(searchTerm.toLowerCase());
    const origCaseSearchResultIndexEnd = origCaseSearchResultIndexStart + searchTerm.length;
    
    return {
      pre: searchResultStr.slice(0, origCaseSearchResultIndexStart),
      match: searchResultStr.slice(origCaseSearchResultIndexStart, origCaseSearchResultIndexEnd),
      post: searchResultStr.slice(origCaseSearchResultIndexEnd)
    };
  }

  public hideKeyboard(): void {
    this.searchInput.nativeElement.blur();
  }

  private getCurrPreviewRoute(filePath: string): string {
    const kind = filePath.replace('./', '').split('/')[0];
    const subRoute = kind.includes('experiment') ? 'io-garden/experiment/' : 'blog/post/'
    const rawFileName = filePath.replace('./', '').split('/')[1];
    const fileName = subRoute === 'io-garden/experiment/' ? rawFileName.replace('-description', '') : rawFileName;
    const result = subRoute + fileName.replace('.md', '');
    console.log('currPreviewRoute: ', result)
    return result
  }
}
