import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BlogPostMetaData, BlogService } from '../blog-service/blog.service';
import { IoGardenExperimentMetaData, IoGardenService } from '../io-garden-service/io-garden.service';
import { orderBy } from 'lodash-es';

export interface TagInfoObj {
  name: string;
  isActive: boolean;
  count: number;
}

@Injectable({
  providedIn: 'root'
})
export class TagMappingService {

  private selectedTags$$ = new BehaviorSubject<string[]>([]);
  public selectedTags$ = this.selectedTags$$.asObservable();

  private tagSelectionResults$$ = new BehaviorSubject<(BlogPostMetaData | IoGardenExperimentMetaData)[]>([]);
  public tagSelectionResults$ = this.tagSelectionResults$$.asObservable();

  constructor(
    private readonly blogService: BlogService,
    private readonly ioGardenService: IoGardenService
  ) { }

  /**
   * Handles the selection of a tag by filtering the blog posts and experiments based on the selected tag.
   * If the same tag is selected twice, the filter is reset.
   * @param tag - The tag to filter by.
   */
  public toggleSelectionOfTag(tag: string): void {
    if (this.selectedTags$$.value.includes(tag)) {
      const currSelectedTags = this.selectedTags$$.value
        .filter((selectedTag: string) => selectedTag !== tag);
      this.selectedTags$$.next(currSelectedTags);
    } else {
      const currSelectedTags = this.selectedTags$$.value
        .slice();
      currSelectedTags.push(tag);
      this.selectedTags$$.next(currSelectedTags);
    }

    const currResultList = this.retrieveUniqueResultListForAllSelectedTags(this.selectedTags$$.value);
    this.tagSelectionResults$$.next(currResultList);
  }

  /**
   * Returns a list of results for all selected tags but eliminates duplicate matches.
   * @param selectedTags - An array of selected tags.
   * @returns An array of unique results for all selected tags.
   */
  private retrieveUniqueResultListForAllSelectedTags(
    selectedTags: string[]
  ): (BlogPostMetaData | IoGardenExperimentMetaData)[] {
    const resultArr: (BlogPostMetaData | IoGardenExperimentMetaData)[] = [];
    
    for (const tag of selectedTags){
      const iterationResultArr = [
        ...this.blogService.getBlogPostsByTag(tag),
        ...this.ioGardenService.getIoGardenExperimentsByTag(tag)
      ]
      resultArr.push(...iterationResultArr);
    };

    // Remove duplicates by converting to a set (which only accepts one instance 
    // of each entry) and back to an array.
    const uniqueRestultArr = [...new Set(resultArr)];

    return orderBy(uniqueRestultArr, 'phase' ,'desc');
  }

  /**
   * Returns the total count of results for a given tag.
   * @param tag - The tag to get the result count for.
   * @returns The total count of results for the given tag.
   */
  public getResultCountForTag(tag: string): number {
    const result = this.blogService.getBlogPostCountByTag(tag) + this.ioGardenService.getIoGardenExperimentCountByTag(tag);
    if (!result || isNaN(result)) {
      return 0;
    } else {
      return result;
    }
  }

  /**
   * Resets the tag selection by clearing the selected tags and tag selection results.
   */
  public resetTagSelection(): void {
    this.selectedTags$$.next([]);
    this.tagSelectionResults$$.next([]);
  }
}
