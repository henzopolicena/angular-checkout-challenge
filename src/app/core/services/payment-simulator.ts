import { Service } from '@angular/core';

import { digitsOnly } from '@shared/utils/card';

export type SimulationOutcome = 'approved' | 'declined';

const PROCESSING_DELAY_MS = 1200;
const DECLINED_CARD_DIGITS = '4000000000000002';

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

@Service()
export class PaymentSimulator {
  async chargeCard(cardNumber: string): Promise<SimulationOutcome> {
    const digits = digitsOnly(cardNumber);
    await delay(PROCESSING_DELAY_MS);
    return digits === DECLINED_CARD_DIGITS ? 'declined' : 'approved';
  }

  async chargePix(): Promise<'approved'> {
    await delay(PROCESSING_DELAY_MS);
    return 'approved';
  }
}
