import { Routes } from '@angular/router';

export const ROOTROUTES: Routes = [
  { 
    path: 'about', 
    loadComponent: () => import('./core/about/about-page/about-page.component')
      .then(x => x.AboutPageComponent),
  },
  { 
    path: 'blog', 
    loadComponent: () => import('./core/blog/blog-page/blog-page.component')
      .then(x => x.BlogPageComponent)
  },
  { 
    path: 'blog/post/:id', 
    loadComponent: () => import('./shared/ui-components/blog-post/blog-post.component')
      .then(x => x.BlogPostComponent)
  },
  { 
    path: 'io-garden', 
    loadComponent: () => import('./core/io-garden/io-garden-page/io-garden-page.component')
      .then(x => x.IoGardenPageComponent)
  },
  { 
    path: 'io-garden/experiment', 
    loadComponent: () => import('./shared/ui-components/io-garden-experiment-container/io-garden-experiment-container.component')
      .then(x => x.IoGardenExperimentContainerComponent),
    loadChildren: () => import('./core/io-garden/io-garden-routes').then(x => x.IOGARDENROUTES)
    
  },
  { 
    path: '',
    loadComponent: () => import('./core/home/home-page/home-page.component')
      .then(x => x.HomePageComponent)
  },
  { 
    path: '**',
    loadComponent: () => import('./shared/components/page-not-found/page-not-found.component')
      .then(x => x.PageNotFoundComponent)
  }
];