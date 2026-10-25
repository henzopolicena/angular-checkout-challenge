import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./guest/guest').then((m) => m.Guest),
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'checkout' },
      {
        path: 'checkout',
        loadComponent: () => import('./checkout/checkout').then((m) => m.Checkout),
        children: [
          {
            path: '',
            loadComponent: () => import('./checkout/payment').then((m) => m.Payment),
          },
          {
            path: 'success',
            loadComponent: () => import('./checkout/checkout-success').then((m) => m.CheckoutSuccess),
          },
          {
            path: 'error',
            loadComponent: () => import('./checkout/checkout-error').then((m) => m.CheckoutError),
          },
        ],
      },
    ],
  },
];
