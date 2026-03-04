import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CartDrawerService {
  private readonly _open$ = new BehaviorSubject<boolean>(false);
  readonly open$ = this._open$.asObservable();

  get isOpen(): boolean {
    return this._open$.value;
  }

  open(): void {
    this._open$.next(true);
  }

  close(): void {
    this._open$.next(false);
  }

  toggle(): void {
    this._open$.next(!this._open$.value);
  }
}
