---
layout: page
title: Upcoming Events
permalink: events
---

{% for event in site.events %}

<div class="event">
	<h2 class="title">{{ event.title }}</h2>

	<h3 class="description">{{ event.description }}</h3>

	{% if event.ticket_link %}
		<a href="{{ event.ticket_link }}" target="_blank" class="btn tickets-btn">
			Get Tickets
			<i class="fa-solid fa-2xs fa-arrow-up-right-from-square"></i>
		</a>
	{% endif %}

	<div class="location">
		<span class="bold">Location:</span>
		{% if event.location_url %}
			<a href="{{ event.location_url }}" target="_blank">
				{{ event.location }}
				<i class="fa-solid fa-2xs fa-arrow-up-right-from-square"></i>
			</a>
		{% else %}
			{{ event.location }}
		{% endif %}
	</div>

	<div class="bold">Showings:</div>
	<ul class="showings">
		{% for showing in event.showings %}
			<li>
				<div class="bold">{{ showing.date | date: "%B, %-d %Y" }}</div>
				{% if showing.doors_open %}<div><span class="bold">Doors Open:</span> {{ showing.doors_open }}</div>{% endif %}
				{% if showing.show_time %}<div><span class="bold">Show Time:</span> {{ showing.show_time }}</div>{% endif %}
			</li>
		{% endfor %}
	</ul>
	
	<div class="bold">Pricing:</div>
	<ul>
		{% for pricing in event.ticket_pricing %}
			<li>{{ pricing }}</li>
		{% endfor %}
	</ul>

	{% if event.run_time %}<div class="runtime"><span class="bold">Run Time:</span> {{ event.run_time }}</div>{% endif %}
	
	{% if event.notes %}
		<div class="bold">Notes:</div>
		<ul>
			{% for note in event.notes %}
				<li>{{ note }}</li>
			{% endfor %}
		</ul>
	{% endif %}
</div>
{% endfor %}
