import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'hd-report-centers',
  imports: [CommonModule],
  template: `
    <h2>Centers</h2>

    <div *ngFor="let c of centers" class="center">
      <h3>{{ c.centerName }}</h3>
      <p>{{ c.description }}</p>
    </div>
  `
})
export class ReportCentersComponent {
  @Input() centers: any[] = [];
}
