import { HttpInterceptorFn } from '@angular/common/http';

const SESSION_KEY = 'mcm_session_id';
const TOKEN_KEY = 'mcm_token';

function makeSessionId(): string {
  return (crypto as any)?.randomUUID?.() ?? Math.random().toString(36).slice(2);
}

function getOrCreateSessionId(): string {
  const existing = localStorage.getItem(SESSION_KEY);
  if (existing) return existing;

  const sid = makeSessionId();
  localStorage.setItem(SESSION_KEY, sid);
  return sid;
}

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const sessionId = getOrCreateSessionId();
  const token = localStorage.getItem(TOKEN_KEY);

  let headers = req.headers.set('x-session-id', sessionId);

  if (token) {
    headers = headers.set('Authorization', `Bearer ${token}`);
  }

  return next(req.clone({ headers }));
};