/**
 * Gallery mosaic gap-fill.
 *
 * .gallery-grid uses CSS Grid with `grid-template-columns: repeat(auto-fill,
 * minmax(140px, 1fr))` plus `grid-auto-flow: dense`, so the number of
 * columns is resolved by the browser and changes continuously with viewport
 * width -- there's no media-query breakpoint to hook. Dense packing fills
 * earlier holes, but when the mix of 1x1/2x1/2x2 tiles doesn't divide evenly
 * into whatever column count the browser lands on, the last row can end up
 * short, leaving a visible gap on the right. Liquid can't predict the
 * resolved column count at build time, so this can't be fully solved in
 * plain CSS (see _includes/gallery.html for the build-time heuristic that
 * reduces how often this happens).
 *
 * This script runs after layout, measures whether the grid's last row has
 * empty trailing columns, and if so stretches the rightmost tile in that row
 * to fill them. It re-runs on resize so it keeps up as the column count
 * changes. If a gallery ever renders with zero gaps on its own, this is a
 * no-op.
 */

function fillGalleryGaps() {
  document.querySelectorAll(".gallery-grid").forEach((grid) => {
    const items = Array.from(grid.querySelectorAll(".gallery-item"));
    if (!items.length) return;

    // Clear any stretch from a previous run/width before re-measuring.
    items.forEach((item) => item.style.removeProperty("grid-column"));

    const gridRect = grid.getBoundingClientRect();
    const gridStyle = getComputedStyle(grid);
    const colGap = parseFloat(gridStyle.columnGap) || 0;
    const rowGap = parseFloat(gridStyle.rowGap) || 0;

    // A 1x1 tile gives us the grid's actual cell size at this width.
    const normalItem = items.find((item) => item.classList.contains("span-normal")) || items[items.length - 1];
    const cellRect = normalItem.getBoundingClientRect();
    const cellW = cellRect.width;
    const cellH = cellRect.height;
    if (!cellW || !cellH) return;

    const cols = Math.round((gridRect.width + colGap) / (cellW + colGap));
    if (cols <= 1) return;

    const placements = items.map((item) => {
      const r = item.getBoundingClientRect();
      return {
        item,
        colStart: Math.round((r.left - gridRect.left) / (cellW + colGap)),
        rowStart: Math.round((r.top - gridRect.top) / (cellH + rowGap)),
        colSpan: Math.round((r.width + colGap) / (cellW + colGap)),
        rowSpan: Math.round((r.height + rowGap) / (cellH + rowGap)),
      };
    });

    const lastRow = Math.max(...placements.map((p) => p.rowStart + p.rowSpan - 1));
    const inLastRow = placements.filter((p) => p.rowStart <= lastRow && p.rowStart + p.rowSpan - 1 === lastRow);

    const coveredCols = new Set();
    inLastRow.forEach((p) => {
      for (let c = p.colStart; c < p.colStart + p.colSpan; c++) coveredCols.add(c);
    });

    const missing = cols - coveredCols.size;
    if (missing <= 0 || !inLastRow.length) return;

    // Stretch whichever tile ends furthest right in the last row so it
    // picks up the empty columns beside it.
    const rightmost = inLastRow.reduce((a, b) => (a.colStart + a.colSpan > b.colStart + b.colSpan ? a : b));
    const newSpan = Math.min(rightmost.colSpan + missing, cols - rightmost.colStart);
    rightmost.item.style.gridColumn = `${rightmost.colStart + 1} / span ${newSpan}`;
  });
}

/**
 * @param {() => void} fn
 * @param {number} wait
 */
function debounce(fn, wait) {
  let timer;
  return () => {
    clearTimeout(timer);
    timer = setTimeout(fn, wait);
  };
}

function initGalleryMosaic() {
  if (!document.querySelector(".gallery-grid")) return;
  fillGalleryGaps();
  window.addEventListener("resize", debounce(fillGalleryGaps, 150));
}

document.addEventListener("DOMContentLoaded", initGalleryMosaic);
