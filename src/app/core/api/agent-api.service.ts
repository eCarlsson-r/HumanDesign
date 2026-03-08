import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { TokenService } from "./token.service";
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class AgentService {
  private baseUrl = '/api/agents';

  constructor(private http: HttpClient, private token: TokenService) {}

  getAgents(page: number, pageSize: number, search: string): Observable<{items: any[], total: number}> {
    let url = `${this.baseUrl}?page=${page}&pageSize=${pageSize}`;
    if (search != '') url += `&search=${search}`
    return this.http.get<{items: any[], total: number}>(url,
      {
        headers: {
          authorization: this.token.get() ?? ''
        }
      }
    );
  }

  getAgent(id: string): Observable<any> {
    return this.http.get<any>(
      `${this.baseUrl}/${id}`,
      {
        headers: {
          authorization: this.token.get() ?? ''
        }
      }
    );
  }

  getLeaders() {
    return this.http.get(`${this.baseUrl}/leaders`,
      {
        headers: {
          authorization: this.token.get() ?? ''
        }
      }
    );
  }

  updateAgent(id: string, data: any) {
    return this.http.put(
      `${this.baseUrl}/${id}`, data,
      {
        headers: {
          authorization: this.token.get() ?? ''
        }
      }
    );
  }

}
