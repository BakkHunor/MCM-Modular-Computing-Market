import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  loading = false;
  message = '';

  code = '';
  accept = false;

  constructor(public cart: CartService) {}

  ngOnInit(): void {
    this.loading = true;
    this.cart.sync().subscribe({
      next: () => (this.loading = false),
      error: () => {
        this.loading = false;
        this.message = 'Nem sikerült betölteni a kosarat.';
      },
    });
  }

  inc(id: string): void {
    this.loading = true;
    this.cart.inc(id).subscribe({
      next: () => (this.loading = false),
      error: () => {
        this.loading = false;
        this.message = 'Nem sikerült módosítani a mennyiséget.';
      },
    });
  }

  dec(id: string): void {
    this.loading = true;
    this.cart.dec(id).subscribe({
      next: () => (this.loading = false),
      error: () => {
        this.loading = false;
        this.message = 'Nem sikerült módosítani a mennyiséget.';
      },
    });
  }

  remove(id: string): void {
    this.loading = true;
    this.cart.remove(id).subscribe({
      next: () => (this.loading = false),
      error: () => {
        this.loading = false;
        this.message = 'Nem sikerült eltávolítani.';
      },
    });
  }

  clear(): void {
    this.loading = true;
    this.cart.clear().subscribe({
      next: () => (this.loading = false),
      error: () => {
        this.loading = false;
        this.message = 'Nem sikerült törölni a kosarat.';
      },
    });
  }

  applyCode(): void {
    // Most még UI-only (később lehet backend kupon végpont)
    this.message = this.code ? `Kód rögzítve: ${this.code}` : 'Adj meg egy kódot.';
  }
}