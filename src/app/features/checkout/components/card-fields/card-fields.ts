import { NgOptimizedImage } from '@angular/common';
import { Component, input } from '@angular/core';
import { FormField, type FieldTree } from '@angular/forms/signals';
import { LucideCheck, LucideCircleAlert } from '@lucide/angular';

import { formatCardNumber, formatCvv, formatExpiry } from '@shared/utils/card';

import { type CardFormValue } from '../../card.schema';

const MASK = {
  number: formatCardNumber,
  expiry: formatExpiry,
  cvv: formatCvv,
} as const;

@Component({
  selector: 'app-card-fields',
  imports: [NgOptimizedImage, FormField, LucideCheck, LucideCircleAlert],
  templateUrl: './card-fields.html',
  host: { class: 'block' },
})

export class CardFields {
  readonly cardForm = input.required<FieldTree<CardFormValue>>();
  readonly title = input.required<string>();
  readonly brandSrc = input<string | null>(null);

  protected invalid(name: keyof CardFormValue): boolean {
    return this.revealed() && this.cardForm()[name]().invalid();
  }

  protected message(name: keyof CardFormValue): string {
    return this.cardForm()[name]().errors()[0]?.message ?? '';
  }

  protected tone(name: keyof CardFormValue): 'invalid' | 'valid' | undefined {
    if (!this.revealed()) {
      return undefined;
    }
    return this.cardForm()[name]().invalid() ? 'invalid' : 'valid';
  }

  private revealed(): boolean {
    const root = this.cardForm()();
    return root.touched() || root.dirty();
  }

  protected mask(name: keyof typeof MASK): void {
    const field = this.cardForm()[name];
    field().value.set(MASK[name](field().value()));
  }
}
