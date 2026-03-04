import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
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
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit, OnDestroy {
  featured: Product[] = [];

  get kiemelt4(): Product[] {
    return (this.featured || []).slice(0, 4);
  }

  get kulcsok4(): Product[] {
    return (this.featured || []).filter(p => p.category === "game-key").slice(0, 4);
  }

  get giftcard4(): Product[] {
    return (this.featured || []).filter(p => p.category === "gift-card").slice(0, 4);
  }

  // ✅ Reklám slideshow: ide tudsz képeket berakni (assets mappából is)
  slides: Slide[] = [
    {
      title: 'GTA 6 – Előrendelés',
      subtitle: 'Limitált készlet • vedd meg időben',
      imageUrl: 'assets/ads/gta6.jpg',
      ctaText: 'Megnézem',
      link: '/search?q=gta',
    },
    {
      title: 'Resident Evil: Requiem – Out now',
      subtitle: 'Új megjelenés • azonnali kulcs',
      imageUrl: 'assets/ads/re-requiem.jpg',
      ctaText: 'Megnézem',
      link: '/search?q=resident',
    },
    {
      title: 'Steam Wallet akció',
      subtitle: 'Ajándékkártyák • gyors kiszállítás',
      imageUrl: 'assets/ads/steam.jpg',
      ctaText: 'Megnézem',
      link: '/search?q=steam',
    },
  ];

  activeSlide = 0;
  private timer: any;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getFeatured().subscribe((p) => (this.featured = p));

    // auto-rotate
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
