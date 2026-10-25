import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter, map } from 'rxjs';

import { Stepper, type CheckoutStep } from './components/stepper/stepper';

@Component({
  selector: 'app-checkout',
  imports: [RouterOutlet, Stepper],
  templateUrl: './checkout.html',
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
