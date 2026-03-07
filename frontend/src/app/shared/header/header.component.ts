import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

import { CartService } from '../../services/cart.service';
import { CartDrawerService } from '../../services/cart-drawer.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, MatIconModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  @Input() hideSearch = false;
  @Input() hideAuthLinks = false;

  searchTerm = '';

  constructor(
    public cart: CartService,
    public auth: AuthService,
    public cartDrawer: CartDrawerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cart.sync().subscribe({ error: () => {} });
  }

  get isCheckout(): boolean {
    return this.router.url.startsWith('/checkout');
  }

  goHome(): void {
    this.router.navigate(['/']);
  }

  onSearch(): void {
    const term = (this.searchTerm || '').trim();
    if (!term) {
      this.router.navigate(['/search']);
      return;
    }
    this.router.navigate(['/search'], { queryParams: { q: term } });
  }

  openCart(ev?: MouseEvent): void {
    if (ev) ev.stopPropagation();
    this.cartDrawer.open();
    this.cart.sync().subscribe({ error: () => {} });
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/']);
  }

  closeMenu(): void {
  }
}
