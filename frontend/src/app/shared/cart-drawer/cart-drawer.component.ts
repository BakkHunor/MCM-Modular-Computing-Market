import { CommonModule } from '@angular/common';
import { Component, HostListener, OnDestroy } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { CartService } from '../../services/cart.service';
import { CartDrawerService } from '../../services/cart-drawer.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-cart-drawer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cart-drawer.component.html',
  styleUrls: ['./cart-drawer.component.css'],
})
export class CartDrawerComponent implements OnDestroy {
  private sub: Subscription;

  constructor(
    public cart: CartService,
    public drawer: CartDrawerService,
    private router: Router
  ) {
    // amikor kinyílik, szinkronizáljuk a kosarat + lockoljuk a body scrollt
    this.sub = this.drawer.open$.subscribe((isOpen) => {
      if (isOpen) {
        this.cart.sync().subscribe({ error: () => {} });
        document.body.classList.add('mcm-noscroll');
      } else {
        document.body.classList.remove('mcm-noscroll');
      }
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
    document.body.classList.remove('mcm-noscroll');
  }

  @HostListener('document:keydown.escape')
  onEsc(): void {
    if (this.drawer.isOpen) this.drawer.close();
  }


  money(v: number): string {
    const n = Number(v) || 0;
    return `${n.toLocaleString('hu-HU')} Ft`;
  }

  inc(p: Product): void {
    this.cart.inc(p).subscribe({ error: () => {} });
  }

  dec(p: Product): void {
    this.cart.dec(p).subscribe({ error: () => {} });
  }

  remove(p: Product): void {
    this.cart.remove(p).subscribe({ error: () => {} });
  }

  checkout(ev?: MouseEvent): void {
    if (ev) ev.stopPropagation();
    this.drawer.close();
    this.router.navigate(['/checkout']);
  }
}
