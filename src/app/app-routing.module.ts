import { Routes } from '@angular/router';

export const AppRoutes: Routes = [
  { path: '', loadChildren: () => import('./views/views.module').then(m => m.ViewsModule) },
];