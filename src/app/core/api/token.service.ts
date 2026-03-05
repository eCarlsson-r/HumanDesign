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

  isLoggedIn(): boolean {
    return !!this.get();
  }
}
