import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartState } from '../models/cart.model';
import { Product } from '../models/product.model';

const STORAGE_KEY = 'mcm_cart_v1';

function loadState(): CartState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { items: [] };
    const parsed = JSON.parse(raw) as CartState;
    return parsed?.items ? parsed : { items: [] };
  } catch {
    return { items: [] };
  }
}

function saveState(state: CartState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly _state$ = new BehaviorSubject<CartState>(loadState());
  readonly state$ = this._state$.asObservable();

  get items() { return this._state$.value.items; }
  get count() { return this.items.reduce((a, it) => a + it.quantity, 0); }
  get subtotal() { return this.items.reduce((a, it) => a + it.quantity * it.product.price, 0); }

  add(product: Product, qty = 1) {
    const items = [...this.items];
    const idx = items.findIndex(i => i.product.id === product.id);
    if (idx >= 0) items[idx] = { ...items[idx], quantity: items[idx].quantity + qty };
    else items.push({ product, quantity: qty });

    const next: CartState = { items };
    this._state$.next(next);
    saveState(next);
  }

  inc(id: string) {
    const it = this.items.find(i => i.product.id === id);
    if (it) this.setQuantity(id, it.quantity + 1);
  }

  dec(id: string) {
    const it = this.items.find(i => i.product.id === id);
    if (it) this.setQuantity(id, Math.max(1, it.quantity - 1));
  }

  setQuantity(id: string, quantity: number) {
    const q = Math.max(1, Math.floor(quantity || 1));
    const items = this.items.map(i => i.product.id === id ? { ...i, quantity: q } : i);
    const next: CartState = { items };
    this._state$.next(next);
    saveState(next);
  }

  remove(id: string) {
    const next: CartState = { items: this.items.filter(i => i.product.id !== id) };
    this._state$.next(next);
    saveState(next);
  }

  clear() {
    const next: CartState = { items: [] };
    this._state$.next(next);
    saveState(next);
  }
}
