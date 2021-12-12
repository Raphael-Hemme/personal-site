import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutPageComponent } from './about/about-page/about-page.component';
import { BlogPageComponent } from './blog/blog-page/blog-page.component';
import { IoGardenPageComponent } from './io-garden/io-garden-page/io-garden-page.component';
import { SharedModule } from '../shared/shared.module';
import { SplashScreenComponent } from './splash-screen/splash-screen.component';
import { MatButtonModule } from '@angular/material/button';

import { MarkdownModule } from 'ngx-markdown';
import { BlogPostPreviewComponent } from '../shared/ui-components/blog-post-preview/blog-post-preview.component';
import { BlogPostComponent } from '../shared/ui-components/blog-post/blog-post.component';
import { HomePageComponent } from './home/home-page/home-page.component';

@NgModule({
  declarations: [
    AboutPageComponent,
    BlogPageComponent,
    IoGardenPageComponent,
    SplashScreenComponent,
    BlogPostPreviewComponent,
    BlogPostComponent,
    HomePageComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatButtonModule,
    MarkdownModule
  ],
  exports: [
    SplashScreenComponent,
  ]
})
export class CoreModule { }
