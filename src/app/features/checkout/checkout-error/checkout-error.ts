import { NgOptimizedImage } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { LucideCircleAlert, LucideMessageCircle, LucideRefreshCw } from '@lucide/angular';

import { NEXO_PRO } from '@core/constants/nexo-pro';
import { paymentCaption } from '@shared/models/checkout.model';
import { formatBrl } from '@shared/utils/card';

import { CheckoutStore } from '../checkout-store';

@Component({
  selector: 'app-checkout-error',
  imports: [NgOptimizedImage, LucideCircleAlert, LucideMessageCircle, LucideRefreshCw],
  templateUrl: './checkout-error.html',
})
export class CheckoutError {
  private readonly store = inject(CheckoutStore);
  private readonly router = inject(Router);

  protected readonly catalog = NEXO_PRO;
  protected readonly snapshot = this.store.snapshot;
  protected readonly total = formatBrl(NEXO_PRO.amount);

  protected readonly caption = computed(() => {
    const current = this.snapshot();
    return paymentCaption(current.method, current.brand, current.last4);
  });

  protected retry(): void {
    this.store.retry();
    void this.router.navigateByUrl('/checkout');
  }

  protected chooseOtherMethod(): void {
    this.store.chooseOtherMethod();
    void this.router.navigateByUrl('/checkout');
  }
}
