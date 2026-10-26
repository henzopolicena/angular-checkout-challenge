import { pattern, required, schema, validate } from '@angular/forms/signals';

import { isExpiryCurrentOrFuture, isSupportedCardNumber } from '@shared/utils/card';

export type CardFormValue = {
  number: string;
  holder: string;
  expiry: string;
  cvv: string;
};

export const cardFormSchema = schema<CardFormValue>((card) => {
  validate(card.number, ({ value }) =>
    isSupportedCardNumber(value())
      ? undefined
      : { kind: 'cardNumber', message: 'Número inválido. Confira os dígitos do cartão.' },
  );

  required(card.holder, { message: 'Informe o nome como aparece no cartão.' });
  pattern(card.holder, /\S+\s+\S+/, { message: 'Nome incompleto' });

  validate(card.expiry, ({ value }) =>
    isExpiryCurrentOrFuture(value())
      ? undefined
      : { kind: 'expiry', message: 'Cartão vencido.' },
  );

  validate(card.cvv, ({ value }) =>
    /^\d{3,4}$/.test(value())
      ? undefined
      : { kind: 'cvv', message: 'Use 3 ou 4 dígitos.' },
  );
});
