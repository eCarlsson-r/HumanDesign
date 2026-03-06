import { RouteMeta } from "@analogjs/router";
import { Observable } from 'rxjs';
import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { authGuard } from "../../core/guards/auth.guard";
import { DashboardService } from "../../core/api/dashboard.service";

export const routeMeta: RouteMeta = {
  canActivate: [authGuard],
};
@Component({
  standalone: true,
  imports: [CommonModule],
  template: `
  <div class="p-8">
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
  </div>
  `
})
export default class DashboardPage implements OnInit {
  stats$!: Observable<any>; // Declare as an Observable

  constructor(private dashboard: DashboardService) {}

  ngOnInit() {
    this.stats$ = this.dashboard.getStats(); // Assign the observable directly
  }
}
