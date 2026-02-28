import { Injectable } from '@angular/core';
import html2pdf from 'html2pdf.js';

@Injectable({ providedIn: 'root' })
export class PdfExportService {

  export(html: string, filename: string) {
    const element = document.createElement('div');
    element.innerHTML = html;

    html2pdf()
      .set({
        margin: 10,
        filename: filename,
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      })
      .from(element)
      .save();
  }
}
