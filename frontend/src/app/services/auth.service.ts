import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, switchMap, tap, map, catchError, of } from 'rxjs';

export interface Profile {
  username: string;
  email?: string;
  id?: number;
}

const PROFILE_KEY = 'mcm_profile';
const TOKEN_KEY = 'mcm_token';

function readJson<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(key) || sessionStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

function writeJson(key: string, value: unknown, remember: boolean): void {
  const target = remember ? localStorage : sessionStorage;
  const other = remember ? sessionStorage : localStorage;
  target.setItem(key, JSON.stringify(value));
  other.removeItem(key);
}

function writeToken(token: string, remember: boolean): void {
  const target = remember ? localStorage : sessionStorage;
  const other = remember ? sessionStorage : localStorage;
  target.setItem(TOKEN_KEY, token);
  other.removeItem(TOKEN_KEY);
}

function clearStorage(): void {
  localStorage.removeItem(PROFILE_KEY);
  sessionStorage.removeItem(PROFILE_KEY);
  localStorage.removeItem(TOKEN_KEY);
  sessionStorage.removeItem(TOKEN_KEY);
}

function decodeJwtPayload(token: string): any | null {
  try {
    const parts = token.split('.');
    if (parts.length < 2) return null;
    const payload = parts[1]
      .replace(/-/g, '+')
      .replace(/_/g, '/');
    const json = decodeURIComponent(
      atob(payload)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(json);
  } catch {
    return null;
  }
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly baseUrl = 'http://localhost:3000/api';

  private readonly _profile$ = new BehaviorSubject<Profile | null>(readJson<Profile>(PROFILE_KEY));
  readonly profile$ = this._profile$.asObservable();

  get profile(): Profile | null {
    return this._profile$.value;
  }

  get isLoggedIn(): boolean {
    const token = localStorage.getItem(TOKEN_KEY) || sessionStorage.getItem(TOKEN_KEY);
    return !!token;
  }

  constructor(private http: HttpClient) {
    // ha van token, próbáljuk a profilt frissíteni (nem kötelező)
    if (this.isLoggedIn && !this._profile$.value) {
      this.fetchProfile().subscribe();
    }
  }

  login(username: string, password: string, remember: boolean): Observable<void> {
    return this.http
      .post<{ token: string }>(`${this.baseUrl}/auth/login`, { username, password })
      .pipe(
        tap((res) => {
          writeToken(res.token, remember);
          const payload = decodeJwtPayload(res.token);
          const prof: Profile = {
            username: payload?.username ?? username,
            id: payload?.id,
          };
          writeJson(PROFILE_KEY, prof, remember);
          this._profile$.next(prof);
        }),
        // opcionális: backend /api/profile megkérés (ha szeretnéd pontosítani)
        switchMap(() => this.fetchProfile().pipe(catchError(() => of(void 0)))),
        map(() => void 0)
      );
  }

  register(username: string, email: string, password: string, remember: boolean): Observable<void> {
    return this.http
      .post(`${this.baseUrl}/auth/register`, { username, email, password })
      .pipe(
        // register nem ad tokent, ezért beléptetjük utána
        switchMap(() => this.login(username, password, remember))
      );
  }

  fetchProfile(): Observable<void> {
    // protected route: /api/profile
    return this.http.get<any>(`${this.baseUrl}/profile`).pipe(
      tap((res) => {
        const user = res?.user;
        if (!user) return;
        const existing = this._profile$.value;
        const prof: Profile = {
          username: user.username ?? existing?.username ?? 'user',
          id: user.id ?? user.user_id ?? existing?.id,
          email: user.email ?? existing?.email,
        };
        // itt nem tudjuk, remember volt-e, ezért localStorage-t preferáljuk, ha ott van token
        const remember = !!localStorage.getItem(TOKEN_KEY);
        writeJson(PROFILE_KEY, prof, remember);
        this._profile$.next(prof);
      }),
      map(() => void 0)
    );
  }

  logout(): void {
    clearStorage();
    this._profile$.next(null);
  }
}
