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

export function passesLuhn(digits: string): boolean {
  if (digits.length < 13 || digits.length > 19) {
    return false;
  }

  let sum = 0;
  let doubleDigit = false;

  for (let index = digits.length - 1; index >= 0; index--) {
    let digit = Number(digits[index]);
    if (doubleDigit) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }
    sum += digit;
    doubleDigit = !doubleDigit;
  }

  return sum % 10 === 0;
}

export function isSupportedCardNumber(value: string): boolean {
  const digits = digitsOnly(value);
  return passesLuhn(digits) && detectBrand(digits) !== null;
}

export function isExpiryCurrentOrFuture(expiry: string, now = new Date()): boolean {
  const match = /^(\d{2})\/(\d{2})$/.exec(expiry);
  if (!match) {
    return false;
  }

  const month = Number(match[1]);
  const year = 2000 + Number(match[2]);
  if (month < 1 || month > 12) {
    return false;
  }

  const lastDayOfMonth = new Date(year, month, 0);
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  return lastDayOfMonth >= today;
}

export function formatCardNumber(value: string): string {
  const digits = digitsOnly(value).slice(0, 19);
  return digits.replace(/(\d{4})(?=\d)/g, '$1 ').trim();
}

export function formatExpiry(value: string): string {
  const digits = digitsOnly(value).slice(0, 4);
  if (digits.length <= 2) {
    return digits;
  }
  return `${digits.slice(0, 2)}/${digits.slice(2)}`;
}

export function formatCvv(value: string): string {
  return digitsOnly(value).slice(0, 4);
}

export function formatBrl(amount: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(amount);
}
