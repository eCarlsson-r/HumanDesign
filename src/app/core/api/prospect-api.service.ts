import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from './token.service';

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
  private baseUrl = '/api/prospect';

  constructor(private http: HttpClient, private token: TokenService) {}

  getProspect(id: string): Observable<any> {
    return this.http.get<any>(
      `${this.baseUrl}/${id}`,
      {
        headers: {
          authorization: this.token.get() ?? ''
        }
      }
    );
  }

  getProspects(page: number, pageSize: number, search: string): Observable<{items: any[], total: number}> {
    return this.http.get<{items: any[], total: number}>(
      `${this.baseUrl}?page=${page}&pageSize=${pageSize}&search=${search}`,
      {
        headers: {
          authorization: this.token.get() ?? ''
        }
      }
    );
  }

  createProspect(req: CreateProspectRequest, referralCode: string | null): Observable<{prospectId: string | null, report: HumanDesignReport}> {
    return this.http.post<{prospectId: string | null, report: HumanDesignReport}>(
      referralCode ? this.baseUrl+`?r=${referralCode}` : this.baseUrl, req,
      {
        headers: {
          authorization: this.token.get() ?? ''
        }
      }
    );
  }

  getReport(id: string): Observable<HumanDesignReport> {
    return this.http.get<HumanDesignReport>(
      `${this.baseUrl}/${id}/report`,
      {
        headers: {
          authorization: this.token.get() ?? ''
        }
      }
    );
  }

  searchLocation(query:string) {

    const url =
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`;

    return this.http.get(url);

  }

}
