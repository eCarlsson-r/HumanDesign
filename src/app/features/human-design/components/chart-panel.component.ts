import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'hd-chart-panel',
  templateUrl: './chart-panel.component.html',
  imports: [CommonModule],
  standalone: true
})
export class ChartPanelComponent {
  @Input() report: any;
}
