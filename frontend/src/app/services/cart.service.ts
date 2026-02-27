import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, combineLatest, forkJoin, map, Observable, of, switchMap, tap } from 'rxjs';
import { ProductService } from './product.service';
import { Product } from '../models/product.model';

export type CartItem = { product: Product; quantity: number };

type ApiCartItem = {
  product_id: number;
  quantity: number;
};

// a backend többféleképp adhatja vissza, ezért toleránsak vagyunk:
type ApiCartResponse =
  | ApiCartItem[]
  | { items: ApiCartItem[] }
  | { cart: ApiCartItem[] }
  | { data: ApiCartItem[] };

function normalizeCart(resp: ApiCartResponse): ApiCartItem[] {
  if (Array.isArray(resp)) return resp;
  if ((resp as any).items) return (resp as any).items;
  if ((resp as any).cart) return (resp as any).cart;
  if ((resp as any).data) return (resp as any).data;
  return [];
}

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly baseUrl = 'http://localhost:3000';

  private readonly _items$ = new BehaviorSubject<CartItem[]>([]);
  readonly items$ = this._items$.asObservable();

  /** Template-k miatt kényelmes getterek */
  get items(): CartItem[] {
    return this._items$.value;
  }

  get count(): number {
    return this.items.reduce((sum, it) => sum + (it.quantity || 0), 0);
  }

  get subtotal(): number {
    return this.items.reduce((sum, it) => sum + (Number(it.product.price) || 0) * (it.quantity || 0), 0);
  }

  constructor(private http: HttpClient, private products: ProductService) {}

  /** Mindig a backend kosarat olvassa be és összeköti a terméklistával */
  sync(): Observable<void> {
    return this.http.get<ApiCartResponse>(`${this.baseUrl}/api/cart`).pipe(
      map((resp) => normalizeCart(resp)),
      switchMap((apiItems) => {
        // Kell a termék lista, hogy legyen név/ár/kép a kosárban
        return this.products.getProducts().pipe(
          map((plist) => {
            const mapped: CartItem[] = apiItems
              .map((row) => {
                const found = plist.find((p) => Number(p.id) === Number(row.product_id));
                const product: Product =
                  found ??
                  ({
                    id: String(row.product_id),
                    name: `Termék #${row.product_id}`,
                    category: 'game-key',
                    price: 0,
                    imageUrl: '',
                  } as any);

                return { product, quantity: Number(row.quantity) || 0 };
              })
              .filter((x) => x.quantity > 0);

            return mapped;
          })
        );
      }),
      tap((mapped) => this._items$.next(mapped)),
      map(() => void 0)
    );
  }

  /** Elfogad Product-et is (mert nálad volt ilyen hiba: this.cart.add(this.product, 1)) */
  add(productOrId: Product | number | string, quantity: number = 1): Observable<void> {
    const productId = this.toId(productOrId);
    return this.http
      .post(`${this.baseUrl}/api/cart/add`, {
        product_id: productId,
        quantity: Number(quantity) || 1,
      })
      .pipe(switchMap(() => this.sync()));
  }

  inc(productOrId: Product | number | string): Observable<void> {
    return this.add(productOrId, 1);
  }

  dec(productOrId: Product | number | string): Observable<void> {
    const productId = this.toId(productOrId);
    const currentQty = this.items.find((it) => Number(it.product.id) === Number(productId))?.quantity ?? 0;

    // ha 1-ről csökkentenénk, akkor remove
    if (currentQty <= 1) return this.remove(productId);

    return this.add(productId, -1);
  }

  remove(productOrId: Product | number | string): Observable<void> {
    const productId = this.toId(productOrId);
    return this.http
      .request('delete', `${this.baseUrl}/api/cart/remove`, {
        body: { product_id: productId },
      })
      .pipe(switchMap(() => this.sync()));
  }

  clear(): Observable<void> {
    const ids = this.items.map((it) => Number(it.product.id)).filter((x) => Number.isFinite(x));
    if (ids.length === 0) return of(void 0);

    return forkJoin(ids.map((id) => this.remove(id))).pipe(map(() => void 0));
  }

  private toId(productOrId: Product | number | string): number {
    if (typeof productOrId === 'number') return productOrId;
    if (typeof productOrId === 'string') return Number(productOrId);
    return Number(productOrId.id);
  }
}