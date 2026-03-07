import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';

type Slide = {
  title: string;
  subtitle?: string;
  imageUrl: string;
  ctaText?: string;
  link?: string;
};

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit, OnDestroy {
  featured: Product[] = [];

  get kiemelt4(): Product[] {
    return (this.featured || []).slice(0, 4);
  }

  get kulcsok5(): Product[] {
    const keys = (this.featured || []).filter(p => p.category === "game-key");
    if (keys.length >= 4) return keys.slice(0, 4);
    const allProducts = this.featured || [];
    const otherKeys = allProducts.filter(p => p.category !== "game-key").slice(0, 4 - keys.length);
    return [...keys, ...otherKeys];
  }

  get giftcard5(): Product[] {
    const cards = (this.featured || []).filter(p => p.category === "gift-card");
    if (cards.length >= 4) return cards.slice(0, 4);
    const allProducts = this.featured || [];
    const others = allProducts.filter(p => p.category !== "gift-card").slice(0, 4 - cards.length);
    return [...cards, ...others];
  }

  get hardver5(): Product[] {
    const hw = (this.featured || []).filter(p => p.category === "hardware");
    if (hw.length >= 4) return hw.slice(0, 4);
    const allProducts = this.featured || [];
    const others = allProducts.filter(p => p.category !== "hardware").slice(0, 4 - hw.length);
    return [...hw, ...others];
  }

  slides: Slide[] = [
    {
      title: 'GTA 6 – Előrendelés',
      subtitle: 'Limitált készlet • vedd meg időben',
      imageUrl: 'assets/ads/gta6.jpg',
      ctaText: 'Megnézem',
      link: '/search',
    },
    {
      title: 'Resident Evil: Requiem – Out now',
      subtitle: 'Új megjelenés • azonnali kulcs',
      imageUrl: 'assets/ads/re-requiem.jpg',
      ctaText: 'Megnézem',
      link: '/search',
    },
    {
      title: 'Steam Wallet akció',
      subtitle: 'Ajándékkártyák • gyors kiszállítás',
      imageUrl: 'assets/ads/steam.jpg',
      ctaText: 'Megnézem',
      link: '/search',
    },
  ];

  activeSlide = 0;
  private timer: any;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getFeatured().subscribe((p) => (this.featured = p));

    this.timer = setInterval(() => this.next(), 6000);
  }

  ngOnDestroy(): void {
    if (this.timer) clearInterval(this.timer);
  }

  next(): void {
    this.activeSlide = (this.activeSlide + 1) % this.slides.length;
  }

  prev(): void {
    this.activeSlide = (this.activeSlide - 1 + this.slides.length) % this.slides.length;
  }

  goTo(i: number): void {
    this.activeSlide = i;
  }
}
