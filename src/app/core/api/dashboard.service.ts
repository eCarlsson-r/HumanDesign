import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TokenService } from './token.service';

@Injectable({ providedIn: 'root' })
export class DashboardService {

  constructor(
    private http: HttpClient,
    private token: TokenService
  ) {}

  getStats() {
    return this.http.get<any>(
      '/api/dashboard/stats',
      {
        headers: {
          authorization: this.token.get() ?? ''
        }
      }
    );
  }

}
