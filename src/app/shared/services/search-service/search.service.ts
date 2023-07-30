import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import searchIndex from '../../../../assets/search-index.json';

export interface SearchIndexEntry {
  searchTerm: string;
  searchResults: { file: string; line: number; }[];
};

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private searchComponentIsVisible$$ = new BehaviorSubject<boolean>(false);
  public searchComponentIsVisible$ = this.searchComponentIsVisible$$.asObservable();

  private searchIndexArr: SearchIndexEntry[] = searchIndex as SearchIndexEntry[];

  private searchResults$$ = new BehaviorSubject<SearchIndexEntry[]>([]);
  public searchResults$ = this.searchResults$$.asObservable();

  constructor() { }

  public toggleSearchComponentIsVisible() {
    this.searchComponentIsVisible$$.next(!this.searchComponentIsVisible$$.value);
  }

  public search(searchTerm: string): any {
    const searchResults = this.searchIndexArr.filter(el => el.searchTerm.includes(searchTerm));
    // console.log('results', searchResults);
    this.searchResults$$.next(searchResults);
    return searchResults;
  }
}
