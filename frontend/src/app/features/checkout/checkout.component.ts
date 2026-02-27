import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Subscription, timer } from 'rxjs';
import { CartService } from '../../services/cart.service';

type CheckoutResponse = {
  message?: string;
  order_id?: number;
  total?: number;
};

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit, OnDestroy {
  private readonly baseUrl = 'http://localhost:3000';

  accept = false;
  loading = false;

  // ✅ HTML ezeket használja
  message = '';
  errorMsg = '';

  // overlay / visszaszámláló
  successOpen = false;
  secondsLeft = 3;

  private countdownSub?: Subscription;

  constructor(
    public cart: CartService,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cart.sync().subscribe({ error: () => {} });
  }

  ngOnDestroy(): void {
    this.countdownSub?.unsubscribe();
  }

  pay(): void {
    this.message = '';
    this.errorMsg = '';

    if (this.cart.items.length === 0) {
      this.errorMsg = 'A kosarad üres.';
      return;
    }
    if (!this.accept) {
      this.errorMsg = 'Fogadd el a feltételeket a fizetéshez.';
      return;
    }

    this.loading = true;

    const url = `${this.baseUrl}/api/orders/checkout`;

    this.http.post<CheckoutResponse | any>(url, {}).subscribe({
      next: () => {
        this.loading = false;
        this.message = 'Sikeres vásárlás!';

        // frissítjük a kosarat (backend általában ürít)
        this.cart.sync().subscribe({ error: () => {} });

        // overlay + 3..2..1 redirect
        this.successOpen = true;
        this.secondsLeft = 3;

        this.countdownSub?.unsubscribe();
        this.countdownSub = timer(0, 1000).subscribe((t) => {
          this.secondsLeft = 3 - t;
          if (this.secondsLeft <= 0) {
            this.countdownSub?.unsubscribe();
            this.successOpen = false;
            this.router.navigate(['/']);
          }
        });
      },
      error: (err) => {
        this.loading = false;
        const backendMsg =
          err?.error?.message ??
          err?.error?.error ??
          (typeof err?.error === 'string' ? err.error : null);

        this.errorMsg = backendMsg ?? 'Sikertelen fizetés / szerver hiba.';
      },
    });
  }
}