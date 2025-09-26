---
layout: default
title: Upcoming Events
permalink: events
---

<div id="events">
	<div id="upcoming" class="no-hidden">
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

<script type="text/javascript">
	document.addEventListener('DOMContentLoaded', function() {
		const now = new Date();
		const eventExcerpts = document.querySelectorAll('.event-excerpt');
		const eventsDiv = document.getElementById('events');
		const upcomingDiv = document.getElementById('upcoming');
		const pastDiv = document.getElementById('past');
		const upcomingHeader = upcomingDiv.querySelector('h1');
		const pastHeader = pastDiv.querySelector('h1');

		// Move past events to the pastDiv and hide ticket buttons
		let pastCount = 0;
		eventExcerpts.forEach(function(excerpt) {
			const dateStr = excerpt.getAttribute('data-date');
			if (!dateStr) return;
			const eventDate = new Date(dateStr);
			if (eventDate < now) {
				pastDiv.appendChild(excerpt);
				excerpt.querySelectorAll('.tickets-btn').forEach(btn => btn.classList.add('hidden'));
				pastCount++;
			}
		});

		// Show only the 3 most recent past events, remove the rest
		const pastEvents = pastDiv.querySelectorAll('.event-excerpt');
		if (pastEvents.length > 3) {
			for (let i = 3; i < pastEvents.length; i++) {
				pastEvents[i].parentNode.removeChild(pastEvents[i]);
			}
		}
		// Unhide the pastDiv if there are any past events
		if (pastCount > 0) {
			pastDiv.classList.remove('hidden');
		}

		// Unhide the upcomingDiv
		if (upcomingDiv) {
			upcomingDiv.classList.remove('hidden');
		}

		// Check if there are any upcoming events
		const upcomingEvents = Array.from(upcomingDiv.querySelectorAll('.event-excerpt')).filter(function(excerpt) {
			const dateStr = excerpt.getAttribute('data-date');
			if (!dateStr) return false;
			const eventDate = new Date(dateStr);
			return eventDate >= now;
		});

		// If no upcoming events, display a message
		if (upcomingEvents.length === 0 && upcomingDiv) {
			const noEventsMsg = document.createElement('p');
			noEventsMsg.textContent = 'There are no planned upcoming events at this time. Please check back soon!';
			upcomingDiv.insertBefore(noEventsMsg, upcomingHeader.nextSibling);
		}
	});
</script>
