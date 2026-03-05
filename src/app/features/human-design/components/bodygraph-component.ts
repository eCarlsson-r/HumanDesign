import { Component, ElementRef, Input, AfterViewInit, ViewChild } from '@angular/core';
import { DiagramEngineService } from '../engine/diagram-engine.service';
import { CommonModule } from '@angular/common';
import { GateListComponent } from './gate-list.component';

@Component({
  selector: 'hd-bodygraph',
  standalone: true,
  imports: [CommonModule, GateListComponent],
  template: `
    <div class="grid grid-cols-6 gap-6 mx-auto">
      <!-- Design -->
      <hd-gate-list title="Unconscious" [gates]="report.designGates" theme="design" />

      <!-- Bodygraph -->
      <div class="col-span-3 flex justify-center">
        <object class="w-full h-full" #svgObj data="/assets/bodygraph.svg" type="image/svg+xml"></object>
      </div>

      <!-- Personality -->
      <hd-gate-list title="Conscious / Ego" [gates]="report.personalityGates" theme="personality" />
    </div>
  `
})
export class BodygraphComponent implements AfterViewInit {

  @Input() report: any;
  @ViewChild('svgObj') svgObj!: ElementRef;

  constructor(private engine: DiagramEngineService) {}

  ngAfterViewInit() {
    const obj = this.svgObj.nativeElement;

    obj.onload = () => {
      const svg = obj.contentDocument.querySelector('svg');
      this.engine.render(svg, this.report);
    };
  }
}
