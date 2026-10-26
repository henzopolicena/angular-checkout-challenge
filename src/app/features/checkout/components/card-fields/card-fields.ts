import { NgOptimizedImage } from '@angular/common';
import { Component, input } from '@angular/core';
import { FormField, type FieldTree } from '@angular/forms/signals';
import { LucideCheck, LucideCircleAlert, LucideCircleQuestionMark } from '@lucide/angular';

import { formatCardNumber, formatCvv, formatExpiry, formatHolder } from '@shared/utils/card';

import { type CardFormValue } from '../../card.schema';

const MASK = {
  number: formatCardNumber,
  expiry: formatExpiry,
  cvv: formatCvv,
  holder: formatHolder,
} as const;

@Component({
  selector: 'app-card-fields',
  imports: [NgOptimizedImage, FormField, LucideCheck, LucideCircleAlert, LucideCircleQuestionMark],
  templateUrl: './card-fields.html',
  host: { class: 'block' },
})
export class CardFields {
  readonly cardForm = input.required<FieldTree<CardFormValue>>();
  readonly title = input.required<string>();
  readonly brandSrc = input<string | null>(null);

  protected invalid(name: keyof CardFormValue): boolean {
    return this.revealed(name) && this.cardForm()[name]().invalid();
  }

  protected message(name: keyof CardFormValue): string {
    return this.cardForm()[name]().errors()[0]?.message ?? '';
  }

  protected tone(name: keyof CardFormValue): 'invalid' | 'valid' | undefined {
    if (!this.revealed(name)) {
      return undefined;
    }
    return this.cardForm()[name]().invalid() ? 'invalid' : 'valid';
  }

  private revealed(name: keyof CardFormValue): boolean {
    const field = this.cardForm()[name]();
    return field.touched() || field.dirty();
  }

  protected mask(name: keyof typeof MASK, event: Event): void {
    const input = event.target as HTMLInputElement;
    const formatted = MASK[name](input.value);
    this.cardForm()[name]().value.set(formatted);
    if (input.value !== formatted) {
      input.value = formatted;
    }
  }

  protected rejectNonDigits(event: Event): void {
    const inputEvent = event as InputEvent;
    if (inputEvent.inputType === 'insertFromPaste') {
      return;
    }
    if (inputEvent.data && /\D/.test(inputEvent.data)) {
      inputEvent.preventDefault();
    }
  }
}
