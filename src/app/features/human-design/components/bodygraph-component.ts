import { Component, ElementRef, Input, AfterViewInit, ViewChild } from '@angular/core';
import { DiagramEngineService } from '../engine/diagram-engine.service';

@Component({
  selector: 'hd-bodygraph',
  standalone: true,
  template: `
    <object #svgObj data="/assets/bodygraph.svg" type="image/svg+xml"></object>
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
