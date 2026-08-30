---
layout: default
title: Meet Our Artists
permalink: artists
image: assets/images/artists.jpeg
---

{% for group in site.artist_categories %}
{% assign artists = site.artists | where: "category", group | where_exp: "a", "a.active != false" | sort: "last_name" %}

  <div class="artist-category">
    <h2 class="category-name">{{ group }}</h2>
    {% for artist in artists %}
      {% include artist-bio.html artist=artist %}
      <div class="divider"></div>
    {% endfor %}

  </div>
{% endfor %}
