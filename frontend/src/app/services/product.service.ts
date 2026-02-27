import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, shareReplay } from 'rxjs';
import { Product } from '../models/product.model';

type ApiProduct = {
  product_id: number;
  name: string;
  category: 'gamekey' | 'giftcard' | 'hardware';
  price: number;
  stock: number;
  require_login: boolean;
  image_url: string | null;
};

@Injectable({ providedIn: 'root' })
export class ProductService {
  private readonly baseUrl = 'http://localhost:3000';

  // cache-eljük a listát, hogy home + listing + detail ne lőjön külön-külön 10 requestet
  private readonly products$: Observable<Product[]> = this.http
    .get<ApiProduct[]>(`${this.baseUrl}/api/products`)
    .pipe(
      map((list) => list.map((p) => this.mapToUi(p))),
      shareReplay(1)
    );

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.products$;
  }

  getById(id: string): Observable<Product | undefined> {
    return this.products$.pipe(map((list) => list.find((p) => p.id === id)));
  }

  getFeatured(): Observable<Product[]> {
    // ha a modelben van isFeatured, akkor az alapján
    // ha nincs, akkor pl. az első 6-ot adjuk (design miatt)
    return this.products$.pipe(
      map((list) => {
        const anyFeatured = list.some((p: any) => (p as any).isFeatured === true);
        if (anyFeatured) return list.filter((p: any) => (p as any).isFeatured === true);
        return list.slice(0, 6);
      })
    );
  }

private mapToUi(p: ApiProduct): Product {
    const category =
      p.category === 'gamekey'
        ? 'game-key'
        : p.category === 'giftcard'
        ? 'gift-card'
        : 'hardware';

    // Ha van image_url a backend-től, használjuk, különben placeholder
    const imageUrl = p.image_url 
      ? `http://localhost:3000/uploads/${p.image_url}`
      : this.imageFor(category);

    return {
      id: String(p.product_id),
      name: p.name,
      category: category as any,
      price: Number(p.price),
      platform: this.derivePlatform(p.name),
      imageUrl,
      isFeatured: false,
      stock: p.stock,
      requiresLogin: !!p.require_login,
    } as Product;
  }

  private derivePlatform(name: string): string | undefined {
    const n = name.toLowerCase();
    if (n.includes('steam')) return 'Steam';
    if (n.includes('psn') || n.includes('playstation')) return 'PSN';
    if (n.includes('xbox')) return 'Xbox';
    if (n.includes('ea')) return 'EA App';
    if (n.includes('microsoft')) return 'Microsoft';
    if (n.includes('windows')) return 'Windows';
    return undefined;
  }

  private imageFor(category: string): string {
    // ✅ via.placeholder helyett placehold.co, mert nálad a via DNS hibát dob
    if (category === 'game-key') return 'https://placehold.co/400x250?text=Game+Key';
    if (category === 'gift-card') return 'https://placehold.co/400x250?text=Gift+Card';
    return 'https://placehold.co/400x250?text=Hardware';
  }
}