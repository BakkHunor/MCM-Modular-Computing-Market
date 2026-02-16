import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  cartOpen = false;
  openCart(){ this.cartOpen = true; }
  closeCart(){ this.cartOpen = false; }

  searchTerm = '';
  menuOpen = false;
  hideSearch = false;
  hideAuthLinks = false;

  constructor(private router: Router, public auth: AuthService, public cart: CartService) {
    // Kinguin-szerű élmény: auth oldalakon minimal header (kereső nélkül)
    this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe((e) => {
        const url = e.urlAfterRedirects;
        this.hideSearch = url.startsWith('/login') || url.startsWith('/register');
        this.hideAuthLinks = this.hideSearch;
        if (this.hideSearch) {
          this.searchTerm = '';
          this.closeMenu();
        }
      });

    // első betöltés
    const url = this.router.url;
    this.hideSearch = url.startsWith('/login') || url.startsWith('/register');
        this.hideAuthLinks = this.hideSearch;
  }

  onSearch(): void {
    const q = this.searchTerm.trim();
    if (!q) return;
    this.router.navigate(['/search'], { queryParams: { q } });
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
}
