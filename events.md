---
layout: page
title: Upcoming Events
---

## Upcoming Events

{% for event in site.events %}

### {{ event.title }}

**Date:** {{ event.date }}

{{ event.description }}
{% endfor %}
