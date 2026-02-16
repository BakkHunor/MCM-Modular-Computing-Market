import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Profile {
  email: string;
  username: string;
}

const KEY = 'mcm_profile';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly _profile$ = new BehaviorSubject<Profile | null>(this.read());
  readonly profile$ = this._profile$.asObservable();

  get profile(): Profile | null {
    return this._profile$.value;
  }

  get isLoggedIn(): boolean {
    return !!this._profile$.value;
  }

  login(email: string, remember: boolean = true): void {
    const username = this.deriveUsername(email);
    const profile: Profile = { email, username };
    // UI-only: "Remember me" → localStorage, különben sessionStorage
    if (remember) {
      localStorage.setItem(KEY, JSON.stringify(profile));
      sessionStorage.removeItem(KEY);
    } else {
      sessionStorage.setItem(KEY, JSON.stringify(profile));
      localStorage.removeItem(KEY);
    }
    this._profile$.next(profile);
  }

  register(email: string): void {
    // UI-only demo: ugyanazt csináljuk, mint a login-nál
    this.login(email);
  }

  logout(): void {
    localStorage.removeItem(KEY);
    sessionStorage.removeItem(KEY);
    this._profile$.next(null);
  }

  private read(): Profile | null {
    try {
      const raw = localStorage.getItem(KEY) || sessionStorage.getItem(KEY);
      return raw ? (JSON.parse(raw) as Profile) : null;
    } catch {
      return null;
    }
  }

  private deriveUsername(email: string): string {
    const at = email.indexOf('@');
    const base = at > 0 ? email.slice(0, at) : email;
    return base || 'user';
  }
}
