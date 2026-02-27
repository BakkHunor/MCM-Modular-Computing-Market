import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';

import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product.model';

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

  constructor(
    private route: ActivatedRoute,
    private products: ProductService,
    private cart: CartService
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
    (this.cart as any).add(this.product, 1).subscribe({
      next: () => alert('Hozzáadva a kosárhoz!'),
      error: () => alert('Nem sikerült kosárba tenni.'),
    });
  }
}