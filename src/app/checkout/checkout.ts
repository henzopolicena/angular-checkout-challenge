import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter, map } from 'rxjs';

import { Stepper, type CheckoutStep } from './components/stepper';

@Component({
  selector: 'app-checkout',
  imports: [RouterOutlet, Stepper],
  template: `
    <app-stepper [step]="currentStep()" />
    <main class="mx-auto w-full max-w-shell px-5 py-6 md:px-8 md:py-8">
      <router-outlet />
    </main>
  `,
})
export class Checkout {
  private readonly router = inject(Router);

  private readonly url = toSignal(
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      map((event) => event.urlAfterRedirects),
    ),
    { initialValue: this.router.url },
  );

  protected readonly currentStep = computed<CheckoutStep>(() =>
    this.url().includes('/success') ? 'confirmacao' : 'pagamento',
  );
}
