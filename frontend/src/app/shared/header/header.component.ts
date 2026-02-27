import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  @Input() hideSearch = false;
  @Input() hideAuthLinks = false;

  searchTerm = '';

  cartOpen = false;
  menuOpen = false;

  constructor(public cart: CartService, public auth: AuthService, private router: Router) {}

  openCart(): void {
    this.cartOpen = true;
    // frissítjük a dropdown előtt, hogy tényleg a DB-s kosár legyen
    this.cart.sync().subscribe({ error: () => {} });
  }

  closeCart(): void {
    this.cartOpen = false;
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu(): void {
    this.menuOpen = false;
  }

  logout(): void {
    this.auth.logout();
    this.closeMenu();
    this.router.navigate(['/']);
  }

  onSearch(): void {
    const q = (this.searchTerm || '').trim();
    this.closeMenu();
    this.closeCart();

    // nálatok a kereső route: /search és ott a query paramot használjátok
    // ha máshogy van, szólj és 1 sorban átírom
    this.router.navigate(['/search'], { queryParams: q ? { q } : {} });
  }
}