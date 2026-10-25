import { Component, input } from '@angular/core';

export type CheckoutStep = 'pagamento' | 'confirmacao';

@Component({
  selector: 'app-stepper',
  template: `
    <nav aria-label="Etapas do checkout">
      <ol>
        @for (item of steps; track item.id) {
          <li [attr.aria-current]="isCurrent(item.id) ? 'step' : null">
            {{ item.label }}
          </li>
        }
      </ol>
    </nav>
  `,
})
export class Stepper {
  readonly step = input.required<CheckoutStep>();

  protected readonly steps = [
    { id: 'pedido', label: 'Pedido' },
    { id: 'pagamento', label: 'Pagamento' },
    { id: 'confirmacao', label: 'Confirmação' },
  ] as const;

  protected isCurrent(id: string): boolean {
    return this.step() === id;
  }
}
