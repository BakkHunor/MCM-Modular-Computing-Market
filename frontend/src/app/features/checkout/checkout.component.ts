import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent {
  accept = false;
  constructor(public cart: CartService) {}
  pay(){ if(!this.accept){ alert('Fogadd el a feltételeket.'); return; } alert('Demo: fizetés később (backend).'); }
}
