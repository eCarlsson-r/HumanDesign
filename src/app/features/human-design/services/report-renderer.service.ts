import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class ReportRendererService {

  injectSvg(html: string, svg: string): string {
    return html.replace('{{BODYGRAPH}}', svg);
  }

}
