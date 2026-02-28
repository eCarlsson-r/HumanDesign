import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class ReportApiService {

  private baseUrl = `${import.meta.env['VITE_API_URL']}/human-design`;

  constructor(private http: HttpClient) {}

  getPreview(id: string) {
    return this.http.get<any>(`${this.baseUrl}/${id}/preview`);
  }

  getSummary(id: string) {
    return this.http.get<any>(`${this.baseUrl}/${id}/summary`);
  }

  getDetail(id: string) {
    return this.http.get<any>(`${this.baseUrl}/${id}/detail`);
  }
}
