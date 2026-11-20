// ==UserScript==
// @name         osu! Wide Profile Layout
// @version      1.4.0
// @match        https://osu.ppy.sh/*
// @updateURL    https://raw.githubusercontent.com/slep34263657/osu-maid/main/osu-layout.user.js
// @downloadURL  https://raw.githubusercontent.com/slep34263657/osu-maid/main/osu-layout.user.js
// @run-at       document-start
// @grant        none
// ==/UserScript==

const style = document.createElement("style");
style.textContent = `
@media (min-width: 1100px) {
  body:has(.profile-info) .osu-page--generic-compact,
  .header-v4--users .header-v4__content {
    max-width: min(1500px, 94vw);
  }
  body:has(.profile-info) .profile-info__bg {
    height: auto;
    aspect-ratio: 15 / 4;
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
html[data-osu-maid-hide-locked] .medals-group .badge-achievement--locked {
  display: none;
}
html[data-osu-maid-hide-locked] .medals-group__medals:not(:has(.badge-achievement:not(.badge-achievement--locked))),
html[data-osu-maid-hide-locked] .medals-group__group:not(:has(.badge-achievement:not(.badge-achievement--locked))) {
  display: none;
}
.osu-maid-gear {
  position: relative;
  align-self: center;
  margin-left: 12px;
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
  flex-direction: column;
  gap: 10px;
  border-radius: 8px;
  background: rgba(10, 10, 10, .95);
  border: 1px solid rgba(255, 255, 255, .1);
}
.osu-maid-gear[data-open] .osu-maid-gear__menu {
  display: flex;
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

const HIDE_LOCKED = "osu-maid:hide-locked-medals";

function loadFlag(key) {
  try {
    return localStorage.getItem(key) === "1";
  } catch {
    return false;
  }
}

function saveFlag(key, on) {
  try {
    if (on) localStorage.setItem(key, "1");
    else localStorage.removeItem(key);
  } catch {}
}

function mountProfileGear() {
  document.documentElement.toggleAttribute("data-osu-maid-hide-locked", loadFlag(HIDE_LOCKED));
  const host = document.querySelector(".header-v4--users .header-v4__row--bar");
  if (!host || host.querySelector(".osu-maid-gear") || !document.querySelector(".profile-info")) return;

  const gear = document.createElement("div");
  gear.className = "osu-maid-gear";
  gear.innerHTML =
    '<button type="button" class="osu-maid-gear__button" title="settings"><i class="fas fa-cog"></i></button>' +
    '<div class="osu-maid-gear__menu"></div>';

  const label = document.createElement("label");
  label.className = "osu-maid-mode";
  label.innerHTML = '<span class="osu-maid-mode__track"></span><span>hide unachieved medals</span>';
  label.toggleAttribute("data-on", loadFlag(HIDE_LOCKED));
  label.addEventListener("click", (e) => {
    e.preventDefault();
    const on = !label.hasAttribute("data-on");
    label.toggleAttribute("data-on", on);
    saveFlag(HIDE_LOCKED, on);
    document.documentElement.toggleAttribute("data-osu-maid-hide-locked", on);
  });
  gear.querySelector(".osu-maid-gear__menu").appendChild(label);

  gear.querySelector(".osu-maid-gear__button").addEventListener("click", () => {
    gear.toggleAttribute("data-open");
  });
  document.addEventListener("click", (e) => {
    if (!gear.contains(e.target)) gear.removeAttribute("data-open");
  });
  host.appendChild(gear);
}

const MODES = { osu: 0, taiko: 1, fruits: 2, mania: 3 };
let scoreRankKey = null;

function applyScoreRank() {
  const panel = document.querySelector(".profile-detail-stats__values");
  if (!panel) scoreRankKey = null;
  const active = document.querySelector(".game-mode-link--active");
  const userId = location.pathname.match(/\/users\/([^/]+)/)?.[1];
  if (!panel || !active || !userId || !document.querySelector(".profile-info")) return;

  const mode = active.getAttribute("data-mode");
  if (!(mode in MODES)) return;

  const key = `${userId}:${mode}`;
  const existing = panel.querySelector(".custom-score-rank");
  if (existing?.dataset.key === key || scoreRankKey === key) return;
  existing?.remove();
  scoreRankKey = key;

  fetch(`https://score.respektive.pw/u/${userId}?m=${MODES[mode]}`)
    .then((res) => res.json())
    .then((data) => {
      const player = Array.isArray(data) && data[0];
      const target = document.querySelector(".profile-detail-stats__values");
      if (!player || !target || target.querySelector(".custom-score-rank")) return;

      const box = document.createElement("div");
      box.className = "value-display value-display--rank custom-score-rank";
      box.dataset.key = key;

      const label = document.createElement("div");
      label.className = "value-display__label";
      label.textContent = "Score Ranking";

      const value = document.createElement("div");
      value.className = "value-display__value";
      if (player.rank) {
        value.textContent = `#${player.rank.toLocaleString("en-US")}`;
        if (player.rank_highest) {
          const date = new Date(player.rank_highest.updated_at).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
          });
          value.title = `Highest rank: #${player.rank_highest.rank.toLocaleString("en-US")} on ${date}`;
        }
      } else {
        value.textContent = "N/A";
      }

      box.append(label, value);
      target.appendChild(box);
    })
    .catch(() => {
      scoreRankKey = null;
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
  applyScoreRank();
  mountProfileGear();
  schedule();
}).observe(document.documentElement, {
  childList: true,
  subtree: true,
});
window.addEventListener("resize", schedule);
applyScores();
