import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TokenService } from './token.service';
import { jwtDecode } from 'jwt-decode';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private api = '/api/auth';
  private logoutTimer: any;

  constructor(
    private http: HttpClient,
    private token: TokenService
  ) {}

  login(email: string, password: string) {
    return this.http.post<any>(`${this.api}/login`, { email, password });
  }

  register(email: string, password: string, parentId?: string) {
    return this.http.post<any>(`${this.api}/register`, {
      email,
      password,
      parentId
    });
  }

  saveToken(token: string) {
    this.token.set(token);
  }

  logout() {
    this.clearLogoutTimer();
    this.token.clear();
  }

  scheduleLogout(token: string) {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const expiry = payload.exp * 1000;
    const timeout = expiry - Date.now();

    this.clearLogoutTimer();

    this.logoutTimer = setTimeout(() => {
      this.logout()
    }, timeout);
  }

  clearLogoutTimer() {
    if (this.logoutTimer) {
      clearTimeout(this.logoutTimer);
      this.logoutTimer = null;
    }
  }

  getRole(): string | null {
    const t = this.token.get();
    if (!t) return null;

    const decoded: any = jwtDecode(t);
    return decoded["role"] || decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
  }

  getUserId(): string | null {
    const t = this.token.get();
    if (!t) return null;

    const decoded: any = jwtDecode(t);
    return decoded["nameid"] || decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
  }

  getReferralCode(): string | null {
    const t = this.token.get();
    if (!t) return null;

    const decoded: any = jwtDecode(t);
    return decoded["referral_code"];
  }

  getProspectStatus() {
    const t = this.token.get();
    if (!t) return null;

    const decoded: any = jwtDecode(t);
    return decoded["prospect_status"];
  }
}
