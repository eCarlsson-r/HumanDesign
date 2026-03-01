import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface AttributeDetail {
  name: string;
  description: string;
}

export interface CenterState {
  name: string;
  isDefined: boolean;
}

export interface HumanDesignReport {
  level: string;

  type?: AttributeDetail;
  strategy?: AttributeDetail;
  signature?: AttributeDetail;
  notSelfTheme?: AttributeDetail;
  authority: string;
  definition: string;

  profile?: AttributeDetail;
  cross?: AttributeDetail;

  variables: Record<string, AttributeDetail>;

  centers: CenterState[];

  gates: AttributeDetail[];
  channels: AttributeDetail[];
}

@Injectable({ providedIn: 'root' })
export class ReportApiService {
  private base = `${import.meta.env['VITE_API_URL']}/human-design`;

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
