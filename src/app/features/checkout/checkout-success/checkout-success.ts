import { NgOptimizedImage } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { LucideArrowRight, LucideCheck } from '@lucide/angular';

import { NEXO_PRO } from '@core/constants/nexo-pro';
import { paymentCaption } from '@shared/models/checkout.model';
import { formatBrl } from '@shared/utils/card';

import { CheckoutStore } from '../checkout-store';

@Component({
  selector: 'app-checkout-success',
  imports: [NgOptimizedImage, LucideArrowRight, LucideCheck],
  templateUrl: './checkout-success.html',
})
export class CheckoutSuccess {
  private readonly store = inject(CheckoutStore);

  protected readonly catalog = NEXO_PRO;
  protected readonly snapshot = this.store.snapshot;
  protected readonly total = formatBrl(NEXO_PRO.amount);
  protected readonly notice = signal<string | null>(null);

  protected readonly caption = computed(() => {
    const current = this.snapshot();
    return paymentCaption(current.method, current.brand, current.last4);
  });

  protected readonly paidAt = computed(() => formatAttemptedAt(this.snapshot().attemptedAt));
  protected readonly renewalOn = computed(() => formatRenewalOn(this.snapshot().attemptedAt));

  protected onAccess(): void {
    this.notice.set('Espaço simulado. Nenhuma conta foi criada.');
  }

  protected onReceipt(): void {
    this.notice.set('Recibo simulado. Nenhum documento real foi gerado.');
  }
}

function formatAttemptedAt(iso: string | null): string {
  if (!iso) {
    return '—';
  }

  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(iso));
}

function formatRenewalOn(iso: string | null): string {
  if (!iso) {
    return '—';
  }

  const date = new Date(iso);
  date.setMonth(date.getMonth() + 1);

  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(date);
}
