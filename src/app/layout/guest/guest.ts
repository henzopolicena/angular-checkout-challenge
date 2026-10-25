import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Footer } from './components/footer/footer';
import { Header } from './components/header/header';

@Component({
  selector: 'app-guest',
  imports: [RouterOutlet, Header, Footer],
  templateUrl: './guest.html',
  host: { class: 'block' },
})
export class Guest {}
