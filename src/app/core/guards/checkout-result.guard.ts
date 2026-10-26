import { inject } from '@angular/core';
import { type CanActivateFn, Router } from '@angular/router';

import { CheckoutStore } from '@features/checkout/checkout-store';

export function checkoutResultGuard(expected: 'success' | 'error'): CanActivateFn {
  return () => {
    const store = inject(CheckoutStore);
    const router = inject(Router);
    return store.snapshot().status === expected
      ? true
      : router.createUrlTree(['/checkout']);
  };
}
