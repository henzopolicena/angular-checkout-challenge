export type CardBrand = 'visa' | 'mastercard';

export function digitsOnly(cardNumber: string): string {
  return cardNumber.replace(/\D/g, '');
}

export function detectBrand(digits: string): CardBrand | null {
  if (digits.startsWith('4')) {
    return 'visa';
  }

  const prefix2 = Number(digits.slice(0, 2));
  const prefix4 = Number(digits.slice(0, 4));

  if ((prefix2 >= 51 && prefix2 <= 55) || (prefix4 >= 2221 && prefix4 <= 2720)) {
    return 'mastercard';
  }

  return null;
}

export function last4Of(digits: string): string | null {
  return digits.length >= 4 ? digits.slice(-4) : null;
}
