/** @param {string | null} dateStr */
function isPastDate(dateStr) {
  if (!dateStr) return false;
  const now = new Date();
  const eventDate = new Date(dateStr);
  return eventDate < now;
}

function archivePastEvents() {
  const upcomingEventsSection = document.getElementById("upcoming");
  const upcomingHeader = upcomingEventsSection?.querySelector("h1");

  const pastEventsSection = document.getElementById("past");

  const events = document.querySelectorAll(".event-excerpt");
  /** @type {Element[]} */
  const upcomingEvents = [];
  /** @type {Element[]} */
  const pastEvents = [];
  events.forEach((e) => {
    const eventDate = e.getAttribute("data-date");
    if (isPastDate(eventDate)) {
      pastEvents.push(e);
    } else {
      upcomingEvents.push(e);
    }
  });

  if (pastEvents.length) {
    // Delete all but the first three past events
    pastEvents
      .reverse()
      .splice(3)
      .forEach((e) => e.remove());

    // Move past events to the past events div
    pastEvents.forEach((e) => {
      if (pastEventsSection) {
        pastEventsSection.appendChild(e);
      } else {
        e.remove();
      }
    });

    // Unhide the past events section
    pastEventsSection?.classList.remove("hidden");
  }

  // If no upcoming events, add a message indicating as much
  if (!upcomingEvents.length && upcomingEventsSection && upcomingHeader) {
    const noEventsMsg = document.createElement("p");
    noEventsMsg.textContent = "There are no planned upcoming events at this time. Please check back soon!";
    upcomingEventsSection.insertBefore(noEventsMsg, upcomingHeader.nextSibling);
  }

  // Unhide the upcoming events section
  upcomingEventsSection?.classList.remove("hidden");
}

// Ticket buttons and add-to-calendar links only make sense before a showing,
// so any element with one of these classes is removed once its data-date passes.
function hidePastEventActions() {
  const actions = document.querySelectorAll(".tickets-btn, .calendar-link");
  actions.forEach((el) => {
    const eventDate = el.getAttribute("data-date");
    if (isPastDate(eventDate)) {
      el.remove();
    }
  });
}

document.addEventListener("DOMContentLoaded", archivePastEvents);
document.addEventListener("DOMContentLoaded", hidePastEventActions);
