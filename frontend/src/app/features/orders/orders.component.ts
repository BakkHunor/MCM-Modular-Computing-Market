import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page">
      <h1>Rendelések</h1>
      <p>Itt fognak megjelenni a rendeléseid.</p>
    </div>
  `,
  styles: [
    `
      .page{ max-width: 1000px; margin: 0 auto; padding: 24px 16px; }
      h1{ margin: 0 0 10px; font-weight: 900; }
      p{ margin: 0; opacity: .9; }
    `,
  ],
})
export class OrdersComponent {}
