import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { LucideCheck, LucideShield } from '@lucide/angular';

import { NEXO_PRO } from '@core/constants/nexo-pro';
import { formatBrl } from '@shared/utils/card';

@Component({
  selector: 'app-order-summary',
  imports: [NgOptimizedImage, LucideCheck, LucideShield],
  templateUrl: './order-summary.html',
  host: { class: 'block' },
})
export class OrderSummary {
  protected readonly catalog = NEXO_PRO;
  protected readonly total = formatBrl(NEXO_PRO.amount);
}
