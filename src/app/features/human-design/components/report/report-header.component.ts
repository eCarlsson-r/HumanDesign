import { DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'hd-report-header',
  imports: [DatePipe],
  template: `
    <div class="header">
      <h1>{{ report.prospect.fullName }}</h1>
      <p>{{ report.prospect.birthDateLocal | date }}</p>
      <p>{{ report.prospect.birthLocation }}</p>

      <div class="meta">
        <span>Type: {{ report.type }}</span>
        <span>Authority: {{ report.authority }}</span>
        <span>Profile: {{ report.profile }}</span>
      </div>
    </div>
  `
})
export class ReportHeaderComponent {
  @Input() report: any;
}
