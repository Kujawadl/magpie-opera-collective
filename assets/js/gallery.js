/**
 * Homepage photo gallery lightbox.
 *
 * Vanilla JS, no dependencies. Each `.gallery-item` button in the mosaic
 * carries `data-full` (the highest-quality image for that photo, e.g. the
 * 1800px-wide variant) and `data-alt` (its alt text). Clicking one opens
 * `#gallery-lightbox` showing that full-quality image, with prev/next
 * navigation that cycles through the gallery in DOM order.
 */

function initGalleryLightbox() {
  const lightbox = document.getElementById("gallery-lightbox");
  const items = Array.from(document.querySelectorAll(".gallery-item"));
  if (!lightbox || !items.length) return;

  const img = lightbox.querySelector(".lightbox-img");
  const closeBtn = lightbox.querySelector(".lightbox-close");
  const prevBtn = lightbox.querySelector(".lightbox-prev");
  const nextBtn = lightbox.querySelector(".lightbox-next");
  const backdrop = lightbox.querySelector(".lightbox-backdrop");

  const photos = items.map((item) => ({
    full: item.dataset.full,
    alt: item.dataset.alt || "",
  }));

  let currentIndex = 0;
  /** @type {HTMLElement | null} */
  let lastFocused = null;

  /** @param {number} index */
  function preload(index) {
    const photo = photos[(index + photos.length) % photos.length];
    if (!photo) return;
    const preloadImg = new Image();
    preloadImg.src = photo.full;
  }

  /** @param {number} index */
  function show(index) {
    currentIndex = (index + photos.length) % photos.length;
    const photo = photos[currentIndex];
    img.src = photo.full;
    img.alt = photo.alt;
    // Keep navigation snappy by warming up the neighbors.
    preload(currentIndex + 1);
    preload(currentIndex - 1);
  }

  /** @param {number} index */
  function open(index) {
    lastFocused = /** @type {HTMLElement} */ (document.activeElement);
    show(index);
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.classList.add("lightbox-locked");
    closeBtn?.focus();
    document.addEventListener("keydown", onKeydown);
  }

  function close() {
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.classList.remove("lightbox-locked");
    img.src = "";
    document.removeEventListener("keydown", onKeydown);
    lastFocused?.focus();
  }

  /** @param {KeyboardEvent} e */
  function onKeydown(e) {
    if (e.key === "Escape") close();
    else if (e.key === "ArrowLeft") show(currentIndex - 1);
    else if (e.key === "ArrowRight") show(currentIndex + 1);
  }

  items.forEach((item, index) => {
    item.addEventListener("click", () => open(index));
  });

  closeBtn?.addEventListener("click", close);
  backdrop?.addEventListener("click", close);
  prevBtn?.addEventListener("click", () => show(currentIndex - 1));
  nextBtn?.addEventListener("click", () => show(currentIndex + 1));
}

document.addEventListener("DOMContentLoaded", initGalleryLightbox);
