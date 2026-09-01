---
layout: default
title: Upcoming Events
permalink: events
---

<div id="events">
	<div id="upcoming" class="hidden">
		<h1 class="center">Upcoming Events</h1>
		{% for event in site.events %}
			<div class="event-excerpt" data-date="{{ event.dates | last | to_iso8601: event.timezone }}">
				<h2 class="event-title">
					<a href="{{ event.url }}">{{ event.title }}</a>
					<div class="event-dates">
					{% for event_date in event.dates %}
						<span>{{ event_date | date: "%B %d, %Y" }}</span>
					{% endfor %}
					</div>
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
