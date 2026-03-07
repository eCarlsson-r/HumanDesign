import { Router } from "@angular/router";
import { RouteMeta } from "@analogjs/router";
import { Observable, catchError, map, throwError } from 'rxjs';
import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js'; // Import for typing
import { HttpErrorResponse } from "@angular/common/http";
import { authGuard } from "../../core/guards/auth.guard";
import { DashboardService } from "../../core/api/dashboard.service";
import { AuthService } from "../../core/api/auth.service";

export const routeMeta: RouteMeta = {
  canActivate: [authGuard],
};
@Component({
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  template: `
  <div class="p-6 max-w-7xl mx-auto">
    <h1 class="text-3xl font-bold mb-6">Dashboard</h1>
    <div class="grid grid-cols-4 gap-6">
      <!-- Use the async pipe here -->
      <div class="card">
        <h2>Prospects</h2>
        <p class="text-4xl">{{(stats$ | async)?.prospects}}</p>
      </div>
      <div class="card">
        <h2>Team Members</h2>
        <p class="text-4xl">{{(stats$ | async)?.teamMembers}}</p>
      </div>
      <div class="card">
        <h2>Reports Generated</h2>
        <p class="text-4xl">{{(stats$ | async)?.reportsGenerated}}</p>
      </div>
      <div class="card">
        <h2>Today Prospects</h2>
        <p class="text-4xl">{{(stats$ | async)?.todayProspects}}</p>
      </div>
    </div>

    <div class="card">
      <h3>Prospects Created</h3>
      <canvas baseChart
        [datasets]="lineChartData"
        [labels]="chartLabels"
        [type]="'line'">
      </canvas>
    </div>
  </div>
  `
})
export default class DashboardPage implements OnInit {
  stats$!: Observable<any>; // Declare as an Observable

  chartLabels: string[] = [];
  lineChartData: ChartConfiguration<'line'>['data']['datasets'] = [
    { data: [], label: 'Prospects Created' }
  ];

  constructor(private dashboard: DashboardService, private auth: AuthService, private router: Router) {}

  ngOnInit() {
    this.stats$ = this.dashboard.getStats().pipe(
      map(stats => {
        const trendData = stats.chartStats || [];

        // Update labels and data
        this.chartLabels = trendData.map((item: any) => item.date);
        this.lineChartData = [
          {
            data: trendData.map((item: any) => item.count),
            label: 'Prospects Created'
          }
        ];

        return stats; // Return original stats for other bindings
      }),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.auth.logout();
          this.router.navigate(['/login']);
        }
        // Rethrow error if it's not a 401
        return throwError(() => error);
      })
    );
  }
}
