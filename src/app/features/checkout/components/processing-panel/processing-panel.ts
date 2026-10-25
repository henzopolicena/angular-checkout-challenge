import { Component, input } from '@angular/core';
import { LucideLoaderCircle, LucideLock } from '@lucide/angular';

import { NEXO_PRO } from '@core/constants/nexo-pro';
import { PAYMENT_METHOD_LABEL, type PaymentMethod } from '@shared/models/checkout.model';
import { formatBrl, type CardBrand } from '@shared/utils/card';

@Component({
  selector: 'app-processing-panel',
  imports: [LucideLoaderCircle, LucideLock],
  templateUrl: './processing-panel.html',
})
export class ProcessingPanel {
  readonly method = input<PaymentMethod | null>(null);
  readonly brand = input<CardBrand | null>(null);
  readonly last4 = input<string | null>(null);

  protected readonly catalog = NEXO_PRO;
  protected readonly total = formatBrl(NEXO_PRO.amount);

  protected methodCaption(): string {
    const method = this.method();
    if (!method) {
      return '—';
    }

    const label = PAYMENT_METHOD_LABEL[method];
    const brand = this.brandLabel();
    const last4 = this.last4();

    if (method === 'pix' || !brand || !last4) {
      return label;
    }

    return `${label} · ${brand} •••• ${last4}`;
  }

  private brandLabel(): string | null {
    const brand = this.brand();
    if (brand === 'visa') {
      return 'Visa';
    }
    if (brand === 'mastercard') {
      return 'Mastercard';
    }
    return null;
  }
}
