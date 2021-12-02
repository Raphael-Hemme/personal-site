import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutPageComponent } from './core/about-page/about-page.component';
import { BlogPageComponent } from './core/blog-page/blog-page.component';
import { IoGardenPageComponent } from './core/io-garden-page/io-garden-page.component';


const routes: Routes = [
  {path: 'about', component: AboutPageComponent},
  {path: 'blog', component: BlogPageComponent},
  {path: 'io-garden', component: IoGardenPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
