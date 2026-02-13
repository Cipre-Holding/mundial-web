/**
 * @fileoverview Exportación de plantillas comerciales a PDF.
 * Genera PDFs con cabecera/cuerpo/pie de página con estilo Mundial 2026.
 */
import jsPDF from 'jspdf';

/** Paleta de colores RGB para el PDF (verde, rojo, gris, etc.). */
const COLORS = {
  green: [0, 104, 71] as [number, number, number],
  red: [206, 17, 38] as [number, number, number],
  dark: [24, 24, 27] as [number, number, number],
  gray: [113, 113, 122] as [number, number, number],
  light: [244, 244, 245] as [number, number, number],
  white: [255, 255, 255] as [number, number, number],
};

const PAGE_WIDTH = 210;
const PAGE_HEIGHT = 297;
const MARGIN = 20;
const CONTENT_WIDTH = PAGE_WIDTH - MARGIN * 2;

function addHeader(doc: jsPDF) {
  // Top bar — green
  doc.setFillColor(...COLORS.green);
  doc.rect(0, 0, PAGE_WIDTH, 4, 'F');

  // Red accent line
  doc.setFillColor(...COLORS.red);
  doc.rect(0, 4, PAGE_WIDTH, 1.5, 'F');

  // Title block
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.setTextColor(...COLORS.dark);
  doc.text('MUNDIAL 2026 MÉXICO', MARGIN, 22);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(...COLORS.gray);
  doc.text('Propuesta Comercial  •  Confidencial', MARGIN, 28);

  // Diagonal accent (sporty motif)
  doc.setFillColor(...COLORS.green);
  doc.triangle(PAGE_WIDTH - 30, 0, PAGE_WIDTH, 0, PAGE_WIDTH, 30, 'F');
  doc.setFillColor(...COLORS.red);
  doc.triangle(PAGE_WIDTH - 20, 0, PAGE_WIDTH, 0, PAGE_WIDTH, 20, 'F');

  return 34;
}

function addFooter(doc: jsPDF, pageNum: number, totalPages: number) {
  const y = PAGE_HEIGHT - 12;
  // Bottom bar
  doc.setFillColor(...COLORS.green);
  doc.rect(0, PAGE_HEIGHT - 5, PAGE_WIDTH, 5, 'F');

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(...COLORS.gray);
  doc.text('Este documento es confidencial y para uso exclusivo del destinatario.', MARGIN, y);
  doc.text(`Página ${pageNum} de ${totalPages}`, PAGE_WIDTH - MARGIN, y, { align: 'right' });
}

function parseAndRender(doc: jsPDF, text: string, startY: number): number {
  let y = startY;
  const lines = text.split('\n');

  for (const line of lines) {
    // Check if we need a new page
    if (y > PAGE_HEIGHT - 25) {
      doc.addPage();
      y = addHeader(doc);
      y += 4;
    }

    const trimmed = line.trim();

    // Empty line — small space
    if (trimmed === '') {
      y += 4;
      continue;
    }

    // Section headers (ALL CAPS lines or lines with ¿?)
    if (
      (trimmed === trimmed.toUpperCase() && trimmed.length > 3 && !trimmed.startsWith('•') && !trimmed.startsWith('$')) ||
      trimmed.startsWith('¿')
    ) {
      y += 3;
      doc.setFillColor(...COLORS.light);
      doc.roundedRect(MARGIN - 2, y - 4, CONTENT_WIDTH + 4, 8, 1, 1, 'F');
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.setTextColor(...COLORS.green);
      doc.text(trimmed, MARGIN, y);
      y += 10;
      continue;
    }

    // Numbered items
    if (/^\d+\./.test(trimmed)) {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      doc.setTextColor(...COLORS.green);
      const numMatch = trimmed.match(/^(\d+\.)\s*/);
      const num = numMatch?.[1] || '';
      const rest = trimmed.slice(num.length).trim();
      doc.text(num, MARGIN, y);

      // Split on " — " to bold the title part
      const dashIdx = rest.indexOf(' — ');
      if (dashIdx > -1) {
        const title = rest.slice(0, dashIdx);
        const desc = rest.slice(dashIdx + 3);
        doc.setTextColor(...COLORS.dark);
        doc.text(title, MARGIN + 8, y);
        y += 5;
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8.5);
        doc.setTextColor(...COLORS.gray);
        const wrapped = doc.splitTextToSize(desc, CONTENT_WIDTH - 10);
        doc.text(wrapped, MARGIN + 8, y);
        y += wrapped.length * 4 + 3;
      } else {
        doc.setTextColor(...COLORS.dark);
        const wrapped = doc.splitTextToSize(rest, CONTENT_WIDTH - 10);
        doc.text(wrapped, MARGIN + 8, y);
        y += wrapped.length * 4 + 3;
      }
      continue;
    }

    // Bullet points
    if (trimmed.startsWith('•')) {
      const content = trimmed.slice(1).trim();
      doc.setFillColor(...COLORS.green);
      doc.circle(MARGIN + 2, y - 1.2, 1, 'F');
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);

      const dashIdx = content.indexOf(' — ');
      if (dashIdx > -1) {
        const title = content.slice(0, dashIdx);
        const desc = content.slice(dashIdx + 3);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(...COLORS.dark);
        doc.text(title, MARGIN + 6, y);
        y += 4;
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(...COLORS.gray);
        const wrapped = doc.splitTextToSize(desc, CONTENT_WIDTH - 8);
        doc.text(wrapped, MARGIN + 6, y);
        y += wrapped.length * 4 + 2;
      } else if (content.includes(':')) {
        const colonIdx = content.indexOf(':');
        const title = content.slice(0, colonIdx + 1);
        const desc = content.slice(colonIdx + 1).trim();
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(...COLORS.dark);
        doc.text(title, MARGIN + 6, y);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(...COLORS.gray);
        const titleWidth = doc.getTextWidth(title);
        const wrapped = doc.splitTextToSize(desc, CONTENT_WIDTH - 8 - titleWidth);
        if (wrapped.length === 1 && titleWidth + doc.getTextWidth(desc) < CONTENT_WIDTH - 8) {
          doc.text(desc, MARGIN + 6 + titleWidth + 1, y);
          y += 5;
        } else {
          y += 4;
          const allWrapped = doc.splitTextToSize(desc, CONTENT_WIDTH - 8);
          doc.text(allWrapped, MARGIN + 6, y);
          y += allWrapped.length * 4 + 2;
        }
      } else {
        doc.setTextColor(...COLORS.dark);
        const wrapped = doc.splitTextToSize(content, CONTENT_WIDTH - 8);
        doc.text(wrapped, MARGIN + 6, y);
        y += wrapped.length * 4 + 2;
      }
      continue;
    }

    // "Atentamente" signature block
    if (trimmed.startsWith('Atentamente')) {
      y += 4;
      doc.setDrawColor(...COLORS.green);
      doc.setLineWidth(0.5);
      doc.line(MARGIN, y, MARGIN + 50, y);
      y += 6;
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      doc.setTextColor(...COLORS.dark);
      doc.text('Atentamente,', MARGIN, y);
      y += 5;
      const sigLine = trimmed.replace('Atentamente,', '').trim();
      if (sigLine) {
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(9);
        doc.text(sigLine, MARGIN, y);
        y += 5;
      }
      continue;
    }

    // "Estimado" greeting
    if (trimmed.startsWith('Estimado')) {
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      doc.setTextColor(...COLORS.dark);
      doc.text(trimmed, MARGIN, y);
      y += 6;
      continue;
    }

    // Regular paragraph
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(...COLORS.dark);
    const wrapped = doc.splitTextToSize(trimmed, CONTENT_WIDTH);
    doc.text(wrapped, MARGIN, y);
    y += wrapped.length * 4 + 2;
  }

  return y;
}

/**
 * Exporta una plantilla de propuesta comercial a PDF y descarga el archivo.
 *
 * @param text - Contenido de la plantilla (texto plano con formato: viñetas, numeración, etc.)
 * @param templateTitle - Título del tipo de plantilla (ej: "Empresas", "Restaurantes")
 */
export function exportTemplateToPDF(text: string, templateTitle: string) {
  const doc = new jsPDF('p', 'mm', 'a4');

  let y = addHeader(doc);
  y += 4;

  // Template type badge
  doc.setFillColor(...COLORS.green);
  doc.roundedRect(MARGIN, y - 3.5, doc.getTextWidth(templateTitle.toUpperCase()) + 10, 7, 2, 2, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(...COLORS.white);
  doc.text(templateTitle.toUpperCase(), MARGIN + 5, y + 0.5);
  y += 12;

  parseAndRender(doc, text, y);

  // Add footers to all pages
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    addFooter(doc, i, totalPages);
  }

  const fileName = `propuesta-${templateTitle.toLowerCase().replace(/\s+/g, '-')}-${new Date().toISOString().slice(0, 10)}.pdf`;
  doc.save(fileName);
}
