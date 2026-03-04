import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private http = inject(HttpClient);

  get<T>(url: string) {
    return this.http.get<T>(`${import.meta.env['VITE_API_URL']}${url}`);
  }

  post<T>(url: string, body: any) {
    return this.http.post<T>(`${import.meta.env['VITE_API_URL']}${url}`, body);
  }
}
