import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';

export interface Profile {
  username: string;
  email?: string;
}

const PROFILE_KEY = 'mcm_profile';
const TOKEN_KEY = 'mcm_token';

type LoginResponse = { token: string };

@Injectable({ providedIn: 'root' })
export class AuthService {
  // ⬇️ Itt állítsd a backend URL-t ha kell
  private readonly baseUrl = 'http://localhost:3000';

  private readonly _profile$ = new BehaviorSubject<Profile | null>(this.readProfile());
  readonly profile$ = this._profile$.asObservable();

  constructor(private http: HttpClient) {}

  get profile(): Profile | null {
    return this._profile$.value;
  }

  get isLoggedIn(): boolean {
    return !!this.getToken();
  }

  /** LOGIN: { username, password } -> { token } */
  login(username: string, password: string, remember: boolean = true): Observable<void> {
    return this.http
      .post<LoginResponse>(`${this.baseUrl}/api/auth/login`, { username, password })
      .pipe(
        tap((res) => this.storeToken(res.token, remember)),
        tap(() => {
          const profile: Profile = { username };
          this.storeProfile(profile, remember);
          this._profile$.next(profile);
        }),
        map(() => void 0)
      );
  }

  /** REGISTER: { username, email, password } */
  register(username: string, email: string, password: string): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/api/auth/register`, {
      username,
      email,
      password,
    });
  }

  logout(): void {
    localStorage.removeItem(PROFILE_KEY);
    sessionStorage.removeItem(PROFILE_KEY);
    localStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(TOKEN_KEY);
    this._profile$.next(null);
  }

  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY) ?? sessionStorage.getItem(TOKEN_KEY);
  }

  // --------- helpers ---------

  private storeToken(token: string, remember: boolean): void {
    const storage = remember ? localStorage : sessionStorage;
    storage.setItem(TOKEN_KEY, token);
    (remember ? sessionStorage : localStorage).removeItem(TOKEN_KEY);
  }

  private storeProfile(profile: Profile, remember: boolean): void {
    const storage = remember ? localStorage : sessionStorage;
    storage.setItem(PROFILE_KEY, JSON.stringify(profile));
    (remember ? sessionStorage : localStorage).removeItem(PROFILE_KEY);
  }

  private readProfile(): Profile | null {
    try {
      const raw = localStorage.getItem(PROFILE_KEY) || sessionStorage.getItem(PROFILE_KEY);
      return raw ? (JSON.parse(raw) as Profile) : null;
    } catch {
      return null;
    }
  }
}