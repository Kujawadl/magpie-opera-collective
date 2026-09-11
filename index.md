---
layout: default
title: Welcome to Magpie Opera Collective
description: Magpie Opera Collective is an artist-run opera company in St. Louis, Missouri, staging bold new and classic productions and spotlighting emerging vocal talent.
image: /assets/images/gallery/DSC00961-hero-1600.jpg
hero_photos:
  - file: DSC00961
    alt: "The full Magpie Opera Collective cast gathered on stage in gowns and suits, in front of the Votre Toast title screen"
    position: "center 35%"
  - file: DSC00985
    alt: "A soprano beams mid-song, hand on her heart, lit in rose-pink stage light"
    position: "center 25%"
  - file: DSC01013
    alt: "Two performers share a playful hand-hold moment on stage during Votre Toast"
    position: "center 30%"
  - file: DSC01025
    alt: "A performer reaches out dramatically as operatic surtitles scroll on the screen behind her"
    position: "center 20%"
  - file: DSC01085
    alt: "A conductor raises her baton mid-performance, audience members silhouetted in the foreground"
    position: "center 25%"
  - file: DSC01228
    alt: "Cast members react with delight as a performer gestures triumphantly during the finale"
    position: "center 35%"
  - file: DSC01230
    alt: "The full cast takes a bow together as the closing screen thanks the audience"
    position: "center 55%"
---

<section class="hero">
  <div class="hero-slides">
    {%- for slide in page.hero_photos %}
      <img
        class="hero-slide{% if forloop.first %} active{% endif %}"
        src="/assets/images/gallery/{{ slide.file }}-hero-1600.jpg"
        srcset="/assets/images/gallery/{{ slide.file }}-hero-900.jpg 900w, /assets/images/gallery/{{ slide.file }}-hero-1600.jpg 1600w, /assets/images/gallery/{{ slide.file }}-hero-2400.jpg 2400w"
        sizes="100vw"
        alt="{{ slide.alt | escape }}"
        style="object-position: {{ slide.position }};"
        {% if forloop.first %}fetchpriority="high"{% else %}fetchpriority="low"{% endif %}
      />
    {%- endfor %}
  </div>
  <div class="hero-overlay"></div>

  <button type="button" class="hero-prev" aria-label="Previous slide"><i class="fa-solid fa-chevron-left"></i></button>
  <button type="button" class="hero-next" aria-label="Next slide"><i class="fa-solid fa-chevron-right"></i></button>

  <div class="hero-content">
    <div class="hero-text">
      <p class="hero-eyebrow">An Artist-Run Opera Collective in St. Louis</p>
      <h1 class="hero-title">Opera, Made New</h1>
      <p class="hero-subtitle">Bold performances. Emerging voices. A community built by the artists themselves.</p>
    </div>
    <a href="/events.html" class="btn hero-btn">See Upcoming Events</a>

    <div class="hero-dots">
      {%- for slide in page.hero_photos %}
        <button
          type="button"
          class="hero-dot{% if forloop.first %} active{% endif %}"
          aria-label="Go to slide {{ forloop.index }} of {{ page.hero_photos.size }}"
        ></button>
      {%- endfor %}
    </div>
  </div>
</section>

<div class="home-intro">
Welcome to Magpie Opera Collective — an artist-run company reimagining what opera can be in St. Louis. Here you'll find our upcoming performances, the artists bringing them to life, and the story behind our work.

We believe opera thrives on creativity, collaboration, and a willingness to take risks. Explore the site to catch our latest productions, meet the singers and creators behind them, and discover how you can be part of what we're building. Come celebrate the vibrant, ever-evolving world of opera with us!
</div>

<section class="home-gallery">
  <div class="container home-gallery-heading">
    <h2>Moments On Stage</h2>
    <p>A look back at <em>Votre Toast: An Evening of Opera Music and Merriment</em>.</p>
  </div>

  {% include gallery.html folder="/assets/events/votre-toast/images/gallery" max=12 more_link="/events/2025-09-27-votre-toast#gallery" more_text="See the Full Gallery" alt_prefix="Magpie Opera Collective performing in Votre Toast" %}
</section>
