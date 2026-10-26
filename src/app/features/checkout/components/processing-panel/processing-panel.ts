import { NgOptimizedImage } from '@angular/common';
import { Component, input } from '@angular/core';
import { LucideCircleAlert, LucideLoaderCircle } from '@lucide/angular';

import { NEXO_PRO } from '@core/constants/nexo-pro';
import { paymentCaption, type PaymentMethod } from '@shared/models/checkout.model';
import { formatBrl, type CardBrand } from '@shared/utils/card';

@Component({
  selector: 'app-processing-panel',
  imports: [NgOptimizedImage, LucideCircleAlert, LucideLoaderCircle],
  templateUrl: './processing-panel.html',
})
export class ProcessingPanel {
  readonly method = input<PaymentMethod | null>(null);
  readonly brand = input<CardBrand | null>(null);
  readonly last4 = input<string | null>(null);

  protected readonly catalog = NEXO_PRO;
  protected readonly total = formatBrl(NEXO_PRO.amount);

  protected methodCaption(): string {
    return paymentCaption(this.method(), this.brand(), this.last4());
  }
}
