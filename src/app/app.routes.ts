import { RouterFeature, Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { PoliciesComponent } from './policies/policies.component';

export const routes: Routes = [
  {
    path: '',
    title: 'Data Weather Hub',
    component: LandingComponent,
  },
  {
    path:'policies',
    loadComponent: () => import('./policies/policies.component').then((c) => c.PoliciesComponent),
    children: [
      {
        path: 'terms',
        title: 'Terminos y Condiciones de Uso',
        loadComponent: () => import('./policies/pages/terminos/terminos.component').then(c => c.TerminosComponent),
      },
      {
        path: 'privacy',
        title: 'Aviso de Privacidad',
        loadComponent: () => import('./policies/pages/privacy/privacy.component').then(c => c.PrivacyComponent),
      },
      {
        path: '**',
        redirectTo: 'terms'
      },
    ]
  },
  {
    path: 'map',
    title: 'Mapa',
    loadComponent: () =>import('./map/map.component').then(c => c.MapComponent)
  },
  {
    path:'**',
    redirectTo: ''
  }
];

