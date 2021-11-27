import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutPageComponent } from './core/about/about-page/about-page.component';
import { BlogPageComponent } from './core/blog/blog-page/blog-page.component';
import { DigitalGardenPageComponent } from './core/digital-garden/digital-garden-page/digital-garden-page.component';

const routes: Routes = [
  {path: 'about', component: AboutPageComponent},
  {path: 'blog', component: BlogPageComponent},
  {path: 'io-garden', component: DigitalGardenPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
