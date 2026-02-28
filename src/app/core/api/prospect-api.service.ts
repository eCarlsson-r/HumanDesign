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

  createProspect(req: CreateProspectRequest): Observable<string> {
    return this.http.post<string>(this.baseUrl, req);
  }

  getReport(id: string): Observable<HumanDesignReport> {
    return this.http.get<HumanDesignReport>(`${this.baseUrl}/${id}/report`);
  }
}
