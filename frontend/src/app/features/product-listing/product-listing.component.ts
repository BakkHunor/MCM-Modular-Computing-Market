import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';

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
  apiUrl = 'http://localhost:3000';

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
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

  imageSrc(p: any): string {
    const raw = (p?.imageUrl ?? p?.image ?? p?.image_url ?? '').toString().trim();
    if (!raw) return '';
    if (/^https?:\/\//i.test(raw)) return raw;
    if (raw.startsWith('/')) return this.apiUrl + raw;
    if (raw.startsWith('uploads/')) return `${this.apiUrl}/${raw}`;

    return `${this.apiUrl}/uploads/${raw}`;
  }

  applyFilters(): void {
    const q = this.q.trim().toLowerCase();

    this.filtered = (this.allProducts as any[]).filter((p: any) => {
      if (q && !String(p.name).toLowerCase().includes(q)) return false;
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
}