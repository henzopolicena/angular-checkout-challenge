import { Component, input } from '@angular/core';
import { LucideCheck } from '@lucide/angular';

export type CheckoutStep = 'pagamento' | 'confirmacao';

type StepStatus = 'completed' | 'current' | 'upcoming';

@Component({
  selector: 'app-stepper',
  imports: [LucideCheck],
  templateUrl: './stepper.html',
})
export class Stepper {
  readonly step = input.required<CheckoutStep>();

  protected readonly steps = [
    { id: 'pedido', label: 'Pedido' },
    { id: 'pagamento', label: 'Pagamento' },
    { id: 'confirmacao', label: 'Confirmação' },
  ] as const;

  protected statusOf(id: string): StepStatus {
    if (this.step() === 'confirmacao') {
      return 'completed';
    }
    if (id === 'pedido') {
      return 'completed';
    }
    if (id === 'pagamento') {
      return 'current';
    }
    return 'upcoming';
  }

  protected stepLabel(label: string, id: string): string {
    const status = this.statusOf(id);
    if (status === 'completed') {
      return `${label}, concluído`;
    }
    if (status === 'current') {
      return `${label}, etapa atual`;
    }
    return `${label}, pendente`;
  }
}
