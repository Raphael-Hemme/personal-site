import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BlogPostMetaData, BlogService } from '../blog-service/blog.service';
import { IoGardenExperimentMetaData, IoGardenService } from '../io-garden-service/io-garden.service';
import { isNumber, orderBy } from 'lodash-es';

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
    console.log(tag);
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

    const uniqueRestultArr = [...new Set(resultArr)];

    return orderBy(uniqueRestultArr, 'phase' ,'desc');
  }

  public getResultCountForTag(tag: string): number {
    const result = this.blogService.getBlogPostCountByTag(tag) + this.ioGardenService.getIoGardenExperimentCountByTag(tag);
    if (!result || isNaN(result)) {
      return 0;
    } else {
      return result;
    }
  }
}
