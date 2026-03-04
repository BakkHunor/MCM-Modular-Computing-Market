import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';

type CheckoutResponse = {
  message?: string;
  order_id?: number;
  total?: number;
  delivered_codes?: { product: string; code: string }[];
};

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  ngOnDestroy(): void {
    if (this.countdownTimer) clearInterval(this.countdownTimer);
  }

  private readonly baseApi = 'http://localhost:3000/api';

  // UX
  loading = false;
  errorMsg = '';
  successMsg = '';
  showSuccessModal = false;
  modalText = '';
  countdown = 5;
  private countdownTimer: any;

  // form
  acceptTerms = false;

  email = '';
  // shipping (csak hardware esetén)
  firstName = '';
  lastName = '';
  phone = '';
  zipCode = '';
  city = '';
  addressLine = '';
  additionalInfo = '';

  // tax display (csak UI)
  readonly TAX_RATE = 0.2;

  constructor(
    public cart: CartService,
    public auth: AuthService,
    private http: HttpClient,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.cart.sync().subscribe({ error: () => {} });

    // Hardware checkout csak belépve (kulcs/giftcard mehet vendégként is)
if (!this.auth.isLoggedIn && this.hasHardware) {
  this.router.navigate(['/login'], { queryParams: { returnUrl: '/checkout' } });
  return;
}

// email prefill, ha van (vendégnél üres)

    this.email = this.auth.profile?.email ?? '';

    // Szállítási adatok előtöltése (ha belépve vagy és van hardver a kosárban)
    if (this.auth.isLoggedIn && this.hasHardware) {
      this.http.get<any>(`${this.baseApi}/profile/address`).subscribe({
        next: (addr) => {
          if (!addr) return;
          this.firstName = addr.firstName ?? this.firstName;
          this.lastName = addr.lastName ?? this.lastName;
          this.phone = addr.phone ?? this.phone;
          this.zipCode = addr.postcode ?? this.zipCode;
          this.city = addr.city ?? this.city;
          this.addressLine = addr.address ?? this.addressLine;
          this.additionalInfo = addr.additionalInfo ?? this.additionalInfo;
        },
        error: () => {}
      });
    }
  }

  get hasHardware(): boolean {
    return this.cart.items.some((it) => it.product.category === 'hardware');
  }

  get isDigitalOnly(): boolean {
    return !this.hasHardware;
  }

  money(v: number): string {
    const n = Number(v) || 0;
    return `${n.toLocaleString('hu-HU')} Ft`;
  }

  get subtotal(): number {
    return this.cart.subtotal;
  }

  get tax(): number {
    return this.subtotal * this.TAX_RATE;
  }

  get total(): number {
    return this.subtotal + this.tax;
  }

  private validate(): string | null {
    if (this.cart.items.length === 0) return 'A kosarad üres.';
    if (!this.acceptTerms) return 'Fogadd el az ÁSZF-et a rendeléshez.';
    if (!this.email.trim()) return 'Email megadása kötelező.';

    if (this.hasHardware) {
      if (!this.firstName.trim()) return 'Keresztnév kötelező.';
      if (!this.lastName.trim()) return 'Vezetéknév kötelező.';
      if (!this.phone.trim()) return 'Telefonszám kötelező.';
      if (!this.zipCode.trim()) return 'Irányítószám kötelező.';
      if (!this.city.trim()) return 'Város kötelező.';
      if (!this.addressLine.trim()) return 'Cím megadása kötelező.';
    }

    return null;
  }

  placeOrder(): void {
    this.errorMsg = '';
    this.successMsg = '';

    const err = this.validate();
    if (err) {
      this.errorMsg = err;
      return;
    }

    const url = this.hasHardware ? `${this.baseApi}/orders/checkout` : `${this.baseApi}/checkout`;

    const body: any = {
      email: this.email.trim(),
    };

    if (this.hasHardware) {
      body.first_name = this.firstName.trim();
      body.last_name = this.lastName.trim();
      body.phone = this.phone.trim();
      body.zip_code = this.zipCode.trim();
      body.city = this.city.trim();
      body.address_line = this.addressLine.trim();
      if (this.additionalInfo.trim()) body.additional_info = this.additionalInfo.trim();
    }

    this.loading = true;

    // vendég session header
    let sessionId = localStorage.getItem('session_id');
    if (!sessionId) {
      sessionId = crypto.randomUUID();
      localStorage.setItem('session_id', sessionId);
    }

    this.http.post<CheckoutResponse>(url, body, {
      headers: {
        'x-session-id': sessionId
      }
    }).subscribe({
next: (res) => {
  this.loading = false;
  this.successMsg = res?.message ?? 'Sikeres rendelés!';
  this.cart.sync().subscribe({ error: () => {} });

  // ✅ Success modal + redirect countdown
  this.modalText = this.hasHardware
    ? 'Sikeres rendelés! A terméket hamarosan küldjük a megadott címre.'
    : 'Sikeres rendelés! A kulcsot/kódot hamarosan elküldjük a megadott email címre.';



// saveShippingAfterCheckout
if (this.auth.isLoggedIn && this.hasHardware) {
  this.http.put(`${this.baseApi}/profile/address`, {
    firstName: this.firstName,
    lastName: this.lastName,
    address: this.addressLine,
    additionalInfo: this.additionalInfo,
    city: this.city,
    postcode: this.zipCode,
    phone: this.phone,
  }).subscribe({ error: () => {} });
}

  this.showSuccessModal = true;
  this.countdown = 5;
  if (this.countdownTimer) clearInterval(this.countdownTimer);
  this.countdownTimer = setInterval(() => {
    this.countdown -= 1;
    if (this.countdown <= 0) {
      clearInterval(this.countdownTimer);
      this.showSuccessModal = false;
      this.router.navigate(['/']);
    }
  }, 1000);
},
      error: (e) => {
        this.loading = false;
        const msg =
          e?.error?.message ??
          e?.error?.error ??
          (typeof e?.error === 'string' ? e.error : null) ??
          'Sikertelen checkout.';
        this.errorMsg = msg;
      },
    });
  }
}
