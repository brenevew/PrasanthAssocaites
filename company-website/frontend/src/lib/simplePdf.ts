/**
 * A small, dependency-free PDF writer for text documents: headings, wrapped
 * paragraphs, label/value rows and rules, on A4 pages, in the standard
 * Helvetica fonts every PDF reader ships with.
 *
 * Built for the Building Planner's "share as PDF" fallback, which only needs
 * text, so no PDF library is pulled into the site bundle. Text is limited to
 * printable ASCII (see toPdfText); other characters are mapped or dropped.
 */

const PAGE_WIDTH = 595.28; // A4, in points
const PAGE_HEIGHT = 841.89;
const MARGIN = 50;

type Rgb = [number, number, number];

export const PDF_COLORS = {
  text: [0.1, 0.09, 0.08] as Rgb,
  muted: [0.4, 0.38, 0.36] as Rgb,
  gold: [0.6, 0.44, 0.17] as Rgb,
  rule: [0.85, 0.82, 0.78] as Rgb,
};

// Advance widths (per 1000 units of font size) for characters 32..126.
const HELVETICA = [
  278, 278, 355, 556, 556, 889, 667, 191, 333, 333, 389, 584, 278, 333, 278, 278,
  556, 556, 556, 556, 556, 556, 556, 556, 556, 556, 278, 278, 584, 584, 584, 556,
  1015, 667, 667, 722, 722, 667, 611, 778, 722, 278, 500, 667, 556, 833, 722, 778,
  667, 778, 722, 667, 611, 722, 667, 944, 667, 667, 611, 278, 278, 278, 469, 556,
  333, 556, 556, 500, 556, 556, 278, 556, 556, 222, 222, 500, 222, 833, 556, 556,
  556, 556, 333, 500, 278, 556, 500, 722, 500, 500, 500, 334, 260, 334, 584,
];
const HELVETICA_BOLD = [
  278, 333, 474, 556, 556, 889, 722, 238, 333, 333, 389, 584, 278, 333, 278, 278,
  556, 556, 556, 556, 556, 556, 556, 556, 556, 556, 333, 333, 584, 584, 584, 611,
  975, 722, 722, 722, 722, 667, 611, 778, 722, 278, 556, 722, 611, 833, 722, 778,
  667, 778, 722, 667, 611, 722, 667, 944, 667, 667, 611, 333, 278, 333, 584, 556,
  333, 556, 611, 556, 611, 556, 333, 611, 611, 278, 278, 556, 278, 889, 611, 611,
  611, 611, 389, 556, 333, 611, 556, 778, 556, 556, 500, 389, 280, 389, 584,
];

/** Maps common typography to ASCII and drops anything the standard fonts can't show. */
export function toPdfText(value: unknown): string {
  return String(value ?? "")
    .replace(/[×✕]/g, "x")
    .replace(/[–—]/g, "-")
    .replace(/[‘’]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/…/g, "...")
    .replace(/₹/g, "Rs. ")
    .replace(/\s+/g, " ")
    .normalize("NFKD")
    .replace(/[^\x20-\x7E]/g, "")
    .trim();
}

function textWidth(text: string, size: number, bold: boolean): number {
  const widths = bold ? HELVETICA_BOLD : HELVETICA;
  let total = 0;
  for (const ch of text) total += widths[ch.charCodeAt(0) - 32] ?? 556;
  return (total * size) / 1000;
}

function escapePdfString(text: string): string {
  return text.replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");
}

function wrap(text: string, size: number, bold: boolean, maxWidth: number): string[] {
  const words = toPdfText(text).split(" ").filter(Boolean);
  const lines: string[] = [];
  let line = "";
  for (const word of words) {
    const candidate = line ? `${line} ${word}` : word;
    if (textWidth(candidate, size, bold) <= maxWidth || !line) {
      line = candidate;
    } else {
      lines.push(line);
      line = word;
    }
  }
  if (line) lines.push(line);
  return lines.length ? lines : [""];
}

export class SimplePdf {
  private pages: string[][] = [];
  private y = 0;
  readonly contentWidth = PAGE_WIDTH - MARGIN * 2;

  constructor() {
    this.addPage();
  }

  addPage() {
    this.pages.push([]);
    this.y = PAGE_HEIGHT - MARGIN;
  }

  /** Starts a new page when the next block would not fit. */
  ensureSpace(height: number) {
    if (this.y - height < MARGIN + 20) this.addPage();
  }

  gap(points: number) {
    this.y -= points;
  }

  private ops() {
    return this.pages[this.pages.length - 1];
  }

  private drawText(text: string, x: number, size: number, bold: boolean, color: Rgb) {
    const [r, g, b] = color;
    this.ops().push(
      `BT /${bold ? "F2" : "F1"} ${size} Tf ${r} ${g} ${b} rg ${x.toFixed(2)} ${this.y.toFixed(2)} Td (${escapePdfString(text)}) Tj ET`
    );
  }

  /** A wrapped block of text. */
  paragraph(text: string, opts: { size?: number; bold?: boolean; color?: Rgb; indent?: number; lineGap?: number } = {}) {
    const size = opts.size ?? 10;
    const bold = opts.bold ?? false;
    const indent = opts.indent ?? 0;
    const lineHeight = size * (opts.lineGap ?? 1.35);
    for (const line of wrap(text, size, bold, this.contentWidth - indent)) {
      this.ensureSpace(lineHeight);
      this.y -= lineHeight;
      this.drawText(line, MARGIN + indent, size, bold, opts.color ?? PDF_COLORS.text);
    }
  }

  /** A section heading with a rule under it. */
  heading(text: string) {
    this.ensureSpace(48);
    this.gap(14);
    this.paragraph(text, { size: 12.5, bold: true, color: PDF_COLORS.gold });
    this.gap(5);
    this.rule();
    this.gap(4);
  }

  /** A label in the left column and its (wrapped) value beside it. */
  row(label: string, value: string, labelWidth = 150) {
    const size = 10;
    const lineHeight = size * 1.4;
    const lines = wrap(value || "-", size, false, this.contentWidth - labelWidth);
    this.ensureSpace(lineHeight * Math.min(lines.length, 3));
    lines.forEach((line, i) => {
      this.ensureSpace(lineHeight);
      this.y -= lineHeight;
      if (i === 0) this.drawText(toPdfText(label), MARGIN, size, true, PDF_COLORS.muted);
      this.drawText(line, MARGIN + labelWidth, size, false, PDF_COLORS.text);
    });
  }

  rule(color: Rgb = PDF_COLORS.rule) {
    const [r, g, b] = color;
    this.ops().push(
      `${r} ${g} ${b} RG 0.75 w ${MARGIN} ${this.y.toFixed(2)} m ${(PAGE_WIDTH - MARGIN).toFixed(2)} ${this.y.toFixed(2)} l S`
    );
  }

  /** Serialises the document. Every character is ASCII, so string length equals byte length. */
  output(footer?: string): string {
    const objects: string[] = [];
    const add = (body: string) => {
      objects.push(body);
      return objects.length;
    };

    const catalogId = add("");
    const pagesId = add("");
    const regularId = add("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>");
    const boldId = add("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>");

    const pageIds: number[] = [];
    this.pages.forEach((ops, index) => {
      const footerOps: string[] = [];
      const label = `${footer ? `${toPdfText(footer)}   |   ` : ""}Page ${index + 1} of ${this.pages.length}`;
      const [r, g, b] = PDF_COLORS.muted;
      footerOps.push(`BT /F1 8 Tf ${r} ${g} ${b} rg ${MARGIN} ${(MARGIN - 18).toFixed(2)} Td (${escapePdfString(label)}) Tj ET`);
      const stream = [...ops, ...footerOps].join("\n");
      const contentId = add(`<< /Length ${stream.length} >>\nstream\n${stream}\nendstream`);
      pageIds.push(
        add(
          `<< /Type /Page /Parent ${pagesId} 0 R /MediaBox [0 0 ${PAGE_WIDTH} ${PAGE_HEIGHT}] ` +
            `/Resources << /Font << /F1 ${regularId} 0 R /F2 ${boldId} 0 R >> >> /Contents ${contentId} 0 R >>`
        )
      );
    });

    objects[catalogId - 1] = `<< /Type /Catalog /Pages ${pagesId} 0 R >>`;
    objects[pagesId - 1] = `<< /Type /Pages /Kids [${pageIds.map((id) => `${id} 0 R`).join(" ")}] /Count ${pageIds.length} >>`;

    let pdf = "%PDF-1.4\n";
    const offsets: number[] = [];
    objects.forEach((body, i) => {
      offsets.push(pdf.length);
      pdf += `${i + 1} 0 obj\n${body}\nendobj\n`;
    });
    const xref = pdf.length;
    pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
    for (const offset of offsets) pdf += `${String(offset).padStart(10, "0")} 00000 n \n`;
    pdf += `trailer\n<< /Size ${objects.length + 1} /Root ${catalogId} 0 R >>\nstartxref\n${xref}\n%%EOF\n`;
    return pdf;
  }
}
