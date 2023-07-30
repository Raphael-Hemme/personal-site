import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs';
import { SearchIndexEntry, SearchService } from 'src/app/shared/services/search-service/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SearchComponent implements OnInit, OnDestroy {

  public searchInputValue= '';
  public searchResults: SearchIndexEntry[] = [];

  private subscriptions: Subscription = new Subscription();

  constructor(
    private searchService: SearchService,
  ) { }

  ngOnInit(): void {
    this.subscriptions.add(
      this.searchService.searchResults$.subscribe((searchResults: SearchIndexEntry[]) => {
        this.searchResults = searchResults;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public closeSearch(): void {
    this.searchService.toggleSearchComponentIsVisible();
  }

  public preventUnwantedCloseEvent(event: Event): void {
    event.stopPropagation();
    return;
  }

  public handleInputChanges(event: string): void {
    console.log('handleSearchInput() event: ', event);
    this.searchService.search(event);
  }
}
