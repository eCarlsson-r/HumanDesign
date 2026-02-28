import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ProspectApiService, HumanDesignReport } from '../../../core/api/prospect-api.service';

@Injectable({ providedIn: 'root' })
export class ChartFacade {

  private loadingSubject = new BehaviorSubject(false);
  loading$ = this.loadingSubject.asObservable();

  private reportSubject = new BehaviorSubject<HumanDesignReport | null>(null);
  report$ = this.reportSubject.asObservable();

  constructor(private api: ProspectApiService) {}

  generate(form: any) {
    this.loadingSubject.next(true);

    this.api.createProspect(form).subscribe({
      next: (id) => {
        this.api.getReport(id).subscribe({
          next: (report) => {
            this.reportSubject.next(report);
            this.loadingSubject.next(false);
          },
          error: () => this.loadingSubject.next(false)
        });
      },
      error: () => this.loadingSubject.next(false)
    });
  }

}
