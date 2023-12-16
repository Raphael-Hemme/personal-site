import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { BlogPostMetaData } from '../../services/blog-service/blog.service';
import { IoGardenExperimentMetaData } from '../../services/io-garden-service/io-garden.service';
import { PreviewCardComponent } from '../preview-card/preview-card.component';
import { NgClass } from '@angular/common';
import { take, tap, timer } from 'rxjs';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-tag-result-list',
  templateUrl: './tag-result-list.component.html',
  styleUrl: './tag-result-list.component.scss',
  standalone: true,
  imports: [ 
    NgClass,
    PreviewCardComponent 
  ],
  animations: [
    trigger('fadeInOut', [
      state('enter', style({ 
        opacity: 1,
      })),
      state('leave', style({ 
        opacity: 0,
      })),
      transition('enter => leave', [
        animate(150)
      ]),
      transition('leave => enter', [
        animate(300)
      ])
    ])
  ]
})
export class TagResultListComponent implements OnChanges {

  @Input() tagResultList: (BlogPostMetaData | IoGardenExperimentMetaData)[] = [];
  public tagResultListSelectivelyDelayed: (BlogPostMetaData | IoGardenExperimentMetaData)[] = [];
  public tagResultEntryIsVisible = false;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['tagResultList'].currentValue.length > 0) {
      console.log('tagResultList filled -- setting tagResultEntryIsVisible to true');

      this.tagResultEntryIsVisible = true;
      this.tagResultListSelectivelyDelayed = this.tagResultList;
    } else {
      console.log('tagResultList is empty -- setting tagResultEntryIsVisible to false');
      this.tagResultEntryIsVisible = false;
      timer(500).pipe(
        take(1),
        tap(() => this.tagResultListSelectivelyDelayed = this.tagResultList)
      ).subscribe();
    }
  }
}
