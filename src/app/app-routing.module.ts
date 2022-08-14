import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutPageComponent } from './core/about/about-page/about-page.component';
import { BlogPageComponent } from './core/blog/blog-page/blog-page.component';
import { HomePageComponent } from './core/home/home-page/home-page.component';
import { IoGardenPageComponent } from './core/io-garden/io-garden-page/io-garden-page.component';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import { BlogPostComponent } from './shared/ui-components/blog-post/blog-post.component';
import { IoGardenExperimentContainerComponent } from './shared/ui-components/io-garden-experiment-container/io-garden-experiment-container.component';

// IO-GARDEN EXPERIMENT COMPONENTS
import { CmeA001Component } from './core/io-garden/components/cme-a001/cme-a001.component';
import { LeA001Component } from './core/io-garden/components/le-a001/le-a001.component';
import { LeA002Component } from './core/io-garden/components/le-a002/le-a002.component';
import { MaeA001Component } from './core/io-garden/components/mae-a001/mae-a001.component';
import { PceA001Component } from './core/io-garden/components/pce-a001/pce-a001.component';
import { TeA001Component } from './core/io-garden/components/te-a001/te-a001.component';


const routes: Routes = [
  { path: 'about', component: AboutPageComponent},
  { path: 'blog', component: BlogPageComponent},
  { path: 'blog/post/:id', component: BlogPostComponent },
  { path: 'io-garden', component: IoGardenPageComponent},
  { path: 'io-garden/experiment', component: IoGardenExperimentContainerComponent,
    children: [
      /* { path: '', redirectTo: 'overview', pathMatch: 'full' }, */
      { path: 'te-a001', component: TeA001Component },
      { path: 'cme-a001', component: CmeA001Component },
      { path: 'le-a001', component: LeA001Component },
      { path: 'le-a002', component: LeA002Component },
      { path: 'le-a003', component: LeA002Component },
      { path: 'pce-a001', component: PceA001Component },
      { path: 'mae-a001', component: MaeA001Component },
      // { path: '**', component: PageNotFoundComponent}
      { path: '**', redirectTo: '**' },
    ]
  },
  { path: '', component: HomePageComponent},
  { path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
