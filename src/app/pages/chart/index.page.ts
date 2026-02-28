import { Component } from '@angular/core';
import { ChartFacade } from '../../features/human-design/services/chart.facade';
import { BirthFormComponent } from '../../features/human-design/components/birth-form.component';
import { BodygraphComponent } from '../../features/human-design/components/bodygraph-component';
import { ChartPanelComponent } from '../../features/human-design/components/chart-panel.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'hd-chart-page',
  templateUrl: './chart.page.html',
  imports: [BirthFormComponent, BodygraphComponent, ChartPanelComponent, CommonModule],
  standalone: true,
  styles: [
    `
      .chart-page {
        display: flex;
        flex-direction: column;
        gap: 20px;
      }

      .workspace {
        display: grid;
        grid-template-columns: 2fr 1fr;
        gap: 24px;
      }
    `
  ],
  providers: [ChartFacade]
})
export default class ChartPage {

  report$ = this.facade.report$;
  loading$ = this.facade.loading$;

  constructor(private facade: ChartFacade) {}

  generate(form: any) {
    this.facade.generate(form);
  }

}
