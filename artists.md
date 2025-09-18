---
layout: page
title: Artist Biographies
---

## Meet Our Artists

{% for artist in site.artists %}

### {{ artist.name }}

{{ artist.bio }}
{% endfor %}
