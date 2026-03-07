import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CartDrawerService } from '../../services/cart-drawer.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css'],
})
export class ToastComponent {
  constructor(public toast: ToastService, private drawer: CartDrawerService) {}

  close(): void { this.toast.close(); }
  continueShopping(): void { this.toast.close(); }
  openCart(): void {
    this.toast.close();
    this.drawer.open();
  }
}
