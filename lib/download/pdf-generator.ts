import { ParsedYahooMedia } from '../types';

/**
 * Generates a clean, professional, reader-optimized PDF Document using pdf-lib
 * Uses dynamic import so pdf-lib is never evaluated during SSR page pre-rendering.
 */
export async function generateArticlePdfBlob(media: ParsedYahooMedia): Promise<Blob> {
  const { PDFDocument, rgb, StandardFonts } = await import('pdf-lib');
  const pdfDoc = await PDFDocument.create();

  // Standard Letter / A4 page size
  const pageWidth = 595.28;
  const pageHeight = 841.89;
  const margin = 50;
  const contentWidth = pageWidth - margin * 2;

  let page = pdfDoc.addPage([pageWidth, pageHeight]);

  const regularFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const italicFont = await pdfDoc.embedFont(StandardFonts.HelveticaOblique);

  let currentY = pageHeight - margin;

  // Helper to check page break
  const ensureSpace = (neededHeight: number) => {
    if (currentY - neededHeight < margin) {
      page = pdfDoc.addPage([pageWidth, pageHeight]);
      currentY = pageHeight - margin;
    }
  };

  // Helper to split text into lines that fit contentWidth
  const wrapText = (text: string, font: any, fontSize: number, maxWidth: number): string[] => {
    const words = text.split(' ');
    const lines: string[] = [];
    let currentLine = '';

    for (const word of words) {
      const testLine = currentLine ? `${currentLine} ${word}` : word;
      const testWidth = font.widthOfTextAtSize(testLine, fontSize);
      if (testWidth <= maxWidth) {
        currentLine = testLine;
      } else {
        if (currentLine) lines.push(currentLine);
        currentLine = word;
      }
    }
    if (currentLine) lines.push(currentLine);
    return lines;
  };

  // 1. Header Banner
  page.drawRectangle({
    x: margin,
    y: currentY - 24,
    width: contentWidth,
    height: 24,
    color: rgb(0.38, 0, 0.82), // Yahoo Purple #6001d2
  });

  page.drawText(`SAVEYAHOO ARCHIVAL READER  |  YAHOO ${media.category.toUpperCase()}`, {
    x: margin + 12,
    y: currentY - 17,
    size: 9,
    font: boldFont,
    color: rgb(1, 1, 1),
  });

  currentY -= 48;

  // 2. Article Title
  const titleLines = wrapText(media.title, boldFont, 18, contentWidth);
  for (const line of titleLines) {
    ensureSpace(24);
    page.drawText(line, {
      x: margin,
      y: currentY,
      size: 18,
      font: boldFont,
      color: rgb(0.08, 0.12, 0.18),
    });
    currentY -= 24;
  }

  currentY -= 6;

  // 3. Metadata Bar (Author, Date, Verified Source)
  ensureSpace(20);
  const metaText = `Author: ${media.author}   *   Published: ${media.publishedDate}   *   Source: Yahoo ${media.category}`;
  page.drawText(metaText, {
    x: margin,
    y: currentY,
    size: 9,
    font: italicFont,
    color: rgb(0.4, 0.45, 0.52),
  });
  currentY -= 16;

  // Horizontal divider
  page.drawLine({
    start: { x: margin, y: currentY },
    end: { x: pageWidth - margin, y: currentY },
    thickness: 0.8,
    color: rgb(0.85, 0.88, 0.92),
  });
  currentY -= 20;

  // 4. Executive Summary Box
  const summaryText = media.blogContent?.summary || media.description;
  const summaryLines = wrapText(summaryText, italicFont, 10.5, contentWidth - 28);
  const summaryBoxHeight = summaryLines.length * 16 + 24;

  ensureSpace(summaryBoxHeight + 10);
  page.drawRectangle({
    x: margin,
    y: currentY - summaryBoxHeight,
    width: contentWidth,
    height: summaryBoxHeight,
    color: rgb(0.96, 0.95, 0.99),
    borderColor: rgb(0.38, 0, 0.82),
    borderWidth: 1,
  });

  page.drawText('EXECUTIVE SUMMARY & BRIEF:', {
    x: margin + 14,
    y: currentY - 14,
    size: 8.5,
    font: boldFont,
    color: rgb(0.38, 0, 0.82),
  });

  let sumY = currentY - 30;
  for (const line of summaryLines) {
    page.drawText(line, {
      x: margin + 14,
      y: sumY,
      size: 10,
      font: italicFont,
      color: rgb(0.15, 0.18, 0.24),
    });
    sumY -= 15;
  }

  currentY -= summaryBoxHeight + 24;

  // 5. Key Highlights / Key Points
  if (media.blogContent?.keyPoints && media.blogContent.keyPoints.length > 0) {
    ensureSpace(30);
    page.drawText('Key Takeaways & Highlights:', {
      x: margin,
      y: currentY,
      size: 12,
      font: boldFont,
      color: rgb(0.1, 0.12, 0.16),
    });
    currentY -= 18;

    for (const point of media.blogContent.keyPoints) {
      const ptLines = wrapText(`*   ${point}`, regularFont, 10, contentWidth - 10);
      for (const line of ptLines) {
        ensureSpace(16);
        page.drawText(line, {
          x: margin + 6,
          y: currentY,
          size: 10,
          font: regularFont,
          color: rgb(0.2, 0.24, 0.3),
        });
        currentY -= 15;
      }
      currentY -= 3;
    }
    currentY -= 14;
  }

  // 6. Editorial Paragraphs
  const paragraphs = media.blogContent?.paragraphs || [media.description];
  const headings = media.blogContent?.headings || [];

  for (let i = 0; i < paragraphs.length; i++) {
    const heading = headings[i];
    if (heading) {
      ensureSpace(32);
      page.drawText(heading, {
        x: margin,
        y: currentY,
        size: 12,
        font: boldFont,
        color: rgb(0.25, 0.1, 0.5),
      });
      currentY -= 18;
    }

    const paraLines = wrapText(paragraphs[i], regularFont, 10, contentWidth);
    for (const line of paraLines) {
      ensureSpace(16);
      page.drawText(line, {
        x: margin,
        y: currentY,
        size: 10,
        font: regularFont,
        color: rgb(0.18, 0.2, 0.25),
      });
      currentY -= 15;
    }
    currentY -= 10;
  }

  // 7. Footer
  ensureSpace(30);
  page.drawLine({
    start: { x: margin, y: currentY },
    end: { x: pageWidth - margin, y: currentY },
    thickness: 0.5,
    color: rgb(0.85, 0.88, 0.92),
  });
  currentY -= 14;

  page.drawText(`Archived for personal reading and research  *  SaveYahoo (saveyahoo.ai.studio)`, {
    x: margin,
    y: currentY,
    size: 8,
    font: regularFont,
    color: rgb(0.5, 0.55, 0.62),
  });

  const pdfBytes = await pdfDoc.save();
  return new Blob([pdfBytes.buffer as ArrayBuffer], { type: 'application/pdf' });
}
