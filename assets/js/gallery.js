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

  // --- Touch swipe navigation ---
  //
  // Swipe left/right anywhere in the lightbox (image or backdrop) to move
  // to the next/previous photo. A swipe is a single touch that travels
  // mostly horizontally past SWIPE_THRESHOLD px; SWIPE_RESTRAINT caps how
  // much vertical drift is still allowed to count (keeps an intentional
  // diagonal drag from misfiring as a swipe). Below that threshold nothing
  // happens, so a plain tap still falls through to the close/backdrop
  // click handlers above.
  const SWIPE_THRESHOLD = 50;
  const SWIPE_RESTRAINT = 75;
  let touchStartX = 0;
  let touchStartY = 0;
  let touchActive = false;

  /** @param {TouchEvent} e */
  function onTouchStart(e) {
    if (e.touches.length !== 1) {
      touchActive = false;
      return;
    }
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
    touchActive = true;
  }

  /** @param {TouchEvent} e */
  function onTouchMove(e) {
    if (!touchActive || e.touches.length !== 1) return;
    const dx = e.touches[0].clientX - touchStartX;
    const dy = e.touches[0].clientY - touchStartY;
    // Once the drag is clearly horizontal, stop the browser from treating
    // it as a scroll or turning it into a click when the finger lifts.
    if (Math.abs(dx) > 10 && Math.abs(dx) > Math.abs(dy)) {
      e.preventDefault();
    }
  }

  /** @param {TouchEvent} e */
  function onTouchEnd(e) {
    if (!touchActive) return;
    touchActive = false;
    const touch = e.changedTouches[0];
    if (!touch) return;
    const dx = touch.clientX - touchStartX;
    const dy = touch.clientY - touchStartY;
    if (Math.abs(dx) >= SWIPE_THRESHOLD && Math.abs(dy) <= SWIPE_RESTRAINT) {
      e.preventDefault();
      show(dx < 0 ? currentIndex + 1 : currentIndex - 1);
    }
  }

  lightbox.addEventListener("touchstart", onTouchStart, { passive: true });
  lightbox.addEventListener("touchmove", onTouchMove, { passive: false });
  lightbox.addEventListener("touchend", onTouchEnd);
}

document.addEventListener("DOMContentLoaded", initGalleryLightbox);
