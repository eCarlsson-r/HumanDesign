import { afterNextRender, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BirthFormComponent } from '../../features/human-design/components/birth-form.component';
import { BodygraphComponent } from '../../features/human-design/components/bodygraph-component';
import { ChartPanelComponent } from '../../features/human-design/components/chart-panel.component';
import { CommonModule } from '@angular/common';
import { ProspectApiService } from '../../core/api/prospect-api.service';
import { RouteMeta } from '@analogjs/router';
import { guestGuard } from '../../core/guards/auth.guard';
import { TokenService } from '../../core/api/token.service';

export const routeMeta: RouteMeta = {
  canActivate: [guestGuard],
};

@Component({
  selector: 'app-home',
  templateUrl: './index.page.html',
  imports: [BirthFormComponent, BodygraphComponent, ChartPanelComponent, CommonModule]
})
export default class HomeComponent implements OnInit {

  loading = false;
  previewReport: any = null;
  prospectId: string | null = null;
  private referralCode: string | null = null;
  redirecting = true;

  constructor(
    private api: ProspectApiService,
    private route: ActivatedRoute,
    private token: TokenService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    this.referralCode = this.route.snapshot.queryParamMap.get('r');
  }

  ngOnInit() {
    if (this.token.isLoggedIn()) {
      this.router.navigate(['/dashboard']);
    } else {
      this.redirecting = false;
    }
  }

  generate(form: any) {
    this.loading = true;
    this.previewReport = null;

    this.api.createProspect(form, this.referralCode).subscribe({
      next: (res) => {
        this.previewReport = res.report;
        this.prospectId = res.prospectId;
        afterNextRender(() => {
          localStorage.setItem('prospectId', this.prospectId!);
          this.loading = false;
          this.cdr.detectChanges();
        });
      },
      error: () => {
        this.loading = false;
        alert('Something went wrong.');
      }
    });
  }

  unlockSummary() {
    if (!this.prospectId) return;

    window.location.href = `/payment/summary?prospectId=${this.prospectId}`;
  }
}
