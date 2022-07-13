import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutPageComponent } from './about/about-page/about-page.component';
import { BlogPageComponent } from './blog/blog-page/blog-page.component';
import { IoGardenPageComponent } from './io-garden/io-garden-page/io-garden-page.component';
import { SharedModule } from '../shared/shared.module';
// import { SplashScreenComponent } from './splash-screen/splash-screen.component';

import { MarkdownModule } from 'ngx-markdown';
import { PreviewCardComponent } from '../shared/ui-components/preview-card/preview-card.component';
import { BlogPostComponent } from '../shared/ui-components/blog-post/blog-post.component';
import { HomePageComponent } from './home/home-page/home-page.component';
import { TeA001Component } from './io-garden/components/te-a001/te-a001.component';
import { CmeA001Component } from './io-garden/components/cme-a001/cme-a001.component';
import { LeA001Component } from './io-garden/components/le-a001/le-a001.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LeA002Component } from './io-garden/components/le-a002/le-a002.component';
import { PceA001Component } from './io-garden/components/pce-a001/pce-a001.component';

@NgModule({
  declarations: [
    AboutPageComponent,
    BlogPageComponent,
    IoGardenPageComponent,
    // SplashScreenComponent,
    PreviewCardComponent,
    BlogPostComponent,
    HomePageComponent,
    TeA001Component,
    CmeA001Component,
    LeA001Component,
    LeA002Component,
    PceA001Component,
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    MarkdownModule,
    RouterModule
  ],
  exports: [
    // SplashScreenComponent,
  ]
})
export class CoreModule { }
