import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, map, of, tap, throwError } from 'rxjs';

export interface Profile {
  username: string;
  email?: string; // regisztrációnál elérhető
}

export interface AuthState {
  profile: Profile;
  token: string;
}

const KEY_LOCAL = 'mcm_auth_local';
const KEY_SESSION = 'mcm_auth_session';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly _state$ = new BehaviorSubject<AuthState | null>(this.read());
  readonly state$ = this._state$.asObservable();

  constructor(private http: HttpClient) {}

  get state(): AuthState | null {
    return this._state$.value;
  }

  get token(): string | null {
    return this._state$.value?.token ?? null;
  }

  get profile(): Profile | null {
    return this._state$.value?.profile ?? null;
  }

  get isLoggedIn(): boolean {
    return !!this._state$.value?.token;
  }

  /**
   * Backend: POST /api/auth/register
   * Body: { username, email, password }
   */
  register(payload: { username: string; email: string; password: string }): Observable<Profile> {
    return this.http.post<any>('/api/auth/register', payload).pipe(
      map((res) => {
        const user = res?.user;
        return { username: user?.username ?? payload.username, email: user?.email ?? payload.email } as Profile;
      })
    );
  }

  /**
   * Backend: POST /api/auth/login
   * Body: { username, password }
   * Response: { token }
   */
  login(payload: { username: string; password: string; remember: boolean }): Observable<void> {
    const { remember, ...body } = payload;
    return this.http.post<any>('/api/auth/login', body).pipe(
      map((res) => {
        const token = res?.token;
        if (!token) throw new Error('Hiányzó token a válaszban');
        return token as string;
      }),
      tap((token) => {
        // A login válaszból csak a username ismert biztosan.
        const state: AuthState = {
          token,
          profile: { username: payload.username }
        };
        this.write(state, remember);
        this._state$.next(state);
      }),
      map(() => void 0)
    );
  }

  /**
   * Backend: GET /api/profile (védett)
   * Response: { user: { username, iat, exp } }
   */
  refreshProfile(): Observable<Profile | null> {
    if (!this.token) return of(null);
    return this.http.get<any>('/api/profile').pipe(
      map((res) => ({ username: res?.user?.username ?? this.profile?.username ?? 'user' })),
      tap((profile) => {
        const current = this._state$.value;
        if (!current) return;
        const next: AuthState = { ...current, profile: { ...current.profile, ...profile } };
        // ugyanoda írjuk vissza, ahol volt
        const isLocal = !!localStorage.getItem(KEY_LOCAL);
        this.write(next, isLocal);
        this._state$.next(next);
      }),
      catchError(() => of(this.profile))
    );
  }

  logout(): void {
    localStorage.removeItem(KEY_LOCAL);
    sessionStorage.removeItem(KEY_SESSION);
    this._state$.next(null);
  }

  private read(): AuthState | null {
    try {
      const raw = localStorage.getItem(KEY_LOCAL) || sessionStorage.getItem(KEY_SESSION);
      return raw ? (JSON.parse(raw) as AuthState) : null;
    } catch {
      return null;
    }
  }

  private write(state: AuthState, remember: boolean): void {
    const json = JSON.stringify(state);
    if (remember) {
      localStorage.setItem(KEY_LOCAL, json);
      sessionStorage.removeItem(KEY_SESSION);
    } else {
      sessionStorage.setItem(KEY_SESSION, json);
      localStorage.removeItem(KEY_LOCAL);
    }
  }
}
