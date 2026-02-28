import { Component, Input } from '@angular/core';

@Component({
  selector: 'hd-report-summary',
  template: `
    <div class="summary">
      <h2>Design Overview</h2>
      <p>{{ report.typeInterpretation }}</p>
      <p>{{ report.authorityInterpretation }}</p>
    </div>
  `
})
export class ReportSummaryComponent {
  @Input() report: any;
}
