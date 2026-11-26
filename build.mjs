import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));
const read = (name) => fs.readFileSync(path.join(root, 'src', name), 'utf8');

const VERSION = '1.10.9';
const NAME = 'osu! maid';
const OUT = 'osu-maid.user.js';
const MASCOT = `data:image/png;base64,${fs.readFileSync(path.join(root, 'mascot.png')).toString('base64')}`;
const ICON = `data:image/png;base64,${fs.readFileSync(path.join(root, 'icon.png')).toString('base64')}`;

const MODULES = ['config.js', 'core.js', 'hook.js', 'assets.js', 'scorerank.js', 'lazerboard.js', 'playart.js', 'beatmapsite.js', 'score.js', 'extras.js', 'accountsearch.js', 'modicons.js', 'medals.js', 'modview.js', 'failchart.js', 'searchin.js', 'listing.js', 'main.js'];

const header = `// ==UserScript==
// @name         ${NAME}
// @icon         ${ICON}
// @namespace    osu-web-minimal
// @version      ${VERSION}
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
// @connect      cdn.jsdelivr.net
// @connect      a.ppy.sh
// @connect      score.respektive.pw
// @connect      lazerboard.melguy.com
// ==/UserScript==
`;

const body = MODULES.map((name) => `/* ---- ${name} ---- */\n${read(name).trim()}\n`).join('\n');

const out = `${header}
(function () {
  'use strict';

  const start = () => {
    const style = document.createElement('style');
    style.id = 'omp-css';
    style.textContent = ${JSON.stringify(read('content.css').replaceAll('__OMP_ICON__', ICON).replaceAll('__OMP_MASCOT__', MASCOT))};
    (document.head || document.documentElement).append(style);

${body.split('\n').map((l) => (l ? `    ${l}` : l)).join('\n')}
  };

  if (document.documentElement) start();
  else new MutationObserver((records, observer) => { if (document.documentElement) { observer.disconnect(); start(); } }).observe(document, { childList: true });
})();
`;

fs.writeFileSync(path.join(root, OUT), out);
console.log(`${OUT}  ${(out.length / 1024).toFixed(0)} KB  (v${VERSION})`);
