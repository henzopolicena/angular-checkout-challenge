import { NgOptimizedImage } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { LucideArrowRight, LucideCopy, LucideQrCode } from '@lucide/angular';

@Component({
  selector: 'app-pix-panel',
  imports: [NgOptimizedImage, LucideArrowRight, LucideCopy, LucideQrCode],
  templateUrl: './pix-panel.html',
})
export class PixPanel {
  readonly pixCode = input.required<string>();
  readonly complete = output<void>();

  protected async copyCode(): Promise<void> {
    try {
      await navigator.clipboard.writeText(this.pixCode());
    } catch {
      return;
    }
  }
}
