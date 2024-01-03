import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BlogPostMetaData, BlogService } from 'src/app/shared/services/blog-service/blog.service';
import { IoGardenExperimentMetaData, IoGardenService } from 'src/app/shared/services/io-garden-service/io-garden.service';
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
export class FeaturedComponent implements OnInit {

  public featuredBlogPost!: BlogPostMetaData;
  public featuredIoGardenExperiment!: IoGardenExperimentMetaData;

  constructor(
    private ioGardenService: IoGardenService,
    private blogService: BlogService,
  ) { }

  ngOnInit(): void {
    this.featuredIoGardenExperiment = this.ioGardenService.getRandomIoGardenExperimentMetaData();
    this.featuredBlogPost = this.blogService.getRandomBlogPostMetaData();
  }

    /**
   * Handles the refresh button click event by updating the featured IoGarden experiment and blog post.
   */
    public handleRefreshFeaturedBtn() {
      this.featuredIoGardenExperiment = this.ioGardenService.getRandomIoGardenExperimentMetaData();
      this.featuredBlogPost = this.blogService.getRandomBlogPostMetaData();
    }

}
