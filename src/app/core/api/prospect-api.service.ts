import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CreateProspectRequest {
  name: string;
  birthDate: string;
  birthTime: string;
  birthPlace: string;
}

export interface HumanDesignReport {
  name: string;
  type: string;
  profile: string;
  authority: string;
  strategy: string;
  incarnationCrossDescription: string;

  definedCenters: string[];
  channels: Channel[];
  gates: Gate[];

  diagramData: DiagramData;
}

export interface Channel {
  name: string;
  description: string;
}

export interface Gate {
  number: number;
  description: string;
}

export interface DiagramData {
  definedCenters: number[];
  activeGates: number[];
  activeChannels: [number, number][];
}

@Injectable({ providedIn: 'root' })
export class ProspectApiService {
  private baseUrl = `${import.meta.env['VITE_API_URL']}/prospects`;

  constructor(private http: HttpClient) {}

  getProspect(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  getProspects(page: number, pageSize: number, search: string): Observable<{items: any[], total: number}> {
    return this.http.get<{items: any[], total: number}>(`${this.baseUrl}?page=${page}&pageSize=${pageSize}&search=${search}`);
  }

  createProspect(req: CreateProspectRequest, referralCode: string | null): Observable<{prospectId: string | null, report: HumanDesignReport}> {
    return this.http.post<{prospectId: string | null, report: HumanDesignReport}>(referralCode ? this.baseUrl+`?r=${referralCode}` : this.baseUrl, req);
  }

  getReport(id: string): Observable<HumanDesignReport> {
    return this.http.get<HumanDesignReport>(`${this.baseUrl}/${id}/report`);
  }
}
