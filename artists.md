---
layout: page
title: Meet Our Artists
permalink: artists
image: assets/images/artists.jpeg
---

{% for group in site.artist_categories %}
{% assign artists = site.artists | where: "category", group | sort: "last_name" %}

  <div class="artist-category">
    <h2 class="category-name">{{ group }}</h2>
    {% for artist in artists %}
      <div class="artist-bio">
        <h2 class="artist-name">{{ artist.first_name }} {{ artist.last_name }}</h2>

        {% if artist.headshot %}
          <div class="headshot">
            <img src="{{ artist.headshot }}" alt="{{ artist.first_name }} {{ artist.last_name }} Headshot" />
          </div>
        {% endif %}

        <div class="bio-content">
          {{ artist.content }}
        </div>
      </div>
      <div class="divider"></div>
    {% endfor %}

  </div>
{% endfor %}
