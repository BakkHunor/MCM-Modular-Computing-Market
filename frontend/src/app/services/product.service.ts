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
 requires_login: boolean;
 image_url: string | null;
};
@Injectable({ providedIn: 'root' })
export class ProductService {
 private readonly baseUrl = 'http://localhost:3000';
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
    return this.products$;
  }
private mapToUi(p: ApiProduct): Product {
 const category =
 p.category === 'gamekey'
 ? 'game-key'
 : p.category === 'giftcard'
 ? 'gift-card'
 : 'hardware';
  const rawImage = (p.image_url ?? '').toString().trim();
  const imageUrl = rawImage
    ? this.normalizeImageUrl(rawImage)
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
 requiresLogin: !!p.requires_login,
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
 if (category === 'game-key') return 'https://placehold.co/400x250?text=Game+Key';
 if (category === 'gift-card') return 'https://placehold.co/400x250?text=Gift+Card';
 return 'https://placehold.co/400x250?text=Hardware';
 }

 private normalizeImageUrl(imagePath: string): string {
 if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
   return imagePath;
 }
 return `${this.baseUrl}/uploads/${imagePath}`;
 }
}
