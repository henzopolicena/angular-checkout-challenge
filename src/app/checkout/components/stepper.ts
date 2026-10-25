import { Component, input } from '@angular/core';
import { LucideCheck } from '@lucide/angular';

export type CheckoutStep = 'pagamento' | 'confirmacao';

type StepStatus = 'completed' | 'current' | 'upcoming';

@Component({
  selector: 'app-stepper',
  imports: [LucideCheck],
  template: `
    <nav aria-label="Etapas do checkout" class="px-5 pt-6 md:px-8 md:pt-8">
      <div class="relative mx-auto max-w-[36rem] md:max-w-[40rem]">
        <div
          class="pointer-events-none absolute top-3 right-[16%] left-[16%] h-px bg-line md:top-3.5"
          aria-hidden="true"
        ></div>
        <ol class="relative z-10 flex items-start justify-between">
          @for (item of steps; track item.id; let index = $index) {
            <li
              class="flex flex-1 flex-col items-center gap-2"
              [attr.aria-current]="statusOf(item.id) === 'current' ? 'step' : null"
              [attr.aria-label]="stepLabel(item.label, item.id)"
            >
              <span
                class="flex size-6 items-center justify-center rounded-full text-[0.65rem] font-semibold md:size-7 md:text-xs"
                [class.bg-success]="statusOf(item.id) === 'completed'"
                [class.text-surface]="
                  statusOf(item.id) === 'completed' || statusOf(item.id) === 'current'
                "
                [class.bg-brand]="statusOf(item.id) === 'current'"
                [class.bg-surface]="statusOf(item.id) === 'upcoming'"
                [class.text-muted]="statusOf(item.id) === 'upcoming'"
                [class.ring-1]="statusOf(item.id) === 'upcoming'"
                [class.ring-line]="statusOf(item.id) === 'upcoming'"
                aria-hidden="true"
              >
                @if (statusOf(item.id) === 'completed') {
                  <svg lucideCheck [size]="12" [strokeWidth]="3"></svg>
                } @else {
                  {{ index + 1 }}
                }
              </span>
              <span
                class="text-[0.7rem] font-medium md:text-sm"
                [class.text-brand]="statusOf(item.id) === 'current'"
                [class.text-muted]="statusOf(item.id) !== 'current'"
                aria-hidden="true"
              >
                {{ item.label }}
              </span>
            </li>
          }
        </ol>
      </div>
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
