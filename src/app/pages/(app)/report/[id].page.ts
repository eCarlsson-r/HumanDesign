import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReportApiService } from '../../../core/api/report-api.service';
import { HumanDesignReport } from '../../../features/human-design/models/report.model';
import { PdfExportService } from '../../../features/human-design/services/pdf-export.service';
import { BodygraphComponent } from '../../../features/human-design/components/bodygraph-component';

type ReportLevel = 'Preview' | 'Summary' | 'Detail';

@Component({
  selector: 'app-report-page',
  imports: [CommonModule, BodygraphComponent],
  standalone: true,
  templateUrl: './report.page.component.html',
  styleUrls: ['./report.page.component.css']
})
export default class ReportPageComponent implements OnInit {

  designId!: string;
  report?: HumanDesignReport;
  objectKeys = Object.keys;

  level: ReportLevel = 'Preview';

  loading = signal(false);
  error?: string;

  constructor(
    private route: ActivatedRoute,
    private pdf: PdfExportService,
    private api: ReportApiService
  ) {}

  ngOnInit(): void {
    this.designId = this.route.snapshot.paramMap.get('id')!;
    this.loadReport();
  }

  setLevel(level: ReportLevel) {
    if (this.level === level) return;
    this.level = level;
    this.loadReport();
  }

  private loadReport() {
    this.loading.set(true);
    this.error = undefined;

    let request$;

    switch (this.level) {
      case 'Preview':
        request$ = this.api.getPreview(this.designId);
        break;
      case 'Summary':
        request$ = this.api.getSummary(this.designId);
        break;
      case 'Detail':
        request$ = this.api.getDetail(this.designId);
        break;
    }

    request$!.subscribe({
      next: r => {
        this.report = r;
        this.loading.set(false);
      },
      error: err => {
        this.error = 'Failed to load report';
        this.loading.set(false);
      }
    });
  }

  exportPdf() {
    window.print();
    /*const name = `HumanDesign_${this.designId}_${this.level}.pdf`;
    this.pdf.export('reportContent', name);*/
  }
}
