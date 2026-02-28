import { Injectable } from '@angular/core';
import { ProspectApiService, HumanDesignReport } from '../api/prospect-api.service';
import { Observable, switchMap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ReportService {

  constructor(private api: ProspectApiService) {}

  generateReport(formData: any): Observable<HumanDesignReport> {
    return this.api.createProspect(formData).pipe(
      switchMap(id => this.api.getReport(id))
    );
  }

}
