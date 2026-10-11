// ==UserScript==
// @name         osu! Beatmap Listing BPM
// @version      1.5.4
// @match        https://osu.ppy.sh/*
// @updateURL    https://raw.githubusercontent.com/slep34263657/osu-maid/main/beatmap-listing.user.js
// @downloadURL  https://raw.githubusercontent.com/slep34263657/osu-maid/main/beatmap-listing.user.js
// @run-at       document-start
// @grant        none
// ==/UserScript==

const SEARCH_PATH = "/beatmapsets/search";
const bpms = new Map();
let seededFor = null;
let queued = false;

const style = document.createElement("style");
style.textContent = `
.beatmapset-panel.beatmapset-panel {
  --stats-opacity: 1;
}
.beatmapset-panel.beatmapset-panel:not(.beatmapset-panel--size-extra) {
  --stats-grid-template: "hype nominations play-count favourite-count bpm date" / auto auto auto auto auto auto;
}
.beatmapset-panel.beatmapset-panel--size-extra {
  --stats-grid-template: "hype play-count date" "nominations favourite-count bpm" / auto auto auto;
}
.beatmapset-panel__stats-item--bpm {
  grid-area: bpm;
}
.beatmapset-panel[style*="--status-hsl"]::after {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 2;
  border: 1.5px solid hsla(var(--status-hsl), .4);
  border-radius: 10px;
  pointer-events: none;
}
@media (min-width: 900px) {
  .beatmapset-panel.beatmapset-panel {
    --fade-colour: hsla(0, 0%, 9%, .9);
    --info-bg: linear-gradient(0.25turn, hsla(0, 0%, 9%, .9), hsla(0, 0%, 9%, .75));
  }
  .beatmapset-panel.beatmapset-panel:hover {
    --play-bg: transparent;
  }
  .beatmapset-panel__play {
    filter: drop-shadow(0 1px 3px rgba(0, 0, 0, .7));
  }
  .beatmapset-panel__info {
    border-radius: 0;
  }
  .beatmapset-panel__cover-col--play::after {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    right: 10px;
    width: 44px;
    background: linear-gradient(90deg, transparent, var(--fade-colour));
    pointer-events: none;
  }
}
`;
document.documentElement.appendChild(style);

function collect(text) {
  try {
    JSON.parse(text).beatmapsets.forEach((set) => bpms.set(set.id, set.bpm));
  } catch {
    return;
  }
  schedule();
}

const nativeOpen = XMLHttpRequest.prototype.open;
XMLHttpRequest.prototype.open = function (method, url) {
  if (String(url).includes(SEARCH_PATH)) {
    this.addEventListener("load", () => collect(this.responseText));
  }
  return nativeOpen.apply(this, arguments);
};

const nativeFetch = window.fetch;
window.fetch = function (input) {
  const promise = nativeFetch.apply(this, arguments);
  const url = typeof input === "string" ? input : input?.url || "";
  if (url.includes(SEARCH_PATH)) {
    promise.then((res) => res.clone().text()).then(collect).catch(() => {});
  }
  return promise;
};

function format(bpm) {
  return Number.isInteger(bpm) ? String(bpm) : bpm.toFixed(1);
}

function buildItem() {
  const item = document.createElement("div");
  item.className = "beatmapset-panel__stats-item beatmapset-panel__stats-item--bpm";

  const icon = document.createElement("span");
  icon.className = "beatmapset-panel__stats-item-icon";
  icon.innerHTML = '<i class="fa-fw fas fa-music"></i>';

  item.append(icon, document.createElement("span"));
  return item;
}

function decorate() {
  let missing = false;

  document.querySelectorAll(".beatmapset-panel").forEach((card) => {
    const badge = card.querySelector(".beatmapset-status--panel");
    const hsl = badge && getComputedStyle(badge).getPropertyValue("--bg-hsl").trim();
    if (hsl && card.style.getPropertyValue("--status-hsl") !== hsl) {
      card.style.setProperty("--status-hsl", hsl);
    }

    const row = card.querySelector(".beatmapset-panel__info-row--stats");
    const href = card.querySelector(".beatmapset-panel__main-link")?.href || "";
    const id = Number(href.match(/beatmapsets\/(\d+)/)?.[1]);
    if (!row || !id) return;

    const bpm = bpms.get(id);
    if (bpm == null) {
      missing = true;
      return;
    }

    let item = row.querySelector(".beatmapset-panel__stats-item--bpm");
    if (!item) {
      item = buildItem();
      row.insertBefore(item, row.querySelector(".beatmapset-panel__stats-item--date"));
    }
    if (item.dataset.id !== String(id)) {
      item.dataset.id = String(id);
      item.title = `BPM: ${format(bpm)}`;
      item.lastElementChild.textContent = `${format(bpm)} BPM`;
    }
  });

  if (missing && seededFor !== location.search) seed();
}

function seed() {
  seededFor = location.search;
  nativeFetch(`${SEARCH_PATH}${location.search}`, {
    headers: { Accept: "application/json", "X-Requested-With": "XMLHttpRequest" },
  })
    .then((res) => res.text())
    .then(collect)
    .catch(() => {});
}

function schedule() {
  if (queued) return;
  queued = true;
  queueMicrotask(() => {
    queued = false;
    decorate();
  });
}

new MutationObserver(schedule).observe(document.documentElement, {
  childList: true,
  subtree: true,
});

if (location.pathname === "/beatmapsets") seed();
