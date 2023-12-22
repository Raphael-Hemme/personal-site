import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { BlogPostMetaData } from '../../services/blog-service/blog.service';
import { IoGardenExperimentMetaData } from '../../services/io-garden-service/io-garden.service';
import { PreviewCardComponent } from '../preview-card/preview-card.component';
import { NgClass } from '@angular/common';
import { take, tap, timer } from 'rxjs';

@Component({
  selector: 'app-tag-result-list',
  templateUrl: './tag-result-list.component.html',
  styleUrl: './tag-result-list.component.scss',
  standalone: true,
  imports: [ 
    NgClass,
    PreviewCardComponent 
  ],
})
export class TagResultListComponent implements OnChanges {

  @Input() tagResultList: (BlogPostMetaData | IoGardenExperimentMetaData)[] = [];
  public tagResultListSelectivelyDelayed: (BlogPostMetaData | IoGardenExperimentMetaData)[] = [];
  public tagResultEntryIsVisible = false;
  public tagResultListIsOpen = false;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['tagResultList'].currentValue.length > 0) {
      this.tagResultListSelectivelyDelayed = this.tagResultList;
      this.tagResultListIsOpen = true;
      timer(0).pipe(
        take(1),
        tap(() => this.tagResultEntryIsVisible = true)
      ).subscribe();
    } else {
      this.tagResultEntryIsVisible = false;
      timer(500).pipe(
        take(1),
        tap(() => {
          this.tagResultListSelectivelyDelayed = this.tagResultList
          this.tagResultListIsOpen = false;
        })
      ).subscribe();
    }
  }
}
