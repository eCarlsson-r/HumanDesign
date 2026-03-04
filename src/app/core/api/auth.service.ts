import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TokenService } from './token.service';
import { jwtDecode } from 'jwt-decode';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private api = '/api/auth';

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
    this.token.clear();
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
    return decoded["nameid"];
  }
}
