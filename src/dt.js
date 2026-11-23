// DT everywhere (experimental): BPM, length, AR, OD and star rating shown as with DT.
(() => {
  'use strict';

  OMP.DT_BASE = 'https://raw.githubusercontent.com/slep34263657/osu-maid/main/dt-stars/';
  const chunks = new Map();
  const stars = new Map();
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
    document.querySelectorAll('[data-omp-w]').forEach((e) => fill(e.parentElement, 0, false));
  }

  function decorate() {
    queued = false;
    const on = OMP.rate() !== 1;
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
  }

  const schedule = () => { if (!queued) { queued = true; queueMicrotask(() => { try { decorate(); } catch (e) { console.error('[osu! maid]', e); } }); } };
  new MutationObserver(schedule).observe(document.documentElement, { childList: true, subtree: true });
  window.addEventListener('hashchange', schedule);
  OMP.onSettings(schedule);
  schedule();
})();
