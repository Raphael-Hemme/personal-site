import { Component, Input, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { BlogPostMetaData } from '../../services/blog-service/blog.service';
import { IoGardenExperimentMetaData } from '../../services/io-garden-service/io-garden.service';
import { PreviewCardComponent } from '../preview-card/preview-card.component';
import { NgClass } from '@angular/common';

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

  ngOnChanges(changes: SimpleChanges): void {
    console.log('changes: ', changes)
    if (changes['tagResultList'].currentValue.length > 0) {
      const isMobile = window.innerWidth < 768;
      const rowHeight = isMobile ? 200 : 230;
      const rowCount = isMobile ? this.tagResultList.length : Math.ceil(this.tagResultList.length / 2);
      document.documentElement.style.setProperty('--row-count', `${rowCount}` );

      const tagResultContainerHeight = rowCount * rowHeight + 2 + ((rowCount - 1) * 10)
      document.documentElement.style.setProperty('--tag-result-container-height', `${tagResultContainerHeight}px`);

      console.log('rowCount from variable', document.documentElement.style.getPropertyValue("--row-count"));
      console.log('--tag-result-container-height', document.documentElement.style.getPropertyValue("--tag-result-container-height"))
    } else {
      // document.documentElement.style.setProperty("--row-count", `0` );
      //console.log('rowCount from variable', document.documentElement.style.getPropertyValue("--row-count"));

    }
  }
}
