import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class ProductService {
  // MOCK ADATOK (amíg a backend nincs kész)
  private readonly mockProducts: Product[] = [
    {
      id: '1',
      name: 'EA SPORTS FC 26 (PC) - Key',
      category: 'game-key',
      price: 23990,
      platform: 'EA App',
      imageUrl: 'https://via.placeholder.com/400x250?text=FC+26',
      isFeatured: true,
    },
    {
      id: '2',
      name: 'Cyberpunk 2077 (Steam) - Key',
      category: 'game-key',
      price: 12990,
      platform: 'Steam',
      imageUrl: 'https://via.placeholder.com/400x250?text=Cyberpunk+2077',
      isFeatured: true,
    },
    {
      id: '3',
      name: 'Steam Gift Card 20 EUR',
      category: 'gift-card',
      price: 7990,
      platform: 'Steam',
      imageUrl: 'https://via.placeholder.com/400x250?text=Steam+20EUR',
      isFeatured: true,
    },
    {
      id: '4',
      name: 'NVIDIA GeForce RTX 4060 8GB',
      category: 'hardware',
      price: 124990,
      imageUrl: 'https://via.placeholder.com/400x250?text=RTX+4060',
      isFeatured: true,
    },
    {
      id: '5',
      name: 'AMD Ryzen 7 7800X3D',
      category: 'hardware',
      price: 149990,
      imageUrl: 'https://via.placeholder.com/400x250?text=Ryzen+7800X3D',
    },
    {
      id: '6',
      name: 'PlayStation Store Gift Card 10 000 HUF',
      category: 'gift-card',
      price: 10990,
      platform: 'PSN',
      imageUrl: 'https://via.placeholder.com/400x250?text=PSN+Gift+Card',
    },
    {
      id: '7',
      name: 'Windows 11 Pro (OEM) - Key',
      category: 'game-key',
      price: 6990,
      platform: 'Windows',
      imageUrl: 'https://via.placeholder.com/400x250?text=Win11+Pro',
    },
    {
      id: '8',
      name: 'Corsair Vengeance 32GB DDR5 6000',
      category: 'hardware',
      price: 44990,
      imageUrl: 'https://via.placeholder.com/400x250?text=DDR5+32GB',
    },
    {
      id: '9',
      name: 'Elden Ring (Steam) - Key',
      category: 'game-key',
      price: 17990,
      platform: 'Steam',
      imageUrl: 'https://via.placeholder.com/400x250?text=Elden+Ring',
    },
    {
      id: '10',
      name: 'Xbox Gift Card 15 EUR',
      category: 'gift-card',
      price: 6490,
      platform: 'Xbox',
      imageUrl: 'https://via.placeholder.com/400x250?text=Xbox+15EUR',
    },
    {
      id: '11',
      name: 'Samsung 990 PRO 1TB NVMe SSD',
      category: 'hardware',
      price: 39990,
      imageUrl: 'https://via.placeholder.com/400x250?text=NVMe+1TB',
    },
    {
      id: '12',
      name: 'Minecraft Java & Bedrock (PC) - Key',
      category: 'game-key',
      price: 9990,
      platform: 'Microsoft',
      imageUrl: 'https://via.placeholder.com/400x250?text=Minecraft',
    },
  ];

  getProducts(): Observable<Product[]> {
    return of(this.mockProducts);
  }

  getById(id: string): Observable<Product | undefined> {
    return of(this.mockProducts.find((p) => p.id === id));
  }

  getFeatured(): Observable<Product[]> {
    return of(this.mockProducts.filter((p) => p.isFeatured));
  }
}
