import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { LucideLock } from '@lucide/angular';

@Component({
  selector: 'app-header',
  imports: [NgOptimizedImage, LucideLock],
  templateUrl: './header.html',
  host: { class: 'block shrink-0' },
})
export class Header {}
