// ==UserScript==
// @name         osu-maid
// @description  all osu-maid scripts in one
// @version      1.0.12
// @match        https://osu.ppy.sh/*
// @updateURL    https://raw.githubusercontent.com/slep34263657/osu-maid/main/osu-maid.user.js
// @downloadURL  https://raw.githubusercontent.com/slep34263657/osu-maid/main/osu-maid.user.js
// @run-at       document-start
// @inject-into  page
// @sandbox      raw
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_registerMenuCommand
// @grant        GM_xmlhttpRequest
// @connect      assets.ppy.sh
// ==/UserScript==

try {
(() => {
const PALETTES = {
  grey: { b: [28, 20, 16, 12, 9, 7], d: [27, 22, 17, 12, 8, 5], header: 0.45, triangles: 0.6 },
  black: { b: [20, 13, 9, 6, 3, 0], d: [18, 14, 10, 6, 3, 0], header: 0.3, triangles: 0.4 },
};

const NOT_USER_PAGE = "body:not(:has(.header-v4--users))";

const style = document.createElement("style");
document.documentElement.appendChild(style);

function render() {
  const palette = PALETTES[GM_getValue("mode", "grey")];
  if (!palette) {
    style.textContent = "";
    return;
  }
  const vars = (name, levels) => levels.map((l, i) => `--hsl-${name}${i + 1}: 0, 0%, ${l}%;`).join("");
  style.textContent = `
html body { ${vars("b", palette.b)} ${vars("d", palette.d)} }
${NOT_USER_PAGE} .header-v4__bg { filter: grayscale(1) brightness(${palette.header}); }
${NOT_USER_PAGE} .nav2-header__triangles { filter: grayscale(1) brightness(${palette.triangles}); }
${NOT_USER_PAGE} .nav2-header__transition-overlay { background-color: hsl(var(--hsl-b5)); }
`;
}

function setMode(mode) {
  GM_setValue("mode", mode);
  render();
}

GM_registerMenuCommand("Theme: dark grey", () => setMode("grey"));
GM_registerMenuCommand("Theme: pitch black", () => setMode("black"));
GM_registerMenuCommand("Theme: off", () => setMode("off"));

render();
})();
} catch (err) {
  console.error("[osu-maid] osu-dark failed", err);
}

try {
(() => {
const style = document.createElement("style");
style.textContent = `
@media (min-width: 1100px) {
  body:has(.profile-info) .osu-page--generic-compact,
  .header-v4--users .header-v4__content {
    max-width: min(1500px, 94vw);
  }
  body:has(.profile-info) .user-profile-pages {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    column-gap: 16px;
    row-gap: 16px;
  }
  body:has(.profile-info) .user-profile-pages > [data-page-id="top_ranks"],
  body:has(.profile-info) .user-profile-pages > [data-page-id="historical"],
  body:has(.profile-info) .user-profile-pages > [data-page-id="medals"] {
    grid-column: 1 / -1;
  }
  body:has(.profile-info) .user-profile-pages > .js-sortable--page {
    display: flex;
    margin: 0;
  }
  body:has(.profile-info) .user-profile-pages > .osu-fill {
    grid-column: 1 / -1;
  }
  body:has(.profile-info) .user-profile-pages > .js-sortable--page > .page-extra {
    flex: 1;
    min-width: 0;
    margin: 0;
    border: 1px solid rgba(255, 255, 255, .06);
    border-radius: 10px;
  }
  body:has(.profile-info) .user-profile-pages > [data-page-id="me"] > .page-extra {
    display: flex;
    flex-direction: column;
  }
  body:has(.profile-info) .user-profile-pages > [data-page-id="me"] .page-extra__content-overflow-wrapper-outer {
    flex: 1 1 0;
    display: flex;
    flex-direction: column;
    min-height: 400px;
    max-height: none;
  }
  body:has(.profile-info) .user-profile-pages > [data-page-id="me"] .page-extra__content-overflow-wrapper-inner {
    flex: 1 1 auto;
    min-height: 0;
    max-height: none;
    height: auto;
  }
}
.header-v4--users .header-v4__row--title {
  display: none;
}
.header-v4--users .header-v4__container--main {
  min-height: 0;
  padding-top: 96px;
}
.play-detail[data-cover]::before {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  border-radius: var(--border-radius);
  pointer-events: none;
  background-image:
    linear-gradient(90deg, transparent 0%, transparent 30%, color-mix(in srgb, var(--bg-main) 55%, black) 70%),
    linear-gradient(90deg, rgba(0, 0, 0, .75), rgba(0, 0, 0, .5)),
    var(--cover),
    linear-gradient(var(--bg-main), var(--bg-main));
  background-size: 100% 100%, 70% 100%, 70% auto, 100% 100%;
  background-position: 0 0, left center, left center, 0 0;
  background-repeat: no-repeat;
}
.play-detail[data-cover] {
  min-height: 62px;
  text-shadow: 0 1px 3px rgba(0, 0, 0, .6);
}
.play-detail[data-cover] .play-detail__group--bottom > * {
  align-items: center;
}
.play-detail[data-cover] .play-detail__pp,
.play-detail[data-cover] .play-detail__more {
  align-self: stretch;
}
.play-detail--pin-sortable[data-cover]::before {
  left: var(--pin-sortable-handle-width);
}
.play-detail[data-cover] .play-detail__group--top {
  background-color: transparent;
}
.play-detail[data-cover] .play-detail__score-detail,
.play-detail[data-cover] .play-detail__mods,
.play-detail[data-cover] .play-detail__pp {
  background: transparent;
}
.play-detail[data-cover] .play-detail__pp::before {
  display: none;
}
.play-detail[data-cover] .play-detail__score-detail,
.play-detail[data-cover] .play-detail__mods {
  padding-left: 4px;
  padding-right: 4px;
}
.play-detail__rank-num {
  opacity: .6;
  margin-right: .4em;
  font-weight: 600;
}
`;
document.documentElement.appendChild(style);

function applyScores() {
  document.querySelectorAll(".play-detail-list").forEach((list) => {
    list.querySelectorAll(".play-detail").forEach((row, i) => {
      const link = row.querySelector(".play-detail__title");
      if (!link) return;

      const setId = link.href.match(/beatmapsets\/(\d+)/)?.[1];
      if (setId && !row.dataset.cover) {
        row.dataset.cover = setId;
        row.style.setProperty("--cover", `url(https://assets.ppy.sh/beatmaps/${setId}/covers/cover.jpg)`);
      }

      let num = link.querySelector(".play-detail__rank-num");
      const numbered = [...link.childNodes].some((n) => n !== num && /^\s*#\d+/.test(n.textContent));
      if (numbered) {
        num?.remove();
        return;
      }
      if (!num) {
        num = document.createElement("span");
        num.className = "play-detail__rank-num";
        link.prepend(num);
      }
      const text = `#${i + 1}`;
      if (num.textContent !== text) num.textContent = text;
    });
  });
}

let queued = false;

function fillLonelyRows() {
  queued = false;
  const grid = document.querySelector(".user-profile-pages");
  if (!grid || !document.querySelector(".profile-info")) return;

  const items = [...grid.children].filter((el) => el.offsetParent !== null);
  items.forEach((el) => el.classList.remove("osu-fill"));

  const rows = new Map();
  items.forEach((el) => {
    const top = Math.round(el.getBoundingClientRect().top);
    rows.set(top, [...(rows.get(top) || []), el]);
  });
  rows.forEach((row) => {
    if (row.length === 1) row[0].classList.add("osu-fill");
  });
}

function schedule() {
  if (queued) return;
  queued = true;
  requestAnimationFrame(fillLonelyRows);
}

new MutationObserver(() => {
  applyScores();
  schedule();
}).observe(document.documentElement, {
  childList: true,
  subtree: true,
});
window.addEventListener("resize", schedule);
applyScores();
})();
} catch (err) {
  console.error("[osu-maid] osu-layout failed", err);
}

try {
(() => {
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

const MODE_ON = "osu-maid:remember-mode";
const MODE_VAL = "osu-maid:mode";

function saveKey(key, value) {
  try {
    if (value === null) localStorage.removeItem(key);
    else localStorage.setItem(key, value);
  } catch {}
}

function loadKey(key) {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function rememberOn() {
  return loadKey(MODE_ON) === "1";
}

function withSavedMode(url) {
  const mode = loadKey(MODE_VAL);
  if (!rememberOn() || !mode) return null;
  if (url.pathname.replace(/\/$/, "") !== "/beatmapsets" || url.searchParams.has("m")) return null;
  url.searchParams.set("m", mode);
  return url;
}

const startUrl = withSavedMode(new URL(location.href));
if (startUrl) location.replace(startUrl.href);

function saveMode() {
  if (!rememberOn() || location.pathname.replace(/\/$/, "") !== "/beatmapsets") return;
  const m = new URLSearchParams(location.search).get("m");
  saveKey(MODE_VAL, m === null ? "" : m);
}

for (const name of ["pushState", "replaceState"]) {
  const native = history[name];
  history[name] = function () {
    const result = native.apply(this, arguments);
    saveMode();
    return result;
  };
}
window.addEventListener("popstate", saveMode);

document.addEventListener(
  "click",
  (e) => {
    const a = e.target.closest?.("a[href]");
    if (!a || a.origin !== location.origin) return;
    const url = withSavedMode(new URL(a.href));
    if (url) a.href = url.href;
  },
  true,
);

const modeStyle = document.createElement("style");
modeStyle.textContent = `
.header-v4--beatmapsets .header-v4__content { position: relative; }
.osu-maid-gear {
  position: absolute;
  top: 50%;
  right: 20px;
  transform: translateY(-50%);
  z-index: 5;
}
.osu-maid-gear__button {
  background: none;
  border: 0;
  padding: 8px;
  font-size: 18px;
  color: #fff;
  opacity: .6;
  cursor: pointer;
}
.osu-maid-gear__button:hover,
.osu-maid-gear[data-open] .osu-maid-gear__button {
  opacity: 1;
}
.osu-maid-gear__menu {
  display: none;
  position: absolute;
  top: 100%;
  right: 0;
  padding: 12px 14px;
  white-space: nowrap;
  border-radius: 8px;
  background: rgba(10, 10, 10, .95);
  border: 1px solid rgba(255, 255, 255, .1);
}
.osu-maid-gear[data-open] .osu-maid-gear__menu {
  display: block;
}
.osu-maid-mode {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: #fff;
  cursor: pointer;
  user-select: none;
}
.osu-maid-mode__track {
  flex: none;
  width: 30px;
  height: 16px;
  border-radius: 8px;
  background: rgba(255, 255, 255, .2);
  position: relative;
  transition: background .15s;
}
.osu-maid-mode__track::after {
  content: "";
  position: absolute;
  top: 2px;
  left: 2px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #fff;
  transition: transform .15s;
}
.osu-maid-mode[data-on] .osu-maid-mode__track {
  background: hsl(var(--hsl-pink-1, 333 100% 55%));
}
.osu-maid-mode[data-on] .osu-maid-mode__track::after {
  transform: translateX(14px);
}
`;
document.documentElement.appendChild(modeStyle);

function mountModeToggle() {
  const host = document.querySelector(".header-v4--beatmapsets .header-v4__content");
  if (!host || host.querySelector(".osu-maid-gear")) return;

  const gear = document.createElement("div");
  gear.className = "osu-maid-gear";
  gear.innerHTML =
    '<button type="button" class="osu-maid-gear__button" title="listing settings"><i class="fas fa-cog"></i></button>' +
    '<div class="osu-maid-gear__menu"></div>';
  const menu = gear.querySelector(".osu-maid-gear__menu");

  const label = document.createElement("label");
  label.className = "osu-maid-mode";
  label.innerHTML = '<span class="osu-maid-mode__track"></span><span>remember selected mode</span>';
  label.toggleAttribute("data-on", rememberOn());
  label.addEventListener("click", (e) => {
    e.preventDefault();
    const on = !rememberOn();
    saveKey(MODE_ON, on ? "1" : null);
    label.toggleAttribute("data-on", on);
    if (on) saveMode();
    else saveKey(MODE_VAL, null);
  });
  menu.appendChild(label);

  gear.querySelector(".osu-maid-gear__button").addEventListener("click", () => {
    gear.toggleAttribute("data-open");
  });
  document.addEventListener("click", (e) => {
    if (!gear.contains(e.target)) gear.removeAttribute("data-open");
  });
  host.appendChild(gear);
}

new MutationObserver(mountModeToggle).observe(document.documentElement, {
  childList: true,
  subtree: true,
});

if (location.pathname === "/beatmapsets") seed();
})();
} catch (err) {
  console.error("[osu-maid] beatmap-listing failed", err);
}

try {
(() => {
function fixTimes() {
  document.querySelectorAll(".beatmap-scoreboard-table time").forEach((el) => {
    const node = el.firstChild;
    if (!node || node.nodeType !== Node.TEXT_NODE || node.nodeValue.trim() !== "now") return;
    const stamp = el.getAttribute("title") || el.getAttribute("data-orig-title") || el.getAttribute("oldtitle") || el.getAttribute("data-title") || el.dataset.osuMaidTime;
    if (!stamp) return;
    el.dataset.osuMaidTime = stamp;
    const age = Date.now() - new Date(stamp).getTime();
    const minutes = Math.floor(age / 60000);
    if (minutes >= 1 && minutes < 60) node.nodeValue = `${minutes}m`;
  });
}

new MutationObserver(fixTimes).observe(document.documentElement, {
  childList: true,
  characterData: true,
  subtree: true,
});
setInterval(fixTimes, 1000);
fixTimes();
})();
} catch (err) {
  console.error("[osu-maid] beatmap-leaderboard failed", err);
}

try {
(() => {
const style = document.createElement("style");
style.textContent = `
@media (min-width: 1000px) {
  body:has(.score-info) .osu-page--generic-compact,
  body:has(.score-info) .header-v4__content {
    max-width: min(1200px, 94vw);
  }
  body:has(.score-info) .score-beatmap {
    background: rgba(0, 0, 0, .45);
    padding: 14px 56px 12px;
  }
  body:has(.score-info) .score-beatmap__played {
    margin-top: 6px;
    font-size: 14px;
    opacity: .85;
  }
  body:has(.score-info) .score-info {
    position: relative;
    isolation: isolate;
    align-items: stretch;
    min-height: 560px;
    padding: 0 56px 0 0;
  }
  body:has(.score-info) .score-info__cover {
    z-index: -1;
  }
  body:has(.score-info) .score-info__cover .beatmapset-cover {
    filter: brightness(.55);
  }
  body:has(.score-info) .score-info__item:has(.score-tower) {
    display: none;
  }
  body:has(.score-info) .score-info__item--player {
    position: static;
    order: 1;
    flex: none;
    width: 700px;
    box-sizing: border-box;
    padding: 40px 44px 0;
    background: rgba(0, 0, 0, .4);
  }
  body:has(.score-info) .score-player__row--player {
    display: none;
  }
  body:has(.score-info) .score-player__row--score {
    grid-template-rows: auto auto;
  }
  body:has(.score-info) .score-player__score {
    font-size: 88px;
    line-height: 1;
    text-align: center;
    font-variant-numeric: tabular-nums;
  }
  body:has(.score-info) .score-player__row--rank {
    position: absolute;
    top: 28px;
    right: 56px;
    display: block;
    text-align: right;
  }
  body:has(.score-info) .score-player__rank {
    width: auto;
    text-align: right;
    white-space: nowrap;
  }
  body:has(.score-info) .score-player__rank--label {
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: .08em;
    opacity: .8;
  }
  body:has(.score-info) .score-player__rank--value {
    font-size: 30px;
    font-weight: 300;
  }
  body:has(.score-info) .score-player__rank--value span {
    font-size: inherit;
  }
  body:has(.score-info) .score-player__mods {
    position: absolute;
    right: 56px;
    top: 50%;
    transform: translateY(-50%);
    zoom: 1.35;
    padding: 0;
    background: none;
  }
  body:has(.score-info) .score-buttons .btn-osu-big {
    background: rgba(0, 0, 0, .45);
    border: 1px solid rgba(255, 255, 255, .1);
    box-shadow: none;
    transition: background-color .15s;
  }
  body:has(.score-info) .score-buttons .btn-osu-big:hover {
    background: rgba(0, 0, 0, .65);
  }
  body:has(.score-info) .score-info__item--buttons {
    order: 9;
    z-index: 5;
  }
  body:has(.score-info) .score-info__item--dial {
    pointer-events: none;
    order: 2;
    flex: 1;
    width: auto;
    justify-content: center;
    align-items: center;
  }
  body:has(.score-info) .score-info__item--dial .legacy-rank {
    zoom: 1.8;
  }
  body:has(.score-info) .score-info__item--dial .score-dial {
    display: none;
  }
  body:has(.score-info) .score-stats {
    position: relative;
    z-index: 2;
    display: block;
    box-sizing: border-box;
    width: 700px;
    height: 560px;
    margin-top: -560px;
    padding: 0 44px;
    pointer-events: none;
  }
  body:has(.score-info) .score-stats__group--user-card {
    display: none;
  }
  body:has(.score-info) .score-stats__group--stats {
    --col: calc((100% - 30px) / 4);
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    gap: 14px 10px;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    padding: 215px 0 32px;
  }
  body:has(.score-info) .score-stats__group--stats::after {
    content: "";
    order: 6;
    flex: 0 0 100%;
    height: 70px;
  }
  body:has(.score-info) .score-stats__group-row {
    display: contents;
  }
  body:has(.score-info) .score-stats__stat {
    order: 7;
    flex: 1 1 0;
    flex-direction: column;
    justify-content: center;
    min-width: 0;
    max-width: none;
    height: auto;
    box-sizing: border-box;
    padding: 8px 4px;
    overflow: hidden;
    text-align: center;
    white-space: nowrap;
    background: rgba(0, 0, 0, .35);
    border: 1px solid rgba(255, 255, 255, .06);
    border-radius: 10px;
  }
  body:has(.score-info) .score-stats__stat-row--label {
    max-width: 100%;
    font-size: 9px;
    line-height: 1.15;
    text-transform: uppercase;
    letter-spacing: .04em;
    white-space: normal;
    overflow-wrap: anywhere;
    opacity: .85;
  }
  body:has(.score-info) .score-stats__stat-row:not(.score-stats__stat-row--label) {
    font-size: 18px;
    font-weight: 300;
  }
  body:has(.score-info) .score-stats__group-row:first-child .score-stats__stat {
    flex-direction: column-reverse;
    align-items: flex-start;
    padding: 0;
    text-align: left;
    background: none;
    border: 0;
    overflow: visible;
  }
  body:has(.score-info) .score-stats__group-row:first-child .score-stats__stat:nth-child(1) {
    order: 2;
    flex: 0 0 calc(var(--col) * 2 + 10px);
  }
  body:has(.score-info) .score-stats__group-row:first-child .score-stats__stat:nth-child(2) {
    order: 1;
    flex: 0 0 calc(var(--col) * 2 + 10px);
  }
  body:has(.score-info) .score-stats__group-row:first-child .score-stats__stat:nth-child(3) {
    order: 5;
    flex: 0 0 calc(var(--col) * 2 + 10px);
    margin-left: auto;
  }
  body:has(.score-info) .score-stats__stat[data-kind="slider tick"] {
    order: 3;
    flex: 0 0 auto;
    margin-right: 18px;
  }
  body:has(.score-info) .score-stats__stat[data-kind="slider end"] {
    order: 4;
    flex: 0 0 auto;
  }
  body:has(.score-info) .score-stats__stat[data-kind^="slider"] {
    flex-direction: column-reverse;
    align-items: flex-start;
    padding: 0;
    text-align: left;
    background: none;
    border: 0;
    overflow: visible;
  }
  body:has(.score-info) .score-stats__stat[data-kind^="slider"] .score-stats__stat-row:not(.score-stats__stat-row--label) {
    font-size: 36px;
  }
  body:has(.score-info) .score-stats__stat[data-kind^="slider"] .score-stats__stat-row--label {
    font-size: 14px;
    text-transform: capitalize;
    letter-spacing: 0;
    background: none;
    opacity: .9;
  }
  body:has(.score-info) .score-stats__group-row:first-child .score-stats__stat:nth-child(-n+2) .score-stats__stat-row:not(.score-stats__stat-row--label) {
    font-size: 56px;
  }
  body:has(.score-info) .score-stats__group-row:first-child .score-stats__stat:nth-child(3) .score-stats__stat-row:not(.score-stats__stat-row--label) {
    font-size: 40px;
  }
  body:has(.score-info) .score-stats__group-row:first-child .score-stats__stat .score-stats__stat-row--label {
    font-size: 14px;
    text-transform: none;
    letter-spacing: 0;
    background: none;
    opacity: .9;
  }
  body:has(.score-info) .score-stats__stat:has(.score-stats__stat-row--hit-great) .score-stats__stat-row:not(.score-stats__stat-row--label) {
    color: rgb(71, 180, 235);
  }
  body:has(.score-info) .score-stats__stat:has(.score-stats__stat-row--hit-ok) .score-stats__stat-row:not(.score-stats__stat-row--label) {
    color: rgb(153, 235, 71);
  }
  body:has(.score-info) .score-stats__stat:has(.score-stats__stat-row--hit-meh) .score-stats__stat-row:not(.score-stats__stat-row--label) {
    color: rgb(255, 217, 102);
  }
  body:has(.score-info) .score-stats__stat:has(.score-stats__stat-row--hit-miss) .score-stats__stat-row:not(.score-stats__stat-row--label) {
    color: rgb(255, 102, 102);
  }
}
`;
document.documentElement.appendChild(style);

const RANK_CLASS = { SS: "X", X: "X", S: "S", A: "A", B: "B", C: "C", D: "D" };
const SILVER_MODS = ".score-player__mods .mod__icon--HD, .score-player__mods .mod__icon--FL, .score-player__mods .mod__icon--FI";

function useHighRes(art) {
  const key = art.className;
  if (art.dataset.hires === key) return;

  art.style.backgroundImage = "";
  const urls = [...getComputedStyle(art).backgroundImage.matchAll(/url\("?([^")]+)"?\)/g)].map((m) => m[1]);
  const hi = urls.find((u) => u.includes("@2x")) || urls[urls.length - 1];
  if (!hi) return;

  art.style.backgroundImage = `url("${hi}")`;
  art.dataset.hires = key;
}

function applyStableGrade() {
  const dial = document.querySelector(".score-info__item--dial");
  const letter = dial?.querySelector(".score-dial__layer--grade span");
  if (!dial || !letter) return;

  const base = RANK_CLASS[letter.textContent.trim()];
  if (!base) return;

  const silver = (base === "X" || base === "S") && document.querySelector(SILVER_MODS);
  const cls = `legacy-rank--${base}${silver ? "H" : ""}`;

  let art = dial.querySelector(".legacy-rank");
  if (!art) {
    art = document.createElement("div");
    dial.append(art);
  }
  if (art.dataset.grade !== cls) {
    art.className = `legacy-rank ${cls}`;
    art.dataset.grade = cls;
  }
}

function applyPlayedLine() {
  const bar = document.querySelector(".score-beatmap");
  const player = document.querySelector(".score-player__row--player");
  if (!bar || !player) return;

  const info = {};
  const cells = [...player.children];
  for (let i = 0; i + 1 < cells.length; i += 2) {
    info[cells[i].textContent.trim()] = cells[i + 1].textContent.trim();
  }
  if (!info["Played by"]) return;

  const parts = [`Played by ${info["Played by"]}`];
  if (info["Submitted on"]) parts[0] += ` on ${info["Submitted on"]}`;
  if (info["Played on"]) parts.push(info["Played on"]);
  const text = parts.join(" · ");

  let line = bar.querySelector(".score-beatmap__played");
  if (!line) {
    line = document.createElement("div");
    line.className = "score-beatmap__played";
    bar.append(line);
  }
  if (line.textContent !== text) line.textContent = text;
}

function tagStats() {
  document.querySelectorAll(".score-stats__stat").forEach((tile) => {
    const kind = tile.querySelector(".score-stats__stat-row--label")?.textContent.trim().toLowerCase();
    if (kind && tile.dataset.kind !== kind) tile.dataset.kind = kind;
  });
}

function apply() {
  applyStableGrade();
  const art = document.querySelector(".score-info__item--dial .legacy-rank");
  if (art) useHighRes(art);
  applyPlayedLine();
  tagStats();
}

new MutationObserver(apply).observe(document.documentElement, {
  childList: true,
  subtree: true,
});
})();
} catch (err) {
  console.error("[osu-maid] osu-results failed", err);
}

try {
(() => {
const SCALE = 2;
const ROOTS = [".score-beatmap", ".score-info", ".score-stats__group--stats"];
const SKIP = [
  ".score-info__cover",
  ".score-info__item--buttons",
  ".score-info__item:has(.score-tower)",
  ".score-stats__group--user-card",
  ".osu-score-image-button",
].join(",");

const style = document.createElement("style");
style.textContent = `
.score-buttons {
  gap: 8px;
}
.score-buttons .osu-score-image-button {
  background: rgba(0, 0, 0, .45);
  border: 1px solid rgba(255, 255, 255, .1);
  box-shadow: none;
  cursor: pointer;
}
.score-buttons .osu-score-image-button:hover {
  background: rgba(0, 0, 0, .65);
}
.osu-score-image-message {
  position: fixed;
  left: 50%;
  bottom: 32px;
  z-index: 10000;
  transform: translateX(-50%);
  padding: 10px 18px;
  font-size: 13px;
  color: #fff;
  background: rgba(0, 0, 0, .8);
  border: 1px solid rgba(255, 255, 255, .1);
  border-radius: 10px;
}
`;
document.documentElement.appendChild(style);

const alphaProbe = document.createElement("canvas").getContext("2d", { willReadFrequently: true });
const alphaCache = new Map();

function colorAlpha(color) {
  if (!color || color === "transparent") return 0;
  if (alphaCache.has(color)) return alphaCache.get(color);
  alphaProbe.clearRect(0, 0, 1, 1);
  alphaProbe.fillStyle = "#000";
  alphaProbe.fillStyle = color;
  alphaProbe.fillRect(0, 0, 1, 1);
  const alpha = alphaProbe.getImageData(0, 0, 1, 1).data[3];
  alphaCache.set(color, alpha);
  return alpha;
}

function showMessage(text) {
  document.querySelector(".osu-score-image-message")?.remove();
  const box = document.createElement("div");
  box.className = "osu-score-image-message";
  box.textContent = text;
  document.body.append(box);
  setTimeout(() => box.remove(), 5000);
}

function fetchBlob(url) {
  if (typeof GM_xmlhttpRequest === "function") {
    return new Promise((resolve, reject) => {
      GM_xmlhttpRequest({
        url,
        method: "GET",
        responseType: "blob",
        onload: (res) => {
          if (res.status >= 200 && res.status < 300 && res.response) resolve(res.response);
          else reject(new Error(`HTTP ${res.status}`));
        },
        onerror: () => reject(new Error("network error")),
        ontimeout: () => reject(new Error("timeout")),
      });
    });
  }
  return fetch(url).then((res) => (res.ok ? res.blob() : Promise.reject(new Error(`HTTP ${res.status}`))));
}

function decodeImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`image failed: ${src}`));
    img.src = src;
  });
}

const resolved = new Map();

function loadImage(url) {
  if (resolved.has(url)) return Promise.resolve(resolved.get(url));
  return decodeImage(url)
    .catch(() => null)
    .then((img) => {
      resolved.set(url, img);
      return img;
    });
}

async function loadCover() {
  const el = document.querySelector(".score-info__cover .beatmapset-cover");
  if (!el) return null;

  const cs = getComputedStyle(el);
  const urls = [...`${cs.getPropertyValue("--bg")} ${cs.backgroundImage}`.matchAll(/url\("?([^")]+)"?\)/g)].map((m) => m[1]);
  const hit = urls.find((u) => /assets\.ppy\.sh\/beatmaps\/\d+\/covers\//.test(u));
  if (!hit) return null;

  const base = hit.replace(/covers\/[^?]*(\?.*)?$/, "covers/");
  for (const name of ["raw.jpg", "cover@2x.jpg", "cover.jpg"]) {
    try {
      const blob = await fetchBlob(base + name);
      return await decodeImage(URL.createObjectURL(blob));
    } catch {
      continue;
    }
  }
  return null;
}

function pickUrl(value) {
  const list = urlsOf(value || "");
  return list.find((u) => u.includes("@2x")) || list[0];
}

function urlsOf(value) {
  return [...value.matchAll(/url\("?([^")]+)"?\)/g)].map((m) => m[1]);
}

function effectiveOpacity(el) {
  let opacity = 1;
  for (let node = el; node && node !== document.documentElement; node = node.parentElement) {
    opacity *= parseFloat(getComputedStyle(node).opacity);
  }
  return opacity;
}

function radiusOf(cs, rect) {
  const r = parseFloat(cs.borderTopLeftRadius) || 0;
  return Math.min(r, rect.width / 2, rect.height / 2);
}

function roundedPath(ctx, x, y, w, h, r) {
  ctx.beginPath();
  if (r > 0) ctx.roundRect(x, y, w, h, r);
  else ctx.rect(x, y, w, h);
}

function fitBox(img, box, size, posX, posY) {
  const iw = img.naturalWidth || img.width;
  const ih = img.naturalHeight || img.height;
  let w = iw;
  let h = ih;

  if (size === "contain" || size === "cover") {
    const k = size === "contain" ? Math.min(box.width / iw, box.height / ih) : Math.max(box.width / iw, box.height / ih);
    w = iw * k;
    h = ih * k;
  } else if (size && size !== "auto") {
    const [sw, sh] = size.split(" ");
    const px = (v, total) => (v.endsWith("%") ? (parseFloat(v) / 100) * total : parseFloat(v));
    w = sw && sw !== "auto" ? px(sw, box.width) : null;
    h = sh && sh !== "auto" ? px(sh, box.height) : null;
    if (w == null && h == null) {
      w = iw;
      h = ih;
    } else if (w == null) w = (h / ih) * iw;
    else if (h == null) h = (w / iw) * ih;
  }

  const offset = (pos, free) => (pos.endsWith("%") ? (parseFloat(pos) / 100) * free : parseFloat(pos) || 0);
  return {
    x: box.left + offset(posX, box.width - w),
    y: box.top + offset(posY, box.height - h),
    w,
    h,
  };
}

function drawBackgroundImage(ctx, el, cs, rect, alpha) {
  const url = pickUrl(cs.backgroundImage);
  const img = url && resolved.get(url);
  if (!img) return;

  const fit = fitBox(img, rect, cs.backgroundSize, cs.backgroundPositionX, cs.backgroundPositionY);
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.beginPath();
  ctx.rect(rect.left, rect.top, rect.width, rect.height);
  ctx.clip();
  ctx.drawImage(img, fit.x, fit.y, fit.w, fit.h);
  ctx.restore();
}

function drawMaskedPseudo(ctx, rect, pcs, alpha) {
  const url = urlsOf(pcs.maskImage || pcs.webkitMaskImage || "")[0];
  const img = url && resolved.get(url);
  if (!img) return;

  const color = pcs.backgroundColor;
  if (colorAlpha(color) === 0) return;

  const w = Math.max(1, Math.round(rect.width * SCALE));
  const h = Math.max(1, Math.round(rect.height * SCALE));
  const layer = document.createElement("canvas");
  layer.width = w;
  layer.height = h;
  const lctx = layer.getContext("2d");

  const size = pcs.maskSize || "auto";
  const fit = fitBox(img, { left: 0, top: 0, width: w, height: h }, size, pcs.maskPositionX || "50%", pcs.maskPositionY || "50%");
  lctx.imageSmoothingQuality = "high";
  lctx.drawImage(img, fit.x, fit.y, fit.w, fit.h);
  lctx.globalCompositeOperation = "source-in";
  lctx.fillStyle = color;
  lctx.fillRect(0, 0, w, h);

  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.drawImage(layer, rect.left, rect.top, rect.width, rect.height);
  ctx.restore();
}

function unquote(content) {
  return content.replace(/^["']|["']$/g, "");
}

function drawGlyph(ctx, rect, pcs, alpha) {
  const glyph = unquote(pcs.content);
  if (!glyph.trim()) return;

  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.font = `${pcs.fontStyle} ${pcs.fontWeight} ${pcs.fontSize} ${pcs.fontFamily}`;
  ctx.fillStyle = pcs.color;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(glyph, rect.left + rect.width / 2, rect.top + rect.height / 2);
  ctx.restore();
}

function drawPseudo(ctx, el, which, rect, alpha) {
  const pcs = getComputedStyle(el, which);
  if (pcs.display === "none" || pcs.content === "none" || pcs.content === "normal") return;

  if ((pcs.maskImage && pcs.maskImage !== "none") || (pcs.webkitMaskImage && pcs.webkitMaskImage !== "none")) {
    drawMaskedPseudo(ctx, rect, pcs, alpha);
  } else {
    drawGlyph(ctx, rect, pcs, alpha);
  }
}

function parseShadow(value) {
  if (!value || value === "none") return null;
  const m = value.match(/^(.*?)\s+(-?[\d.]+)px\s+(-?[\d.]+)px\s+([\d.]+)px/);
  return m ? { color: m[1], x: parseFloat(m[2]), y: parseFloat(m[3]), blur: parseFloat(m[4]) } : null;
}

function transformText(text, transform) {
  if (transform === "uppercase") return text.toUpperCase();
  if (transform === "lowercase") return text.toLowerCase();
  if (transform === "capitalize") return text.replace(/\b\p{L}/gu, (c) => c.toUpperCase());
  return text;
}

function textLines(node) {
  const lines = [];
  const re = /\S+/g;
  const text = node.textContent;
  let m;
  while ((m = re.exec(text))) {
    const range = document.createRange();
    range.setStart(node, m.index);
    range.setEnd(node, m.index + m[0].length);
    const rect = range.getClientRects()[0];
    if (!rect) continue;
    const line = lines[lines.length - 1];
    if (line && Math.abs(line.top - rect.top) < 2) {
      line.words.push(m[0]);
      line.right = rect.right;
    } else {
      lines.push({ words: [m[0]], left: rect.left, top: rect.top, right: rect.right, height: rect.height });
    }
  }
  return lines;
}

function drawTextNode(ctx, node, cs, alpha, origin) {
  const fontSize = parseFloat(cs.fontSize);
  const font = `${cs.fontStyle} ${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`;
  const shadow = parseShadow(cs.textShadow);
  const tabular = (cs.fontVariantNumeric || "").includes("tabular");

  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.font = font;
  ctx.fillStyle = cs.color;
  ctx.textAlign = "left";
  ctx.textBaseline = "alphabetic";
  if (cs.letterSpacing && cs.letterSpacing !== "normal") ctx.letterSpacing = cs.letterSpacing;
  if (shadow) {
    ctx.shadowColor = shadow.color;
    ctx.shadowOffsetX = shadow.x * SCALE;
    ctx.shadowOffsetY = shadow.y * SCALE;
    ctx.shadowBlur = shadow.blur * SCALE;
  }

  const ascent = ctx.measureText("Hg").fontBoundingBoxAscent || fontSize * 0.8;

  textLines(node).forEach((line) => {
    const str = transformText(line.words.join(" "), cs.textTransform);
    const baseline = line.top - origin.y + ascent;
    const left = line.left - origin.x;

    if (tabular) {
      const digit = ctx.measureText("0").width;
      const advances = [...str].map((ch) => (/\d/.test(ch) ? digit : ctx.measureText(ch).width));
      const total = advances.reduce((a, b) => a + b, 0);
      const k = total > 0 ? (line.right - line.left) / total : 1;
      let x = left;
      [...str].forEach((ch, i) => {
        const w = advances[i] * k;
        const natural = ctx.measureText(ch).width;
        ctx.fillText(ch, x + (w - natural) / 2, baseline);
        x += w;
      });
    } else {
      ctx.fillText(str, left, baseline);
    }
  });

  ctx.restore();
}

function drawElement(ctx, el, origin) {
  const cs = getComputedStyle(el);
  if (cs.display === "none" || cs.visibility === "hidden") return;

  const r = el.getBoundingClientRect();
  if (r.width === 0 || r.height === 0) return;

  const rect = {
    left: r.left - origin.x,
    top: r.top - origin.y,
    width: r.width,
    height: r.height,
  };
  const alpha = effectiveOpacity(el);

  if (colorAlpha(cs.backgroundColor) > 0) {
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.fillStyle = cs.backgroundColor;
    roundedPath(ctx, rect.left, rect.top, rect.width, rect.height, radiusOf(cs, rect));
    ctx.fill();
    ctx.restore();
  }

  drawBackgroundImage(ctx, el, cs, rect, alpha);

  const bw = parseFloat(cs.borderTopWidth);
  if (bw > 0 && cs.borderTopStyle !== "none" && colorAlpha(cs.borderTopColor) > 0) {
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.strokeStyle = cs.borderTopColor;
    ctx.lineWidth = bw;
    roundedPath(ctx, rect.left + bw / 2, rect.top + bw / 2, rect.width - bw, rect.height - bw, Math.max(0, radiusOf(cs, rect) - bw / 2));
    ctx.stroke();
    ctx.restore();
  }

  drawPseudo(ctx, el, "::before", rect, alpha);

  for (const node of el.childNodes) {
    if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
      drawTextNode(ctx, node, cs, alpha, origin);
    }
  }

  drawPseudo(ctx, el, "::after", rect, alpha);
}

function drawTree(ctx, root, origin) {
  [root, ...root.querySelectorAll("*")].forEach((el) => {
    if (!el.closest(SKIP)) drawElement(ctx, el, origin);
  });
}

function capturedElements() {
  return ROOTS.flatMap((selector) => {
    const root = document.querySelector(selector);
    return root ? [root, ...root.querySelectorAll("*")].filter((el) => !el.closest(SKIP)) : [];
  });
}

function imageUrls() {
  const urls = new Set();
  capturedElements().forEach((el) => {
    if (getComputedStyle(el).display === "none") return;
    const bg = pickUrl(getComputedStyle(el).backgroundImage);
    if (bg) urls.add(bg);
    ["::before", "::after"].forEach((which) => {
      const mask = urlsOf(getComputedStyle(el, which).maskImage || "")[0];
      if (mask) urls.add(mask);
    });
  });
  return [...urls];
}

function fontSpecs() {
  const specs = new Set();
  ROOTS.forEach((selector) => {
    const root = document.querySelector(selector);
    if (!root) return;
    [root, ...root.querySelectorAll("*")].forEach((el) => {
      [null, "::before", "::after"].forEach((pseudo) => {
        const cs = getComputedStyle(el, pseudo);
        if (pseudo && (cs.content === "none" || cs.content === "normal")) return;
        specs.add(`${cs.fontStyle} ${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`);
      });
    });
  });
  return [...specs];
}

async function renderImage() {
  const bar = document.querySelector(".score-beatmap");
  const info = document.querySelector(".score-info");
  if (!bar || !info) throw new Error("score panel not found");

  await Promise.all(fontSpecs().map((spec) => document.fonts.load(spec).catch(() => null)));
  const cover = await loadCover();
  await Promise.all(imageUrls().map(loadImage));

  const barRect = bar.getBoundingClientRect();
  const infoRect = info.getBoundingClientRect();
  const origin = { x: infoRect.left, y: barRect.top };
  const width = Math.round(infoRect.width);
  const height = Math.round(infoRect.bottom - barRect.top);

  const canvas = document.createElement("canvas");
  canvas.width = width * SCALE;
  canvas.height = height * SCALE;
  const ctx = canvas.getContext("2d");
  ctx.scale(SCALE, SCALE);
  ctx.imageSmoothingQuality = "high";

  ctx.fillStyle = getComputedStyle(document.body).backgroundColor || "#121212";
  ctx.fillRect(0, 0, width, height);

  const panel = { left: 0, top: infoRect.top - origin.y, width: infoRect.width, height: infoRect.height };
  const coverBox = document.querySelector(".score-info__cover");
  const coverEl = coverBox?.querySelector(".beatmapset-cover");
  const brightness = parseFloat((coverEl ? getComputedStyle(coverEl).filter.match(/brightness\(([\d.]+)\)/) : null)?.[1] ?? "1");
  const veil = coverBox ? getComputedStyle(coverBox, "::after").backgroundColor : "transparent";

  ctx.save();
  ctx.beginPath();
  ctx.rect(panel.left, panel.top, panel.width, panel.height);
  ctx.clip();
  if (cover) {
    const fit = fitBox(cover, panel, "cover", "50%", "50%");
    ctx.drawImage(cover, fit.x, fit.y, fit.w, fit.h);
  } else {
    ctx.fillStyle = "#3a3a40";
    ctx.fillRect(panel.left, panel.top, panel.width, panel.height);
  }
  if (brightness < 1) {
    ctx.fillStyle = `rgba(0, 0, 0, ${1 - brightness})`;
    ctx.fillRect(panel.left, panel.top, panel.width, panel.height);
  }
  if (colorAlpha(veil) > 0) {
    ctx.fillStyle = veil;
    ctx.fillRect(panel.left, panel.top, panel.width, panel.height);
  }
  ctx.restore();

  ROOTS.forEach((selector) => {
    const root = document.querySelector(selector);
    if (root) drawTree(ctx, root, origin);
  });

  return { canvas, hasCover: Boolean(cover) };
}

function fileName() {
  const player = document.querySelector(".score-beatmap__played")?.textContent.match(/Played by (.+?) on /)?.[1];
  const link = document.querySelector(".score-beatmap__link-plain");
  const title = [...(link?.childNodes || [])].find((n) => n.nodeType === Node.TEXT_NODE)?.textContent.trim();
  const version = document.querySelector(".beatmap-list-item__version-link")?.textContent.trim();
  const parts = [player, title && (version ? `${title} [${version}]` : title)].filter(Boolean);
  return `${(parts.join(" - ") || "osu score").replace(/[\\/:*?"<>|]/g, "")}.png`;
}

function download(canvas) {
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (!blob) {
        reject(new Error("canvas export blocked"));
        return;
      }
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName();
      document.body.append(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 10000);
      resolve();
    }, "image/png");
  });
}

let busy = false;

async function onClick(button) {
  if (busy) return;
  busy = true;
  const label = button.textContent;
  button.textContent = "Rendering...";
  showMessage("Creating image...");
  try {
    const { canvas, hasCover } = await renderImage();
    await download(canvas);
    showMessage(hasCover ? "Image saved." : "Saved without the map background (it could not be loaded).");
  } catch (err) {
    console.error("[score image]", err);
    showMessage(`Could not create the image: ${err.message}`);
  } finally {
    button.textContent = label;
    busy = false;
  }
}

function addButton() {
  const info = document.querySelector(".score-info");
  if (!info || info.querySelector(".osu-score-image-button")) return;

  let buttons = info.querySelector(".score-buttons");
  if (!buttons) {
    const slot = info.querySelector(".score-info__item--buttons") || info.appendChild(Object.assign(document.createElement("div"), { className: "score-info__item score-info__item--buttons" }));
    buttons = slot.appendChild(Object.assign(document.createElement("div"), { className: "score-buttons" }));
  }

  const button = document.createElement("a");
  button.className = "btn-osu-big btn-osu-big--rounded osu-score-image-button";
  button.textContent = "Save image";
  button.addEventListener("click", (event) => {
    event.preventDefault();
    onClick(button);
  });
  buttons.prepend(button);
}

new MutationObserver(addButton).observe(document.documentElement, {
  childList: true,
  subtree: true,
});
addButton();
})();
} catch (err) {
  console.error("[osu-maid] osu-score-image failed", err);
}
