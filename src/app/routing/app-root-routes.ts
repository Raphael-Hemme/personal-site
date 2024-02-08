import { Routes } from '@angular/router';

export const ROOTROUTES: Routes = [
  { 
    path: 'about', 
    loadComponent: () => import('../core/about/about-page/about-page.component')
      .then(x => x.AboutPageComponent),
    data: { preload: true }
  },
  { 
    path: 'privacy-policy', 
    loadComponent: () => import('../core/privacy-policy/privacy-policy.component')
      .then(x => x.PrivacyPolicyComponent),
    data: { preload: true }
  },
  { 
    path: 'legal-notice', 
    loadComponent: () => import('../core/legal-notice/legal-notice.component')
      .then(x => x.LegalNoticeComponent),
    data: { preload: true }
  },
  { 
    path: 'blog', 
    loadComponent: () => import('../core/blog/blog-page/blog-page.component')
      .then(x => x.BlogPageComponent),
    data: { preload: true }
  },
  { 
    path: 'blog/post/:id', 
    loadComponent: () => import('../shared/ui-components/blog-post/blog-post.component')
      .then(x => x.BlogPostComponent),
    data: { preload: false }
  },
  { 
    path: 'io-garden', 
    loadComponent: () => import('../core/io-garden/io-garden-page/io-garden-page.component')
      .then(x => x.IoGardenPageComponent),
    data: { preload: true }
  },
  { 
    path: 'io-garden/experiment', 
    loadComponent: () => import('../shared/ui-components/io-garden-experiment-container/io-garden-experiment-container.component')
      .then(x => x.IoGardenExperimentContainerComponent),
    loadChildren: () => import('./io-garden-routes').then(x => x.IOGARDENROUTES),
    data: { preload: false }
  },
  { 
    path: '',
    loadComponent: () => import('../core/home/home-page/home-page.component')
      .then(x => x.HomePageComponent),
    data: { preload: true }
  },
  { 
    path: '**',
    loadComponent: () => import('../shared/components/page-not-found/page-not-found.component')
      .then(x => x.PageNotFoundComponent),
    data: { preload: false }
  }
];