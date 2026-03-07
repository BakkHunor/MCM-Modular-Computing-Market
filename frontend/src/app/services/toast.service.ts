import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type ToastState = {
  title: string;
  text: string;
  kind: 'cart-success' | 'error';
} | null;

@Injectable({ providedIn: 'root' })
export class ToastService {
  private readonly _state$ = new BehaviorSubject<ToastState>(null);
  readonly state$ = this._state$.asObservable();

  showCartSuccess(text = 'Sikeresen beraktuk a terméket a kosárba.'): void {
    this._state$.next({ title: 'Kosárba helyezve', text, kind: 'cart-success' });
  }

  showError(text: string): void {
    this._state$.next({ title: 'Hiba', text, kind: 'error' });
  }

  close(): void { this._state$.next(null); }
}
