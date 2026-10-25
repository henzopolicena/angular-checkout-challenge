import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./layout/guest/guest').then((m) => m.Guest),
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'checkout' },
      {
        path: 'checkout',
        loadComponent: () => import('./features/checkout/checkout').then((m) => m.Checkout),
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./features/checkout/payment/payment').then((m) => m.Payment),
          },
          {
            path: 'success',
            loadComponent: () =>
              import('./features/checkout/checkout-success/checkout-success').then(
                (m) => m.CheckoutSuccess,
              ),
          },
          {
            path: 'error',
            loadComponent: () =>
              import('./features/checkout/checkout-error/checkout-error').then(
                (m) => m.CheckoutError,
              ),
          },
        ],
      },
    ],
  },
];
