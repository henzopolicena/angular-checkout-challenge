import { Service, computed, inject, signal } from '@angular/core';

import { NEXO_PRO } from '@core/constants/nexo-pro';
import { PaymentSimulator, type SimulationOutcome } from '@core/services/payment-simulator';
import {
  type CheckoutSnapshot,
  type PaymentMethod,
} from '@shared/models/checkout.model';
import { detectBrand, digitsOnly, last4Of } from '@shared/utils/card';

const CARD_DECLINED_REASON = 'Cartão não autorizado';

const initialSnapshot: CheckoutSnapshot = {
  status: 'idle',
  method: 'credit',
  brand: null,
  last4: null,
  errorReason: null,
  attemptedAt: null,
  amount: NEXO_PRO.amount,
  orderId: NEXO_PRO.orderId,
  receiptEmail: NEXO_PRO.receiptEmail,
};

@Service()
export class CheckoutStore {
  private readonly simulator = inject(PaymentSimulator);
  private readonly state = signal<CheckoutSnapshot>(initialSnapshot);

  readonly snapshot = this.state.asReadonly();
  readonly isProcessing = computed(() => this.state().status === 'processing');

  selectMethod(method: PaymentMethod): void {
    if (this.state().status !== 'idle') {
      return;
    }

    this.patch({
      method,
      brand: null,
      last4: null,
      errorReason: null,
      attemptedAt: null,
    });
  }

  async payWithCard(
    method: 'credit' | 'debit',
    cardNumber: string,
  ): Promise<'success' | 'error' | null> {
    if (this.state().status !== 'idle') {
      return null;
    }

    const digits = digitsOnly(cardNumber);

    this.patch({
      status: 'processing',
      method,
      brand: detectBrand(digits),
      last4: last4Of(digits),
      errorReason: null,
      attemptedAt: null,
    });

    const outcome = await this.simulator.chargeCard(cardNumber);
    return this.settle(outcome);
  }

  async payWithPix(): Promise<'success' | 'error' | null> {
    if (this.state().status !== 'idle') {
      return null;
    }

    this.patch({
      status: 'processing',
      method: 'pix',
      brand: null,
      last4: null,
      errorReason: null,
      attemptedAt: null,
    });

    await this.simulator.chargePix();
    return this.settle('approved');
  }

  retry(): void {
    const status = this.state().status;
    if (status !== 'success' && status !== 'error') {
      return;
    }

    this.patch({
      status: 'idle',
      errorReason: null,
      attemptedAt: null,
    });
  }

  chooseOtherMethod(): void {
    if (this.state().status === 'processing') {
      return;
    }

    this.patch({
      status: 'idle',
      method: null,
      brand: null,
      last4: null,
      errorReason: null,
      attemptedAt: null,
    });
  }

  private patch(partial: Partial<CheckoutSnapshot>): void {
    this.state.update((current) => ({ ...current, ...partial }));
  }

  private settle(outcome: SimulationOutcome): 'success' | 'error' {
    if (this.state().status !== 'processing') {
      return this.state().status === 'success' ? 'success' : 'error';
    }

    const attemptedAt = new Date().toISOString();

    if (outcome === 'approved') {
      this.patch({
        status: 'success',
        errorReason: null,
        attemptedAt,
      });
      return 'success';
    }

    this.patch({
      status: 'error',
      errorReason: CARD_DECLINED_REASON,
      attemptedAt,
    });
    return 'error';
  }
}
