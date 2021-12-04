import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutPageComponent } from './about/about-page/about-page.component';
import { BlogPageComponent } from './blog/blog-page/blog-page.component';
import { IoGardenPageComponent } from './io-garden/io-garden-page/io-garden-page.component';
import { SharedModule } from '../shared/shared.module';
import { SplashScreenComponent } from './splash-screen/splash-screen.component';


@NgModule({
  declarations: [
    AboutPageComponent,
    BlogPageComponent,
    IoGardenPageComponent,
    SplashScreenComponent,
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    SplashScreenComponent,
  ]
})
export class CoreModule { }
