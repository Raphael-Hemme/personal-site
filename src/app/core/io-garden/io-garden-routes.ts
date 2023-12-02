import { Routes } from '@angular/router';

export const IOGARDENROUTES: Routes = [
  { 
    path: 'te-a001', 
    loadComponent: () => import('./components/te-a001/te-a001.component')
      .then(x => x.TeA001Component)
  },
  { 
    path: 'cme-a001', 
    loadComponent: () => import('./components/cme-a001/cme-a001.component')
      .then(x => x.CmeA001Component)
  },
  { 
    path: 'le-a001', 
    loadComponent: () => import('./components/le-a001/le-a001.component')
      .then(x => x.LeA001Component) 
  },
  { 
    path: 'le-a002', 
    loadComponent: () => import('./components/le-a002/le-a002.component')
      .then(x => x.LeA002Component)
  },
  { 
    path: 'le-a003', 
    loadComponent: () => import('./components/le-a003/le-a003.component')
      .then(x => x.LeA003Component)
  },
  { 
    path: 'pce-a001', 
    loadComponent: () => import('./components/pce-a001/pce-a001.component')
      .then(x => x.PceA001Component) 
  },
  { 
    path: 'mae-a001', 
    loadComponent: () => import('./components/mae-a001/mae-a001.component')
      .then(x => x.MaeA001Component)
  },
  { 
    path: '**', 
    redirectTo: '**' 
  },
];