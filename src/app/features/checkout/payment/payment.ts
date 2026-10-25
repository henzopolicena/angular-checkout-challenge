import { Component, computed, inject, signal } from '@angular/core';
import { form, submit } from '@angular/forms/signals';
import { Router } from '@angular/router';
import { LucideLock } from '@lucide/angular';

import { NEXO_PRO } from '@core/constants/nexo-pro';
import { type PaymentMethod } from '@shared/models/checkout.model';
import { detectBrand, digitsOnly, formatBrl } from '@shared/utils/card';

import { cardFormSchema, type CardFormValue } from '../card.schema';
import { CheckoutStore } from '../checkout-store';
import { CardFields } from '../components/card-fields/card-fields';
import { OrderSummary } from '../components/order-summary/order-summary';
import { PaymentMethods } from '../components/payment-methods/payment-methods';
import { PixPanel } from '../components/pix-panel/pix-panel';
import { ProcessingPanel } from '../components/processing-panel/processing-panel';

@Component({
  selector: 'app-payment',
  imports: [CardFields, LucideLock, OrderSummary, PaymentMethods, PixPanel, ProcessingPanel],
  templateUrl: './payment.html',
})
export class Payment {
  protected readonly store = inject(CheckoutStore);
  private readonly router = inject(Router);

  protected readonly snapshot = this.store.snapshot;
  protected readonly pixCode = NEXO_PRO.pixCopyPaste;
  protected readonly total = formatBrl(NEXO_PRO.amount);

  private readonly cardModel = signal<CardFormValue>({
    number: '',
    holder: '',
    expiry: '',
    cvv: '',
  });

  protected readonly cardForm = form(this.cardModel, cardFormSchema);

  protected readonly cardTitle = computed(() =>
    this.snapshot().method === 'debit' ? 'Cartão de débito' : 'Cartão de crédito',
  );

  protected readonly brandSrc = computed(() => {
    const brand = detectBrand(digitsOnly(this.cardModel().number));
    if (brand === 'visa') {
      return 'visa-mark.svg';
    }
    if (brand === 'mastercard') {
      return 'mastercard-mark.svg';
    }
    return null;
  });

  protected readonly showFormError = computed(() => {
    const root = this.cardForm();
    return root.invalid() && (root.touched() || root.dirty());
  });

  protected onSelectMethod(method: PaymentMethod): void {
    this.store.selectMethod(method);
  }

  protected onPay(event: Event): void {
    event.preventDefault();
    void submit(this.cardForm, async () => {
      const method = this.store.snapshot().method;
      if (method !== 'credit' && method !== 'debit') {
        return;
      }

      const result = await this.store.payWithCard(method, this.cardModel().number);
      await this.navigateResult(result);
    });
  }

  protected async onPixComplete(): Promise<void> {
    const result = await this.store.payWithPix();
    await this.navigateResult(result);
  }

  private async navigateResult(result: 'success' | 'error' | null): Promise<void> {
    if (result === 'success') {
      await this.router.navigateByUrl('/checkout/success');
      return;
    }

    if (result === 'error') {
      await this.router.navigateByUrl('/checkout/error');
    }
  }
}
