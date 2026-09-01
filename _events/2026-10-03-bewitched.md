---
layout: event-details
excerpt_separator: <!--more-->

title: Bewitched
description: An Evening of Opera and the Occult
image: /assets/events/bewitched/images/ogflyer.png
location_name: "Greenfinch Theater & Dive"
location_url: "https://share.google/PIZmQglg4kOdVE9wP"
dates:
  - 2026-10-03 19:30
  - 2026-10-04 14:00
cast:
  - artist: erica-ancell
    role: Soprano
  - artist: anna-edwards
    role: Soprano
  - artist: grace-yukiko-fisher
    role: Soprano
  - artist: rita-schien
    role: Soprano
  - artist: audrey-sondag
    role: Soprano
  - artist: emma-wittenauer
    role: Soprano
  - artist: kelly-beekman
    role: Mezzo-Soprano
  - artist: calista-goldwasser
    role: Mezzo-Soprano
  - artist: stephanie-mossinghoff
    role: Mezzo-Soprano
  - artist: kevin-neace
    role: Tenor
  - artist: riley-cameron
    role: Baritone
  - artist: javi-ojeda
    role: Baritone
  - artist: jessica-barnes
    role: Director
  - artist: joel-rogier
    role: Director
  - artist: aj-murgo
    role: Conductor
theme:
  title_font: The maria story
  title_font_stylesheet: /assets/events/bewitched/font/stylesheet.css
  title_font_size: 8rem
  title_font_weight: normal
  primary_color: "#92470d"
  secondary_color: "#40230c"
  text_dark_lightness: -50
  text_light_lightness: 90
  background_lightness: 85
  header_image: /assets/events/bewitched/images/stripes.png
  footer_image: /assets/events/bewitched/images/stripes.png
  headshot_frame: /assets/events/bewitched/images/headshot-frame.png
  divider_image: /assets/events/bewitched/images/divider.png
---

<h3 class="description">{{ page.description }}</h3>

<p class="center excerpt-only">
  <a href="{{page.url}}" class="btn tickets-btn" data-date="{{ page.dates | last | to_iso8601: page.timezone }}">
    View Showtimes
  </a>
</p>

<!--more-->

<div>
  <div class="location">
    <span class="bold">Location:</span>
    <a href="{{ page.location_url }}" target="_blank">
      {{ page.location_name }}
      <i class="fa-solid fa-2xs fa-arrow-up-right-from-square"></i>
    </a>
  </div>

  <div class="bold">Showings:</div>
    <ul class="showings">
      <li>
        <div class="showing-date">Saturday, October 3, 2026</div>
        <div><span class="bold">Doors Open:</span> 6:30 PM</div>
        <div><span class="bold">Show Time:</span> 7:30 PM</div>
        <div>
          <p>
            <a href="https://www.purplepass.com/events/384564-bewitched-an-evening-of-opera-and-the-occult-oct-3rd-2026" target="_blank" class="btn tickets-btn" data-date="{{ "2026-10-03 18:30" | to_iso8601: page.timezone }}">
              Get Tickets for Saturday
              <i class="fa-solid fa-2xs fa-arrow-up-right-from-square"></i>
            </a>
          </p>
        </div>
        <div>
          <a href="/assets/events/bewitched/icals/2026-10-03-bewitched.ics" download>
            <i class="fa-regular fa-calendar-plus"></i>
            Add to Calendar
          </a>
        </div>
      </li>
        <li>
        <div class="showing-date">Sunday, October 4, 2026</div>
        <div><span class="bold">Doors Open:</span> 2:00 PM</div>
        <div><span class="bold">Show Time:</span> 3:00 PM</div>
        <div>
          <p>
            <a href="https://www.purplepass.com/events/384565-bewitched-an-evening-of-opera-and-the-occult-oct-4th-2026" target="_blank" class="btn tickets-btn" data-date="{{ "2026-10-04 14:00" | to_iso8601: page.timezone }}">
              Get Tickets for Sunday
              <i class="fa-solid fa-2xs fa-arrow-up-right-from-square"></i>
            </a>
          </p>
        </div>
        <div>
          <a href="/assets/events/bewitched/icals/2026-10-04-bewitched.ics" download>
            <i class="fa-regular fa-calendar-plus"></i>
            Add to Calendar
          </a>
        </div>
      </li>
  </ul>

  <div class="bold">Pricing:</div>
  <ul>
      <li>$20 Full Price</li>
      <li>$15 Student Price</li>
  </ul>

  <div class="runtime"><span class="bold">Run Time:</span> 1:30</div>

  <div class="bold">Notes:</div>
  <ul>
      <li>Run time includes a 15 minute intermission</li>
      <li>This show features a selection of pieces in a variety of languages, with projected English supertitles</li>
  </ul>
</div>
