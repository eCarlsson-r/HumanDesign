import { Router } from "@angular/router";
import { RouteMeta } from "@analogjs/router";
import { Observable, map } from 'rxjs';
import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BaseChartDirective } from 'ng2-charts';
import { authGuard } from "../../core/guards/auth.guard";
import { DashboardService } from "../../core/api/dashboard.service";
import { AuthService } from "../../core/api/auth.service";
import { ChartConfiguration, Chart, LineController, LineElement, PointElement, LinearScale, Title, CategoryScale } from 'chart.js';
Chart.register(LineController, LineElement, PointElement, LinearScale, Title, CategoryScale);

export const routeMeta: RouteMeta = {
  canActivate: [authGuard],
};
@Component({
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  template: `
  <div class="p-6 max-w-7xl mx-auto">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-3xl font-bold mb-6">Dashboard</h1>

      <!-- Search -->
      <div class="flex gap-4 mb-6 items-center">
        Referral Code
        <b>{{ referralCode }}</b>
        <button
          (click)="shareReferral()"
          class="bg-emerald-600 text-white px-4 py-2 rounded-lg"
        >
          Share Referral Link
        </button>
      </div>
    </div>

    <div class="grid grid-cols-4 gap-6">
      <!-- Use the async pipe here -->
      <div class="card">
        <h2 class="text-2xl font-bold mb-4">Prospects</h2>
        <p class="text-4xl">{{(stats$ | async)?.prospects}}</p>
      </div>
      <div class="card">
        <h2 class="text-2xl font-bold mb-4">Team Members</h2>
        <p class="text-4xl">{{(stats$ | async)?.teamMembers}}</p>
      </div>
      <div class="card">
        <h2 class="text-2xl font-bold mb-4">Reports Generated</h2>
        <p class="text-4xl">{{(stats$ | async)?.reportsGenerated}}</p>
      </div>
      <div class="card">
        <h2 class="text-2xl font-bold mb-4">Today Prospects</h2>
        <p class="text-4xl">{{(stats$ | async)?.todayProspects}}</p>
      </div>
    </div>

    <div class="card">
      <h3 class="text-xl font-bold mb-4">Prospects Created</h3>
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
  referralCode = this.auth.getReferralCode();
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
      })
    );
  }

  shareReferral() {
    const link = `${window.location.origin}?ref=${this.referralCode}`;

    if (navigator.share) {
      navigator.share({
        title: 'Join our Human Design platform',
        text: 'Sign up using my referral link',
        url: link
      });
    } else {
      navigator.clipboard.writeText(link);
      alert("Referral link copied to clipboard.");
    }
  }
}
