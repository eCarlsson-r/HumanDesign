import { Injectable } from '@angular/core';

const CENTER_COLORS: Record<string, string> = {
  Head: "#8A02B0",
  Ajna: "#064AFB",
  Throat: "#03D5F2",
  G: "#FDF500",
  Heart: "#F4A6B8",
  SolarPlexus: "#FDB304",
  Sacral: "#FF1A00",
  Spleen: "#79DC04",
  Root: "#954D02"
};

@Injectable({ providedIn: 'root' })
export class DiagramEngineService {

  render(svg: SVGSVGElement, chart: any) {
    this.renderCenters(svg, chart.centers);
    this.renderGates(svg, chart.gates);
    this.renderArrows(svg, chart.arrows);
  }

  // ---------- CENTERS ----------

  private renderCenters(svg: SVGSVGElement, centers: any[]) {
    centers.forEach(c => {
      const el = svg.getElementById(`center-${c.name}`);
      if (!el) return;
      const filledColor = CENTER_COLORS[c.name] ?? '#ffffff';
      el.setAttribute('fill', c.isDefined ? filledColor : '#ffffff');
    });
  }

  // ---------- GATES ----------

  private renderGates(svg: SVGSVGElement, gates: any[]) {
    gates.forEach(g => {
      const gateId = parseInt(g.gate);

      const design = svg.getElementById(`design-${gateId}`);
      const personality = svg.getElementById(`personality-${gateId}`);
      if (!design || !personality) return;

      if (g.type === "Both") {
        design.setAttribute('fill', '#d9534f');
        personality.setAttribute('fill', '#495057');
      } else if (g.type === "Design") {
        design.setAttribute('fill', '#d9534f');
        personality.setAttribute('fill', '#d9534f');
      } else if (g.type === "Personality") {
        design.setAttribute('fill', '#495057');
        personality.setAttribute('fill', '#495057');
      }

      const fill = svg.getElementById(`fill-${gateId}`);
      fill?.setAttribute('fill', '#000');

      const text = svg.getElementById(`${gateId}`);
      text?.setAttribute('fill', '#FFF');
    });
  }

  // ---------- ARROWS ----------

  private renderArrows(svg: SVGSVGElement, arrows: any) {
    Object.entries(arrows).forEach(([key, arrow]: any) => {
      if (!key) return;
      const name = key.toLowerCase();
      const arrowEl = svg.getElementById(`${name}-arrow`);
      if (!arrowEl) return;
      const x = parseInt(arrowEl.getAttribute("x") || '0');
      const y = parseInt(arrowEl.getAttribute("y") || '0');
      const width = parseInt(arrowEl.getAttribute("width") || '0');
      const height = parseInt(arrowEl.getAttribute("height") || '0');

      if (arrow.isLeft) arrowEl.setAttribute('transform', `rotate(180 ${(x + width) / 2} ${(y + height) / 2})`);

      svg.getElementById(`${name}-color`)!.textContent = arrow.color;
      svg.getElementById(`${name}-tone`)!.textContent = arrow.tone;
    });
  }
}
