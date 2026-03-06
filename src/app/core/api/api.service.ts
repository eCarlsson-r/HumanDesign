import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenService } from './token.service';

@Injectable({ providedIn: 'root' })
export class ApiService {
  constructor(
    private http: HttpClient,
    private token: TokenService
  ) {}

  get<T>(url: string) {
    const authToken = this.token.get();
    if (authToken) return this.http.get<T>(`api/${url}`, {
      headers: {
        authorization: authToken ?? ''
      }
    });
    else return this.http.get<T>(`api/${url}`);
  }

  post<T>(url: string, body: any) {
    const authToken = this.token.get();
    if (authToken) return this.http.post<T>(`api/${url}`, body, {
      headers: {
        authorization: authToken ?? ''
      }
    });
    else return this.http.post<T>(`api/${url}`, body);
  }

  put<T>(url: string, body: any) {
    const authToken = this.token.get();
    if (authToken) return this.http.put<T>(`api/${url}`, body, {
      headers: {
        authorization: authToken ?? ''
      }
    });
    else return this.http.put<T>(`api/${url}`, body);
  }
}
