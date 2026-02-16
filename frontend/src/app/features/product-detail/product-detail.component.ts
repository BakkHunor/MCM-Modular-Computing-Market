import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css',
})
export class ProductDetailComponent implements OnInit {
  product?: Product;

  constructor(private route: ActivatedRoute, private productService: ProductService,
    private cart: CartService) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') ?? '';
    this.productService.getById(id).subscribe((p) => (this.product = p));
  }

  addToCart(): void {
    if (!this.product) return;
    this.cart.add(this.product, 1);
    alert('Hozzáadva a kosárhoz!');
  }
}
