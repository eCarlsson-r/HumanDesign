import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HumanDesignReport } from '../../features/human-design/models/report.model';

@Injectable({ providedIn: 'root' })
export class ReportApiService {
  private base = '/api/human-design';

  constructor(private http: HttpClient) {}

  getPreview(id: string): Observable<HumanDesignReport> {
    return this.http.get<HumanDesignReport>(`${this.base}/${id}/preview`);
  }

  getSummary(id: string): Observable<HumanDesignReport> {
    return this.http.get<HumanDesignReport>(`${this.base}/${id}/summary`);
  }

  getDetail(id: string): Observable<HumanDesignReport> {
    return this.http.get<HumanDesignReport>(`${this.base}/${id}/detail`);
  }
}
