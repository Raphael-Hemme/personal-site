import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import searchIndex from '../../../../assets/search-index.json';
import { IoGardenExperimentMetaData, IoGardenService } from '../io-garden-service/io-garden.service';
import { BlogPostMetaData, BlogService } from '../blog-service/blog.service';

export interface SearchIndexEntry {
  searchTerm: string;
  searchResults: SearchResult[];
};

export interface SearchResult {
  file: string; 
  line: number;
}

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private searchComponentIsVisible$$ = new BehaviorSubject<boolean>(false);
  public searchComponentIsVisible$ = this.searchComponentIsVisible$$.asObservable();

  private searchIndexArr: SearchIndexEntry[] = searchIndex as SearchIndexEntry[];

  private searchResults$$ = new BehaviorSubject<SearchIndexEntry[]>([]);
  public searchResults$ = this.searchResults$$.asObservable();

  constructor(
    private readonly ioGardenService: IoGardenService,
    private readonly blogService: BlogService
  ) { }

  public search(searchTerm: string): void {
    if (searchTerm) {
      const searchResults = this.searchIndexArr.filter(el => {
        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        const lowerCaseElSearchTerm = el.searchTerm.toLowerCase();
        return el.searchTerm.includes(searchTerm) || lowerCaseElSearchTerm.includes(lowerCaseSearchTerm);
      });
      this.searchResults$$.next(searchResults);
    } else {
      this.searchResults$$.next([]);
    }
  }

  public getPreviewMetaData(currFilePath: string): IoGardenExperimentMetaData | BlogPostMetaData | null {
    const id = currFilePath
      .replace('./', '')
      .split('/')[1]
      .replace('.md', '')

    if (currFilePath.includes('io-garden')) {
      const cleanedIoGardenId = id.replace('-description', '');
      return this.ioGardenService.getIoGardenMetaDataById(cleanedIoGardenId);
    } else {
      return this.blogService.getBlogPostMetaDataById(id);
    }
  }
  
  public resetSearchResults(): void {
    this.searchResults$$.next([]);
  }
  
  public openSearch(): void {
    this.searchComponentIsVisible$$.next(true);
  }
  
  public closeSearch(): void {
    this.searchComponentIsVisible$$.next(false);
    this.resetSearchResults();
  }

  public toggleSearchComponentIsVisible() {
    this.searchComponentIsVisible$$.next(!this.searchComponentIsVisible$$.value);
  }
}
