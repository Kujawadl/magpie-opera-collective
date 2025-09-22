---
layout: page
title: Meet Our Artists
permalink: artists
image: assets/images/artists.jpeg
---

{% for group in site.artist_categories %}
  {% assign artists = site.artists | where: "category", group | sort: "last_name" %}
  <div class="artist-category">
    <h1 class="category-name">{{ group }}</h1>
    {% for artist in artists %}
      <div class="artist-bio">
        {% if artist.headshot %}<div class="headshot"><img src="{{ artist.headshot }}" alt="{{ artist.first_name }} {{ artist.last_name }} Headshot" /></div>{% endif %}

        <div class="bio-content">
          <h2 class="artist-name">{{ artist.first_name }} {{ artist.last_name }}</h2>
          {{ artist.content }}
        </div>
      </div>
      <div class="divider"></div>
    {% endfor %}
  </div>
{% endfor %}
