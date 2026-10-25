import { NgOptimizedImage } from '@angular/common';
import { Component, input } from '@angular/core';
import { FormField, type FieldTree } from '@angular/forms/signals';
import { LucideCheck } from '@lucide/angular';

import { formatCardNumber, formatCvv, formatExpiry } from '@shared/utils/card';

import { type CardFormValue } from '../../card.schema';

const MASK = {
  number: formatCardNumber,
  expiry: formatExpiry,
  cvv: formatCvv,
} as const;

@Component({
  selector: 'app-card-fields',
  imports: [NgOptimizedImage, FormField, LucideCheck],
  templateUrl: './card-fields.html',
  host: { class: 'block' },
})

export class CardFields {
  readonly cardForm = input.required<FieldTree<CardFormValue>>();
  readonly title = input.required<string>();
  readonly brandSrc = input<string | null>(null);

  protected invalid(name: keyof CardFormValue): boolean {
    const field = this.cardForm()[name]();
    return field.touched() && field.invalid();
  }

  protected message(name: keyof CardFormValue): string {
    return this.cardForm()[name]().errors()[0]?.message ?? '';
  }

  protected tone(name: keyof CardFormValue): 'invalid' | 'valid' | undefined {
    const field = this.cardForm()[name]();
    if (!field.touched()) {
      return undefined;
    }
    return field.invalid() ? 'invalid' : 'valid';
  }

  protected mask(name: keyof typeof MASK): void {
    const field = this.cardForm()[name];
    field().value.set(MASK[name](field().value()));
  }
}
