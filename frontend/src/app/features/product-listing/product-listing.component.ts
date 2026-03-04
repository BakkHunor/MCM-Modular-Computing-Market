import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { CartService } from '../../services/cart.service';
import { CartDrawerService } from '../../services/cart-drawer.service';
@Component({
 selector: 'app-product-listing',
 standalone: true,
 imports: [CommonModule, FormsModule, RouterModule],
 templateUrl: './product-listing.component.html',
 styleUrls: ['./product-listing.component.css'],
})
export class ProductListingComponent implements OnInit {
 allProducts: Product[] = [];
 filtered: Product[] = [];
 q = '';
 maxPrice = 200000;
 category = '';
 platform = '';
 sort = 'relevance';
 platforms: string[] = [];
 // backend base
 apiUrl = 'http://localhost:3000';
 constructor(
   private productService: ProductService,
   private route: ActivatedRoute,
   private cart: CartService,
   private cartDrawer: CartDrawerService
 ) {}
 ngOnInit(): void {
 this.route.queryParamMap.subscribe((p) => {
   this.q = (p.get('q') || '').toString();
   this.applyFilters();
 });

 this.productService.getProducts().subscribe({
 next: (products: any[]) => {
 this.allProducts = products as any;
 this.platforms = Array.from(
 new Set(products.map((p: any) => p.platform).filter(Boolean))
 );
 this.applyFilters();
 },
 error: () => {
 this.allProducts = [];
 this.filtered = [];
 },
 });
 }
 // EZ A LÉNYEG: mindig jó URL-t ad vissza
 imageSrc(p: any): string {
 const raw = (p?.imageUrl ?? p?.image ?? p?.image_url ?? '').toString().trim();
 if (!raw) return '';
 // ha már teljes URL
 if (/^https?:\/\//i.test(raw)) return raw;
 // ha /uploads/....
 if (raw.startsWith('/')) return this.apiUrl + raw;
 // ha uploads/....
 if (raw.startsWith('uploads/')) return `${this.apiUrl}/${raw}`;
 // ha csak fájlnév (pl: ac_mirage.jpg)
 return `${this.apiUrl}/uploads/${raw}`;
 }
 applyFilters(): void {
 const q = this.q.trim().toLowerCase();
 const tokens = q ? q.split(/\s+/).filter(Boolean) : [];
 this.filtered = (this.allProducts as any[]).filter((p: any) => {
 const hay = `${String(p.name ?? '')} ${String(p.platform ?? '')} ${String(p.category ?? '')}`.toLowerCase();
 if (tokens.length && !tokens.every(t => hay.includes(t))) return false;
 if (typeof p.price === 'number' && p.price > this.maxPrice) return false;
 if (this.category && p.category !== this.category) return false;
 if (this.platform && p.platform !== this.platform) return false;
 return true;
 });
 }
 resetFilters(): void {
 this.q = '';
 this.maxPrice = 200000;
 this.category = '';
 this.platform = '';
 this.sort = 'relevance';
 this.applyFilters();
 }

 addToCart(p: any): void {
   // 1 db hozzáadás + kosár megnyitása (drawer)
   this.cart.add(p, 1).subscribe({
     next: () => this.cartDrawer.open(),
     error: () => this.cartDrawer.open(),
   });
 }
}