import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class TokenService {
  constructor(@Inject(PLATFORM_ID) private platformId: object) {}
  private key = 'hd_token';

  get(): string | null {
    if (isPlatformBrowser(this.platformId)) return localStorage.getItem(this.key);
    else return null;
  }

  set(token: string) {
    if (isPlatformBrowser(this.platformId)) localStorage.setItem(this.key, token);
  }

  clear() {
    if (isPlatformBrowser(this.platformId)) localStorage.removeItem(this.key);
  }

  isTokenExpired(token: string): boolean {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const expiry = payload.exp * 1000;
    return Date.now() > expiry;
  }

  isLoggedIn(): boolean {
    const token = this.get();
    if (!token || this.isTokenExpired(token)) return false;
    return true;
  }
}
