import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { CartDrawerService } from '../../services/cart-drawer.service';
import { AuthService } from '../../services/auth.service';
import { Product } from '../../models/product.model';
import { ToastService } from '../../services/toast.service';
@Component({
 selector: 'app-product-detail',
 standalone: true,
 imports: [CommonModule, RouterModule],
 templateUrl: './product-detail.component.html',
 styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit {
 product?: Product;
 apiUrl = 'http://localhost:3000';
 loginPromptOpen = false;
 constructor(
 private route: ActivatedRoute,
 private products: ProductService,
 private cart: CartService,
 private cartDrawer: CartDrawerService,
 public auth: AuthService,
 private router: Router,
 private toast: ToastService
 ) {}
 ngOnInit(): void {
 const id = this.route.snapshot.paramMap.get('id') || '';
 this.products.getById(id).subscribe({
 next: (p: any) => (this.product = p),
 error: () => (this.product = undefined),
 });
 }
 imageSrc(p: any): string {
 const raw = (p?.imageUrl ?? p?.image ?? p?.image_url ?? '').toString().trim();
 if (!raw) return '';
 if (/^https?:\/\//i.test(raw)) return raw;
 if (raw.startsWith('/')) return this.apiUrl + raw;
 if (raw.startsWith('uploads/')) return `${this.apiUrl}/${raw}`;
 return `${this.apiUrl}/uploads/${raw}`;
 }
 addToCart(): void {
 if (!this.product) return;
 if (this.product.category === 'hardware' && !this.auth.isLoggedIn) {
   this.loginPromptOpen = true;
   return;
 }
 (this.cart as any).add(this.product, 1).subscribe({
      next: () => {
        this.toast.showCartSuccess('Sikeresen beraktuk a terméket a kosárba.');
      },
      error: (err: any) => this.toast.showError(err?.error?.message || 'Nem sikerült kosárba tenni.'),
    });
 }

 closeLoginPrompt(): void {
   this.loginPromptOpen = false;
 }

 goLogin(): void {
   this.router.navigate(['/login'], { queryParams: { returnUrl: this.router.url } });
   this.closeLoginPrompt();
 }

 goRegister(): void {
   this.router.navigate(['/register'], { queryParams: { returnUrl: this.router.url } });
   this.closeLoginPrompt();
 }
}