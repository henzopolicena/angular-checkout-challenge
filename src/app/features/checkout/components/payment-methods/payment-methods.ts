import { NgOptimizedImage } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { LucideCreditCard, LucideWallet } from '@lucide/angular';

import { PAYMENT_METHOD_LABEL, type PaymentMethod } from '@shared/models/checkout.model';

@Component({
  selector: 'app-payment-methods',
  imports: [NgOptimizedImage, LucideCreditCard, LucideWallet],
  templateUrl: './payment-methods.html',
  host: { class: 'block' },
})
export class PaymentMethods {
  readonly method = input.required<PaymentMethod | null>();
  readonly selectMethod = output<PaymentMethod>();

  protected readonly options = (['credit', 'debit', 'pix'] as const).map((id) => ({
    id,
    label: PAYMENT_METHOD_LABEL[id],
  }));
}
