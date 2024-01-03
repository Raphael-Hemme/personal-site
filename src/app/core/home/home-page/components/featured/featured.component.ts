import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BlogPostMetaData } from 'src/app/shared/services/blog-service/blog.service';
import { IoGardenExperimentMetaData } from 'src/app/shared/services/io-garden-service/io-garden.service';
import { PreviewCardComponent } from 'src/app/shared/ui-components/preview-card/preview-card.component';

@Component({
  selector: 'app-featured',
  standalone: true,
  imports: [
    RouterLink,
    PreviewCardComponent,
  ],
  templateUrl: './featured.component.html',
  styleUrl: './featured.component.scss'
})
export class FeaturedComponent {

  @Input() public featuredContentMetaData!: BlogPostMetaData | IoGardenExperimentMetaData;
  @Output() refreshFeaturedBtnEvent = new EventEmitter();

  /**
 * Handles the refresh button click event by updating the featured IoGarden experiment and blog post.
 */
  public handleRefreshFeaturedBtn() {
    this.refreshFeaturedBtnEvent.emit();
  }
}
