/**
 * Deep-linkable event tabs (Details/Cast/Gallery).
 *
 * The tabs themselves are pure CSS (radio inputs + labels + :checked in
 * theme.scss) -- this script only syncs them with the URL hash, so a link
 * like /events/votre-toast/#gallery pre-selects that tab on load, and
 * switching tabs updates the hash so the current tab can be shared or
 * bookmarked. Pages without `.event-tabs` (no cast/gallery) are unaffected.
 */

function initEventTabs() {
  const tabs = document.querySelector(".event-tabs");
  if (!tabs) return;

  const inputs = Array.from(tabs.querySelectorAll(".event-tab-input"));
  if (!inputs.length) return;

  /** @param {string} hash */
  function selectFromHash(hash) {
    const name = hash.replace(/^#/, "");
    if (!name) return;
    const input = tabs.querySelector(`#event-tab-${CSS.escape(name)}`);
    if (input) input.checked = true;
  }

  selectFromHash(window.location.hash);
  window.addEventListener("hashchange", () => selectFromHash(window.location.hash));

  inputs.forEach((input) => {
    input.addEventListener("change", () => {
      if (!input.checked) return;
      const name = input.id.replace("event-tab-", "");
      history.replaceState(null, "", `#${name}`);
    });
  });
}

document.addEventListener("DOMContentLoaded", initEventTabs);
