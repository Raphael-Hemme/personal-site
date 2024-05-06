import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import searchIndex from '../../../../assets/search-index.json';
import { IoGardenExperimentMetaData, IoGardenService } from '../io-garden-service/io-garden.service';
import { BlogPostMetaData, BlogService } from '../blog-service/blog.service';

import { decompressSync } from 'fflate';

export interface SearchIndexEntry {
  searchTerm: string;
  searchResults: SearchResult[];
};

export interface SearchResult {
  file: string; 
  filePathForDisplay: string;
  line: number;
}

export interface ReducedSearchResult extends SearchResult {
  count: number;
}

export interface ReducedSearchIndexEntry {
  searchTerm: string;
  searchResults: ReducedSearchResult[];
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

  private reducedSearchResults$$ = new BehaviorSubject<ReducedSearchIndexEntry[]>([]);
  public reducedSearchResults$ = this.reducedSearchResults$$.asObservable();

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

      const searchResultsForDisplay = searchResults.map(el => {
        return {
          searchTerm: el.searchTerm,
          searchResults: el.searchResults.map(searchResult => {
            return {
              ...searchResult,
              filePathForDisplay: this.abbreviateFilePath(searchResult.file)
            }
          })
        }
      });

      this.searchResults$$.next(searchResultsForDisplay);
      this.reducedSearchResults$$.next(this.reduceSearchResults(searchResultsForDisplay));
    } else {
      this.searchResults$$.next([]);
      this.reducedSearchResults$$.next([]);
    }
  }

  public getPreviewMetaData(currFilePath: string): IoGardenExperimentMetaData | BlogPostMetaData | null {
    const filePathFragmentsArr = currFilePath.split('/');
    const id = filePathFragmentsArr[filePathFragmentsArr.length - 1].replace('.md', '');
    
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

  private reduceSearchResults(searchResults: SearchIndexEntry[]): ReducedSearchIndexEntry[] {
    return searchResults.map(el => {
      return {
        searchTerm: el.searchTerm,
        searchResults: this.reduceSearchResultsByFile(el.searchResults)
      }
    });
  }

  private reduceSearchResultsByFile(acc: SearchResult[]): ReducedSearchResult[] {
    const reducedSearchResults: ReducedSearchResult[] = [];
    acc.forEach(el => {
      const idx = reducedSearchResults.findIndex(reducedEl => reducedEl.file === el.file);
      if (idx === -1) {
        reducedSearchResults.push({ ...el, count: 1 });
      } else {
        reducedSearchResults[idx].count++;
      }
    });
    return reducedSearchResults;
  }

  private abbreviateFilePath(filePath: string): string {
    const MAX_LENGTH = 40;
    if (filePath.length > MAX_LENGTH) {
      return '...' + filePath.slice(filePath.length - MAX_LENGTH);
    } else {
      return filePath;
    }
  }

  public async unzipSearchIndex(): Promise<any[]> {
    const compressed = new Uint8Array(
      // @ts-ignore
      await fetch('/assets/search-index.gz').then(res => res.arrayBuffer())
    );
    const decompressed = decompressSync(compressed);
    const decompressedStr = new TextDecoder().decode(decompressed);
    const data = JSON.parse(decompressedStr);
    console.log(data[0]);
    return data;
  }
}
