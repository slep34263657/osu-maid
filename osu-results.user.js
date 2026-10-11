// ==UserScript==
// @name         osu! Results Screen Score Page
// @version      2.3.2
// @match        https://osu.ppy.sh/*
// @updateURL    https://raw.githubusercontent.com/slep34263657/osu-maid/main/osu-results.user.js
// @downloadURL  https://raw.githubusercontent.com/slep34263657/osu-maid/main/osu-results.user.js
// @run-at       document-start
// @grant        none
// ==/UserScript==

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
