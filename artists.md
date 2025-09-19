---
layout: page
title: Meet Our Artists
permalink: artists
---

{% for group in site.artist_categories %}
  {% assign artists = site.artists | where: "category", group %}
  <div class="artist-category">
    <h1 class="category-name">{{ group }}</h1>
    {% for artist in artists %}
      <div class="artist-bio">
        {% if artist.headshot %}<img class="headshot" src="{{ artist.headshot }}" alt="{{ artist.name }} Headshot" />{% endif %}

        <div class="bio-content">
          <h2 class="artist-name">{{ artist.name }}</h2>
          {{ artist.content }}
        </div>

      </div>
    {% endfor %}
  </div>
{% endfor %}
