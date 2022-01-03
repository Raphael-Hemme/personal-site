import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BlogPostMetaData, BlogService } from 'src/app/shared/services/blog-service/blog.service';
import { IoGardenExperimentMetaData, IoGardenService } from 'src/app/shared/services/io-garden-service/io-garden.service';
import { SplashScreenService } from 'src/app/shared/services/splash-screen-service/splash-screen.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  private subscriptions: Subscription = new Subscription()

  public featuredBlogPost: BlogPostMetaData = {
    'id': '',
    'title': '',
    'subtitle': '',
    'dateOriginal': '',
    'dateLastEdited': '',
    'state': 0,
    'postPath': '',
    'previewImageUrl': '',
    'tags': []
  };

  public featuredIoGardenExperiment: IoGardenExperimentMetaData = {
    'id': '',
    'title': '',
    'subtitle': '',
    'abstract': '',
    'descriptionUrl': '',
    'dateOriginal': '',
    'dateLastEdited': '',
    'state': 0,
    'selector': '',
    'previewImageUrl': '',
    'tags': []
  };

  constructor(
    private splashScreenService: SplashScreenService,
    private ioGardenService: IoGardenService,
    private blogService: BlogService
  ) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.splashScreenService.splashScreenTimer$.subscribe(next => {
        this.splashScreenService.splashScreenStatus.next('off');
      })
    )

    this.featuredIoGardenExperiment = this.ioGardenService.getRandomIoGardenExperimentMetaData();
    this.featuredBlogPost = this.blogService.getRandomBlogPostMetaData();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
