// ==UserScript==
// @name         osu! maid
// @icon         data:image/png;base64,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
// @namespace    osu-web-minimal
// @version      1.7.3
// @description  modifications for osu.ppy.sh ♡
// @match        https://osu.ppy.sh/*
// @run-at       document-start
// @noframes
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_addValueChangeListener
// @grant        GM_xmlhttpRequest
// @grant        unsafeWindow
// @connect      assets.ppy.sh
// @connect      raw.githubusercontent.com
// @connect      a.ppy.sh
// @connect      score.respektive.pw
// @connect      lazerboard.melguy.com
// ==/UserScript==

(function () {
  'use strict';

  const start = () => {
    const style = document.createElement('style');
    style.id = 'omp-css';
    style.textContent = "/* text size */\r\nhtml.omp-theme { --omp-k: 15; --omp-nz: .79; }\r\n\r\nhtml.omp-theme body {\r\n  --hsl-p: 240, 5%, 33%;\r\n  --hsl-h1: 240, 5%, 78%;  --hsl-h2: 240, 5%, 50%;\r\n  --hsl-c1: 0, 0%, 100%;   --hsl-c2: 240, 5%, 90%;\r\n  --hsl-l1: 240, 5%, 80%;  --hsl-l2: 240, 5%, 75%;  --hsl-l3: 240, 5%, 70%;  --hsl-l4: 240, 5%, 50%;\r\n  --hsl-f1: 240, 5%, 60%;\r\n  --hsl-d1: 240, 5%, 30%;  --hsl-d2: 240, 5%, 24%;  --hsl-d3: 240, 5%, 18%;\r\n  --hsl-d4: 240, 5%, 14%;  --hsl-d5: 240, 5%, 11%;  --hsl-d6: 240, 5%, 8%;\r\n  --hsl-b1: 240, 5%, 32%;  --hsl-b2: 240, 5%, 20%;  --hsl-b3: 240, 5%, 15%;\r\n  --hsl-b4: 240, 5%, 12%;  --hsl-b5: 240, 5%, 9%;   --hsl-b6: 240, 5%, 6%;\r\n}\r\nhtml.omp-theme.omp-acc-hl body {\r\n  --hsl-p: var(--omp-hue), 100%, 50%;\r\n  --hsl-h1: var(--omp-hue), 100%, 70%;\r\n  --hsl-h2: var(--omp-hue), 50%, 45%;\r\n}\r\nhtml.omp-theme.omp-acc-links body {\r\n  --hsl-l1: var(--omp-hue), 40%, 80%; --hsl-l2: var(--omp-hue), 40%, 75%; --hsl-l3: var(--omp-hue), 40%, 70%; --hsl-l4: var(--omp-hue), 40%, 50%;\r\n  --hsl-c2: var(--omp-hue), 40%, 90%;\r\n  --hsl-d1: var(--omp-hue), 20%, 35%; --hsl-d2: var(--omp-hue), 20%, 30%;\r\n}\r\nhtml.omp-theme body,\r\nhtml.omp-theme .osu-layout--body { background: var(--bg) !important; }\r\n\r\nhtml.omp-theme .header-v4__bg { filter: grayscale(1) brightness(.5); }\r\n\r\n@media (min-width: 900px) {\r\n  html.omp-theme .nav2-header__transition-overlay { background: var(--bg) !important; }\r\n  html.omp-theme .nav2-header__triangles { display: none !important; }\r\n\r\n  html.omp-theme .nav2-header__menu-bg { display: none !important; }\r\n  html.omp-theme .nav2__menu-popup { top: 100% !important; margin-top: 4px !important; }\r\n  html.omp-theme .simple-menu--nav2 {\r\n    background: var(--surface) !important;\r\n    border: 1px solid var(--border);\r\n    border-radius: var(--radius);\r\n    box-shadow: none !important;\r\n  }\r\n\r\n  html.omp-theme .landing-nav__link { font-size: calc(var(--omp-k) * 1.2 * 1px) !important; }\r\n  html.omp-theme .landing-nav__section { gap: .4em; }\r\n\r\n  html.omp-theme .nav2-header { zoom: var(--omp-nz); border-bottom: 1px solid var(--border); }\r\n\r\n  html.omp-theme .sticky-toolbar { top: calc(50px * var(--omp-nz) + 1px) !important; }\r\n  html.omp-theme .nav2-header .osu-page { max-width: none !important; width: auto !important; margin: 0 !important; }\r\n\r\n  html.omp-theme .nav2-header .sticky-header .osu-page { max-width: var(--page-width, 1200px) !important; width: 100% !important; margin: 0 auto !important; }\r\n  html.omp-theme .nav2 { justify-content: space-between; padding: 0 20px !important; }\r\n\r\n  html.omp-theme .nav2__colgroup--icons { zoom: 1.3; }\r\n\r\n  html.omp-theme .nav2__menu-link-main,\r\n  html.omp-theme .nav2__menu-link-main .u-relative { font-size: calc(var(--omp-k) * 1.25 / var(--omp-nz) * 1px) !important; }\r\n  html.omp-theme .nav2__menu-link-main { padding: 0 1em !important; }\r\n  html.omp-theme .simple-menu--nav2 { padding: .6em .4em !important; }\r\n  html.omp-theme .simple-menu--nav2 .simple-menu__item {\r\n    font-size: calc(var(--omp-k) * 1.15 / var(--omp-nz) * 1px) !important;\r\n    line-height: 1.3 !important;\r\n    padding: .4em 1.4em !important;\r\n    white-space: nowrap;\r\n  }\r\n}\r\n\r\n/* tokens */\r\nhtml.omp-theme, #omp-tools, #omp-menu, .omp-site-lb {\r\n  --bg: #0e0e10;\r\n  --surface: #17171a;\r\n  --hover: #222226;\r\n  --border: #2a2a2e;\r\n  --text: #e8e8ea;\r\n  --dim: #a1a1a6;\r\n  --hint: #8a8a90;\r\n  --accent: var(--text);\r\n\r\n  --g-ss: #f5c542;\r\n  --g-ssh: #d5dde3;\r\n  --g-s: #f0a030;\r\n  --g-sh: #b9c4cc;\r\n  --g-a: #7fd24a;\r\n  --g-b: #4aa8e0;\r\n  --g-c: #a86bd8;\r\n  --g-d: #f06060;\r\n  --radius: 6px;\r\n}\r\n\r\nhtml.omp-black, html.omp-black #omp-tools, html.omp-black #omp-menu, html.omp-black .omp-site-lb {\r\n  --bg: #000;\r\n  --surface: #09090a;\r\n  --hover: #151516;\r\n  --border: #212123;\r\n}\r\nhtml.omp-black body {\r\n  --hsl-d1: 0, 0%, 24%; --hsl-d2: 0, 0%, 18%; --hsl-d3: 0, 0%, 12%;\r\n  --hsl-d4: 0, 0%, 8%;  --hsl-d5: 0, 0%, 4%;  --hsl-d6: 0, 0%, 0%;\r\n  --hsl-b1: 0, 0%, 26%; --hsl-b2: 0, 0%, 14%; --hsl-b3: 0, 0%, 8%;\r\n  --hsl-b4: 0, 0%, 5%;  --hsl-b5: 0, 0%, 2%;  --hsl-b6: 0, 0%, 0%;\r\n}\r\nhtml.omp-black .nav2-header__transition-overlay { background: #000 !important; }\r\nhtml.omp-black .header-v4__bg { filter: grayscale(1) brightness(.28); }\r\n\r\n/* toolbar */\r\n#omp-tools {\r\n  display: flex; align-items: center; align-self: center; gap: 4px; margin: 0 12px 0 auto;\r\n\r\n  font-size: calc(var(--omp-k, 15) * 1px / var(--omp-nz, 1));\r\n  font-family: \"Segoe UI\", system-ui, sans-serif; line-height: 1.4;\r\n}\r\n#omp-tools [hidden] { display: none !important; }\r\n.omp-icon-btn {\r\n  width: 2em; height: 2em; padding: 0;\r\n  display: grid; place-items: center;\r\n  background: none; border: 1px solid transparent; border-radius: var(--radius);\r\n  color: var(--hint); cursor: pointer;\r\n  font: inherit; font-size: .85em; font-weight: 600;\r\n  transition: background .1s, color .1s;\r\n}\r\n.omp-icon-btn svg { width: 1.3em; height: 1.3em; }\r\n.omp-icon-btn:hover, .omp-icon-btn[aria-pressed=\"true\"] { background: var(--hover); color: var(--text); }\r\n\r\n/* beatmap listing */\r\n\r\n.beatmapset-panel:not(.beatmapset-panel--size-extra) {\r\n  --stats-grid-template: \"hype nominations play-count favourite-count bpm date\" / auto auto auto auto auto auto;\r\n}\r\n.beatmapset-panel.beatmapset-panel--size-extra {\r\n  --stats-grid-template: \"hype play-count date\" \"nominations favourite-count bpm\" / auto auto auto;\r\n}\r\n.beatmapset-panel__stats-item--bpm { grid-area: bpm; }\r\n\r\n.beatmapset-panel.beatmapset-panel { --stats-opacity: 1; }\r\n\r\nhtml.omp-list-titles .beatmapset-panel:not(.beatmapset-panel--size-extra),\r\nhtml.omp-list-titles .beatmapset-panel:not(.beatmapset-panel--size-extra) .beatmapset-panel__content { height: 116px; }\r\nhtml.omp-list-titles .beatmapset-panel__info > * { flex-shrink: 0; }\r\n\r\nhtml.omp-theme .beatmapset-panel,\r\nhtml.omp-theme .beatmapset-panel:hover,\r\nhtml.omp-theme .beatmapset-panel--beatmaps-popup-visible { --info-bg: transparent; --play-bg: transparent; }\r\nhtml.omp-theme .beatmapset-panel__cover-container::after { display: none; }\r\nhtml.omp-theme .beatmapset-panel__cover-col--info .beatmapset-cover {\r\n\r\n  left: calc(-1 * (var(--play-width, 90px) + 10px)); width: calc(100% + var(--play-width, 90px) + 10px); border-radius: 10px;\r\n  filter: brightness(.16); transition: filter .15s;\r\n}\r\nhtml.omp-theme .beatmapset-panel:hover .beatmapset-panel__cover-col--info .beatmapset-cover,\r\nhtml.omp-theme .beatmapset-panel--beatmaps-popup-visible .beatmapset-panel__cover-col--info .beatmapset-cover { filter: brightness(.26); }\r\n\r\nhtml.omp-theme .beatmapset-panel__cover-col--play { position: relative; z-index: 1; }\r\nhtml.omp-theme .beatmapset-panel__content { z-index: 2; }\r\nhtml.omp-theme .beatmapset-panel__cover-col--play .beatmapset-cover { -webkit-mask-image: linear-gradient(90deg, rgba(0,0,0,1.000) 0%, rgba(0,0,0,1.000) 12%, rgba(0,0,0,0.964) 22%, rgba(0,0,0,0.869) 32%, rgba(0,0,0,0.731) 42%, rgba(0,0,0,0.568) 52%, rgba(0,0,0,0.398) 62%, rgba(0,0,0,0.239) 72%, rgba(0,0,0,0.108) 82%, rgba(0,0,0,0.023) 92%, rgba(0,0,0,0.000) 100%); mask-image: linear-gradient(90deg, rgba(0,0,0,1.000) 0%, rgba(0,0,0,1.000) 12%, rgba(0,0,0,0.964) 22%, rgba(0,0,0,0.869) 32%, rgba(0,0,0,0.731) 42%, rgba(0,0,0,0.568) 52%, rgba(0,0,0,0.398) 62%, rgba(0,0,0,0.239) 72%, rgba(0,0,0,0.108) 82%, rgba(0,0,0,0.023) 92%, rgba(0,0,0,0.000) 100%); }\r\nhtml.omp-theme .beatmapset-panel:hover .beatmapset-panel__play-container,\r\nhtml.omp-theme .beatmapset-panel--beatmaps-popup-visible .beatmapset-panel__play-container { background: linear-gradient(90deg, rgba(0,0,0,0.500) 0%, rgba(0,0,0,0.448) 20%, rgba(0,0,0,0.324) 40%, rgba(0,0,0,0.176) 60%, rgba(0,0,0,0.052) 80%, rgba(0,0,0,0.000) 100%); }\r\n\r\nhtml.omp-list-titles .beatmapset-panel:not(.beatmapset-panel--size-extra) { --main-height: 116px; --panel-height: 116px; }\r\nhtml.omp-list-titles .beatmaps-popup:not(.beatmaps-popup--size-extra) { --panel-height: 116px; }\r\n.omp-alt-title { max-width: 100%; margin-top: -2px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 11px; line-height: 1.3; font-weight: 400; opacity: .7; }\r\nhtml.omp-list-outlines .beatmapset-panel[style*=\"--omp-status\"]::after {\r\n  content: \"\"; position: absolute; inset: 0; z-index: 2; pointer-events: none;\r\n  border: 1.5px solid hsla(var(--omp-status), .4); border-radius: 10px;\r\n}\r\n\r\n/* messages */\r\n#omp-toast {\r\n  position: fixed; left: 50%; bottom: 28px; transform: translateX(-50%); z-index: 100000;\r\n  padding: .6em 1.1em; background: #17171a; color: #e8e8ea; border: 1px solid #2a2a2e; border-radius: 8px;\r\n  font: 13px/1.4 \"Segoe UI\", system-ui, sans-serif;\r\n}\r\n\r\n/* settings menu, now a child of <html> on every page */\r\n#omp-menu { font-family: \"Segoe UI\", system-ui, sans-serif; font-size: calc(var(--omp-k, 15) * 1px); line-height: 1.4; color: var(--text); }\r\n#omp-menu h3:first-child { margin-top: .5em; }\r\n.omp-msub { margin: 0 0 .2em; padding-left: 12px; border-left: 1px solid var(--border); transition: opacity .15s; }\r\n.omp-msub.omp-off { opacity: .45; pointer-events: none; }\r\n.omp-step { display: flex; align-items: center; gap: 4px; flex: none; }\r\n.omp-step button {\r\n  width: 1.8em; height: 1.8em; padding: 0; background: var(--hover); border: 1px solid var(--border); border-radius: var(--radius);\r\n  color: var(--text); font: inherit; cursor: pointer; transition: background .1s;\r\n}\r\n.omp-step button:hover { background: var(--border); }\r\n.omp-step output { min-width: 2.2em; text-align: center; font-variant-numeric: tabular-nums; }\r\n\r\n/* settings menu */\r\n#omp-menu {\r\n  position: fixed; right: 12px; top: 80px; z-index: 3000; width: 22em; max-height: calc(100dvh - 100px); overflow-y: auto;\r\n  padding: .4em 14px .6em; background: var(--surface); border: 1px solid var(--border); border-radius: 12px;\r\n  box-shadow: 0 8px 28px rgba(0, 0, 0, .55); scrollbar-width: thin; scrollbar-color: var(--border) transparent;\r\n}\r\n#omp-menu [hidden], #omp-menu[hidden] { display: none !important; }\r\n#omp-menu h3 { margin: .9em 0 .2em; font-size: .85em; font-weight: 600; letter-spacing: .05em; text-transform: uppercase; color: var(--hint); }\r\n.omp-mrow { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: .35em 0; cursor: pointer; }\r\n.omp-mrow > span { min-width: 0; display: flex; flex-direction: column; }\r\n.omp-mrow b { font-weight: 500; }\r\n.omp-mrow small { color: var(--dim); font-size: .85em; }\r\n.omp-sw {\r\n  appearance: none; -webkit-appearance: none; flex: none; position: relative; width: 2.4em; height: 1.4em; margin: 0; cursor: pointer;\r\n  background: var(--hover); border: 1px solid var(--border); border-radius: 1em; transition: background .15s, border-color .15s;\r\n}\r\n.omp-sw::after { content: \"\"; position: absolute; top: .15em; left: .15em; width: .9em; height: .9em; border-radius: 50%; background: var(--hint); transition: transform .15s, background .15s; }\r\n.omp-sw:checked { background: var(--omp-accent, var(--text)); border-color: var(--omp-accent, var(--text)); }\r\n.omp-sw:checked::after { transform: translateX(1em); background: var(--bg); }\r\n.omp-sw:focus-visible { outline: 1px solid var(--dim); outline-offset: 2px; }\r\n\r\n.omp-flag { height: .95em; width: auto; margin-right: .45em; border-radius: 2px; vertical-align: -.1em; box-shadow: 0 0 0 1px rgba(255, 255, 255, .12); }\r\n\r\n/* score cards on the site's own profile */\r\n\r\nhtml.omp-playart .play-detail[style*=\"--omp-art\"] > .play-detail__group--top {\r\n  position: relative; isolation: isolate; background: transparent;\r\n  border-radius: 0;\r\n}\r\nhtml.omp-playart .play-detail[style*=\"--omp-art\"] > .play-detail__group--top::before,\r\nhtml.omp-playart .play-detail[style*=\"--omp-art\"] > .play-detail__group--top::after {\r\n  content: \"\"; position: absolute; inset: 0 -2px 0 0; z-index: -1; pointer-events: none; border-radius: 10px 0 0 10px;\r\n}\r\nhtml.omp-playart .play-detail[style*=\"--omp-art\"] > .play-detail__group--top::before {\r\n  background: var(--omp-art) center / cover no-repeat; filter: brightness(.07); transition: filter .15s;\r\n}\r\nhtml.omp-playart .play-detail--active[style*=\"--omp-art\"] > .play-detail__group--top::before,\r\nhtml.omp-playart .play-detail[style*=\"--omp-art\"]:hover > .play-detail__group--top::before { filter: brightness(.16); }\r\n\r\nhtml.omp-playart .play-detail[style*=\"--omp-art\"] > .play-detail__group--top::after {\r\n\r\n  background: linear-gradient(90deg, transparent 35%, var(--bg-main, hsl(240 5% 20%)) calc(100% - 2px));\r\n}\r\n\r\n/* the site's own beatmap page */\r\n\r\n.beatmapset-header[data-omp-bg]::before {\r\n  content: \"\"; position: absolute; inset: 0 0 auto; height: calc(100% + var(--omp-info-h, 0px));\r\n  background-image: var(--omp-bg); background-size: cover; background-position: center;\r\n  opacity: .5; pointer-events: none;\r\n}\r\n.beatmapset-header[data-omp-bg] > .beatmapset-header__cover { display: none; }\r\n.beatmapset-header[data-omp-bg] + .beatmapset-info {\r\n  position: relative;\r\n  background-color: color-mix(in srgb, var(--bg, #0e0e10) 80%, transparent);\r\n}\r\n.beatmapset-header[data-omp-bg] + .beatmapset-info .beatmapset-info__header--sticky { position: static; background: transparent; }\r\n.beatmapset-header[data-omp-bg] + .beatmapset-info .beatmapset-info__scrollable::after { display: none; }\r\n.beatmapset-header[data-omp-bg] + .beatmapset-info .beatmap-success-rate { background: transparent; }\r\n.beatmapset-header[data-omp-bg] .beatmapset-stats__row,\r\n.beatmapset-header[data-omp-bg] .beatmapset-beatmap-picker,\r\n.beatmapset-header[data-omp-bg] .beatmapset-status--show-icon,\r\n.beatmapset-header[data-omp-bg] .beatmapset-status--show { background-color: color-mix(in srgb, var(--bg, #0e0e10) 80%, transparent); }\r\n\r\nhtml.omp-compact-dl .omp-dl-video { display: none; }\r\nhtml.omp-compact-dl .omp-dl { min-width: 0; }\r\nhtml.omp-compact-dl .omp-dl .btn-osu-big__left { display: none; }\r\n\r\nhtml.omp-theme .btn-osu-big:not([class*=\"--danger\"], [class*=\"--pink\"], [class*=\"--warning\"], [class*=\"--forum\"], .btn-osu-big--download, .btn-osu-big--download-stable, [class*=\"--activated\"], [class*=\"--disabled\"], [class*=\"--store-cart\"], [class*=\"--chat-send\"], .js-activated, [disabled]) {\r\n  --bg: rgba(255, 255, 255, .09); --hover-bg: rgba(255, 255, 255, .17); --focus-bg: rgba(255, 255, 255, .17); --active-bg: rgba(255, 255, 255, .22);\r\n  box-shadow: none;\r\n}\r\n\r\nhtml.omp-theme .beatmapset-header__buttons .btn-osu-big {\r\n  background-color: rgba(0, 0, 0, .6) !important;\r\n  transition: background-color .15s;\r\n}\r\nhtml.omp-theme .beatmapset-header__buttons .btn-osu-big:hover,\r\nhtml.omp-theme .beatmapset-header__buttons .btn-osu-big:focus-visible {\r\n  background-color: rgba(0, 0, 0, .78) !important;\r\n}\r\n\r\n/* leaderboard statistics */\r\n.omp-lb { display: flex; flex-direction: column; gap: .5em; font-size: calc(var(--omp-k, 15) * 1px); color: var(--text); }\r\n.omp-lb-tiles { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 6px; }\r\n.omp-lb-tile { min-width: 0; padding: .5em .4em; text-align: center; background: var(--bg); border-radius: var(--radius); }\r\n.omp-lb-tile span { display: block; font-size: .85em; color: var(--dim); }\r\n.omp-lb-tile b { display: block; font-size: 1.25em; font-weight: 600; line-height: 1.25; font-variant-numeric: tabular-nums; }\r\n.omp-lb-charts { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1em; margin-top: .5em; }\r\n.omp-lb-spark { height: 2.8em; }\r\n.omp-lb-spark svg { display: block; width: 100%; height: 100%; }\r\n.omp-lb-spark polyline { fill: none; stroke: var(--dim); stroke-width: 1.25; vector-effect: non-scaling-stroke; stroke-linejoin: round; }\r\n.omp-lb-stars { display: flex; align-items: flex-end; gap: 3px; height: 2.8em; }\r\n.omp-lb-stars i { flex: 1; background: var(--dim); border-radius: 2px 2px 0 0; }\r\n.omp-lb-src { align-self: flex-end; margin-top: .2em; font-size: .68em; color: var(--hint); text-decoration: none; }\r\n.omp-lb-src svg { vertical-align: -.12em; margin-left: .25em; }\r\n.omp-lb-src:hover { color: var(--text); }\r\n.omp-lb-foot { display: flex; justify-content: space-between; margin-top: .25em; font-size: .75em; color: var(--hint); }\r\n\r\n.omp-site-lb { box-sizing: border-box; margin: 20px 0 0; padding: 14px 20px 18px; background: var(--surface); border-radius: 10px; font-family: \"Segoe UI\", system-ui, sans-serif; color: var(--text); }\r\n.omp-site-lb h3 { margin: 0 0 .7em; font-size: 12px; font-weight: 600; letter-spacing: .05em; text-transform: uppercase; color: var(--hint); }\r\n.omp-site-lb .omp-lb { font-size: 14px; max-width: 34em; }\r\n\r\n.omp-site-lb.omp-side { position: absolute; z-index: 1; margin: 0; }\r\n.omp-site-lb.omp-side .omp-lb { font-size: 13px; max-width: none; }\r\n\r\n/* the site's score page as a results screen */\r\n@media (min-width: 1000px) {\r\n  html.omp-scorelayout body:has(.score-info) .osu-page--generic-compact,\r\n  html.omp-scorelayout body:has(.score-info) .header-v4__content {\r\n    max-width: min(1200px, 94vw);\r\n  }\r\n  html.omp-scorelayout body:has(.score-info) .score-beatmap {\r\n    background: rgba(0, 0, 0, .45);\r\n    padding: 14px 56px 12px;\r\n  }\r\n  html.omp-scorelayout body:has(.score-info) .score-beatmap__played {\r\n    margin-top: 6px;\r\n    font-size: 14px;\r\n    opacity: .85;\r\n  }\r\n  html.omp-scorelayout body:has(.score-info) .score-info {\r\n    position: relative;\r\n    isolation: isolate;\r\n    align-items: stretch;\r\n    min-height: 560px;\r\n    padding: 0 56px 0 0;\r\n  }\r\n  html.omp-scorelayout body:has(.score-info) .score-info__cover {\r\n    z-index: -1;\r\n  }\r\n  html.omp-scorelayout body:has(.score-info) .score-info__cover .beatmapset-cover {\r\n    filter: brightness(.55);\r\n  }\r\n  html.omp-scorelayout body:has(.score-info) .score-info__item:has(.score-tower) {\r\n    display: none;\r\n  }\r\n  html.omp-scorelayout body:has(.score-info) .score-info__item--player {\r\n    position: static;\r\n    order: 1;\r\n    flex: none;\r\n    width: 700px;\r\n    box-sizing: border-box;\r\n    padding: 40px 44px 0;\r\n    background: rgba(0, 0, 0, .4);\r\n  }\r\n  html.omp-scorelayout body:has(.score-info) .score-player__row--player {\r\n    display: none;\r\n  }\r\n  html.omp-scorelayout body:has(.score-info) .score-player__row--score {\r\n    grid-template-rows: auto auto;\r\n  }\r\n  html.omp-scorelayout body:has(.score-info) .score-player__score {\r\n    font-size: 88px;\r\n    line-height: 1;\r\n    text-align: center;\r\n    font-variant-numeric: tabular-nums;\r\n  }\r\n  html.omp-scorelayout body:has(.score-info) .score-player__row--rank {\r\n    position: absolute;\r\n    top: 28px;\r\n    right: 56px;\r\n    display: block;\r\n    text-align: right;\r\n  }\r\n  html.omp-scorelayout body:has(.score-info) .score-player__rank {\r\n    width: auto;\r\n    text-align: right;\r\n    white-space: nowrap;\r\n  }\r\n  html.omp-scorelayout body:has(.score-info) .score-player__rank--label {\r\n    font-size: 11px;\r\n    text-transform: uppercase;\r\n    letter-spacing: .08em;\r\n    opacity: .8;\r\n  }\r\n  html.omp-scorelayout body:has(.score-info) .score-player__rank--value {\r\n    font-size: 30px;\r\n    font-weight: 300;\r\n  }\r\n  html.omp-scorelayout body:has(.score-info) .score-player__rank--value span {\r\n    font-size: inherit;\r\n  }\r\n\r\n  html.omp-scorelayout body:has(.score-info) .score-player__mods {\r\n    position: absolute;\r\n    left: 700px;\r\n    right: 56px;\r\n    top: calc(50% + 158px);\r\n    transform: scale(1.35);\r\n    transform-origin: 50% 0;\r\n    display: flex;\r\n    justify-content: center;\r\n    padding: 0;\r\n    background: none;\r\n    pointer-events: auto;\r\n  }\r\n  html.omp-scorelayout body:has(.score-info) .score-buttons .btn-osu-big {\r\n    background: rgba(0, 0, 0, .45);\r\n    border: 1px solid rgba(255, 255, 255, .1);\r\n    box-shadow: none;\r\n    transition: background-color .15s;\r\n  }\r\n  html.omp-scorelayout body:has(.score-info) .score-buttons .btn-osu-big:hover {\r\n    background: rgba(0, 0, 0, .65);\r\n  }\r\n  html.omp-scorelayout body:has(.score-info) .score-info__item--buttons {\r\n    order: 9;\r\n    z-index: 5;\r\n  }\r\n  html.omp-scorelayout body:has(.score-info) .score-info__item--dial {\r\n    pointer-events: none;\r\n    order: 2;\r\n    flex: 1;\r\n    width: auto;\r\n    justify-content: center;\r\n    align-items: center;\r\n  }\r\n  html.omp-scorelayout body:has(.score-info) .score-info__item--dial .legacy-rank {\r\n    zoom: 1.8;\r\n  }\r\n  html.omp-scorelayout body:has(.score-info) .score-info__item--dial .score-dial {\r\n    display: none;\r\n  }\r\n  html.omp-scorelayout body:has(.score-info) .score-stats {\r\n    position: relative;\r\n    z-index: 2;\r\n    display: block;\r\n    box-sizing: border-box;\r\n    width: 700px;\r\n    height: 560px;\r\n    margin-top: -560px;\r\n    padding: 0 44px;\r\n    pointer-events: none;\r\n  }\r\n  html.omp-scorelayout body:has(.score-info) .score-stats__group--user-card {\r\n    display: none;\r\n  }\r\n  html.omp-scorelayout body:has(.score-info) .score-stats__group--stats {\r\n    --col: calc((100% - 30px) / 4);\r\n    display: flex;\r\n    flex-wrap: wrap;\r\n    align-content: flex-start;\r\n    gap: 14px 10px;\r\n    box-sizing: border-box;\r\n    width: 100%;\r\n    height: 100%;\r\n    padding: 215px 0 32px;\r\n  }\r\n  html.omp-scorelayout body:has(.score-info) .score-stats__group--stats::after {\r\n    content: \"\";\r\n    order: 6;\r\n    flex: 0 0 100%;\r\n    height: 115px;\r\n  }\r\n  html.omp-scorelayout body:has(.score-info) .score-stats__group-row {\r\n    display: contents;\r\n  }\r\n  html.omp-scorelayout body:has(.score-info) .score-stats__stat {\r\n    order: 7;\r\n    flex: 1 1 0;\r\n    flex-direction: column;\r\n    justify-content: center;\r\n    min-width: 0;\r\n    max-width: none;\r\n    height: auto;\r\n    box-sizing: border-box;\r\n    padding: 8px 4px;\r\n    overflow: hidden;\r\n    text-align: center;\r\n    white-space: nowrap;\r\n    background: rgba(0, 0, 0, .35);\r\n    border: 1px solid rgba(255, 255, 255, .06);\r\n    border-radius: 10px;\r\n  }\r\n  html.omp-scorelayout body:has(.score-info) .score-stats__stat-row--label {\r\n    max-width: 100%;\r\n    font-size: 9px;\r\n    line-height: 1.15;\r\n    text-transform: uppercase;\r\n    letter-spacing: .04em;\r\n    white-space: normal;\r\n    overflow-wrap: anywhere;\r\n    opacity: .85;\r\n  }\r\n  html.omp-scorelayout body:has(.score-info) .score-stats__stat-row:not(.score-stats__stat-row--label) {\r\n    font-size: 18px;\r\n    font-weight: 300;\r\n  }\r\n  html.omp-scorelayout body:has(.score-info) .score-stats__group-row:first-child .score-stats__stat {\r\n    flex-direction: column-reverse;\r\n    align-items: flex-start;\r\n    padding: 0;\r\n    text-align: left;\r\n    background: none;\r\n    border: 0;\r\n    overflow: visible;\r\n  }\r\n  html.omp-scorelayout body:has(.score-info) .score-stats__group-row:first-child .score-stats__stat:nth-child(1) {\r\n    order: 2;\r\n    flex: 0 0 calc(var(--col) * 2 + 10px);\r\n  }\r\n  html.omp-scorelayout body:has(.score-info) .score-stats__group-row:first-child .score-stats__stat:nth-child(2) {\r\n    order: 1;\r\n    flex: 0 0 calc(var(--col) * 2 + 10px);\r\n  }\r\n  html.omp-scorelayout body:has(.score-info) .score-stats__group-row:first-child .score-stats__stat:nth-child(3) {\r\n    order: 5;\r\n    flex: 0 0 calc(var(--col) * 2 + 10px);\r\n    margin-left: auto;\r\n  }\r\n  html.omp-scorelayout body:has(.score-info) .score-stats__stat[data-kind=\"slider tick\"] {\r\n    order: 3;\r\n    flex: 0 0 auto;\r\n    margin-right: 18px;\r\n  }\r\n  html.omp-scorelayout body:has(.score-info) .score-stats__stat[data-kind=\"slider end\"] {\r\n    order: 4;\r\n    flex: 0 0 auto;\r\n  }\r\n  html.omp-scorelayout body:has(.score-info) .score-stats__stat[data-kind^=\"slider\"] {\r\n    flex-direction: column-reverse;\r\n    align-items: flex-start;\r\n    padding: 0;\r\n    text-align: left;\r\n    background: none;\r\n    border: 0;\r\n    overflow: visible;\r\n  }\r\n  html.omp-scorelayout body:has(.score-info) .score-stats__stat[data-kind^=\"slider\"] .score-stats__stat-row:not(.score-stats__stat-row--label) {\r\n    font-size: 36px;\r\n  }\r\n  html.omp-scorelayout body:has(.score-info) .score-stats__stat[data-kind^=\"slider\"] .score-stats__stat-row--label {\r\n    font-size: 14px;\r\n    text-transform: capitalize;\r\n    letter-spacing: 0;\r\n    background: none;\r\n    opacity: .9;\r\n  }\r\n  html.omp-scorelayout body:has(.score-info) .score-stats__group-row:first-child .score-stats__stat:nth-child(-n+2) .score-stats__stat-row:not(.score-stats__stat-row--label) {\r\n    font-size: 56px;\r\n  }\r\n  html.omp-scorelayout body:has(.score-info) .score-stats__group-row:first-child .score-stats__stat:nth-child(3) .score-stats__stat-row:not(.score-stats__stat-row--label) {\r\n    font-size: 40px;\r\n  }\r\n  html.omp-scorelayout body:has(.score-info) .score-stats__group-row:first-child .score-stats__stat .score-stats__stat-row--label {\r\n    font-size: 14px;\r\n    text-transform: none;\r\n    letter-spacing: 0;\r\n    background: none;\r\n    opacity: .9;\r\n  }\r\n  html.omp-scorelayout body:has(.score-info) .score-stats__stat:has(.score-stats__stat-row--hit-great) .score-stats__stat-row:not(.score-stats__stat-row--label) {\r\n    color: rgb(71, 180, 235);\r\n  }\r\n  html.omp-scorelayout body:has(.score-info) .score-stats__stat:has(.score-stats__stat-row--hit-ok) .score-stats__stat-row:not(.score-stats__stat-row--label) {\r\n    color: rgb(153, 235, 71);\r\n  }\r\n  html.omp-scorelayout body:has(.score-info) .score-stats__stat:has(.score-stats__stat-row--hit-meh) .score-stats__stat-row:not(.score-stats__stat-row--label) {\r\n    color: rgb(255, 217, 102);\r\n  }\r\n  html.omp-scorelayout body:has(.score-info) .score-stats__stat:has(.score-stats__stat-row--hit-miss) .score-stats__stat-row:not(.score-stats__stat-row--label) {\r\n    color: rgb(255, 102, 102);\r\n  }\r\n  /* tidyup on top of the layout above */\r\n  html.omp-scorelayout body:has(.score-info) .score-info { border-radius: 14px; overflow: hidden; }\r\n  html.omp-scorelayout body:has(.score-info) .score-info__item--player { margin: 10px 0 10px 10px; padding-top: 28px; border-radius: 12px; background: rgba(0, 0, 0, .52); }\r\n\r\n  html.omp-scorelayout body:has(.score-info) .score-stats__group--stats { padding: 150px 0 24px; gap: 14px 10px; }\r\n  html.omp-scorelayout body:has(.score-info) .score-stats__stat { min-height: 76px; padding: 12px 4px; border-radius: 12px; background: rgba(0, 0, 0, .42); border-color: rgba(255, 255, 255, .08); }\r\n  html.omp-scorelayout body:has(.score-info) .score-stats__stat-row--label { font-size: 10px; letter-spacing: .08em; }\r\n  html.omp-scorelayout body:has(.score-info) .score-stats__stat-row:not(.score-stats__stat-row--label) { font-size: 24px; font-weight: 400; }\r\n\r\n  html.omp-scorelayout body:has(.score-info) .score-stats__group-row:first-child .score-stats__stat { min-height: 0; background: none; }\r\n  html.omp-scorelayout body:has(.score-info) .score-stats__stat[data-kind^=\"slider\"] { min-height: 0; background: none; }\r\n\r\n  html.omp-scorelayout body:has(.score-info) .score-player__rank--label { background: none; padding: 0; opacity: .7; }\r\n  html.omp-scorelayout body:has(.score-info) .score-player__row--rank { top: 34px; }\r\n\r\n  html.omp-scorelayout body:has(.score-info) .score-info__item--buttons { position: absolute; left: 700px; right: 0; width: auto; bottom: 28px; display: flex; justify-content: center; }\r\n  html.omp-scorelayout body:has(.score-info) .score-buttons { width: auto; max-width: none; }\r\n\r\n}\r\n\r\n/* mod icons: letters */\r\nhtml.omp-modtext .mod__icon::before { display: none !important; }\r\nhtml.omp-modtext .mod__icon { width: auto; min-width: var(--icon-width); }\r\nhtml.omp-modtext .mod__icon::after {\r\n  content: attr(data-acronym) !important; position: static; width: auto; height: 100%; padding: 0 .12em;\r\n  background: none !important; -webkit-mask-image: none !important; mask-image: none !important;\r\n  color: var(--type-bg-colour); font: 700 .58em/1 Torus, \"Segoe UI\", system-ui, sans-serif !important; letter-spacing: 0; white-space: nowrap;\r\n}\r\n\r\n.omp-site-lb:not(.omp-side) { display: flex; flex-wrap: wrap; align-items: center; gap: 8px 22px; padding: 10px 20px; margin: 0; border-radius: 0; }\r\n.omp-site-lb:not(.omp-side) h3 { margin: 0; white-space: nowrap; }\r\n.omp-site-lb:not(.omp-side) .omp-lb { flex: 1 1 24em; flex-direction: row; flex-wrap: wrap; align-items: center; gap: 8px 22px; max-width: none; font-size: 13px; }\r\n.omp-site-lb:not(.omp-side) .omp-lb-tiles { flex: 3 1 22em; grid-template-columns: repeat(6, minmax(0, 1fr)); gap: 4px; }\r\n.omp-site-lb:not(.omp-side) .omp-lb-tile { padding: .3em .2em; }\r\n.omp-site-lb:not(.omp-side) .omp-lb-tile b { font-size: 1.15em; line-height: 1.2; }\r\n.omp-site-lb:not(.omp-side) .omp-lb-charts { flex: 2 1 14em; margin-top: 0; gap: .8em; }\r\n.omp-site-lb:not(.omp-side) .omp-lb-spark, .omp-site-lb:not(.omp-side) .omp-lb-stars { height: 1.8em; }\r\n\r\n.omp-site-lb:not(.omp-side) { position: relative; padding-right: 36px; }\r\n.omp-site-lb:not(.omp-side) .omp-lb-src { position: absolute; right: 12px; bottom: 8px; margin: 0; line-height: 1; }\r\n.omp-site-lb:not(.omp-side) .omp-lb-src-t { display: none; }\r\n.omp-site-lb:not(.omp-side) .omp-lb-src svg { margin: 0; width: 1.3em; height: 1.3em; }\r\n\r\nhtml:not(.omp-theme) .omp-site-lb {\r\n  --surface: hsl(var(--hsl-b4)); --bg: hsl(var(--hsl-b5)); --hover: hsl(var(--hsl-b3)); --border: hsl(var(--hsl-b3));\r\n  --text: hsl(var(--hsl-c1)); --dim: hsl(var(--hsl-l1)); --hint: hsl(var(--hsl-l2));\r\n}\r\n\r\nhtml:not(.omp-theme) #omp-tools {\r\n  --hover: hsla(var(--hsl-c1), .18); --text: hsl(var(--hsl-c1)); --hint: hsla(var(--hsl-c1), .6); --radius: 6px;\r\n}\r\n\r\n/* the score page's buttons */\r\n.score-buttons > .omp-orig { display: none !important; }\r\n#omp-actions { display: flex; align-items: center; gap: 8px; }\r\n.omp-act {\r\n  display: inline-grid; place-items: center; box-sizing: border-box; width: 38px; height: 38px; padding: 0; flex: none;\r\n  border: 1px solid rgba(255, 255, 255, .14); border-radius: 50%; background: rgba(0, 0, 0, .5); color: #fff; cursor: pointer;\r\n  transition: background .15s, border-color .15s;\r\n}\r\n.omp-act:hover { background: rgba(255, 255, 255, .18); border-color: rgba(255, 255, 255, .3); }\r\n.omp-act:disabled { opacity: .5; cursor: default; }\r\n.omp-act svg { width: 17px; height: 17px; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }\r\n@media (min-width: 1000px) {\r\n  html.omp-scorelayout body:has(.score-info) .score-buttons { display: flex; align-items: center; justify-content: center; gap: 8px; }\r\n  html.omp-scorelayout body:has(.score-info) .score-buttons > * { margin: 0 !important; }\r\n\r\n  html.omp-scorelayout body:has(.score-info) .score-buttons > :not(#omp-actions):not(.omp-orig) {\r\n    position: relative; flex: none; display: grid; place-items: center; width: 38px; height: 38px; box-sizing: border-box;\r\n    border: 1px solid rgba(255, 255, 255, .14); border-radius: 50%; background: rgba(0, 0, 0, .5); transition: background .15s, border-color .15s;\r\n  }\r\n  html.omp-scorelayout body:has(.score-info) .score-buttons > :not(#omp-actions):not(.omp-orig):hover { background: rgba(255, 255, 255, .18); border-color: rgba(255, 255, 255, .3); }\r\n  html.omp-scorelayout body:has(.score-info) .score-buttons > :not(#omp-actions):not(.omp-orig) * {\r\n    background: transparent !important; box-shadow: none !important; border: 0 !important; color: #fff !important; outline: 0 !important; filter: none !important;\r\n  }\r\n  html.omp-scorelayout body:has(.score-info) .score-buttons > :not(#omp-actions):not(.omp-orig) :is(button, a, .btn-circle, .btn-osu-big) {\r\n    position: absolute; inset: 0; width: 100%; height: 100%; min-width: 0; padding: 0; margin: 0; display: grid; place-items: center; border-radius: 50%; font-size: 13px; line-height: 1;\r\n  }\r\n}\r\n\r\nhtml.omp-theme .beatmapsets-search__cover::after { background-color: rgba(0, 0, 0, .8) !important; }\r\n\r\n.omp-alt-artist { flex: 0 1 auto; min-width: 0; margin-left: .5em; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 11px; font-weight: 400; opacity: .7; align-self: baseline; }\r\n\r\n/* account settings search */\r\n.omp-acc-search {\r\n  display: flex; align-items: center; gap: 10px; box-sizing: border-box; margin: 16px 0 16px; padding: 0 16px; height: 44px;\r\n  background: hsl(var(--hsl-b3)); border: 1px solid hsl(var(--hsl-b2)); border-radius: 8px; color: hsl(var(--hsl-c1));\r\n}\r\n.omp-acc-search:focus-within { border-color: hsl(var(--hsl-l1)); background: hsl(var(--hsl-b4)); }\r\n.omp-acc-search svg { width: 17px; height: 17px; flex: none; fill: none; stroke: hsl(var(--hsl-l1)); stroke-width: 2; stroke-linecap: round; }\r\n.omp-acc-search input { flex: 1; min-width: 0; height: 100%; padding: 0; background: none; border: 0; outline: 0; color: inherit; font: inherit; font-size: 14px; }\r\n.omp-acc-search input::placeholder { color: hsl(var(--hsl-l2)); }\r\n.omp-acc-none { flex: none; font-size: 13px; color: hsl(var(--hsl-l1)); }\r\n.account-edit[hidden], .account-edit-entry[hidden], .account-edit__input-group[hidden] { display: none !important; }\r\n\r\n.omp-copy-desc { display: inline-grid; place-items: center; width: 22px; height: 22px; margin: 0 0 0 8px; padding: 0; vertical-align: middle; background: none; border: 0; border-radius: 5px; color: inherit; opacity: .55; cursor: pointer; transition: opacity .15s, background .15s; }\r\n.omp-copy-desc:hover { opacity: 1; background: rgba(255, 255, 255, .14); }\r\n\r\n/* settings menu */\r\n#omp-menu { width: 24em; padding-top: .7em; }\r\n.omp-mtitle { margin: 0 0 .2em; font-size: 1.1em; font-weight: 600; }\r\n#omp-menu h3 { margin: 1em 0 .3em; padding: 0; }\r\n.omp-mblock { margin: 0 0 .3em; padding: .15em 12px .25em; background: var(--bg); border-radius: 8px; }\r\n.omp-mname { margin: .5em 0 .1em; font-size: .85em; font-weight: 600; color: var(--text); }\r\n.omp-mblock .omp-mrow { padding: .4em 0; }\r\n.omp-mblock .omp-mrow + .omp-mrow, .omp-mblock .omp-msub + .omp-mrow, .omp-mblock .omp-mrow + .omp-msub { border-top: 1px solid var(--border); }\r\n.omp-mgroup { margin: 0 0 .25em; border-radius: 8px; background: var(--bg); }\r\n.omp-mgroup > summary { display: flex; align-items: center; justify-content: space-between; padding: .55em 12px; font-weight: 500; cursor: pointer; list-style: none; }\r\n.omp-mgroup > summary::-webkit-details-marker { display: none; }\r\n.omp-mgroup > summary::after { content: \"\"; width: .45em; height: .45em; border: solid var(--hint); border-width: 0 2px 2px 0; transform: rotate(45deg) translateY(-2px); transition: transform .15s; }\r\n.omp-mgroup[open] > summary::after { transform: rotate(-135deg); }\r\n.omp-mgroup > summary:hover { color: var(--text); background: var(--hover); border-radius: 8px; }\r\n.omp-mgroup > .omp-mrow, .omp-mgroup > .omp-msub { margin: 0 12px; }\r\n.omp-mgroup[open] { padding-bottom: .3em; }\r\n.omp-mrow > .omp-step { flex-direction: row; align-items: center; }\r\n.omp-mrow > .omp-step output { color: var(--text); }\r\n.omp-msub { border-left: 0; padding-left: 14px; }\r\n.omp-msub .omp-mrow { border-top: 0 !important; }\r\n\r\n.omp-mhead { position: relative; display: flex; align-items: center; justify-content: space-between; min-height: 5.2em; margin: -.1em 0 .1em; }\r\n.omp-mhead .omp-mtitle { margin: 0; font-size: 1.25em; }\r\n.omp-msub-title { margin-top: .1em; font-size: .85em; color: var(--dim); }\r\n.omp-mlogo { flex: none; align-self: flex-end; width: 5.4em; height: 5.2em; margin: 0 -.3em -.1em 0; background: url(\"data:image/png;base64,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\") center bottom / contain no-repeat; }\r\n\r\n/* hide the medals you have not unlocked */\r\nhtml[data-omp-hide-locked] .medals-group .badge-achievement--locked { display: none; }\r\nhtml[data-omp-hide-locked] .medals-group__medals:not(:has(.badge-achievement:not(.badge-achievement--locked))),\r\nhtml[data-omp-hide-locked] .medals-group__group:not(:has(.badge-achievement:not(.badge-achievement--locked))) { display: none; }\r\n.omp-medal-switch { position: absolute; top: 50%; right: 56px; transform: translateY(-50%); width: 38px; height: 20px; padding: 0; border: 0; border-radius: 10px; background: rgba(255, 255, 255, .16); cursor: pointer; transition: background .15s; }\r\n.omp-medal-switch::after { content: \"\"; position: absolute; top: 3px; left: 3px; width: 14px; height: 14px; border-radius: 50%; background: #fff; box-shadow: 0 1px 3px rgba(0, 0, 0, .4); transition: transform .15s; }\r\n.omp-medal-switch:hover { background: rgba(255, 255, 255, .26); }\r\n.omp-medal-switch[aria-checked=\"true\"] { background: hsl(var(--hsl-pink-1, 333 100% 70%)); }\r\n.omp-medal-switch[aria-checked=\"true\"]::after { transform: translateX(18px); }\r\n\r\n.tooltip-achievement .omp-osekai { display: flex; align-items: center; justify-content: center; gap: 6px; padding: 7px 10px 8px; font-size: 12px; font-weight: 600; color: inherit; opacity: .7; text-decoration: none; border-top: 1px solid rgba(255, 255, 255, .1); transition: opacity .15s; }\r\n.tooltip-achievement .omp-osekai:hover { opacity: 1; text-decoration: none; color: inherit; }\r\n\r\n/* mod icons: plain glyphs */\r\nhtml.omp-modplain .mod__icon::before { display: none !important; }\r\nhtml.omp-modplain .mod__icon[data-acronym]::after { content: \"\"; background: var(--type-bg-colour) !important; font-size: 0; }\r\n.omp-seg { display: flex; flex: none; padding: 2px; gap: 2px; background: var(--hover); border-radius: 7px; }\r\n.omp-mrow > .omp-seg { flex-direction: row; }\r\n.omp-seg button { padding: .3em .7em; background: none; border: 0; border-radius: 5px; color: var(--dim); font: inherit; font-size: .9em; cursor: pointer; }\r\n.omp-seg button:hover { color: var(--text); }\r\n.omp-seg button[aria-pressed=\"true\"] { background: var(--omp-accent, var(--text)); color: var(--bg); font-weight: 600; }\r\n\r\n/* rate chip without the hexagon: a small rounded pill in the mod's colour */\r\nhtml:is(.omp-modtext, .omp-modplain) .mod__extender {\r\n  -webkit-mask-image: none; mask-image: none; margin-left: .22em; padding: 0 .55em; height: 78%; align-self: center;\r\n  background-color: color-mix(in srgb, var(--type-bg-colour) 20%, transparent); border-radius: .45em;\r\n}\r\nhtml:is(.omp-modtext, .omp-modplain) .mod__extender span { font-size: .52em; }\r\nhtml.omp-modtext .mod__extender span { font-family: Torus, \"Segoe UI\", system-ui, sans-serif; }\r\n\r\n/* pp with decimals: fixed-width numbers so the columns stay aligned */\r\nhtml.omp-ppdec .play-detail__pp { min-width: 150px; }\r\nhtml.omp-ppdec .play-detail__pp, html.omp-ppdec .play-detail__accuracy, html.omp-ppdec .play-detail__pp-weight { font-variant-numeric: tabular-nums; }\r\n\r\n/* api docs page */\r\nhtml.omp-docs:has(.tocify-wrapper), html.omp-docs:has(.tocify-wrapper) body { background: hsl(var(--hsl-b5)); }\r\nhtml.omp-docs .page-wrapper { background: hsl(var(--hsl-b5)); color: #d8d8d8; }\r\nhtml.omp-docs .page-wrapper .content, html.omp-docs .page-wrapper .content :is(p, li, td, th, h1, h2, h3, h4, h5, strong, em, b, span, label, summary, small) { color: #d8d8d8; }\r\nhtml.omp-docs .page-wrapper .content h1 { background-image: none; background-color: hsl(var(--hsl-b4)); border-color: hsl(var(--hsl-b3)); }\r\nhtml.omp-docs .page-wrapper .content h2 { background-image: none; border-color: hsl(var(--hsl-b3)); }\r\nhtml.omp-docs .page-wrapper .content h3 { border-color: hsl(var(--hsl-b3)); }\r\nhtml.omp-docs .page-wrapper .content a { color: #7cc4ff; }\r\nhtml.omp-docs .page-wrapper .content a.badge, html.omp-docs .page-wrapper .content a.badge * { color: #fff; }\r\nhtml.omp-docs .page-wrapper .content code { background-color: rgba(255, 255, 255, .08); }\r\nhtml.omp-docs .page-wrapper .content table, html.omp-docs .page-wrapper .content th, html.omp-docs .page-wrapper .content td { border-color: hsl(var(--hsl-b3)); }\r\nhtml.omp-docs .page-wrapper .content td { background-color: rgba(255, 255, 255, .03); }\r\nhtml.omp-docs .page-wrapper .content tr:nth-child(even) td { background-color: rgba(255, 255, 255, .06); }\r\nhtml.omp-docs .page-wrapper .content h4.fancy-heading-panel { background-color: hsl(var(--hsl-b3)); color: #fff; }\r\nhtml.omp-docs .page-wrapper .content input { background-color: hsl(var(--hsl-b3)); color: #fff; border-color: hsl(var(--hsl-b2)); }\r\nhtml.omp-docs .page-wrapper .content hr { border-color: hsl(var(--hsl-b3)); }\r\nhtml.omp-docs .tocify-wrapper { background-color: hsl(var(--hsl-b6)); }\r\nhtml.omp-docs .tocify-wrapper input.search { background-color: hsl(var(--hsl-b4)); }\r\nhtml.omp-docs .tocify-wrapper ul.tocify-subheader { background-color: hsl(var(--hsl-b5)); }\r\nhtml.omp-docs .page-wrapper .dark-box { background-color: hsl(var(--hsl-b4)); }\r\nhtml.omp-docs .page-wrapper pre, html.omp-docs .page-wrapper blockquote, html.omp-docs .page-wrapper aside.notice { background-color: hsl(var(--hsl-b6)); }\r\nhtml.omp-docs .page-wrapper .content, html.omp-docs .page-wrapper .content * { text-shadow: none; }\r\n\r\n/* api docs palette */\r\nhtml.omp-docs body { --hsl-b1: 240, 5%, 32%; --hsl-b2: 240, 5%, 20%; --hsl-b3: 240, 5%, 15%; --hsl-b4: 240, 5%, 11%; --hsl-b5: 240, 6%, 7%; --hsl-b6: 240, 6%, 5%; }\r\nhtml.omp-docs-black body { --hsl-b1: 0, 0%, 26%; --hsl-b2: 0, 0%, 14%; --hsl-b3: 0, 0%, 8%; --hsl-b4: 0, 0%, 5%; --hsl-b5: 0, 0%, 2%; --hsl-b6: 0, 0%, 0%; }\r\n#omp-tools.omp-tools-fixed { position: fixed; top: 10px; left: 10px; right: auto; z-index: 2147483000; margin: 0; padding: 2px; background: var(--surface); border: 1px solid var(--border); border-radius: 8px; font-size: 15px; }\r\n#omp-menu details, #omp-menu summary { border: 0 !important; box-shadow: none !important; }\r\n#omp-menu details::before, #omp-menu details::after, #omp-menu summary::before { display: none !important; }\r\n#omp-menu.omp-menu-left { left: 10px; right: auto; top: 52px !important; }\r\n\r\n.omp-acc { display: flex; align-items: center; gap: 8px; flex: none; }\r\n.omp-acc input[type=\"color\"] { width: 2.4em; height: 1.8em; padding: 0; border: 1px solid var(--border); border-radius: 6px; background: none; cursor: pointer; }\r\n.omp-acc button { padding: .3em .7em; background: var(--hover); border: 0; border-radius: 6px; color: var(--dim); font: inherit; font-size: .9em; cursor: pointer; }\r\n.omp-acc button:hover { color: var(--text); }\r\nhtml.omp-acc-hl body { --base-hue-override: var(--omp-hue) !important; }\r\nhtml.omp-acc-btn body { --colour-pink-hue: var(--omp-hue) !important; }\r\n#omp-menu .omp-mrow { font-size: calc(var(--omp-k, 15) * 0.8px); }\r\nhtml.omp-accent body :is([class*=\"supporter\"], [class*=\"supporter\"] *) {\r\n  --hsl-pink-1: 333, var(--c-saturation-1), var(--c-lightness-1); --hsl-pink-2: 333, var(--c-saturation-2), var(--c-lightness-2);\r\n  --hsl-pink-3: 333, var(--c-saturation-3), var(--c-lightness-3); --hsl-pink-4: 333, var(--c-saturation-4), var(--c-lightness-4);\r\n}\r\n\r\n/* clearer fail chart on the beatmap page */\r\n.omp-fc-hidden { display: none !important; }\r\n.omp-fc { position: relative; display: flex; flex: 1 1 0; flex-direction: column; min-height: 0; margin: 4px 0 0; font-size: 12px; line-height: 1.35; color: inherit; }\r\n.omp-fc-split { display: flex; height: 8px; gap: 2px; margin: 4px 0 6px; border-radius: 4px; overflow: hidden; }\r\n.omp-fc-split > span { min-width: 0; }\r\n.omp-fc-pass { background: #7ed957; }\r\n.omp-fc-failbar { background: #ff6b6b; }\r\n.omp-fc-quitbar { background: #f5b042; }\r\n.omp-fc-legend { display: flex; flex-wrap: wrap; justify-content: center; gap: 2px 14px; margin-bottom: 4px; }\r\n.omp-fc-legend i { display: inline-block; width: 9px; height: 9px; margin-right: 5px; border-radius: 2px; vertical-align: -1px; }\r\n.omp-fc-svg { display: block; flex: 1 1 0; width: 100%; height: auto; min-height: 70px; overflow: visible; }\r\n.omp-fc-fail { fill: #ff6b6b; }\r\n.omp-fc-quit { fill: #f5b042; }\r\n.omp-fc-hit { fill: currentColor; fill-opacity: 0; }\r\n.omp-fc-col:hover .omp-fc-hit { fill-opacity: .14; }\r\n.omp-fc-grid { stroke: currentColor; stroke-opacity: .14; stroke-dasharray: 2 3; vector-effect: non-scaling-stroke; }\r\n.omp-fc-axis, .omp-fc-tick { stroke: currentColor; stroke-opacity: .5; vector-effect: non-scaling-stroke; }\r\n.omp-fc-lbl { fill: currentColor; fill-opacity: .75; font-size: 9px; }\r\nhtml.omp-acc-chart .omp-fc-pass { background: color-mix(in srgb, currentColor 55%, transparent); }\r\nhtml.omp-acc-chart .omp-fc-failbar, html.omp-acc-chart .omp-fc-fail { background: var(--omp-accent); fill: var(--omp-accent); }\r\nhtml.omp-acc-chart .omp-fc-quitbar, html.omp-acc-chart .omp-fc-quit { background: color-mix(in srgb, var(--omp-accent) 50%, #fff); fill: color-mix(in srgb, var(--omp-accent) 50%, #fff); }\r\n.omp-fc-head { position: relative; cursor: help; }\r\n.omp-fc-head::after { content: \"Estimate, based on a sample of plays\"; position: absolute; left: 50%; top: calc(100% + 4px); width: max-content; max-width: 170px; padding: 5px 9px; border-radius: 6px; background: rgba(0, 0, 0, .9); color: #fff; font-size: 11px; font-weight: 400; line-height: 1.3; text-align: center; text-transform: none; transform: translateX(-50%); opacity: 0; pointer-events: none; transition: opacity .12s; z-index: 5; }\r\n.omp-fc-head:hover::after { opacity: 1; }\r\n\r\n.profile-links__item[data-omp-status=\"online\"] { color: #8fd19e; }\r\n.profile-links__item[data-omp-status=\"offline\"] { color: #e58b8b; }\r\nhtml.omp-acc-btn .btn-circle { background-color: hsl(var(--hsl-b2)); color: var(--omp-accent); box-shadow: inset 0 0 0 1.5px color-mix(in srgb, var(--omp-accent) 65%, transparent); transition: background-color .15s, color .15s, box-shadow .15s; }\r\nhtml.omp-acc-btn .btn-circle:hover, html.omp-acc-btn .btn-circle:focus-visible { background-color: var(--omp-accent) !important; color: var(--omp-ink, #000) !important; box-shadow: inset 0 0 0 1.5px var(--omp-accent) !important; }\r\n#omp-menu.omp-peek { opacity: .1; transition: opacity .15s; pointer-events: none; }\r\n";
    (document.head || document.documentElement).append(style);

    /* ---- config.js ---- */
    // Name and setting defaults.
    globalThis.OMP_CONFIG = {
      name: 'osu! maid',
      storageKey: 'omp',
      scale: { min: 12, max: 22, default: 15 },
      defaults: {
        v: 3,
        enabled: false, // off until the power button in the header is pressed
        theme: true,
        scale: 15,
        listBpm: true,
        listOutlines: false,
        listTitles: true,
        listMode: false,
        bgPass: true,
        bgButton: true,
        compactDl: false,
        playArt: true,
        lazerboard: true,
        lbSide: false,
        scoreRank: true,
        black: false,
        accountSearch: true,
        medalLink: true,
        hideLocked: false,
        docsTheme: 'grey',
        accentOn: false,
        accentButtons: true,
        accentLinks: true,
        accentHighlights: true,
        accentCharts: true,
        accent: '',
        failChart: true,
        dtMode: false,
        dtOn: false,
        scoreLayout: true,
        scoreImage: true,
        playHours: true,
        statusColour: true,
        ppDecimals: false,
        modIcons: 'site',
        copyDesc: true,
        copyInfo: false,
        modTotal: true,
      },
    };

    /* ---- core.js ---- */
    // Helpers, settings, header buttons and the settings menu.
    (() => {
      'use strict';
    
      const OMP = (globalThis.OMP = {});
      const html = document.documentElement;
      const esc = (s) => OMP.esc(s);
    
      OMP.esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
      OMP.num = (n) => (n == null ? '-' : Number(n).toLocaleString('en-US'));
      OMP.dur = (s) => {
        const d = Math.floor(s / 86400), h = Math.floor((s % 86400) / 3600), m = Math.floor((s % 3600) / 60);
        return d ? `${d}d ${h}h ${m}m` : `${h}h ${m}m`;
      };
      OMP.ago = (iso) => {
        const s = (Date.now() - new Date(iso).getTime()) / 1000;
        for (const [n, l] of [[31536000, 'y'], [2592000, 'mo'], [86400, 'd'], [3600, 'h'], [60, 'm']]) {
          if (s >= n) return `${Math.floor(s / n)}${l} ago`;
        }
        return 'now';
      };
      OMP.fmtDate = (iso) => new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
      OMP.flag = (code) => {
        if (!/^[A-Za-z]{2}$/.test(code || '')) return '';
        const name = [...code.toUpperCase()].map((c) => (0x1f1e6 + c.charCodeAt(0) - 65).toString(16)).join('-');
        return `<img class="omp-flag" src="/assets/images/flags/${name}.svg" alt="${esc(code)}" title="${esc(code)}" loading="lazy">`;
      };
      OMP.gradeLabel = (r) => ({ X: 'SS', XH: 'SS', SH: 'S' }[r] || r);
    
      const scale = (stops) => (r) => {
        const g = 2.2;
        if (r <= stops[0][0]) return stops[0][1];
        for (let i = 1; i < stops.length; i++) {
          if (r <= stops[i][0]) {
            const [a, ca] = stops[i - 1], [b, cb] = stops[i];
            const t = (r - a) / (b - a);
            const hex = (h) => [1, 3, 5].map((k) => parseInt(h.slice(k, k + 2), 16));
            const [x, y] = [hex(ca), hex(cb)];
            return `rgb(${x.map((v, k) => Math.round((v ** g + t * (y[k] ** g - v ** g)) ** (1 / g))).join(',')})`;
          }
        }
        return stops[stops.length - 1][1];
      };
      const bodyScale = scale([[0.1, '#4290FB'], [1.25, '#4FC0FF'], [2, '#4FFFD5'], [2.5, '#7CFF4F'], [3.3, '#F6F05C'], [4.2, '#FF8068'], [4.9, '#FF4E6F'], [5.8, '#C645B8'], [6.7, '#6563DE'], [7.7, '#18158E'], [9, '#000000']]);
      const textScale = scale([[9, '#F6F05C'], [9.9, '#FF8068'], [10.6, '#FF4E6F'], [11.5, '#C645B8'], [12.4, '#6563DE']]);
      OMP.starColour = (r) => (r < 0.1 ? '#AAAAAA' : r >= 9 ? '#000000' : bodyScale(r));
      OMP.starText = (r) => (r < 6.5 ? '#000000' : r < 9 ? '#F6F05C' : textScale(r));
    
      OMP.HITS = {
        osu: [['300', 'great'], ['100', 'ok'], ['50', 'meh'], ['miss', 'miss']],
        taiko: [['great', 'great'], ['ok', 'ok'], ['miss', 'miss']],
        fruits: [['fruit', 'great'], ['drop', 'large_tick_hit'], ['droplet', 'small_tick_hit'], ['miss', 'miss']],
        mania: [['max', 'perfect'], ['300', 'great'], ['200', 'good'], ['100', 'ok'], ['50', 'meh'], ['miss', 'miss']],
      };
    
      OMP.clean = (markup) => {
        const t = document.createElement('template');
        t.innerHTML = markup;
        t.content.querySelectorAll('script,style,iframe,object,embed,link,meta').forEach((n) => n.remove());
        t.content.querySelectorAll('*').forEach((n) => {
          for (const a of [...n.attributes]) {
            if (/^on/i.test(a.name) || (/^(href|src)$/i.test(a.name) && /^\s*javascript:/i.test(a.value))) n.removeAttribute(a.name);
          }
        });
        return t.innerHTML;
      };
    
      OMP.getJSON = async (url) => {
        const r = await fetch(url, { headers: { Accept: 'application/json' }, credentials: 'same-origin' });
        if (!r.ok) throw new Error(r.status);
        return r.json();
      };
    
      const searchHandlers = [];
      OMP.onSearch = (fn) => { searchHandlers.push(fn); };
      OMP.emitSearch = (sets) => searchHandlers.forEach((fn) => { try { fn(sets); } catch (e) { console.error('[osu! minimal]', e); } });
    
      OMP.toast = (text) => {
        document.getElementById('omp-toast')?.remove();
        const t = document.createElement('div');
        t.id = 'omp-toast';
        t.textContent = text;
        document.documentElement.append(t);
        setTimeout(() => t.remove(), 4500);
      };
      OMP.fail = (box, msg = 'Unavailable') => { box.innerHTML = `<div class="omp-empty">${msg}</div>`; };
    
      const CFG = globalThis.OMP_CONFIG;
      const KEY = CFG.storageKey;
      const LS_KEY = 'omp-settings';
      const store = {
        get() {
          try {
            if (typeof GM_getValue === 'function') {
              const v = GM_getValue(KEY, null);
              if (v && typeof v === 'object' && typeof v.then !== 'function') return v;
              if (typeof v === 'string') return JSON.parse(v);
            }
          } catch { /* fall through */ }
          return null;
        },
        set(v) {
          try { if (typeof GM_setValue === 'function') { GM_setValue(KEY, v); return; } } catch { /* fall through */ }
          try { localStorage.setItem(LS_KEY, JSON.stringify(v)); } catch { /* ignore */ }
        },
        watch(fn) {
          try { if (typeof GM_addValueChangeListener === 'function') GM_addValueChangeListener(KEY, (name, oldV, newV, remote) => { if (remote && newV) fn(newV); }); } catch { /* ignore */ }
        },
      };
      const oldCopy = () => { try { return JSON.parse(localStorage.getItem(LS_KEY)); } catch { return null; } };
    
      const normalize = (s) => ({
        ...CFG.defaults, ...(s || {}),
        accentOn: s && s.accentOn !== undefined ? !!s.accentOn : !!(s && s.accent),
        docsTheme: s && s.docsDark === false && !s.docsTheme ? 'off' : (s && s.docsTheme) || CFG.defaults.docsTheme,
        modIcons: s && s.modIcons === 'game' ? 'plain' : (s && s.modIcons) || CFG.defaults.modIcons,
        v: CFG.defaults.v,
      });
    
      let settings = normalize(store.get() || oldCopy());
      const OFF = { theme: false, failChart: false, dtMode: false, accentOn: false, accentButtons: false, accentLinks: false, accentHighlights: false, accentCharts: false, accent: '', docsTheme: 'off', black: false, playArt: false, lbSide: false, scoreLayout: false, scoreImage: false, ppDecimals: false, playHours: false, statusColour: false, modIcons: 'site', hideLocked: false, medalLink: false, copyDesc: false, copyInfo: false, modTotal: false, accountSearch: false, lazerboard: false, scoreRank: false, bgPass: false, bgButton: false, compactDl: false, listBpm: false, listOutlines: false, listTitles: false, listMode: false };
      const eff = () => (settings.enabled ? settings : { ...settings, ...OFF });
      OMP.settings = eff;
      OMP.rate = () => (eff().dtMode && settings.dtOn ? 1.5 : 1);
    
      const applyScale = (k) => {
        html.style.setProperty('--omp-k', String(k));
        html.style.setProperty('--omp-nz', eff().theme ? (k / 19).toFixed(3) : '1');
      };
    
      const hueOf = (hex) => {
        const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);
        const max = Math.max(r, g, b), d = max - Math.min(r, g, b);
        if (!d) return 0;
        const h = max === r ? ((g - b) / d) % 6 : max === g ? (b - r) / d + 2 : (r - g) / d + 4;
        return Math.round(((h * 60) + 360) % 360);
      };
      const applyAccent = () => {
        const hex = eff().accentOn ? eff().accent : '';
        if (/^#[0-9a-f]{6}$/i.test(hex || '')) {
          const h = String(hueOf(hex));
          html.style.setProperty('--omp-hue', h);
          html.style.setProperty('--omp-accent', hex);
          const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));
          html.style.setProperty('--omp-ink', 0.299 * r + 0.587 * g + 0.114 * b > 150 ? '#000' : '#fff');
          html.classList.add('omp-accent');
          const e = eff();
          html.classList.toggle('omp-acc-btn', e.accentButtons);
          html.classList.toggle('omp-acc-links', e.accentLinks);
          html.classList.toggle('omp-acc-hl', e.accentHighlights);
          html.classList.toggle('omp-acc-chart', e.accentCharts);
        } else {
          ['--omp-hue', '--omp-accent', '--omp-ink'].forEach((p) => html.style.removeProperty(p));
          html.classList.remove('omp-accent', 'omp-acc-btn', 'omp-acc-links', 'omp-acc-hl', 'omp-acc-chart');
        }
      };
    
      const applyTheme = () => {
        const e = eff();
        applyAccent();
        html.classList.toggle('omp-theme', e.theme);
        html.classList.toggle('omp-black', e.theme && e.black);
        html.classList.toggle('omp-playart', !!e.playArt);
        html.classList.toggle('omp-scorelayout', !!e.scoreLayout);
        html.classList.toggle('omp-docs', e.docsTheme !== 'off');
        html.classList.toggle('omp-docs-black', e.docsTheme === 'black');
        html.classList.toggle('omp-ppdec', !!e.ppDecimals);
        html.classList.toggle('omp-modtext', e.modIcons === 'letters');
        html.classList.toggle('omp-modplain', e.modIcons === 'plain');
      };
    
      const listeners = [];
      OMP.onSettings = (fn) => { listeners.push(fn); };
    
      function applySettings(prev) {
        applyScale(settings.scale);
        applyTheme();
        if (!prev || prev.enabled !== settings.enabled || prev.dtMode !== settings.dtMode || prev.dtOn !== settings.dtOn) renderTools();
        listeners.forEach((fn) => { try { fn(settings); } catch (e) { console.error('[osu! minimal]', e); } });
      }
    
      const persist = () => store.set(settings);
    
      OMP.set = (patch) => {
        const prev = settings;
        settings = normalize({ ...settings, ...patch });
        persist();
        applySettings(prev);
      };
    
      const watchStorage = () => {
        store.watch((stored) => {
          const next = normalize(stored);
          if (JSON.stringify(next) === JSON.stringify(settings)) return;
          const prev = settings;
          settings = next;
          applySettings(prev);
        });
        if (!store.get()) persist();
      };
      const ICON_GEAR = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>';
      const ICON_POWER = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M18.36 6.64a9 9 0 1 1-12.73 0"/><path d="M12 2v10"/></svg>';
    
      let menuEl = null;
      const mrow = (attrs, label, hint, on) => `<label class="omp-mrow"><span><b>${esc(label)}</b>${hint ? `<small>${esc(hint)}</small>` : ''}</span><input type="checkbox" class="omp-sw" ${attrs}${on ? ' checked' : ''}></label>`;
      const srow = (key, label, hint) => mrow(`data-set="${key}"`, label, hint, settings[key]);
    
      const GROUPS = [
        { id: 'profile', label: 'Profile', match: (p) => /^\/users\//.test(p), rows: [
          ['playArt', 'Map art on scores', 'The beatmap cover behind each score card'],
          ['lazerboard', 'Lazerboard stats', 'Leaderboard ranks; asks lazerboard.melguy.com (sends the player id)'],
          ['lbSide', 'Pop stats out', 'Beside the profile on wide windows, not under the stats', 'lazerboard'],
          ['statusColour', 'Online status colour', 'Green when online, red when offline'],
          ['scoreRank', 'Score rank', 'Asks score.respektive.pw (sends the player id)'],
          ['medalLink', 'Osekai link on medals', 'A link to the medal on Osekai in its popup'],
          ['hideLocked', 'Hide unachieved medals', 'Only the medals you have; also a switch in the medals header'],
        ] },
        { id: 'scores', label: 'Scores', match: (p) => /^\/(users|scores)\//.test(p) || /^\/beatmapsets\/\d+/.test(p), rows: [
          ['playHours', 'Play time in hours', 'Hours shown, days and hours on hover'],
          ['ppDecimals', 'pp to 2 decimals', 'Instead of rounded pp (on profiles)'],
          ['modIcons', 'Mod icons', '', [['site', 'Site'], ['letters', 'Letters'], ['plain', 'Plain']]],
        ] },
        { id: 'score', label: 'Score page', match: (p) => /^\/scores\//.test(p), rows: [
          ['scoreLayout', 'Results screen layout', 'Laid out like the in-game results screen'],
          ['scoreImage', 'Score buttons', 'Icon buttons: download replay, copy link, save as image'],
        ] },
        { id: 'beatmap', label: 'Beatmap page', match: (p) => /^\/beatmapsets\/\d+\/?$/.test(p), rows: [
          ['bgPass', 'Map background', 'Shows through the header and info area'],
          ['bgButton', 'Background button', 'Opens the full-size background image'],
          ['compactDl', 'Slim download buttons', 'Icon only, no "with video" button'],
          ['failChart', 'Clearer fail chart', 'Pass, fail and quit split, labelled axis and per-bar tooltips'],
          ['copyDesc', 'Copy description', 'A small icon next to "Description"'],
          ['copyInfo', 'Copy map info button', 'A header button that copies artist, title, mapper and link'],
        ] },
        { id: 'modding', label: 'Modding', match: (p) => /^\/beatmapsets\/\d+\/discussion/.test(p), rows: [
          ['modTotal', 'Open on Total', 'Show all discussions, not only praise'],
        ] },
        { id: 'listing', label: 'Beatmap listing', match: (p) => /^\/beatmapsets\/?$/.test(p), rows: [
          ['listBpm', 'BPM on cards', 'Shown on every card'],
          ['listOutlines', 'Status outlines', 'Card outline in the colour of its status'],
          ['listTitles', 'Other title and artist', 'The romanised / original name next to the main one'],
          ['listMode', 'Remember mode', 'Reopen the listing in the last game mode'],
        ] },
        { id: 'docs', label: 'API docs', match: (p) => /^\/docs/.test(p), rows: [
          ['docsTheme', 'Dark docs', '', [['off', 'Off'], ['grey', 'Grey'], ['black', 'Black']]],
        ] },
        { id: 'account', label: 'Account settings', match: (p) => /^\/home\/account\/edit/.test(p), rows: [
          ['accountSearch', 'Search box', 'Filter the settings by typing; press / to jump to it'],
        ] },
      ];
      const openGroups = new Set();
    
      function buildMenu() {
        const path = location.pathname;
        const choice = (key, label, opts) => `<div class="omp-mrow"><span><b>${esc(label)}</b></span><span class="omp-seg">${opts.map(([v, t]) => `<button type="button" data-key="${key}" data-choice="${v}"${settings[key] === v ? ' aria-pressed="true"' : ''}>${esc(t)}</button>`).join('')}</span></div>`;
        const rows = (g) => g.rows.map(([key, label, hint, parent]) => (Array.isArray(parent)
          ? choice(key, label, parent)
          : parent
          ? `<div class="omp-msub${settings[parent] ? '' : ' omp-off'}">${srow(key, label, hint)}</div>`
          : srow(key, label, hint))).join('');
        const here = GROUPS.filter((g) => g.match(path));
        const other = GROUPS.filter((g) => !g.match(path));
        const group = (g) => `<details class="omp-mgroup" data-g="${g.id}"${openGroups.has(g.id) ? ' open' : ''}><summary>${esc(g.label)}</summary>${rows(g)}</details>`;
        menuEl.innerHTML = `
          <div class="omp-mhead"><div><div class="omp-mtitle">osu! maid</div><div class="omp-msub-title">Settings for this site</div></div><i class="omp-mlogo" aria-hidden="true"></i></div>
          ${here.length ? `<h3>On this page</h3>${here.map((g) => `<div class="omp-mblock"><div class="omp-mname">${esc(g.label)}</div>${rows(g)}</div>`).join('')}` : ''}
          <h3>Everywhere</h3>
          <div class="omp-mblock">
            ${srow('theme', 'Dark theme', 'Dark colours and a compact header')}
            <div class="omp-msub${settings.theme ? '' : ' omp-off'}">${srow('black', 'Pure black', 'Black instead of dark grey')}</div>
            ${srow('accentOn', 'Accent colour', 'Tints links, buttons and highlights')}
            <div class="omp-msub"${settings.accentOn ? '' : ' hidden'}><div class="omp-mrow"><span><b>Colour</b></span><span class="omp-acc"><input type="color" data-accent value="${/^#[0-9a-f]{6}$/i.test(settings.accent || '') ? settings.accent : '#ff66aa'}" aria-label="Accent colour"></span></div>
              ${srow('accentButtons', 'Buttons', 'Circle buttons and pink buttons')}
              ${srow('accentLinks', 'Links and text', 'Links, tabs and stat values')}
              ${srow('accentHighlights', 'Highlights', 'Underlines, rings and active states')}
              ${srow('accentCharts', 'Charts', 'Fail chart colours')}</div>
            ${srow('dtMode', 'DT everywhere (experimental)', 'Adds a DT button in the header: BPM, length, AR, OD and stars as with DT. Stars: osu!standard ranked maps only')}
            <div class="omp-mrow"><span><b>Text size</b><small>Header and this menu</small></span>
              <span class="omp-step"><button type="button" data-step="-1" aria-label="Smaller text">-</button><output>${settings.scale}</output><button type="button" data-step="1" aria-label="Larger text">+</button></span></div>
          </div>
          <h3>${here.length ? 'Other pages' : 'Pages'}</h3>
          ${other.map(group).join('')}`;
      }
    
      function ensureMenu() {
        if (menuEl && menuEl.isConnected) return menuEl;
        menuEl = document.createElement('div');
        menuEl.id = 'omp-menu';
        menuEl.hidden = true;
        html.append(menuEl);
        menuEl.addEventListener('click', (e) => {
          e.stopPropagation();
          const pick = e.target.closest && e.target.closest('[data-choice]');
          if (pick) { OMP.set({ [pick.dataset.key]: pick.dataset.choice }); buildMenu(); return; }
          const step = e.target.closest && e.target.closest('[data-step]');
          if (step) { OMP.set({ scale: Math.min(CFG.scale.max, Math.max(CFG.scale.min, settings.scale + Number(step.dataset.step))) }); buildMenu(); }
        });
        menuEl.addEventListener('toggle', (e) => {
          const d = e.target;
          if (d.dataset && d.dataset.g) { if (d.open) openGroups.add(d.dataset.g); else openGroups.delete(d.dataset.g); }
        }, true);
        // while a colour is being picked the menu fades out, so the page underneath can be seen
        let peek = 0;
        menuEl.addEventListener('input', (e) => {
          if (e.target.dataset.accent === undefined) return;
          OMP.set({ accent: e.target.value, accentOn: true });
          menuEl.classList.add('omp-peek');
          clearTimeout(peek);
          peek = setTimeout(() => menuEl.classList.remove('omp-peek'), 1800);
        });
        menuEl.addEventListener('change', (e) => {
          const t = e.target;
          if (t.dataset.accent !== undefined) { buildMenu(); return; }
          if (t.dataset.set === 'accentOn' && t.checked && !settings.accent) OMP.set({ accentOn: true, accent: '#ff66aa' });
          else if (t.dataset.set) OMP.set({ [t.dataset.set]: t.checked });
          buildMenu();
        });
        return menuEl;
      }
    
      const setGear = (on) => document.querySelectorAll('#omp-gear').forEach((g) => g.setAttribute('aria-pressed', String(on)));
      function closeMenu() { if (menuEl) menuEl.hidden = true; setGear(false); }
      function onGear(e) {
        e.stopPropagation();
        const m = ensureMenu();
        if (!m.hidden) { closeMenu(); return; }
        buildMenu();
        const bar = document.querySelector('.nav2-header');
        m.style.top = bar ? `${Math.round(bar.getBoundingClientRect().bottom) + 6}px` : '52px';
        m.classList.toggle('omp-menu-left', !bar);
        m.hidden = false;
        setGear(true);
      }
    
      function renderTools() {
        document.getElementById('omp-tools')?.remove();
        const nav = document.querySelector('.nav2-header .nav2');
        const floating = !nav && /^\/docs/.test(location.pathname);
        if (!nav && !floating) return;
        const on = settings.enabled;
        const tools = document.createElement('div');
        tools.id = 'omp-tools';
        const dt = on && settings.dtMode ? `<button class="omp-icon-btn" id="omp-dt" title="DT mode (experimental)" aria-label="DT mode" aria-pressed="${!!settings.dtOn}">DT</button>` : '';
        tools.innerHTML = `${dt}${on ? `<button class="omp-icon-btn" id="omp-gear" title="osu! maid settings" aria-label="osu! maid settings" aria-pressed="false">${ICON_GEAR}</button>` : ''}
          <button class="omp-icon-btn" id="omp-power" title="${on ? 'Turn osu! maid off' : 'Turn osu! maid on'}" aria-label="osu! maid" aria-pressed="${on}">${ICON_POWER}</button>`;
        if (floating) { tools.classList.add('omp-tools-fixed'); html.append(tools); } else {
          const group = [...nav.children].find((c) => c.classList.contains('nav2__colgroup--icons'));
          nav.insertBefore(tools, group || null);
        }
        tools.querySelector('#omp-power').addEventListener('click', () => OMP.set({ enabled: !settings.enabled }));
        if (on) tools.querySelector('#omp-gear').addEventListener('click', onGear);
        if (dt) tools.querySelector('#omp-dt').addEventListener('click', () => OMP.set({ dtOn: !settings.dtOn }));
      }
    
      OMP.start = () => {
        document.addEventListener('click', () => closeMenu());
        document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeMenu(); });
        applyScale(settings.scale);
        applyTheme();
        watchStorage();
        const ensure = () => { if ((document.querySelector('.nav2-header .nav2') || /^\/docs/.test(location.pathname)) && !document.getElementById('omp-tools')) renderTools(); };
        document.addEventListener('DOMContentLoaded', ensure);
        new MutationObserver(ensure).observe(html, { childList: true, subtree: true });
        ensure();
      };
    })();

    /* ---- hook.js ---- */
    // Reads the listing search responses.
    (() => {
      'use strict';
    
      const SEARCH = '/beatmapsets/search';
      const win = typeof unsafeWindow !== 'undefined' ? unsafeWindow : window;
    
      const publish = (text) => {
        try {
          const sets = (JSON.parse(text).beatmapsets || []).map((s) => ({ id: s.id, bpm: s.bpm, title: s.title, original: s.title_unicode, artist: s.artist, artistOriginal: s.artist_unicode, maps: (s.beatmaps || []).map((b) => ({ id: b.id, mode: b.mode, r: b.difficulty_rating })) }));
          if (sets.length) OMP.emitSearch(sets);
        } catch { /* not JSON */ }
      };
    
      try {
        const open = win.XMLHttpRequest.prototype.open;
        win.XMLHttpRequest.prototype.open = function (method, url) {
          if (String(url).includes(SEARCH)) this.addEventListener('load', () => publish(this.responseText));
          return open.apply(this, arguments);
        };
    
        const nativeFetch = win.fetch;
        win.fetch = function (input) {
          const promise = nativeFetch.apply(this === undefined || this === null ? win : this, arguments);
          const url = typeof input === 'string' ? input : (input && input.url) || '';
          if (url.includes(SEARCH)) promise.then((res) => res.clone().text()).then(publish).catch(() => {});
          return promise;
        };
      } catch (e) {
        console.error('[osu! minimal] could not watch beatmap searches', e);
      }
    })();

    /* ---- assets.js ---- */
    // Fetches images through the script manager.
    (() => {
      'use strict';
    
      const HOSTS = new Set(['assets.ppy.sh', 'a.ppy.sh', 'raw.githubusercontent.com']);
    
      OMP.text = (url) => new Promise((resolve) => {
        let u;
        try { u = new URL(url); } catch { resolve(null); return; }
        if (u.protocol !== 'https:' || !HOSTS.has(u.hostname)) { resolve(null); return; }
        const plain = () => fetch(u.href).then((r) => (r.ok ? r.text() : null)).then(resolve).catch(() => resolve(null));
        if (typeof GM_xmlhttpRequest !== 'function') { plain(); return; }
        try {
          GM_xmlhttpRequest({ url: u.href, method: 'GET', timeout: 20000, onload: (r) => resolve(r.status >= 200 && r.status < 300 ? r.responseText : null), onerror: () => resolve(null), ontimeout: () => resolve(null) });
        } catch { plain(); }
      });
    
      OMP.blob = (url) => new Promise((resolve) => {
        let u;
        try { u = new URL(url); } catch { resolve(null); return; }
        if (u.protocol !== 'https:' || !HOSTS.has(u.hostname)) { resolve(null); return; }
    
        if (typeof GM_xmlhttpRequest === 'function') {
          try {
            GM_xmlhttpRequest({
              url: u.href,
              method: 'GET',
              responseType: 'blob',
              timeout: 20000,
              onload: (r) => resolve(r.status >= 200 && r.status < 300 && r.response ? r.response : null),
              onerror: () => resolve(null),
              ontimeout: () => resolve(null),
            });
            return;
          } catch { /* fall back to a plain request */ }
        }
        fetch(u.href).then((r) => (r.ok ? r.blob() : null)).then(resolve).catch(() => resolve(null));
      });
    })();

    /* ---- scorerank.js ---- */
    // Score rank on profiles.
    (() => {
      'use strict';
    
      const MODES = { osu: 0, taiko: 1, fruits: 2, mania: 3 };
      const cache = new Map();
    
      function getText(url) {
        return new Promise((resolve) => {
          if (typeof GM_xmlhttpRequest === 'function') {
            try {
              GM_xmlhttpRequest({ url, method: 'GET', timeout: 15000, onload: (r) => resolve(r.status >= 200 && r.status < 300 ? r.responseText : null), onerror: () => resolve(null), ontimeout: () => resolve(null) });
              return;
            } catch { /* fall back to a plain request */ }
          }
          fetch(url).then((r) => (r.ok ? r.text() : null)).then(resolve).catch(() => resolve(null));
        });
      }
    
      OMP.scoreRank = (user, mode) => {
        const key = `${user}:${mode}`;
        if (!cache.has(key)) {
          cache.set(key, getText(`https://score.respektive.pw/u/${encodeURIComponent(user)}?m=${mode}`).then((text) => {
            try {
              const p = JSON.parse(text)[0];
              if (!p || !p.rank) return null;
              return { rank: p.rank, highest: p.rank_highest ? p.rank_highest.rank : null, date: p.rank_highest ? p.rank_highest.updated_at : null };
            } catch { return null; }
          }));
          cache.get(key).then((r) => { if (!r) cache.delete(key); });
        }
        return cache.get(key);
      };
    
      OMP.scoreRankTip = (r) => (r && r.highest ? `Highest rank: #${r.highest.toLocaleString('en-US')} on ${new Date(r.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}` : '');
    
      let queued = false;
      function decorate() {
        queued = false;
        document.querySelectorAll('.custom-score-rank').forEach((e) => { if (!OMP.settings().scoreRank) e.remove(); });
        if (!OMP.settings().scoreRank) return;
        const short = document.querySelector('.profile-detail-stats__values');
        const cards = [...document.querySelectorAll('.profile-detail-stats-card')];
        const solo = cards.find((c) => /solo/i.test((c.querySelector('.profile-detail-stats-card__title') || {}).textContent || '')) || cards[0];
        const panel = short || (solo && solo.querySelector('.profile-detail-stats-card__values'));
        const active = document.querySelector('.game-mode-link--active');
        if (!panel || !active || !/^\/users\//.test(location.pathname)) return;
    
        const user = (location.pathname.match(/^\/users\/([^/]+)/) || [])[1];
        const mode = MODES[active.getAttribute('data-mode')];
        if (!user || mode === undefined) return;
        const tag = `${user}:${mode}`;
        const mine = panel.querySelector('.custom-score-rank');
        if (mine && mine.dataset.for === tag) return;
        if (mine) mine.remove();
    
        OMP.scoreRank(user, mode).then((r) => {
          if (!r || panel.querySelector('.custom-score-rank')) return;
          const item = document.createElement('div');
          item.className = `value-display ${short ? 'value-display--rank' : 'value-display--rank-small'} custom-score-rank`;
          item.dataset.for = tag;
          item.innerHTML = '<div class="value-display__label">Score Ranking</div><div class="value-display__value"></div>';
          const value = item.lastElementChild;
          value.textContent = `#${r.rank.toLocaleString('en-US')}`;
          value.title = OMP.scoreRankTip(r);
          panel.append(item);
        });
      }
      const schedule = () => { if (!queued) { queued = true; queueMicrotask(decorate); } };
      new MutationObserver(schedule).observe(document.documentElement, { childList: true, subtree: true });
      OMP.onSettings(schedule);
      schedule();
    })();

    /* ---- lazerboard.js ---- */
    // Lazerboard stats on profiles.
    (() => {
      'use strict';
    
      const API = 'https://lazerboard.melguy.com';
      const MODES = { osu: 0, taiko: 1, fruits: 2, mania: 3 };
      const cache = new Map();
      const num = (n) => Number(n).toLocaleString('en-US');
    
      function post(url, body) {
        return new Promise((resolve) => {
          const json = JSON.stringify(body);
          if (typeof GM_xmlhttpRequest === 'function') {
            try {
              GM_xmlhttpRequest({
                url, method: 'POST', data: json, headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, timeout: 20000,
                onload: (r) => resolve(r.status >= 200 && r.status < 300 ? r.responseText : null),
                onerror: () => resolve(null), ontimeout: () => resolve(null),
              });
              return;
            } catch { /* fall back to a plain request */ }
          }
          fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: json }).then((r) => (r.ok ? r.text() : null)).then(resolve).catch(() => resolve(null));
        });
      }
    
      OMP.lazerboard = (userId, mode) => {
        const key = `${userId}:${mode}`;
        if (!cache.has(key)) {
          cache.set(key, post(`${API}/api/Users/${encodeURIComponent(userId)}/stats`, { modes: [mode] }).then((text) => {
            try {
              const d = JSON.parse(text);
              const ranks = (d.rankDistribution || []).filter((r) => r.count > 0);
              if (!ranks.length) return null;
              return { ranks, history: d.history || [], stars: d.starsDistribution || [] };
            } catch { return null; }
          }));
          cache.get(key).then((r) => { if (!r) cache.delete(key); });
        }
        return cache.get(key);
      };
    
      OMP.siteUserId = () => {
        const seg = (location.pathname.match(/^\/users\/([^/]+)/) || [])[1];
        if (/^\d+$/.test(seg || '')) return seg;
        for (const el of document.querySelectorAll('[data-initial-data]')) {
          try { const d = JSON.parse(el.dataset.initialData); if (d && d.user && d.user.id) return String(d.user.id); } catch { /* not the profile data */ }
        }
        return null;
      };
    
      const label = (bound) => (bound === 1 ? '#1' : `Top ${num(bound)}`);
    
      OMP.lbHtml = (data, userId) => {
        const rows = `<div class="omp-lb-tiles">${data.ranks.map((r) => `
          <div class="omp-lb-tile" title="${num(r.count)} scores in the top ${num(r.rankBound)} of their map">
            <span>${label(r.rankBound)}</span><b>${num(r.count)}</b>
          </div>`).join('')}</div>`;
    
        let spark = '';
        const h = data.history;
        if (h.length > 1) {
          const max = Math.max(...h.map((p) => p.monthlyCount), 1);
          const W = 300, H = 34, pad = 3;
          const line = h.map((p, i) => `${((i / (h.length - 1)) * W).toFixed(1)},${(H - pad - (p.monthlyCount / max) * (H - pad * 2)).toFixed(1)}`).join(' ');
          const from = new Date(h[0].month).getFullYear();
          spark = `<div title="Scores on leaderboards over time, from ${from}: ${num(h[h.length - 1].monthlyCount)} now"><div class="omp-lb-spark"><svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="none" aria-hidden="true"><polyline points="${line}"/></svg></div><div class="omp-lb-foot"><span>${from}</span><span>now</span></div></div>`;
        }
    
        let stars = '';
        const s = data.stars.filter((x) => x.srBracket >= 1);
        if (s.length) {
          const smax = Math.max(...s.map((x) => x.count), 1);
          const lo = s[0].srBracket, hi = s[s.length - 1].srBracket;
          stars = `<div><div class="omp-lb-stars">${s.map((x) => `<i style="height:${Math.max(4, Math.sqrt(x.count / smax) * 100).toFixed(0)}%" title="${x.srBracket}-${x.srBracket + 1}★: ${num(x.count)}"></i>`).join('')}</div><div class="omp-lb-foot"><span>${lo}★</span><span>${hi}★+</span></div></div>`;
        }
        const source = userId ? `<a class="omp-lb-src" href="https://lazerboard.melguy.com/users/${encodeURIComponent(userId)}" target="_blank" rel="noopener" title="Info from Lazerboard: open this player on Lazerboard"><span class="omp-lb-src-t">Info from Lazerboard</span> <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><path d="M15 3h6v6"/><path d="M10 14 21 3"/></svg></a>` : '';
        return `<div class="omp-lb">${rows}${spark || stars ? `<div class="omp-lb-charts">${spark}${stars}</div>` : ''}${source}</div>`;
      };
    
      const SIDE_MIN = 230;
      function place() {
        const box = document.querySelector('.omp-site-lb');
        const bar = document.querySelector('.profile-detail-bar');
        const column = document.querySelector('.profile-detail') || bar;
        const anchor = document.querySelector('.profile-info__details') || column;
        if (!box || !column || !bar || !anchor) return;
        const gutter = Math.floor(column.getBoundingClientRect().left);
        if (gutter >= SIDE_MIN && OMP.settings().lbSide) {
          if (box.parentElement !== document.body) document.body.append(box);
          box.classList.add('omp-side');
          box.style.left = '16px';
          box.style.width = `${Math.min(300, gutter - 32)}px`;
          box.style.top = `${Math.round(anchor.getBoundingClientRect().top + window.scrollY)}px`;
        } else {
          if (box.parentElement !== bar.parentElement || box.nextElementSibling !== bar) bar.before(box);
          box.classList.remove('omp-side');
          box.style.left = box.style.width = box.style.top = '';
        }
      }
      window.addEventListener('resize', place);
    
      let queued = false;
      function decorate() {
        queued = false;
        if (!OMP.settings().lazerboard) { document.querySelectorAll('.omp-site-lb').forEach((e) => e.remove()); return; }
        const bar = document.querySelector('.profile-detail-bar');
        const active = document.querySelector('.game-mode-link--active');
        if (!bar || !active || !/^\/users\//.test(location.pathname)) return;
        const mode = MODES[active.getAttribute('data-mode')];
        const user = OMP.siteUserId();
        if (!user || mode === undefined) return;
        const tag = `${user}:${mode}`;
        const mine = document.querySelector('.omp-site-lb');
        if (mine && mine.dataset.for === tag) { place(); return; }
        if (mine) mine.remove();
        OMP.lazerboard(user, mode).then((data) => {
          if (!data || document.querySelector('.omp-site-lb')) return;
          const box = document.createElement('div');
          box.className = 'omp-site-lb';
          box.dataset.for = tag;
          box.innerHTML = `<h3>Leaderboards</h3>${OMP.lbHtml(data, user)}`;
          bar.before(box);
          place();
        });
      }
      const schedule = () => { if (!queued) { queued = true; queueMicrotask(decorate); } };
      new MutationObserver(schedule).observe(document.documentElement, { childList: true, subtree: true });
      OMP.onSettings(schedule);
      schedule();
    })();

    /* ---- playart.js ---- */
    // Beatmap cover on profile score cards.
    (() => {
      'use strict';
    
      let queued = false;
    
      function decorate() {
        queued = false;
        document.querySelectorAll('.play-detail:not([data-omp-art])').forEach((card) => {
          const id = ((card.querySelector('.play-detail__title') || {}).href || '').match(/beatmapsets\/(\d+)/)?.[1];
          if (!id) return;
          card.dataset.ompArt = id;
          card.style.setProperty('--omp-art', `url("https://assets.ppy.sh/beatmaps/${id}/covers/cover.jpg")`);
        });
      }
    
      const schedule = () => { if (!queued) { queued = true; queueMicrotask(decorate); } };
      new MutationObserver(schedule).observe(document.documentElement, { childList: true, subtree: true });
      schedule();
    })();

    /* ---- beatmapsite.js ---- */
    // Beatmap page: map background, background button, slim downloads, copy buttons.
    (() => {
      'use strict';
    
      const html = document.documentElement;
      const BEATMAPSET = /^\/beatmapsets\/(\d+)\/?$/;
      let queued = false;
      let header = null;
      let info = null;
    
      const sizer = new ResizeObserver(() => sizeBackground());
      function sizeBackground() {
        if (!header || !info) return;
        const h = `${Math.round(info.getBoundingClientRect().height)}px`;
        if (header.style.getPropertyValue('--omp-info-h') !== h) header.style.setProperty('--omp-info-h', h);
      }
    
      function clearBackground() {
        sizer.disconnect();
        if (header) {
          header.removeAttribute('data-omp-bg');
          header.style.removeProperty('--omp-bg');
          header.style.removeProperty('--omp-info-h');
        }
        header = info = null;
      }
    
      function background(id, on) {
        const h = on ? document.querySelector('.beatmapset-header') : null;
        const i = h && h.nextElementSibling;
        if (!h || !i || !i.classList.contains('beatmapset-info')) { clearBackground(); return; }
        if (h !== header || i !== info) {
          clearBackground();
          header = h;
          info = i;
          sizer.observe(info);
        }
        if (header.dataset.ompBg !== id) {
          header.style.setProperty('--omp-bg', `url("https://assets.ppy.sh/beatmaps/${id}/covers/fullsize.jpg")`);
          header.dataset.ompBg = id;
        }
        sizeBackground();
      }
    
      function bgButton(id, on) {
        const buttons = document.querySelector('.beatmapset-header__buttons');
        const old = document.querySelector('.omp-bg-link');
        const href = `https://assets.ppy.sh/beatmaps/${id}/covers/fullsize.jpg`;
        if (!on || !buttons) { if (old) old.remove(); return; }
        if (old && old.parentElement === buttons && old.href === href) return;
        if (old) old.remove();
        const a = document.createElement('a');
        a.className = 'btn-osu-big btn-osu-big--beatmapset-header-square omp-bg-link';
        a.href = href;
        a.target = '_blank';
        a.rel = 'noopener';
        a.title = 'View the full-size background';
        a.innerHTML = '<span class="btn-osu-big__content"><span class="btn-osu-big__icon"><span class="fa fa-fw"><span class="fas fa-image"></span></span></span></span>';
        buttons.append(a);
      }
    
      const setData = (id) => {
        try {
          const j = JSON.parse(document.getElementById('json-beatmapset').textContent);
          return String(j.id) === id ? j : null;
        } catch { return null; }
      };
      const plain = (markup) => {
        const t = document.createElement('template');
        t.innerHTML = markup || '';
        t.content.querySelectorAll('br').forEach((b) => b.replaceWith('\n'));
        t.content.querySelectorAll('p, li, div').forEach((n) => n.append('\n'));
        return t.content.textContent.replace(/\n{3,}/g, '\n\n').trim();
      };
      function copyText(text, what) {
        const done = () => OMP.toast(`Copied the ${what}`);
        const fallback = () => {
          const ta = document.createElement('textarea');
          ta.value = text;
          ta.style.cssText = 'position:fixed;opacity:0';
          document.body.append(ta);
          ta.select();
          try { document.execCommand('copy'); done(); } catch { OMP.toast('Could not copy'); }
          ta.remove();
        };
        if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(done, fallback); else fallback();
      }
      const COPY_ICON = '<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h8"/></svg>';
    
      function infoButton(id, on) {
        const buttons = document.querySelector('.beatmapset-header__buttons');
        const old = document.querySelector('.omp-copy');
        if (!on || !buttons) { if (old) old.remove(); return; }
        if (old && old.parentElement === buttons && old.dataset.set === id) return;
        if (old) old.remove();
        const a = document.createElement('a');
        a.className = 'btn-osu-big btn-osu-big--beatmapset-header-square omp-copy';
        a.dataset.set = id;
        a.href = '#';
        a.title = 'Copy the map info';
        a.innerHTML = '<span class="btn-osu-big__content"><span class="btn-osu-big__icon"><span class="fa fa-fw"><span class="fas fa-copy"></span></span></span></span>';
        a.addEventListener('click', (e) => {
          e.preventDefault();
          const bs = setData(id);
          if (!bs) return;
          const hash = location.hash.match(/#(\w+)\/(\d+)/);
          const bm = hash && (bs.beatmaps || []).find((b) => String(b.id) === hash[2]);
          copyText(`${bs.artist} - ${bs.title}${bm ? ` [${bm.version}]` : ''}
    mapped by ${bs.creator}
    https://osu.ppy.sh/beatmapsets/${bs.id}${hash ? hash[0] : ''}`, 'map info');
        });
        buttons.append(a);
      }
    
      function descButton(id, on) {
        const head = [...document.querySelectorAll('h3.beatmapset-info__header')].find((h) => /^description$/i.test(h.firstChild && h.firstChild.nodeType === 3 ? h.firstChild.textContent.trim() : h.textContent.replace(/\s+/g, ' ').trim()));
        document.querySelectorAll('.omp-copy-desc').forEach((b) => { if (!on || !head || b.parentElement !== head || b.dataset.set !== id) b.remove(); });
        if (!on || !head || head.querySelector('.omp-copy-desc')) return;
        const b = document.createElement('button');
        b.type = 'button';
        b.className = 'omp-copy-desc';
        b.dataset.set = id;
        b.title = 'Copy the description';
        b.setAttribute('aria-label', 'Copy the description');
        b.innerHTML = COPY_ICON;
        b.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          const bs = setData(id);
          if (bs) copyText(plain(bs.description && bs.description.description) || 'No description', 'description');
        });
        head.append(b);
      }
    
      function downloads(on) {
        html.classList.toggle('omp-compact-dl', on);
        const links = [...document.querySelectorAll('.beatmapset-header__buttons a.btn-osu-big')]
          .filter((a) => /\/beatmapsets\/\d+\/download/.test(a.getAttribute('href') || ''));
        const hasNoVideo = links.some((a) => a.href.includes('noVideo=1'));
        links.forEach((a) => {
          const withVideo = hasNoVideo && !a.href.includes('noVideo=1');
          a.classList.toggle('omp-dl-video', withVideo);
          a.classList.toggle('omp-dl', !withVideo);
        });
      }
    
      function decorate() {
        queued = false;
        const id = (location.pathname.match(BEATMAPSET) || [])[1];
        const c = OMP.settings();
        const active = !!id;
        background(id, active && c.bgPass);
        infoButton(id, active && c.copyInfo);
        descButton(id, active && c.copyDesc);
        bgButton(id, active && c.bgButton);
        if (active) downloads(c.compactDl); else html.classList.remove('omp-compact-dl');
      }
    
      const schedule = () => { if (!queued) { queued = true; queueMicrotask(() => { try { decorate(); } catch (e) { console.error('[osu! minimal]', e); } }); } };
      new MutationObserver(schedule).observe(html, { childList: true, subtree: true });
      OMP.onSettings(schedule);
      schedule();
    })();

    /* ---- score.js ---- */
    // Score page: results layout, buttons, score image.
    (() => {
      'use strict';
    
      const { esc, num, fmtDate, gradeLabel, starColour, HITS } = OMP;
      const SCORE = /^\/scores\/(?:(?:osu|taiko|fruits|mania)\/)?(\d+)\/?$/;
      const MODES = ['osu', 'taiko', 'fruits', 'mania'];
      const GRADE_COLOURS = { X: '#f5c542', XH: '#d5dde3', S: '#f0a030', SH: '#b9c4cc', A: '#7fd24a', B: '#4aa8e0', C: '#a86bd8', D: '#f06060', F: '#f06060' };
      const JUDGE = { perfect: 'perfect', great: 'great', good: 'good', ok: 'ok', meh: 'meh', miss: 'miss', large_tick_hit: 'ok', small_tick_hit: 'meh' };
      const JUDGE_COLOURS = { perfect: '#9ad7ff', great: '#47b4eb', good: '#5fd68a', ok: '#99eb47', meh: '#ffd966', miss: '#ff6666' };
      const EXTRA = { slider_tail_hit: 'Slider ends', large_tick_hit: 'Slider ticks', small_tick_hit: 'Droplets', large_bonus: 'Big spinner bonus', small_bonus: 'Spinner bonus' };
    
      function read() {
        const el = document.getElementById('json-show');
        if (!el) return null;
        try {
          const score = JSON.parse(el.textContent);
          const want = (location.pathname.match(SCORE) || [])[1];
          if (!score || !score.beatmap || !score.beatmapset || !want) return null;
          if (String(score.id) !== want && String(score.legacy_score_id) !== want) return null;
          return score;
        } catch { return null; }
      }
    
      function facts(s) {
        const mode = MODES[s.ruleset_id] || 'osu';
        const keys = HITS[mode] || HITS.osu;
        const st = s.statistics || {};
        const hits = keys.map(([label, key]) => ({ label, key, value: st[key] || 0, judge: JUDGE[key] || 'ok' }));
        const max = s.maximum_statistics || {};
        const extras = Object.entries(max)
          .filter(([k, v]) => v > 0 && EXTRA[k] && !keys.some(([, key]) => key === k))
          .map(([k, v]) => ({ label: EXTRA[k], value: st[k] || 0, max: v }));
        return {
          mode, hits, extras,
          mods: (s.mods || []).map((m) => m.acronym).filter((m) => m !== 'CL'),
          acc: `${(s.accuracy * 100).toFixed(2)}%`,
          score: s.total_score ?? s.classic_total_score,
          pp: s.pp != null ? Math.round(s.pp) : null,
          when: s.ended_at ? fmtDate(s.ended_at) : '',
        };
      }
    
      const SIZE = { w: 1280, h: 720 };
    
      function rounded(ctx, x, y, w, h, r) {
        ctx.beginPath();
        ctx.roundRect(x, y, w, h, r);
      }
    
      function cover(ctx, img, x, y, w, h) {
        const k = Math.max(w / img.width, h / img.height);
        ctx.drawImage(img, x + (w - img.width * k) / 2, y + (h - img.height * k) / 2, img.width * k, img.height * k);
      }
    
      function fitText(ctx, text, maxW) {
        if (ctx.measureText(text).width <= maxW) return text;
        let t = text;
        while (t.length > 1 && ctx.measureText(`${t}…`).width > maxW) t = t.slice(0, -1);
        return `${t}…`;
      }
    
      async function loadImage(url) {
        const blob = await OMP.blob(url);
        if (!blob) return null;
        try { return await createImageBitmap(blob); } catch { return null; }
      }
    
      async function makeImage(s, f) {
        const bs = s.beatmapset, bm = s.beatmap, u = s.user || {};
        const [art, avatar] = await Promise.all([loadImage(bs.covers['cover@2x'] || bs.covers.cover), loadImage(u.avatar_url)]);
        const canvas = document.createElement('canvas');
        canvas.width = SIZE.w;
        canvas.height = SIZE.h;
        const ctx = canvas.getContext('2d');
        const font = (size, weight = 400) => { ctx.font = `${weight} ${size}px "Segoe UI", system-ui, sans-serif`; };
        const PAD = 56;
    
        ctx.fillStyle = '#0e0e10';
        ctx.fillRect(0, 0, SIZE.w, SIZE.h);
        if (art) { ctx.save(); ctx.filter = 'brightness(.42)'; cover(ctx, art, 0, 0, SIZE.w, SIZE.h); ctx.restore(); }
        ctx.fillStyle = 'rgba(8, 8, 10, .45)';
        ctx.fillRect(0, 0, SIZE.w, SIZE.h);
    
        ctx.textBaseline = 'alphabetic';
        ctx.fillStyle = '#e8e8ea';
        font(46, 700);
        ctx.fillText(fitText(ctx, bs.title, SIZE.w - PAD * 2), PAD, 92);
        ctx.fillStyle = '#b4b4ba';
        font(28, 400);
        ctx.fillText(fitText(ctx, bs.artist, SIZE.w - PAD * 2), PAD, 134);
        ctx.fillStyle = '#e8e8ea';
        font(28, 600);
        const diff = `${bm.version}`;
        ctx.fillText(fitText(ctx, diff, 620), PAD, 182);
        const dw = ctx.measureText(diff).width;
        ctx.fillStyle = starColour(bm.difficulty_rating);
        ctx.beginPath(); ctx.arc(PAD + dw + 26, 172, 8, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#e8e8ea';
        font(24, 600);
        ctx.fillText(`${bm.difficulty_rating.toFixed(2)}★`, PAD + dw + 42, 181);
        ctx.fillStyle = '#9a9aa2';
        font(22, 400);
        ctx.fillText(`mapped by ${bs.creator}`, PAD, 214);
    
        const avSize = 96, avY = 262;
        if (avatar) {
          ctx.save(); rounded(ctx, PAD, avY, avSize, avSize, 14); ctx.clip(); cover(ctx, avatar, PAD, avY, avSize, avSize); ctx.restore();
        } else {
          ctx.fillStyle = '#222226'; rounded(ctx, PAD, avY, avSize, avSize, 14); ctx.fill();
        }
        ctx.fillStyle = '#e8e8ea';
        font(40, 700);
        ctx.fillText(fitText(ctx, u.username || '', 420), PAD + avSize + 22, avY + 46);
        ctx.fillStyle = '#9a9aa2';
        font(22, 400);
        ctx.fillText([u.country_code, f.when && `played ${f.when}`].filter(Boolean).join('  ·  '), PAD + avSize + 22, avY + 82);
    
        const rx = SIZE.w - PAD;
        ctx.textAlign = 'right';
        ctx.fillStyle = GRADE_COLOURS[s.rank] || '#e8e8ea';
        font(200, 700);
        ctx.fillText(gradeLabel(s.rank), rx, 330);
        ctx.fillStyle = '#e8e8ea';
        font(84, 600);
        ctx.fillText(num(f.score), rx, 430);
        ctx.textAlign = 'left';
    
        if (f.mods.length) {
          font(26, 700);
          let x = PAD;
          const y = 410;
          for (const m of f.mods) {
            const w = ctx.measureText(m).width + 28;
            ctx.fillStyle = 'rgba(0, 0, 0, .6)'; rounded(ctx, x, y - 32, w, 44, 10); ctx.fill();
            ctx.fillStyle = '#e8e8ea'; ctx.fillText(m, x + 14, y);
            x += w + 10;
          }
        }
    
        const head = [
          { label: 'Accuracy', value: f.acc },
          { label: 'Combo', value: `${num(s.max_combo)}x` },
          { label: 'Performance', value: f.pp != null ? `${num(f.pp)}pp` : '-' },
        ];
        const hits = f.hits.map((h) => ({ label: h.label, value: num(h.value), colour: JUDGE_COLOURS[h.judge] || '#e8e8ea' }));
        const px = PAD, pw = SIZE.w - PAD * 2, py = 478, ph = 196;
        ctx.fillStyle = 'rgba(6, 6, 8, .74)'; rounded(ctx, px, py, pw, ph, 22); ctx.fill();
        ctx.strokeStyle = 'rgba(255, 255, 255, .08)'; ctx.lineWidth = 1.5; rounded(ctx, px + .75, py + .75, pw - 1.5, ph - 1.5, 22); ctx.stroke();
    
        const row = (items, top, h, valueSize, labelSize) => {
          const cw = pw / items.length;
          items.forEach((t, i) => {
            const cx = px + cw * i + cw / 2;
            ctx.textAlign = 'center';
            ctx.fillStyle = '#9a9aa2'; font(labelSize, 600);
            const label = t.label.toUpperCase();
            ctx.fillText(label, cx, top + h * 0.34);
            ctx.fillStyle = t.colour || '#f2f2f4';
            let size = valueSize;
            font(size, 700);
            while (ctx.measureText(t.value).width > cw - 28 && size > 20) { size -= 2; font(size, 700); }
            ctx.fillText(t.value, cx, top + h * 0.84);
            if (i) { ctx.fillStyle = 'rgba(255, 255, 255, .09)'; ctx.fillRect(px + cw * i - .5, top + h * 0.16, 1, h * 0.68); }
          });
          ctx.textAlign = 'left';
        };
        ctx.textBaseline = 'alphabetic';
        row(head, py + 6, 100, 50, 19);
        ctx.fillStyle = 'rgba(255, 255, 255, .09)'; ctx.fillRect(px + 28, py + 104, pw - 56, 1);
        row(hits, py + 102, 90, 44, 18);
    
        ctx.fillStyle = 'rgba(255, 255, 255, .35)';
        font(16, 400);
        ctx.fillText(`osu.ppy.sh/scores/${s.id}`, PAD, SIZE.h - 16);
        return canvas;
      }
    
      async function saveImage(s, f, button) {
        const label = button.textContent;
        button.disabled = true;
        button.textContent = 'Saving…';
        try {
          const canvas = await makeImage(s, f);
          const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/png'));
          if (!blob) throw new Error('could not encode the image');
          const a = document.createElement('a');
          a.href = URL.createObjectURL(blob);
          a.download = `${s.user.username} - ${s.beatmapset.title} [${s.beatmap.version}].png`.replace(/[\\/:*?"<>|]/g, '_');
          document.body.append(a);
          a.click();
          a.remove();
          setTimeout(() => URL.revokeObjectURL(a.href), 10000);
          OMP.toast('Saved the score image');
        } catch (e) {
          console.error('[osu! minimal] score image', e);
          OMP.toast('Could not save the image');
        } finally {
          button.disabled = false;
          button.textContent = label;
        }
      }
    
      const RANK_CLASS = { SS: 'X', X: 'X', S: 'S', A: 'A', B: 'B', C: 'C', D: 'D' };
      const SILVER_MODS = '.score-player__mods .mod__icon--HD, .score-player__mods .mod__icon--FL, .score-player__mods .mod__icon--FI';
    
      function useHighRes(art) {
        const key = art.className;
        if (art.dataset.hires === key) return;
        art.style.backgroundImage = '';
        const urls = [...getComputedStyle(art).backgroundImage.matchAll(/url\("?([^")]+)"?\)/g)].map((m) => m[1]);
        const hi = urls.find((u) => u.includes('@2x')) || urls[urls.length - 1];
        if (!hi) return;
        art.style.backgroundImage = `url("${hi}")`;
        art.dataset.hires = key;
      }
    
      function grade() {
        const dial = document.querySelector('.score-info__item--dial');
        const letter = dial && dial.querySelector('.score-dial__layer--grade span');
        if (!dial || !letter) return;
        const base = RANK_CLASS[letter.textContent.trim()];
        if (!base) return;
        const silver = (base === 'X' || base === 'S') && document.querySelector(SILVER_MODS);
        const cls = `legacy-rank--${base}${silver ? 'H' : ''}`;
        let art = dial.querySelector('.legacy-rank');
        if (!art) { art = document.createElement('div'); art.dataset.omp = '1'; dial.append(art); }
        if (art.dataset.grade !== cls) { art.className = `legacy-rank ${cls}`; art.dataset.grade = cls; }
        useHighRes(art);
      }
    
      function playedLine() {
        const bar = document.querySelector('.score-beatmap');
        const player = document.querySelector('.score-player__row--player');
        if (!bar || !player) return;
        const info = {};
        const cells = [...player.children];
        for (let i = 0; i + 1 < cells.length; i += 2) info[cells[i].textContent.trim()] = cells[i + 1].textContent.trim();
        if (!info['Played by']) return;
        const parts = [`Played by ${info['Played by']}`];
        if (info['Submitted on']) parts[0] += ` on ${info['Submitted on']}`;
        if (info['Played on']) parts.push(info['Played on']);
        const text = parts.join(' \u00b7 ');
        let line = bar.querySelector('.score-beatmap__played');
        if (!line) { line = document.createElement('div'); line.className = 'score-beatmap__played'; bar.append(line); }
        if (line.textContent !== text) line.textContent = text;
      }
    
      function tagStats() {
        document.querySelectorAll('.score-stats__stat').forEach((tile) => {
          const label = tile.querySelector('.score-stats__stat-row--label');
          const kind = label && label.textContent.trim().toLowerCase();
          if (kind && tile.dataset.kind !== kind) tile.dataset.kind = kind;
        });
      }
    
      function removeLayoutBits() {
        document.querySelectorAll('.score-beatmap__played, .legacy-rank[data-omp]').forEach((e) => e.remove());
      }
    
      async function saveImage(s, button) {
        const f = facts(s);
        button.disabled = true;
        try {
          const canvas = await makeImage(s, f);
          const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/png'));
          if (!blob) throw new Error('could not encode the image');
          const a = document.createElement('a');
          a.href = URL.createObjectURL(blob);
          a.download = `${s.user.username} - ${s.beatmapset.title} [${s.beatmap.version}].png`.replace(/[\\/:*?"<>|]/g, '_');
          document.body.append(a);
          a.click();
          a.remove();
          setTimeout(() => URL.revokeObjectURL(a.href), 10000);
          OMP.toast('Saved the score image');
        } catch (e) {
          console.error('[osu! minimal] score image', e);
          OMP.toast('Could not save the image');
        } finally {
          button.disabled = false;
        }
      }
    
      const ICONS = {
        down: '<svg viewBox="0 0 24 24"><path d="M12 3v12M7 10l5 5 5-5M4 20h16"/></svg>',
        link: '<svg viewBox="0 0 24 24"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>',
        image: '<svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="1.6"/><path d="M21 16l-5-5-8 9"/></svg>',
      };
    
      function copyLink(s) {
        const url = `${location.origin}/scores/${s.id}`;
        const done = () => OMP.toast('Copied the score link');
        const fallback = () => {
          const ta = document.createElement('textarea');
          ta.value = url;
          ta.style.cssText = 'position:fixed;opacity:0';
          document.body.append(ta);
          ta.select();
          try { document.execCommand('copy'); done(); } catch { OMP.toast('Could not copy'); }
          ta.remove();
        };
        if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(url).then(done, fallback); else fallback();
      }
    
      function buttons(on) {
        const box = document.querySelector('.score-buttons');
        const old = document.getElementById('omp-actions');
        if (!on || !box) {
          if (old) old.remove();
          document.querySelectorAll('.omp-orig').forEach((e) => e.classList.remove('omp-orig'));
          return;
        }
        const orig = [...box.children].find((b) => b.id !== 'omp-actions' && b.matches && b.matches('.btn-osu-big') && /replay/i.test(b.textContent));
        if (orig) orig.classList.add('omp-orig');
        const sig = orig ? 'r' : '-';
        if (old && old.parentElement === box && old.dataset.sig === sig) return;
        if (old) old.remove();
        const row = document.createElement('div');
        row.id = 'omp-actions';
        row.dataset.sig = sig;
        const btn = (act, icon, title) => `<button type="button" class="omp-act" data-act="${act}" title="${title}" aria-label="${title}">${icon}</button>`;
        row.innerHTML = `${orig ? btn('replay', ICONS.down, 'Download replay') : ''}${btn('link', ICONS.link, 'Copy score link')}${btn('image', ICONS.image, 'Save as image')}`;
        row.addEventListener('click', (e) => {
          const b = e.target.closest('[data-act]');
          if (!b) return;
          const s = read();
          if (b.dataset.act === 'replay') { if (orig) orig.click(); } else if (s && b.dataset.act === 'link') copyLink(s); else if (s && b.dataset.act === 'image') saveImage(s, b);
        });
        box.prepend(row);
      }
    
      let queued = false;
      function decorate() {
        queued = false;
        const c = OMP.settings();
        if (!SCORE.test(location.pathname) || !document.querySelector('.score-info')) { const old = document.getElementById('omp-actions'); if (old) old.remove(); return; }
        if (c.scoreLayout) { grade(); playedLine(); tagStats(); } else removeLayoutBits();
        buttons(c.scoreImage);
      }
      const schedule = () => { if (!queued) { queued = true; queueMicrotask(() => { try { decorate(); } catch (e) { console.error('[osu! minimal]', e); } }); } };
      new MutationObserver(schedule).observe(document.documentElement, { childList: true, subtree: true });
      OMP.onSettings(schedule);
      schedule();
    })();

    /* ---- extras.js ---- */
    // pp decimals, play time in hours, online status colour, and the modding Total tab.
    (() => {
      'use strict';
    
      function pp(on) {
        document.querySelectorAll('.pp-value[title]').forEach((el) => {
          const node = [...el.childNodes].find((n) => n.nodeType === 3);
          if (!node) return;
          if (el.dataset.ompPp === undefined) el.dataset.ompPp = node.textContent;
          const exact = Number(el.title.replace(/,/g, ''));
          const want = on && Number.isFinite(exact) ? exact.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : el.dataset.ompPp;
          if (node.textContent !== want) node.textContent = want;
        });
      }
    
      const DAYS = /^\s*\d+d \d+h \d+m\s*$/;
      function playTime(on) {
        document.querySelectorAll('span[data-omp-days], span[title$=" hours"], span[data-orig-title$=" hours"]').forEach((el) => {
          const hours = el.dataset.ompHours || el.getAttribute('title') || el.getAttribute('data-orig-title');
          if (!el.dataset.ompDays) {
            if (!DAYS.test(el.textContent) || !on) return;
            el.dataset.ompDays = el.textContent.trim();
            el.dataset.ompHours = hours;
          }
          const [show, tip] = on ? [el.dataset.ompHours, el.dataset.ompDays] : [el.dataset.ompDays, el.dataset.ompHours];
          if (el.textContent !== show) el.textContent = show;
          if (el.hasAttribute('title')) el.setAttribute('title', tip);
          if (el.hasAttribute('data-orig-title')) el.setAttribute('data-orig-title', tip);
        });
      }
    
      // online status on profiles: green while online, red when it says offline, "last seen" stays as it is
      function status(on) {
        document.querySelectorAll('.profile-links__item').forEach((e) => {
          const t = e.textContent;
          const v = !on ? '' : /offline/i.test(t) ? 'offline' : /online/i.test(t) ? 'online' : '';
          if (v) e.dataset.ompStatus = v; else delete e.dataset.ompStatus;
        });
      }
    
      let totalFor = null;
      let pickedPraise = null;
      document.addEventListener('click', (e) => {
        if (e.target.closest && e.target.closest('.counter-box--praises')) pickedPraise = location.pathname.split('/')[2] || '';
      }, true);
    
      function total() {
        const m = location.pathname.match(/^\/beatmapsets\/(\d+)\/discussion/);
        if (!m) { totalFor = null; return; }
        if (totalFor === m[1] || pickedPraise === m[1]) return;
        const praise = document.querySelector('.counter-box--praises.js-active');
        const all = document.querySelector('.counter-box--total');
        if (!praise || !all) return;
        totalFor = m[1];
        all.click();
      }
    
      let queued = false;
      function decorate() {
        queued = false;
        const c = OMP.settings();
        pp(!!c.ppDecimals);
        playTime(!!c.playHours);
        status(!!c.statusColour);
        if (c.modTotal) total();
      }
      const schedule = () => { if (!queued) { queued = true; queueMicrotask(() => { try { decorate(); } catch (e) { console.error('[osu! minimal]', e); } }); } };
      new MutationObserver(schedule).observe(document.documentElement, { childList: true, subtree: true });
      OMP.onSettings(schedule);
      schedule();
    })();

    /* ---- accountsearch.js ---- */
    // Search box on the account settings page.
    (() => {
      'use strict';
    
      const PAGE = /^\/home\/account\/edit\/?$/;
      const norm = (t) => String(t || '').toLowerCase().replace(/\s+/g, ' ').trim();
      let box = null;
      let query = '';
    
      function haystack(el) {
        let t = el.textContent || '';
        el.querySelectorAll('input, textarea, select, button, [title], [aria-label]').forEach((c) => {
          t += ` ${c.getAttribute('placeholder') || ''} ${c.getAttribute('title') || ''} ${c.getAttribute('aria-label') || ''}`;
          if (c.tagName === 'SELECT') t += ` ${[...c.options].map((o) => o.textContent).join(' ')}`;
        });
        return norm(t);
      }
    
      function apply() {
        const page = document.querySelector('.osu-page--account-edit');
        if (!page) return;
        const q = norm(query);
        const sections = [...page.querySelectorAll('.account-edit')];
        let shown = 0;
        for (const sec of sections) {
          const entries = [...sec.querySelectorAll('.account-edit-entry')];
          const groups = [...sec.querySelectorAll('.account-edit__input-group')];
          const title = norm((sec.querySelector('.account-edit__section-title') || {}).textContent);
          sec.hidden = false;
          entries.forEach((e) => { e.hidden = false; });
          groups.forEach((g) => { g.hidden = false; });
          if (!q) { shown++; continue; }
          const whole = title.includes(q);
          let any = false;
          entries.forEach((e) => {
            const hit = whole || haystack(e).includes(q);
            e.hidden = !hit;
            if (hit) any = true;
          });
          groups.forEach((g) => { g.hidden = !whole && ![...g.querySelectorAll('.account-edit-entry')].some((e) => !e.hidden) && !haystack(g).includes(q); if (!g.hidden) any = true; });
          if (!entries.length && !groups.length && haystack(sec).includes(q)) any = true;
          sec.hidden = !(whole || any);
          if (!sec.hidden) shown++;
        }
        const none = box && box.querySelector('.omp-acc-none');
        if (none) none.hidden = !(q && !shown);
      }
    
      function build(page) {
        box = document.createElement('div');
        box.className = 'omp-acc-search';
        box.innerHTML = `<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/></svg>
          <input type="search" placeholder="Search settings   ( / )" aria-label="Search settings" autocomplete="off" spellcheck="false">
          <span class="omp-acc-none" hidden>No settings match</span>`;
        const input = box.querySelector('input');
        input.value = query;
        input.addEventListener('input', () => { query = input.value; apply(); });
        input.addEventListener('keydown', (e) => {
          if (e.key === 'Escape') { input.value = query = ''; apply(); input.blur(); }
          e.stopPropagation();
        });
        page.prepend(box);
      }
    
      document.addEventListener('keydown', (e) => {
        if (e.key !== '/' || e.ctrlKey || e.metaKey || e.altKey || !box || !box.isConnected) return;
        const t = e.target;
        if (t && (t.isContentEditable || /^(input|textarea|select)$/i.test(t.tagName))) return;
        e.preventDefault();
        box.querySelector('input').focus();
      });
    
      let queued = false;
      function decorate() {
        queued = false;
        const page = PAGE.test(location.pathname) && OMP.settings().accountSearch ? document.querySelector('.osu-page--account-edit') : null;
        if (!page) {
          if (box) { box.remove(); box = null; }
          document.querySelectorAll('.account-edit, .account-edit-entry, .account-edit__input-group').forEach((e) => { e.hidden = false; });
          return;
        }
        if (!box || !box.isConnected || box.parentElement !== page) { if (box) box.remove(); build(page); }
        if (query) apply();
      }
      const schedule = () => { if (!queued) { queued = true; setTimeout(decorate, 120); } };
      new MutationObserver((records) => { if (records.some((r) => !(box && box.contains(r.target)))) schedule(); }).observe(document.documentElement, { childList: true, subtree: true });
      OMP.onSettings(schedule);
      schedule();
    })();

    /* ---- modicons.js ---- */
    // Mod icons: letters, or plain glyphs from the repo's mods/ folder.
    (() => {
      'use strict';
    
      const BASE = 'https://raw.githubusercontent.com/slep34263657/osu-maid/main/mods/';
      const FILES = {
        EZ: 'easy', NF: 'no-fail', HT: 'half-time', DC: 'daycore', HR: 'hard-rock', SD: 'sudden-death', PF: 'perfect',
        DT: 'double-time', NC: 'nightcore', HD: 'hidden', FL: 'flashlight', BL: 'blinds', ST: 'strict-tracking',
        AC: 'accuracy-challenge', TP: 'target-practice', DA: 'difficulty-adjust', CL: 'classic', RD: 'random', MR: 'mirror',
        AL: 'alternate', SG: 'single-tap', AT: 'autoplay', CN: 'cinema', RX: 'relax', AP: 'autopilot', SO: 'spun-out',
        TR: 'transform', WG: 'wiggle', SI: 'spin-in', GR: 'grow', DF: 'deflate', WU: 'wind-up', WD: 'wind-down',
        TC: 'traceable', BR: 'barrel-roll', AD: 'approach-different', MG: 'magnetised', RP: 'repel', BU: 'bubbles',
        SY: 'synesthesia', DP: 'depth', BM: 'bloom', NS: 'no-scope', MU: 'muted', MF: 'moving-fast', FR: 'freeze-frame',
        AS: 'adaptive-speed', CS: 'constant-speed', SR: 'simplified-rhythm', TD: 'touch-device', SV2: 'score-v2',
        FF: 'floating-fruits', HO: 'hold-off', NR: 'no-release', IN: 'invert', DS: 'dual-stages', CO: 'cover', SW: 'swap',
        NM: 'no-mod', '1K': 'one-key', '2K': 'two-keys', '3K': 'three-keys', '4K': 'four-keys', '5K': 'five-keys',
        '6K': 'six-keys', '7K': 'seven-keys', '8K': 'eight-keys', '9K': 'nine-keys', '10K': 'ten-keys',
      };
      const urls = new Map();
      const pending = new Set();
      const sheet = document.createElement('style');
      sheet.id = 'omp-modicons';
      document.documentElement.append(sheet);
      let rules = '';
      let queued = false;
    
      function load(acr) {
        if (urls.has(acr) || pending.has(acr) || !FILES[acr]) return;
        pending.add(acr);
        OMP.blob(`${BASE}mod-${FILES[acr]}.png`).then((blob) => {
          pending.delete(acr);
          if (!blob) return;
          urls.set(acr, URL.createObjectURL(blob));
          rules += `html.omp-modplain .mod__icon[data-acronym="${acr}"]::after{-webkit-mask:url(${urls.get(acr)}) center/contain no-repeat;mask:url(${urls.get(acr)}) center/contain no-repeat}\n`;
          sheet.textContent = rules;
        });
      }
    
      function decorate() {
        queued = false;
        if (OMP.settings().modIcons !== 'plain') return;
        document.querySelectorAll('.mod__icon[data-acronym]').forEach((e) => load(e.dataset.acronym));
      }
      const schedule = () => { if (!queued) { queued = true; queueMicrotask(decorate); } };
      new MutationObserver(schedule).observe(document.documentElement, { childList: true, subtree: true });
      OMP.onSettings(schedule);
      schedule();
    })();

    /* ---- medals.js ---- */
    // Medals: hide unachieved, Osekai link.
    (() => {
      'use strict';
    
      const html = document.documentElement;
      const MEDALS = '[data-page-id="medals"]';
      let queued = false;
    
      function place(toggle, header) {
        const handle = header.querySelector('.sortable-handle');
        if (!handle) return;
        const box = header.getBoundingClientRect();
        const rect = handle.getBoundingClientRect();
        if (!rect.width) return;
        toggle.style.top = `${rect.top - box.top + rect.height / 2}px`;
        toggle.style.right = `${box.right - rect.left + 14}px`;
      }
    
      const LINK_ICON = '<svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>';
      function popups(on) {
        document.querySelectorAll('.tooltip-achievement').forEach((tip) => {
          const old = tip.querySelector('.omp-osekai');
          const name = ((tip.querySelector('.tooltip-achievement__name') || {}).textContent || '').trim();
          if (!on || !name) { if (old) old.remove(); return; }
          const href = `https://inex.osekai.net/medals/${encodeURIComponent(name)}`;
          if (old && old.getAttribute('href') === href) return;
          if (old) old.remove();
          const a = document.createElement('a');
          a.className = 'omp-osekai';
          a.href = href;
          a.target = '_blank';
          a.rel = 'noopener';
          a.title = 'Open this medal on Osekai';
          a.innerHTML = `${LINK_ICON}<span>Osekai</span>`;
          tip.append(a);
        });
      }
    
      function decorate() {
        queued = false;
        popups(OMP.settings().enabled && OMP.settings().medalLink);
        const on = !!OMP.settings().hideLocked;
        html.toggleAttribute('data-omp-hide-locked', on);
        const header = document.querySelector(`${MEDALS} .page-extra > .u-relative`);
        const mine = document.querySelector('.omp-medal-switch');
        if (!OMP.settings().enabled || !header) { if (mine) mine.remove(); return; }
        if (mine && mine.parentElement === header) { mine.setAttribute('aria-checked', String(on)); return; }
        if (mine) mine.remove();
        const toggle = document.createElement('button');
        toggle.type = 'button';
        toggle.className = 'omp-medal-switch';
        toggle.title = 'Hide unachieved medals';
        toggle.setAttribute('role', 'switch');
        toggle.setAttribute('aria-checked', String(on));
        toggle.addEventListener('click', () => OMP.set({ hideLocked: toggle.getAttribute('aria-checked') !== 'true' }));
        header.append(toggle);
        place(toggle, header);
        requestAnimationFrame(() => place(toggle, header));
      }
    
      const schedule = () => { if (!queued) { queued = true; queueMicrotask(() => { try { decorate(); } catch (e) { console.error('[osu! maid]', e); } }); } };
      new MutationObserver(schedule).observe(html, { childList: true, subtree: true });
      window.addEventListener('resize', () => document.querySelectorAll('.omp-medal-switch').forEach((t) => place(t, t.parentElement)));
      OMP.onSettings(schedule);
      schedule();
    })();

    /* ---- dt.js ---- */
    // DT everywhere (experimental): BPM, length, AR, OD and star rating shown as with DT.
    (() => {
      'use strict';
    
      OMP.DT_BASE = 'https://raw.githubusercontent.com/slep34263657/osu-maid/main/dt-stars/';
      const chunks = new Map();
      const stars = new Map();
      const setMaps = new Map();
      OMP.onSearch((list) => list.forEach((s) => { if (s.maps) setMaps.set(s.id, s.maps); }));
      let queued = false;
    
      function load(id) {
        const n = Math.floor(id / 1000);
        if (chunks.has(n)) return;
        chunks.set(n, true);
        OMP.text(`${OMP.DT_BASE}${n}.json`).then((text) => {
          try { Object.entries(JSON.parse(text)).forEach(([k, v]) => stars.set(k, v[0])); } catch { /* no data for this range */ }
          schedule();
        });
      }
    
      const num1 = (v) => String(Math.round(v * 10) / 10);
      const mmss = (s) => `${Math.floor(s / 60)}:${String(Math.round(s % 60)).padStart(2, '0')}`;
      const arDT = (ar) => {
        const ms = (ar > 5 ? 1200 - (750 * (ar - 5)) / 5 : 1200 + (600 * (5 - ar)) / 5) / 1.5;
        return ms > 1200 ? 5 - ((ms - 1200) * 5) / 600 : 5 + ((1200 - ms) * 5) / 750;
      };
      const odDT = (od) => (80 - (80 - 6 * od) / 1.5) / 6;
    
      function current() {
        if (!/^\/beatmapsets\/\d+\/?$/.test(location.pathname)) return null;
        try {
          const set = JSON.parse(document.getElementById('json-beatmapset').textContent);
          const h = location.hash.match(/#\w+\/(\d+)/);
          if (String(set.id) !== location.pathname.match(/\d+/)[0] || !h) return null;
          return (set.beatmaps || []).find((b) => String(b.id) === h[1]) || null;
        } catch { return null; }
      }
    
      // show `text` in `el` while DT is on, and put the site's own text back when it is off
      function swap(el, text, on, attr) {
        if (!el) return;
        const get = () => (attr ? el.getAttribute(attr) : el.textContent);
        const put = (v) => { if (get() !== v) { if (attr) el.setAttribute(attr, v); else el.textContent = v; } };
        const k = attr ? 'ompTitle' : 'ompText';
        const shown = el.dataset[`${k}Shown`];
        if (shown !== undefined && get() !== shown) delete el.dataset[`${k}Orig`];
        if (on) {
          if (el.dataset[`${k}Orig`] === undefined) el.dataset[`${k}Orig`] = get();
          el.dataset[`${k}Shown`] = text;
          put(text);
        } else if (el.dataset[`${k}Orig`] !== undefined) {
          if (get() === shown) put(el.dataset[`${k}Orig`]);
          delete el.dataset[`${k}Orig`];
          delete el.dataset[`${k}Shown`];
        }
      }
    
      // set a colour variable (and the text colour) on `el` while DT is on, restore its own style when off
      function tint(el, rating, on, varName, text) {
        if (!el) return;
        const style = () => el.getAttribute('style') || '';
        if (el.dataset.ompStyleShown !== undefined && style() !== el.dataset.ompStyleShown) delete el.dataset.ompStyle;
        if (on && rating != null) {
          if (el.dataset.ompStyle === undefined) el.dataset.ompStyle = style();
          el.style.setProperty(varName, OMP.starColour(rating));
          if (text) el.style.color = OMP.starText(rating);
          el.dataset.ompStyleShown = style();
        } else if (el.dataset.ompStyle !== undefined) {
          if (style() === el.dataset.ompStyleShown) { if (el.dataset.ompStyle) el.setAttribute('style', el.dataset.ompStyle); else el.removeAttribute('style'); }
          delete el.dataset.ompStyle;
          delete el.dataset.ompStyleShown;
        }
      }
    
      function fill(el, value, on) {
        const f = el && el.querySelector('.bar__fill');
        if (!f) return;
        if (on) {
          if (f.dataset.ompW === undefined) f.dataset.ompW = f.style.width;
          f.style.width = `${Math.min(100, Math.max(0, value * 10))}%`;
        } else if (f.dataset.ompW !== undefined) { f.style.width = f.dataset.ompW; delete f.dataset.ompW; }
      }
    
      function restoreAll() {
        document.querySelectorAll('[data-omp-text-orig]').forEach((e) => swap(e, '', false));
        document.querySelectorAll('[data-omp-title-orig]').forEach((e) => swap(e, '', false, 'title'));
        document.querySelectorAll('[data-omp-style]').forEach((e) => tint(e, null, false));
        document.querySelectorAll('[data-omp-w]').forEach((e) => fill(e.parentElement, 0, false));
      }
    
      function decorate() {
        queued = false;
        const on = OMP.rate() !== 1;
        decorateListing(on);
        const b = current();
        if (!b) { if (!on) restoreAll(); return; }
        const std = b.mode === 'osu';
        if (on && std) load(b.id);
        const dtStars = stars.get(String(b.id));
        const haveStars = on && dtStars !== undefined;
    
        const root = document.querySelector('.beatmapset-stats');
        if (root) {
          root.querySelectorAll('.beatmap-basic-stats__entry').forEach((e) => {
            const t = e.dataset.ompTitleOrig || e.getAttribute('title') || '';
            if (/^Length/.test(t)) {
              swap(e.querySelector('span'), mmss(b.total_length / 1.5), on);
              swap(e, `Length (Drain length: ${mmss(b.hit_length / 1.5)})`, on, 'title');
            } else if (t === 'BPM') swap(e.querySelector('span'), String(Math.round(b.bpm * 1.5)), on);
          });
          root.querySelectorAll('.beatmap-stats-table tr').forEach((r) => {
            const label = (r.querySelector('th') || {}).textContent;
            const value = r.querySelector('.beatmap-stats-table__value');
            const bar = r.querySelector('.bar');
            if (label === 'Approach Rate' && (std || b.mode === 'fruits')) { const v = arDT(b.ar); swap(value, num1(v), on); fill(bar, v, on); }
            else if (label === 'Accuracy' && std) { const v = odDT(b.accuracy); swap(value, num1(v), on); fill(bar, v, on); }
            else if (label === 'Star Rating' && std) { swap(value, haveStars ? dtStars.toFixed(2) : '', haveStars); fill(bar, haveStars ? dtStars : 0, haveStars); }
          });
        }
        const badge = document.querySelector('.beatmapset-header__diff-name .difficulty-badge__rating');
        if (badge && std) swap(badge, haveStars ? dtStars.toFixed(2) : '', haveStars);
        if (badge && std) tint(badge.closest('.difficulty-badge'), haveStars ? dtStars : null, haveStars, '--bg', true);
        decoratePicker(on);
      }
    
      const idOf = (href) => ((href || '').match(/(\d+)\/?$/) || [])[1];
    
      // the difficulty circles on the beatmap page: ring colour follows the DT rating
      function decoratePicker(on) {
        document.querySelectorAll('.beatmapset-beatmap-picker__beatmap').forEach((a) => {
          const id = idOf(a.getAttribute('href'));
          if (on && id) load(Number(id));
          tint(a.querySelector('.beatmap-icon'), on && stars.has(id) ? stars.get(id) : null, on && stars.has(id), '--diff');
        });
      }
    
      // the difficulty list that opens from a listing card, and the dots on the card
      function decorateListing(on) {
        document.querySelectorAll('.beatmaps-popup-item').forEach((a) => {
          const id = idOf(a.getAttribute('href'));
          if (on && id) load(Number(id));
          const has = on && stars.has(id);
          const rating = a.querySelector('.difficulty-badge__rating');
          swap(rating, has ? stars.get(id).toFixed(2) : '', has);
          tint(a.querySelector('.difficulty-badge'), has ? stars.get(id) : null, has, '--bg', true);
        });
        document.querySelectorAll('.beatmapset-panel').forEach((card) => {
          const id = Number(idOf((card.querySelector('.beatmapset-panel__main-link') || {}).href));
          const maps = setMaps.get(id);
          if (!maps) return;
          const byMode = {};
          [...maps].sort((x, y) => x.r - y.r).forEach((m) => { (byMode[m.mode] = byMode[m.mode] || []).push(m); });
          const modeOf = (icon) => ({ 'osu!': 'osu', 'osu!taiko': 'taiko', 'osu!catch': 'fruits', 'osu!mania': 'mania' }[icon.title]);
          let mode = null;
          let n = 0;
          card.querySelectorAll('.beatmapset-panel__extra-item--dots > *').forEach((el) => {
            if (el.classList.contains('beatmapset-panel__beatmap-icon')) { mode = modeOf(el); n = 0; return; }
            const m = mode && (byMode[mode] || [])[n++];
            if (!m) return;
            if (on && mode === 'osu') load(m.id);
            const has = on && mode === 'osu' && stars.has(String(m.id));
            tint(el, has ? stars.get(String(m.id)) : null, has, '--bg');
          });
        });
      }
    
      const schedule = () => { if (!queued) { queued = true; queueMicrotask(() => { try { decorate(); } catch (e) { console.error('[osu! maid]', e); } }); } };
      new MutationObserver(schedule).observe(document.documentElement, { childList: true, subtree: true });
      window.addEventListener('hashchange', schedule);
      OMP.onSettings(schedule);
      schedule();
    })();

    /* ---- failchart.js ---- */
    // Beatmap page: a clearer fail/quit chart with a pass/fail/quit split and axis labels.
    (() => {
      'use strict';
    
      const num = (n) => Number(n).toLocaleString('en-US');
      const pct = (a, b) => (b ? `${Math.round((a / b) * 100)}%` : '0%');
      let queued = false;
    
      function current() {
        if (!/^\/beatmapsets\/\d+\/?$/.test(location.pathname)) return null;
        try {
          const set = JSON.parse(document.getElementById('json-beatmapset').textContent);
          const h = location.hash.match(/#\w+\/(\d+)/);
          if (String(set.id) !== location.pathname.match(/\d+/)[0] || !h) return null;
          return (set.beatmaps || []).find((b) => String(b.id) === h[1]) || null;
        } catch { return null; }
      }
    
      const sum = (a) => a.reduce((x, y) => x + y, 0);
    
      function build(b) {
        const fail = (b.failtimes && b.failtimes.fail) || [];
        const quit = (b.failtimes && b.failtimes.exit) || [];
        const n = Math.max(fail.length, quit.length, 100);
        const f = Array.from({ length: n }, (_, i) => fail[i] || 0);
        const q = Array.from({ length: n }, (_, i) => quit[i] || 0);
        const totals = f.map((v, i) => v + q[i]);
        const max = Math.max(...totals, 1);
        const sf = sum(f);
        const sq = sum(q);
        const passed = b.passcount || 0;
        const events = passed + sf + sq;
    
        const W = 300, H = 100, top = 4, base = 98, bw = W / n;
        let bars = '';
        for (let i = 0; i < n; i++) {
          const hq = (q[i] / max) * (base - top);
          const hf = (f[i] / max) * (base - top);
          const x = (i * bw).toFixed(2);
          bars += `<g class="omp-fc-col"><rect class="omp-fc-hit" x="${x}" y="0" width="${bw.toFixed(2)}" height="${base}"/>`
            + (hq ? `<rect class="omp-fc-quit" x="${x}" y="${(base - hq).toFixed(2)}" width="${(bw - 0.5).toFixed(2)}" height="${hq.toFixed(2)}"/>` : '')
            + (hf ? `<rect class="omp-fc-fail" x="${x}" y="${(base - hq - hf).toFixed(2)}" width="${(bw - 0.5).toFixed(2)}" height="${hf.toFixed(2)}"/>` : '')
            + '</g>';
        }
        const ticks = '';
    
        return `
          <div class="omp-fc-split">
            <span class="omp-fc-pass" style="flex:${passed}"></span><span class="omp-fc-failbar" style="flex:${sf}"></span><span class="omp-fc-quitbar" style="flex:${sq}"></span>
          </div>
          <div class="omp-fc-legend">
            <span><i class="omp-fc-pass"></i>Passed ${pct(passed, events)}</span>
            <span><i class="omp-fc-failbar"></i>Failed ${pct(sf, events)}</span>
            <span><i class="omp-fc-quitbar"></i>Quit ${pct(sq, events)}</span>
          </div>
          <svg class="omp-fc-svg" viewBox="0 0 ${W} ${H}" preserveAspectRatio="none" role="img" aria-label="Where players fail or quit, by map progress">
            <line class="omp-fc-grid" x1="0" x2="${W}" y1="${top}" y2="${top}"/>
            <line class="omp-fc-grid" x1="0" x2="${W}" y1="${(top + base) / 2}" y2="${(top + base) / 2}"/>
            <line class="omp-fc-axis" x1="0" x2="${W}" y1="${base}" y2="${base}"/>
            ${bars}${ticks}
          </svg>
    `;
      }
    
      function decorate() {
        queued = false;
        const on = OMP.settings().failChart;
        const box = document.querySelector('.beatmap-success-rate');
        const b = current();
        const mine = document.querySelector('.omp-fc');
        if (!on || !box || !b) { if (mine) mine.remove(); document.querySelectorAll('.omp-fc-hidden').forEach((e) => e.classList.remove('omp-fc-hidden')); document.querySelectorAll('.omp-fc-head').forEach((e) => e.classList.remove('omp-fc-head')); return; }
        const orig = box.querySelector('.beatmap-success-rate__chart');
        if (!orig) return;
        orig.classList.add('omp-fc-hidden');
        const heads = box.querySelectorAll('.beatmap-success-rate__header');
        if (heads[1]) heads[1].classList.add('omp-fc-head');
        if (mine && mine.dataset.id === String(b.id) && mine.previousElementSibling === orig) return;
        if (mine) mine.remove();
        const el = document.createElement('div');
        el.className = 'omp-fc';
        el.dataset.id = String(b.id);
        el.innerHTML = build(b);
        orig.after(el);
      }
    
      const schedule = () => { if (!queued) { queued = true; queueMicrotask(() => { try { decorate(); } catch (e) { console.error('[osu! maid]', e); } }); } };
      new MutationObserver(schedule).observe(document.documentElement, { childList: true, subtree: true });
      window.addEventListener('hashchange', schedule);
      OMP.onSettings(schedule);
      schedule();
    })();

    /* ---- listing.js ---- */
    // Beatmap listing: BPM, outlines, other title and artist, remembered mode.
    (() => {
      'use strict';
    
      const html = document.documentElement;
      const isListing = () => /^\/beatmapsets\/?$/.test(location.pathname);
      const sets = new Map();
      let seededFor = null;
      let queued = false;
    
      const cfg = () => OMP.settings();
    
      OMP.onSearch((list) => {
        for (const s of list) sets.set(s.id, s);
        schedule();
      });
    
      function seed() {
        seededFor = location.search;
        fetch(`/beatmapsets/search${location.search}`, { headers: { Accept: 'application/json', 'X-Requested-With': 'XMLHttpRequest' }, credentials: 'same-origin' })
          .then((r) => r.json())
          .then((j) => { OMP.emitSearch((j.beatmapsets || []).map((s) => ({ id: s.id, bpm: s.bpm, title: s.title, original: s.title_unicode, artist: s.artist, artistOriginal: s.artist_unicode, maps: (s.beatmaps || []).map((b) => ({ id: b.id, mode: b.mode, r: b.difficulty_rating })) }))); })
          .catch(() => { /* the cards just stay as they are */ });
      }
    
      const fmtBpm = (b) => (Number.isInteger(b) ? String(b) : b.toFixed(1));
    
      function bpmItem() {
        const item = document.createElement('div');
        item.className = 'beatmapset-panel__stats-item beatmapset-panel__stats-item--bpm omp-bpm';
        const icon = document.createElement('span');
        icon.className = 'beatmapset-panel__stats-item-icon';
        icon.innerHTML = '<i class="fa-fw fas fa-music"></i>';
        item.append(icon, document.createElement('span'));
        return item;
      }
    
      const showsOriginal = () => {
        try { return JSON.parse(localStorage.getItem('userPreferences')).beatmapset_title_show_original === true; } catch { return false; }
      };
    
      function decorateTitle(card, meta, on) {
        const titleRow = card.querySelector('.beatmapset-panel__info-row--title');
        let alt = card.querySelector('.omp-alt-title');
        const main = showsOriginal() ? meta && meta.original : meta && meta.title;
        const other = showsOriginal() ? meta && meta.title : meta && meta.original;
        if (!on || !titleRow || !main || !other || main.trim() === other.trim()) { if (alt) alt.remove(); return; }
        if (!alt || alt.previousElementSibling !== titleRow) {
          if (alt) alt.remove();
          alt = document.createElement('div');
          alt.className = 'omp-alt-title';
          titleRow.after(alt);
        }
        if (alt.textContent !== other) { alt.textContent = other; alt.title = other; }
      }
    
      function decorateArtist(card, meta, on) {
        const row = card.querySelector('.beatmapset-panel__info-row--artist');
        let alt = card.querySelector('.omp-alt-artist');
        const main = showsOriginal() ? meta && (meta.artistOriginal || meta.artist_unicode) : meta && meta.artist;
        const other = showsOriginal() ? meta && meta.artist : meta && (meta.artistOriginal || meta.artist_unicode);
        if (!on || !row || !main || !other || main.trim() === other.trim()) { if (alt) alt.remove(); return; }
        if (!alt || alt.parentElement !== row) {
          if (alt) alt.remove();
          alt = document.createElement('span');
          alt.className = 'omp-alt-artist';
          row.prepend(alt);
          const link = row.querySelector('.beatmapset-panel__main-link');
          if (link) link.after(alt);
        }
        if (alt.textContent !== other) { alt.textContent = other; alt.title = other; }
      }
    
      function decorate() {
        const c = cfg();
        html.classList.toggle('omp-list-outlines', !!c.listOutlines);
        html.classList.toggle('omp-list-titles', !!c.listTitles);
        if (!isListing()) return;
    
        let missing = false;
        document.querySelectorAll('.beatmapset-panel').forEach((card) => {
          const badge = card.querySelector('.beatmapset-status--panel');
          const hsl = badge && getComputedStyle(badge).getPropertyValue('--bg-hsl').trim();
          if (hsl && card.style.getPropertyValue('--omp-status') !== hsl) card.style.setProperty('--omp-status', hsl);
    
          const row = card.querySelector('.beatmapset-panel__info-row--stats');
          const id = Number(((card.querySelector('.beatmapset-panel__main-link') || {}).href || '').match(/beatmapsets\/(\d+)/)?.[1]);
          if (!row || !id) return;
          const meta = sets.get(id);
          decorateTitle(card, meta, !!c.listTitles);
          decorateArtist(card, meta, !!c.listTitles);
    
          let item = row.querySelector('.omp-bpm');
          if (!c.listBpm) { if (item) item.remove(); return; }
          if (!meta || meta.bpm == null) { missing = true; return; }
          if (!item) {
            item = bpmItem();
            row.insertBefore(item, row.querySelector('.beatmapset-panel__stats-item--date'));
          }
          const rate = OMP.rate();
          if (item.dataset.id !== String(id) || item.dataset.rate !== String(rate)) {
            item.dataset.id = String(id);
            item.dataset.rate = String(rate);
            const bpm = rate === 1 ? fmtBpm(meta.bpm) : String(Math.round(meta.bpm * rate));
            item.title = `BPM: ${bpm}${rate === 1 ? '' : ' (DT)'}`;
            item.lastElementChild.textContent = `${bpm} BPM`;
          }
        });
        if (missing && seededFor !== location.search) seed();
      }
    
      function schedule() {
        if (queued) return;
        queued = true;
        queueMicrotask(() => { queued = false; try { decorate(); } catch (e) { console.error('[osu! minimal]', e); } });
      }
    
      const MODE_KEY = 'omp-listing-mode';
      const getMode = () => { try { return localStorage.getItem(MODE_KEY); } catch { return null; } };
      const setMode = (m) => { try { localStorage.setItem(MODE_KEY, m); } catch { /* ignore */ } };
    
      function withSavedMode(url) {
        const mode = getMode();
        if (!cfg().listMode || !mode) return null;
        if (url.pathname.replace(/\/$/, '') !== '/beatmapsets' || url.searchParams.has('m')) return null;
        url.searchParams.set('m', mode);
        return url;
      }
    
      function saveMode() {
        if (!cfg().listMode || !isListing()) return;
        const m = new URLSearchParams(location.search).get('m');
        const now = m === null ? '' : m;
        if (getMode() !== now) setMode(now);
      }
    
      const start = withSavedMode(new URL(location.href));
      if (start) location.replace(start.href);
    
      document.addEventListener('click', (e) => {
        const a = e.target.closest && e.target.closest('a[href]');
        if (!a || a.origin !== location.origin) return;
        const url = withSavedMode(new URL(a.href));
        if (url) a.href = url.href;
      }, true);
    
      let lastUrl = '';
      setInterval(() => {
        if (location.href === lastUrl) return;
        lastUrl = location.href;
        saveMode();
        schedule();
      }, 400);
      window.addEventListener('popstate', () => { saveMode(); schedule(); });
    
      new MutationObserver(schedule).observe(html, { childList: true, subtree: true });
      OMP.onSettings(() => { saveMode(); schedule(); });
      window.addEventListener('storage', (e) => { if (e.key === null || e.key === 'userPreferences') schedule(); });
      if (isListing()) seed();
    })();

    /* ---- main.js ---- */
    // Entry point.
    OMP.start();

  };

  if (document.documentElement) start();
  else new MutationObserver((records, observer) => { if (document.documentElement) { observer.disconnect(); start(); } }).observe(document, { childList: true });
})();
