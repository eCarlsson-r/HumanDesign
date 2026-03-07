import { Injectable } from '@angular/core';
import html2canvas from 'html2canvas-pro';
import jsPDF from 'jspdf';

@Injectable({ providedIn: 'root' })
export class PdfExportService {

  async export(elementId: string, fileName: string) {
    const element = document.getElementById(elementId);

    if (!element) {
      throw new Error('Element not found');
    }

    const canvas = await html2canvas(element, {
      scale: 2,
      allowTaint: true, // Try setting to true
      useCORS: true
    });

    const imgData = canvas.toDataURL('image/png');

    const pdf = new jsPDF('p', 'mm', 'a4');

    const imgWidth = 200;
    const pageHeight = 295;
    const imgHeight = canvas.height * imgWidth / canvas.width;

    let heightLeft = imgHeight;
    let position = 3;

    pdf.addImage(imgData, 'PNG', 5, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft >= 0) {
      position = heightLeft - imgHeight + 3;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 5, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    pdf.save(fileName);
  }
}
