---
layout: default
title: Upcoming Events
permalink: events
---

<div id="events">
	<div id="upcoming" class="hidden">
		<h1 class="center">Upcoming Events</h1>
		{% for event in site.events reversed %}
			<div class="event-excerpt" data-date="{{ event.date }}">
				<h2 class="event-title">
					<a href="{{ event.url }}">{{ event.title }}</a>
					<span>{{ event.date | date: "%B %d, %y" }}</span>
				</h2>
				{{ event.excerpt }}
				<div class="divider"></div>
			</div>
		{% endfor %}
	</div>
	<div id="past" class="hidden">
		<h1 class="center">Past Events</h1>
	</div>
</div>
