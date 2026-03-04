import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DiagramEngineService {

  render(svg: SVGSVGElement, chart: any) {
    this.renderCenters(svg, chart.centers);
    this.renderGates(svg, chart.gates);
    this.renderArrows(svg, chart.variables);
  }

  // ---------- CENTERS ----------

  private renderCenters(svg: SVGSVGElement, centers: any[]) {
    centers.forEach(c => {
      const el = svg.getElementById(`center-${c.name}`);
      if (!el) return;
      let filledColor = '#ffffff';
      switch(c.name) {
        case "Head": filledColor = "#8A02B0"; break;
        case "Ajna": filledColor = "#064AFB"; break;
        case "Throat": filledColor = "#03D5F2"; break;
        case "G": filledColor = "#FDF500"; break;
        case "Heart": filledColor = "#F4A6B8"; break;
        case "SolarPlexus": filledColor = "#FDB304"; break;
        case "Sacral": filledColor = "#FF1a00"; break;
        case "Spleen": filledColor = "#79DC04"; break;
        case "Root": filledColor = "#954D02"; break;
      }
      el.setAttribute('fill', c.isDefined ? filledColor : '#ffffff');
    });
  }

  // ---------- GATES ----------

  private renderGates(svg: SVGSVGElement, gates: any[]) {
    gates.forEach(g => {
      const gateId = parseInt(g.gate);
      if (g.Type === "Both") {
        const design = svg.getElementById(`design-${gateId}`);
        if (!design) return;

        design.setAttribute('fill', '#d9534f');

        const el = svg.getElementById(`personality-${gateId}`);
        if (!el) return;

        el.setAttribute('fill', '#495057');
      } else if (g.type === "Design") {
        const design = svg.getElementById(`design-${gateId}`);
        if (!design) return;

        design.setAttribute('fill', '#d9534f');

        const el = svg.getElementById(`personality-${gateId}`);
        if (!el) return;

        el.setAttribute('fill', '#d9534f');
      } else if (g.type === "Personality") {
        const design = svg.getElementById(`design-${gateId}`);
        if (!design) return;

        design.setAttribute('fill', '#495057');

        const el = svg.getElementById(`personality-${gateId}`);
        if (!el) return;

        el.setAttribute('fill', '#495057');
      }

      const el = svg.getElementById(`fill-${gateId}`);
      if (!el) return;

      el.setAttribute('fill', '#000');

      const text = svg.getElementById(`${gateId}`);
      if (!text) return;

      text.setAttribute('fill', '#FFF');
    });
  }

  // ---------- ARROWS ----------

  private renderArrows(svg: SVGSVGElement, arrows: any) {
    Object.entries(arrows).forEach(([key, arrow]: any) => {
      if (!key.includes('Arrow')) return;
      const el = svg.getElementById(`${key.replace('Arrow', '')}-arrow`);
      if (!el) return;

      if (arrow.direction === 'left') el.setAttribute('transform', 'rotate(180deg)');

      svg.getElementById(`${key.replace('Arrow', '')}-color`).textContent = arrow.color;
      svg.getElementById(`${key.replace('Arrow', '')}-tone`).textContent = arrow.tone;
    });
  }
}
