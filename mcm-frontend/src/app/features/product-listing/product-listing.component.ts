import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Product, ProductCategory } from '../../models/product.model';
import { ProductService } from '../../services/product.service';

type SortMode = 'relevance' | 'price-asc' | 'price-desc' | 'name-asc';

@Component({
  selector: 'app-product-listing',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './product-listing.component.html',
  styleUrl: './product-listing.component.css',
})
export class ProductListingComponent implements OnInit {
  allProducts: Product[] = [];
  filtered: Product[] = [];

  q = '';
  maxPrice = 200000;
  category: '' | ProductCategory = '';
  platform = '';
  sort: SortMode = 'relevance';

  platforms: string[] = ['Steam', 'PSN', 'Xbox', 'EA App', 'Microsoft', 'Windows'];

  constructor(private route: ActivatedRoute, private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe((products) => {
      this.allProducts = products;

      this.route.queryParams.subscribe((params) => {
        this.q = (params['q'] ?? '').toString();
        this.applyFilters();
      });
    });
  }

  resetFilters(): void {
    this.maxPrice = 200000;
    this.category = '';
    this.platform = '';
    this.sort = 'relevance';
    this.applyFilters();
  }

  applyFilters(): void {
    const qLower = this.q.trim().toLowerCase();

    const matches = (p: Product) => {
      const matchesSearch = !qLower || p.name.toLowerCase().includes(qLower);
      const matchesPrice = p.price <= this.maxPrice;
      const matchesCategory = this.category ? p.category === this.category : true;
      const matchesPlatform = this.platform ? (p.platform ?? '').toLowerCase() === this.platform.toLowerCase() : true;
      return matchesSearch && matchesPrice && matchesCategory && matchesPlatform;
    };

    let arr = this.allProducts.filter(matches);

    // sort
    if (this.sort === 'price-asc') arr = arr.slice().sort((a, b) => a.price - b.price);
    if (this.sort === 'price-desc') arr = arr.slice().sort((a, b) => b.price - a.price);
    if (this.sort === 'name-asc') arr = arr.slice().sort((a, b) => a.name.localeCompare(b.name));

    this.filtered = arr;
  }
}
