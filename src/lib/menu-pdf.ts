import { PDFDocument, PDFFont, PDFPage, StandardFonts, rgb } from "pdf-lib";
import { MenuItem, MenuSection } from "@/lib/menu";

const PAGE_WIDTH = 612;
const PAGE_HEIGHT = 792;

const colors = {
  ink: rgb(17 / 255, 23 / 255, 21 / 255),
  inkSoft: rgb(25 / 255, 33 / 255, 30 / 255),
  ivory: rgb(241 / 255, 233 / 255, 216 / 255),
  sage: rgb(115 / 255, 141 / 255, 114 / 255),
  forest: rgb(62 / 255, 89 / 255, 71 / 255),
  brick: rgb(164 / 255, 71 / 255, 46 / 255),
  line: rgb(70 / 255, 80 / 255, 76 / 255),
};

type Fonts = { display: PDFFont; sans: PDFFont; sansBold: PDFFont };

function section(sections: MenuSection[], id: MenuSection["id"]) {
  return sections.find((value) => value.id === id) ?? {
    id,
    number: "",
    title: "",
    page: 1 as const,
    items: [],
  };
}

function price(value: number) {
  return value > 0 ? `$${Math.round(value / 100)}` : "";
}

function fitText(font: PDFFont, text: string, maxWidth: number, preferred: number, minimum = 8) {
  let size = preferred;
  while (size > minimum && font.widthOfTextAtSize(text, size) > maxWidth) size -= 0.5;
  return size;
}

function wrap(font: PDFFont, text: string, size: number, maxWidth: number, maxLines = 2) {
  const words = text.split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let current = "";
  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if (font.widthOfTextAtSize(candidate, size) <= maxWidth || !current) {
      current = candidate;
    } else {
      lines.push(current);
      current = word;
      if (lines.length === maxLines - 1) break;
    }
  }
  if (current && lines.length < maxLines) lines.push(current);
  return lines;
}

function drawTracking(
  page: PDFPage,
  text: string,
  x: number,
  y: number,
  font: PDFFont,
  size: number,
  color = colors.sage,
  spacing = 1.2
) {
  let cursor = x;
  for (const character of text.toUpperCase()) {
    page.drawText(character, { x: cursor, y, font, size, color });
    cursor += font.widthOfTextAtSize(character, size) + spacing;
  }
}

function trackedWidth(font: PDFFont, text: string, size: number, spacing = 1.2) {
  return [...text].reduce(
    (total, character, index) =>
      total + font.widthOfTextAtSize(character, size) + (index ? spacing : 0),
    0
  );
}

function drawArrowMark(page: PDFPage, x: number, y: number) {
  const thickness = 1.5;
  page.drawLine({ start: { x: x + 8, y: y + 27 }, end: { x, y }, thickness, color: colors.ivory });
  page.drawLine({ start: { x: x + 8, y: y + 27 }, end: { x: x + 16, y }, thickness, color: colors.ivory });
  page.drawLine({ start: { x, y }, end: { x: x + 8, y: y + 7 }, thickness, color: colors.ivory });
  page.drawLine({ start: { x: x + 8, y: y + 7 }, end: { x: x + 16, y }, thickness, color: colors.ivory });
}

function drawHeader(page: PDFPage, fonts: Fonts, marker: string) {
  const markerWidth = trackedWidth(fonts.sansBold, marker, 7.5, 1.4);
  drawTracking(page, marker, PAGE_WIDTH - 30 - markerWidth, 750, fonts.sansBold, 7.5, colors.brick, 1.4);
}

function drawBrand(page: PDFPage, fonts: Fonts) {
  page.drawRectangle({ x: 24, y: 732, width: 240, height: 42, color: colors.inkSoft });
  drawArrowMark(page, 30, 741);
  page.drawText("ATLAS LANDING", {
    x: 55,
    y: 747,
    font: fonts.display,
    size: 15,
    color: colors.ivory,
  });
}

function drawCocktailSection(
  page: PDFPage,
  fonts: Fonts,
  value: MenuSection,
  x: number,
  y: number,
  width: number,
  height: number,
  featured = false
) {
  page.drawRectangle({
    x,
    y,
    width,
    height,
    color: featured ? colors.forest : colors.inkSoft,
    borderColor: featured ? colors.sage : colors.line,
    borderWidth: 0.8,
  });
  drawTracking(page, value.number, x + 20, y + height - 28, fonts.sansBold, 7.5, featured ? colors.ivory : colors.sage);
  const titleWidth = trackedWidth(fonts.sansBold, value.title, 7.5, 1.25);
  drawTracking(
    page,
    value.title,
    x + width - 20 - titleWidth,
    y + height - 28,
    fonts.sansBold,
    7.5,
    featured ? colors.ivory : colors.sage,
    1.25
  );

  const columns = 2;
  const rows = Math.max(1, Math.ceil(value.items.length / columns));
  const innerTop = y + height - 52;
  const innerBottom = y + 20;
  const rowHeight = (innerTop - innerBottom) / rows;
  const columnWidth = (width - 60) / columns;
  value.items.forEach((item, index) => {
    const column = index % columns;
    const row = Math.floor(index / columns);
    const left = x + 20 + column * (columnWidth + 20);
    const top = innerTop - row * rowHeight;
    page.drawLine({
      start: { x: left, y: top },
      end: { x: left + columnWidth, y: top },
      thickness: 0.55,
      color: colors.line,
    });
    const itemPrice = price(item.price);
    const nameSize = fitText(fonts.display, item.name, columnWidth - 42, Math.min(19, rowHeight * 0.28), 11);
    const nameOffset = Math.min(25, Math.max(15, rowHeight * 0.3));
    page.drawText(item.name, {
      x: left,
      y: top - nameOffset,
      font: fonts.display,
      size: nameSize,
      color: colors.ivory,
    });
    if (itemPrice) {
      page.drawText(itemPrice, {
        x: left + columnWidth - fonts.sans.widthOfTextAtSize(itemPrice, 9),
        y: top - Math.min(22, Math.max(13, rowHeight * 0.27)),
        font: fonts.sans,
        size: 9,
        color: colors.ivory,
      });
    }
    const descriptionSize = Math.max(6.5, Math.min(9, rowHeight * 0.13));
    const descriptionOffset = Math.min(43, Math.max(nameOffset + 12, rowHeight * 0.6));
    wrap(fonts.sans, item.description, descriptionSize, columnWidth, rowHeight >= 55 ? 2 : 1).forEach((line, lineIndex) => {
      page.drawText(line, {
        x: left,
        y: top - descriptionOffset - lineIndex * (descriptionSize + 2),
        font: fonts.sans,
        size: descriptionSize,
        color: colors.ivory,
        opacity: featured ? 0.76 : 0.68,
      });
    });
  });
}

function drawListSection(
  page: PDFPage,
  fonts: Fonts,
  value: MenuSection,
  x: number,
  y: number,
  width: number,
  height: number
) {
  page.drawRectangle({ x, y, width, height, color: colors.inkSoft, borderColor: colors.line, borderWidth: 0.8 });
  drawTracking(page, value.number, x + 20, y + height - 28, fonts.sansBold, 7.5);
  const titleWidth = trackedWidth(fonts.sansBold, value.title, 7.5, 1.25);
  drawTracking(page, value.title, x + (width - titleWidth) / 2, y + height - 28, fonts.sansBold, 7.5, colors.sage, 1.25);

  const top = y + height - 52;
  const bottom = y + 20;
  const rowHeight = (top - bottom) / Math.max(1, value.items.length);
  const nameSize = Math.max(8.5, Math.min(14, rowHeight * 0.43));
  value.items.forEach((item, index) => {
    const rowTop = top - index * rowHeight;
    page.drawLine({ start: { x: x + 18, y: rowTop }, end: { x: x + width - 18, y: rowTop }, thickness: 0.5, color: colors.line });
    const itemPrice = price(item.price);
    page.drawText(item.name, {
      x: x + 18,
      y: rowTop - Math.min(21, rowHeight * 0.68),
      font: fonts.display,
      size: fitText(fonts.display, item.name, width - 70, nameSize, 8),
      color: colors.ivory,
    });
    if (itemPrice) {
      page.drawText(itemPrice, {
        x: x + width - 18 - fonts.sansBold.widthOfTextAtSize(itemPrice, 8),
        y: rowTop - Math.min(19, rowHeight * 0.62),
        font: fonts.sansBold,
        size: 8,
        color: colors.ivory,
      });
    }
  });
}

function drawSnacks(page: PDFPage, fonts: Fonts, value: MenuSection) {
  const x = 30;
  const y = 28;
  const width = 552;
  const height = 92;
  page.drawRectangle({ x, y, width, height, color: colors.brick });
  drawTracking(page, value.number, x + 20, y + height - 25, fonts.sansBold, 7.5, colors.ivory);
  const titleWidth = trackedWidth(fonts.sansBold, value.title, 7.5, 1.25);
  drawTracking(page, value.title, x + width - 20 - titleWidth, y + height - 25, fonts.sansBold, 7.5, colors.ivory, 1.25);
  const count = Math.max(1, value.items.length);
  const columnWidth = (width - 40) / count;
  value.items.forEach((item, index) => {
    const left = x + 20 + index * columnWidth;
    page.drawLine({ start: { x: left + 10, y: y + 48 }, end: { x: left + columnWidth - 10, y: y + 48 }, thickness: 0.55, color: colors.ivory, opacity: 0.36 });
    const label = `${item.name}${price(item.price) ? `  ${price(item.price)}` : ""}`;
    const size = fitText(fonts.display, label, columnWidth - 24, 14, 8);
    page.drawText(label, {
      x: left + (columnWidth - fonts.display.widthOfTextAtSize(label, size)) / 2,
      y: y + 22,
      font: fonts.display,
      size,
      color: colors.ivory,
    });
  });
}

export async function generateMenuPdf(sections: MenuSection[]) {
  const document = await PDFDocument.create();
  const sans = await document.embedFont(StandardFonts.Helvetica);
  const sansBold = await document.embedFont(StandardFonts.HelveticaBold);
  const display = await document.embedFont(StandardFonts.TimesRoman);
  const fonts: Fonts = { display, sans, sansBold };

  const first = document.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
  first.drawRectangle({ x: 0, y: 0, width: PAGE_WIDTH, height: PAGE_HEIGHT, color: colors.inkSoft });
  drawHeader(first, fonts, "01 / COCKTAILS");
  first.drawText("Specialty", { x: 30, y: 661, font: fonts.display, size: 42, color: colors.ivory });
  const specialtyWidth = fonts.display.widthOfTextAtSize("Specialty", 42);
  first.drawText(" Cocktails", { x: 30 + specialtyWidth, y: 661, font: fonts.display, size: 42, color: colors.sage });
  const signatures = section(sections, "signatures");
  const seasonal = section(sections, "seasonal");
  drawCocktailSection(first, fonts, signatures, 30, 392, 552, 245, true);
  drawCocktailSection(first, fonts, seasonal, 30, 112, 552, 260, false);
  drawTracking(first, "772 S VIRGINIA ST - MIDTOWN RENO", 30, 38, fonts.sansBold, 7, colors.sage, 1.05);
  drawBrand(first, fonts);

  const second = document.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
  second.drawRectangle({ x: 0, y: 0, width: PAGE_WIDTH, height: PAGE_HEIGHT, color: colors.inkSoft });
  drawHeader(second, fonts, "02 / WINE + BEER");
  second.drawText("Wine & Beer", { x: 30, y: 661, font: fonts.display, size: 42, color: colors.ivory });
  drawListSection(second, fonts, section(sections, "wines"), 30, 136, 270, 485);
  drawListSection(second, fonts, section(sections, "beer"), 312, 136, 270, 485);
  drawSnacks(second, fonts, section(sections, "snacks"));
  drawBrand(second, fonts);

  document.setTitle("Atlas Landing Physical Menu");
  document.setAuthor("Atlas Landing");
  return document.save();
}
