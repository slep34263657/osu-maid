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
