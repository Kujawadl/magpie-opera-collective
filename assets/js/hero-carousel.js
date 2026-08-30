/**
 * Homepage hero carousel.
 *
 * Vanilla JS, no dependencies. Crossfades between `.hero-slide` images inside
 * `.hero` (toggling an `.active` class that theme.scss transitions via
 * opacity), auto-advancing on a timer with prev/next buttons and dot
 * indicators for manual control. Autoplay pauses on hover/focus, while the
 * tab is hidden, and is skipped entirely for prefers-reduced-motion.
 */

function initHeroCarousel() {
  const hero = document.querySelector(".hero");
  if (!hero) return;

  const slides = Array.from(hero.querySelectorAll(".hero-slide"));
  const dots = Array.from(hero.querySelectorAll(".hero-dot"));
  const prevBtn = hero.querySelector(".hero-prev");
  const nextBtn = hero.querySelector(".hero-next");

  // Nothing to carousel with zero or one slide -- leave the single image as-is.
  if (slides.length < 2) return;

  const INTERVAL_MS = 6000;
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  let index = slides.findIndex((slide) => slide.classList.contains("active"));
  if (index < 0) index = 0;
  /** @type {number | null} */
  let timer = null;

  /** @param {number} newIndex */
  function show(newIndex) {
    index = (newIndex + slides.length) % slides.length;
    slides.forEach((slide, i) => slide.classList.toggle("active", i === index));
    dots.forEach((dot, i) => dot.classList.toggle("active", i === index));
  }

  function next() {
    show(index + 1);
  }

  function prev() {
    show(index - 1);
  }

  function stop() {
    if (timer !== null) {
      window.clearInterval(timer);
      timer = null;
    }
  }

  function start() {
    stop();
    if (prefersReducedMotion) return;
    timer = window.setInterval(next, INTERVAL_MS);
  }

  prevBtn?.addEventListener("click", () => {
    prev();
    start();
  });
  nextBtn?.addEventListener("click", () => {
    next();
    start();
  });
  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
      show(i);
      start();
    });
  });

  hero.addEventListener("mouseenter", stop);
  hero.addEventListener("mouseleave", start);
  hero.addEventListener("focusin", stop);
  hero.addEventListener("focusout", start);
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) stop();
    else start();
  });

  start();
}

document.addEventListener("DOMContentLoaded", initHeroCarousel);
