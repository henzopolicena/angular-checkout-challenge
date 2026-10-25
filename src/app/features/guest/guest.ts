import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Footer } from './components/footer';
import { Header } from './components/header';

@Component({
  selector: 'app-guest',
  imports: [RouterOutlet, Header, Footer],
  template: `
    <div class="flex min-h-dvh flex-col bg-page text-ink">
      <app-header />
      <div class="flex-1">
        <router-outlet />
      </div>
      <app-footer />
    </div>
  `,
})
export class Guest {}
