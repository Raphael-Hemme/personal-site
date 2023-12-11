import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { BlogPostMetaData } from '../../services/blog-service/blog.service';
import { IoGardenExperimentMetaData } from '../../services/io-garden-service/io-garden.service';
import { PreviewCardComponent } from '../preview-card/preview-card.component';
import { NgClass } from '@angular/common';
import { take, tap, timer } from 'rxjs';

@Component({
  selector: 'app-tag-result-list',
  standalone: true,
  imports: [ 
    NgClass,
    PreviewCardComponent 
  ],
  templateUrl: './tag-result-list.component.html',
  styleUrl: './tag-result-list.component.scss'
})
export class TagResultListComponent implements OnChanges {

  @Input() tagResultList: (BlogPostMetaData | IoGardenExperimentMetaData)[] = [];
  public tagResultListSelectivelyDelayed: (BlogPostMetaData | IoGardenExperimentMetaData)[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['tagResultList'].currentValue.length > 0) {
      this.calculateAndSetTagResultContainerHeight();
      this.tagResultListSelectivelyDelayed = this.tagResultList;
    } else {
      timer(300).pipe(
        take(1),
        tap(() => this.tagResultListSelectivelyDelayed = this.tagResultList)
      ).subscribe();
    }
  }

  /**
   * Calculates and sets the height of the tag result container CSS variable based on the number of rows
   * and the display type. If the display is mobile, the row count is the length of the array.
   * Otherwise, it is half the length of the array rounded up to the nearest integer.
   * @returns void
   */
  private calculateAndSetTagResultContainerHeight(): void {
    const isMobile = window.innerWidth <= 768;
    const rowHeight = isMobile ? 200 : 230;
    // if the display is mobile, then the row count is the length of the array, 
    // otherwise it is half the length of the array rounded up because there are two columns and we get half the number of rows 
    // but we need to round up to get the correct number of rows for odd lengths.
    const rowCount = isMobile ? this.tagResultList.length : Math.ceil(this.tagResultList.length / 2);
    const tagResultContainerHeight = rowCount * rowHeight + 4 + ((rowCount - 1) * 10)
    document.documentElement.style.setProperty('--tag-result-container-height', `${tagResultContainerHeight}px`);
  }
}
