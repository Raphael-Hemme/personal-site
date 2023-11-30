import { Routes } from '@angular/router';

export const rootRoutes: Routes = [
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
    children: [
      { 
        path: 'te-a001', 
        loadComponent: () => import('./core/io-garden/components/te-a001/te-a001.component')
          .then(x => x.TeA001Component)
      },
      { 
        path: 'cme-a001', 
        loadComponent: () => import('./core/io-garden/components/cme-a001/cme-a001.component')
          .then(x => x.CmeA001Component)
      },
      { 
        path: 'le-a001', 
        loadComponent: () => import('./core/io-garden/components/le-a001/le-a001.component')
          .then(x => x.LeA001Component) 
      },
      { 
        path: 'le-a002', 
        loadComponent: () => import('./core/io-garden/components/le-a002/le-a002.component')
          .then(x => x.LeA002Component)
      },
      { 
        path: 'le-a003', 
        loadComponent: () => import('./core/io-garden/components/le-a003/le-a003.component')
          .then(x => x.LeA003Component)
      },
      { 
        path: 'pce-a001', 
        loadComponent: () => import('./core/io-garden/components/pce-a001/pce-a001.component')
          .then(x => x.PceA001Component) 
      },
      { 
        path: 'mae-a001', 
        loadComponent: () => import('./core/io-garden/components/mae-a001/mae-a001.component')
          .then(x => x.MaeA001Component)
      },
      { 
        path: '**', 
        redirectTo: '**' 
      },
    ]
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