import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  code = '';
  accept = false;

  constructor(public cart: CartService) {}

  inc(id: string){ this.cart.inc(id); }
  dec(id: string){ this.cart.dec(id); }
  remove(id: string){ this.cart.remove(id); }
  clear(){ this.cart.clear(); }

  applyCode(){ alert('Demo: kupon később (backend).'); }
}
