import { Component, Input } from '@angular/core';
import { BlogPostMetaData } from '../../services/blog-service/blog.service';
import { IoGardenExperimentMetaData } from '../../services/io-garden-service/io-garden.service';
import { PreviewCardComponent } from '../preview-card/preview-card.component';

@Component({
  selector: 'app-tag-result-list',
  standalone: true,
  imports: [ PreviewCardComponent ],
  templateUrl: './tag-result-list.component.html',
  styleUrl: './tag-result-list.component.scss'
})
export class TagResultListComponent {

  @Input() tagResultList: (BlogPostMetaData | IoGardenExperimentMetaData)[] = [];
}
