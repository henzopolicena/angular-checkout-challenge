import { NEXO_PRO } from '@core/constants/nexo-pro';
import { type CardBrand } from '@shared/utils/card';

export type PaymentMethod = 'credit' | 'debit' | 'pix';

export const PAYMENT_METHOD_LABEL: Record<PaymentMethod, string> = {
  credit: 'Crédito',
  debit: 'Débito',
  pix: 'Pix',
};
export type CheckoutStatus = 'idle' | 'processing' | 'success' | 'error';
export type { CardBrand };

export type CheckoutSnapshot = {
  status: CheckoutStatus;
  method: PaymentMethod | null;
  brand: CardBrand | null;
  last4: string | null;
  errorReason: string | null;
  attemptedAt: string | null;
  amount: typeof NEXO_PRO.amount;
  orderId: typeof NEXO_PRO.orderId;
  receiptEmail: typeof NEXO_PRO.receiptEmail;
};
