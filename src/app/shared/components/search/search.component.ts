import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs';
import { SearchIndexEntry, SearchService } from 'src/app/shared/services/search-service/search.service';
import { HostListener } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SearchComponent implements OnInit, AfterViewInit, OnDestroy {

  public searchInputValue= '';
  public searchResults: SearchIndexEntry[] = [];

  private subscriptions: Subscription = new Subscription();

  @HostListener('document:keydown.escape') escKeydownHandler() {
    this.closeSearch();
  }

  @ViewChild('searchInput') searchInput!: HTMLInputElement;

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

  ngAfterViewInit(): void {
    this.searchInput.focus();
    this.searchInput.select();
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
