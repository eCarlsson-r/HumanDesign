import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProspectApiService } from '../../core/api/prospect-api.service';
import { BodygraphComponent } from '../../features/human-design/components/bodygraph-component';
import { ReportHeaderComponent } from '../../features/human-design/components/report/report-header.component';
import { ReportSummaryComponent } from '../../features/human-design/components/report/report-summary.component';
import { ReportCentersComponent } from '../../features/human-design/components/report/report-centers.component';
import { ReportChannelsComponent } from '../../features/human-design/components/report/report-channels.component';

@Component({
  selector: 'hd-report-page',
  templateUrl: './report.page.html',
  imports: [CommonModule, ReportHeaderComponent, ReportSummaryComponent, BodygraphComponent, ReportCentersComponent, ReportChannelsComponent],
  standalone: true,
  styles: [`
    .report-container {
      background: #f5f5f5;
      padding: 40px;
    }

    .report-page {
      width: 210mm;
      min-height: 297mm;
      background: white;
      margin: 20px auto;
      padding: 40px;
      box-shadow: 0 0 10px rgba(0,0,0,0.1);
      page-break-after: always;
    }
  `]
})
export default class ReportPage implements OnInit {

  report: any;

  constructor(
    private route: ActivatedRoute,
    private api: ProspectApiService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.api.getReport(id).subscribe(r => this.report = r);
    }
  }

}
