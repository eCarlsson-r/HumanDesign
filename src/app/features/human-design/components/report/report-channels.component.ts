import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'hd-report-channels',
  imports: [CommonModule],
  template: `
    <h2>Channels</h2>

    <div *ngFor="let ch of channels" class="channel">
      <h3>{{ ch.name }}</h3>
      <p>{{ ch.description }}</p>
    </div>
  `
})
export class ReportChannelsComponent {
  @Input() channels: any[] = [];
}
