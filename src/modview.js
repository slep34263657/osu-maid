// Mod view (experimental): a beatmap's stats, star rating and SS pp as with a chosen mod combo.
(() => {
  'use strict';

  const SOURCES = ['https://cdn.jsdelivr.net/gh/slep34263657/osu-maid@main/', 'https://raw.githubusercontent.com/slep34263657/osu-maid/main/'];
  OMP.modSources = SOURCES;
  const DEFAULT_COMBOS = ['DT', 'HT', 'HR', 'EZ', 'DTHR', 'HDDT', 'HD', 'HDHR', 'HDDTHR', 'EZHD', 'EZDT', 'EZHDDT'];
  const CACHE = 'omp-mod-data';
  const TTL = 12 * 3600 * 1000;

  let combos = DEFAULT_COMBOS;
  OMP.modCombos = combos;
  const stars = new Map();
  const pp = new Map();
  const asked = new Set();
  const loaded = new Set();
  const setMaps = new Map();
  OMP.onSearch((list) => list.forEach((s) => { if (s.maps) setMaps.set(s.id, s.maps); }));
  let queued = false;

  // ---- data: jsDelivr first, GitHub as the backup, every chunk kept in the browser cache ----
  async function cached(path) {
    let cache = null;
    try { cache = await caches.open(CACHE); } catch { /* no cache storage */ }
    const key = `https://omp.invalid/${path}`;
    if (cache) {
      try {
        const hit = await cache.match(key);
        if (hit && Date.now() - Number(hit.headers.get('x-omp-time')) < TTL) return await hit.text();
      } catch { /* fall through to the network */ }
    }
    for (const base of OMP.modSources) {
      const text = await OMP.text(base + path);
      if (text) {
        if (cache) { try { await cache.put(key, new Response(text, { headers: { 'x-omp-time': String(Date.now()) } })); } catch { /* full */ } }
        return text;
      }
    }
    return null;
  }

  // the data's own description: if it changed since last time, the cached chunks are dropped
  let metaP = null;
  function meta() {
    if (!metaP) {
      metaP = (async () => {
        let text = null;
        for (const base of OMP.modSources) { text = await OMP.text(`${base}mod-stars/meta.json`); if (text) break; }
        try {
          const m = JSON.parse(text);
          if (Array.isArray(m.combos) && m.combos.length) { combos = m.combos; OMP.modCombos = combos; }
          const sig = `${m.version}|${m.maps_covered}|${m.built}`;
          if (localStorage.getItem('omp-mod-sig') !== sig) { try { await caches.delete(CACHE); } catch { /* none */ } localStorage.setItem('omp-mod-sig', sig); }
        } catch { /* keep the built-in list */ }
        schedule();
      })();
    }
    return metaP;
  }

  function load(kind, id) {
    const n = Math.floor(id / 1000);
    const key = `${kind}${n}`;
    if (asked.has(key)) return;
    asked.add(key);
    const target = kind === 's' ? stars : pp;
    meta().then(() => cached(`mod-${kind === 's' ? 'stars' : 'pp'}/${n}.json`)).then((text) => {
      try { Object.entries(JSON.parse(text)).forEach(([k, v]) => target.set(k, v)); } catch { /* no data for this range */ }
      loaded.add(key);
      schedule();
    });
  }

  // ---- the numbers ----
  const num1 = (v) => String(Math.round(v * 10) / 10);
  const mmss = (s) => `${Math.floor(s / 60)}:${String(Math.round(s % 60)).padStart(2, '0')}`;
  const arAt = (ar, rate) => {
    const ms = (ar > 5 ? 1200 - 150 * (ar - 5) : 1800 - 120 * ar) / rate;
    return ms > 1200 ? (1800 - ms) / 120 : 5 + (1200 - ms) / 150;
  };
  const odAt = (od, rate) => (80 - (80 - 6 * od) / rate) / 6;

  function view(b, combo) {
    const rate = /DT/.test(combo) ? 1.5 : /HT/.test(combo) ? 0.75 : 1;
    const std = b.mode === 'osu';
    let { cs, drain, ar, accuracy: od } = b;
    if (std && /HR/.test(combo)) { cs = Math.min(10, cs * 1.3); ar = Math.min(10, ar * 1.4); od = Math.min(10, od * 1.4); drain = Math.min(10, drain * 1.4); }
    if (std && /EZ/.test(combo)) { cs *= 0.5; ar *= 0.5; od *= 0.5; drain *= 0.5; }
    return { rate, std, cs, drain, ar: std || b.mode === 'fruits' ? arAt(ar, rate) : null, od: std ? odAt(od, rate) : null };
  }

  function current() {
    if (!/^\/beatmapsets\/\d+\/?$/.test(location.pathname)) return null;
    try {
      const set = JSON.parse(document.getElementById('json-beatmapset').textContent);
      const h = location.hash.match(/#\w+\/(\d+)/);
      if (String(set.id) !== location.pathname.match(/\d+/)[0] || !h) return null;
      return (set.beatmaps || []).find((b) => String(b.id) === h[1]) || null;
    } catch { return null; }
  }

  // the difficulty under the pointer in the picker (null when it is the selected one)
  let hoverId = null;
  let selNow = '';
  function hovered(sel) {
    if (!sel || !hoverId || !OMP.settings().hoverStats || String(sel.id) === hoverId) return null;
    try {
      const set = JSON.parse(document.getElementById('json-beatmapset').textContent);
      return (set.beatmaps || []).find((x) => String(x.id) === hoverId) || null;
    } catch { return null; }
  }
  OMP.viewMap = () => { const sel = current(); return hovered(sel) || sel; };

  // ---- put values in and take them out again ----
  function swap(el, text, on, attr) {
    if (!el) return;
    const get = () => (attr ? el.getAttribute(attr) : el.textContent);
    const put = (v) => {
      if (get() === v) return;
      if (attr) { el.setAttribute(attr, v); return; }
      const tn = [...el.childNodes].find((n) => n.nodeType === 3); // the site's own text node, so its next update still lands
      if (tn) tn.data = v; else el.textContent = v;
    };
    const k = attr ? 'ompTitle' : 'ompText';
    const shown = el.dataset[`${k}Shown`];
    if (shown !== undefined && get() !== shown) delete el.dataset[`${k}Orig`];
    if (on) {
      if (el.dataset[`${k}Orig`] === undefined) { el.dataset[`${k}Orig`] = get(); el.dataset[`${k}Sel`] = selNow; }
      el.dataset[`${k}Shown`] = text;
      put(text);
    } else if (el.dataset[`${k}Orig`] !== undefined) {
      if (get() === shown && el.dataset[`${k}Sel`] === selNow) put(el.dataset[`${k}Orig`]); // another difficulty got selected meanwhile: the site's text is already the right one
      delete el.dataset[`${k}Orig`];
      delete el.dataset[`${k}Shown`];
      delete el.dataset[`${k}Sel`];
    }
  }

  function tint(el, rating, on, varName, text) {
    if (!el) return;
    const style = () => el.getAttribute('style') || '';
    if (el.dataset.ompStyleShown !== undefined && style() !== el.dataset.ompStyleShown) delete el.dataset.ompStyle;
    if (on && rating != null) {
      if (el.dataset.ompStyle === undefined) { el.dataset.ompStyle = style(); el.dataset.ompStyleSel = selNow; }
      el.style.setProperty(varName, OMP.starColour(rating));
      if (text) el.style.color = OMP.starText(rating);
      el.dataset.ompStyleShown = style();
    } else if (el.dataset.ompStyle !== undefined) {
      if (style() === el.dataset.ompStyleShown && el.dataset.ompStyleSel === selNow) { if (el.dataset.ompStyle) el.setAttribute('style', el.dataset.ompStyle); else el.removeAttribute('style'); }
      delete el.dataset.ompStyle;
      delete el.dataset.ompStyleShown;
      delete el.dataset.ompStyleSel;
    }
  }

  // a custom property on `el` (the site writes the success bar this way), put back only if nobody changed it meanwhile
  function setVar(el, name, value, on) {
    if (!el) return;
    if (on) {
      if (el.dataset.ompVar === undefined) { el.dataset.ompVar = el.style.getPropertyValue(name); el.dataset.ompVarSel = selNow; }
      el.style.setProperty(name, value);
      el.dataset.ompVarShown = el.style.getPropertyValue(name);
    } else if (el.dataset.ompVar !== undefined) {
      if (el.style.getPropertyValue(name) === el.dataset.ompVarShown && el.dataset.ompVarSel === selNow) { if (el.dataset.ompVar) el.style.setProperty(name, el.dataset.ompVar); else el.style.removeProperty(name); }
      delete el.dataset.ompVar;
      delete el.dataset.ompVarShown;
      delete el.dataset.ompVarSel;
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
    document.querySelectorAll('[data-omp-var]').forEach((e) => setVar(e, '--fill', '', false));
    document.querySelectorAll('.omp-sr-alt').forEach((e) => e.remove());
    document.querySelectorAll('.omp-hide').forEach((e) => e.classList.remove('omp-hide'));
    document.querySelectorAll('[data-omp-text-orig]').forEach((e) => swap(e, '', false));
    document.querySelectorAll('[data-omp-title-orig]').forEach((e) => swap(e, '', false, 'title'));
    document.querySelectorAll('[data-omp-style]').forEach((e) => tint(e, null, false));
    document.querySelectorAll('[data-omp-w]').forEach((e) => fill(e.parentElement, 0, false));
    document.querySelectorAll('.omp-pp-row').forEach((e) => e.remove());
  }

  const idOf = (href) => ((href || '').match(/(\d+)\/?$/) || [])[1];
  const starsOf = (id, i) => { const r = stars.get(String(id)); return r && i >= 0 && typeof r[i] === 'number' ? r[i] : undefined; };

  function decorate() {
    queued = false;
    const combo = OMP.combo();
    const on = combo !== '';
    const i = combos.indexOf(combo);
    if (on) meta();
    decorateListing(on, i);
    const sel = current();
    selNow = sel ? String(sel.id) : '';
    const hov = hovered(sel);
    const b = hov || sel;
    const preview = !!hov;
    const active = on || preview;
    if (!b) { if (!active) restoreAll(); return; }
    const v = view(b, on ? combo : '');
    if (on && v.std) { load('s', b.id); load('p', b.id); }
    const st = on ? starsOf(b.id, i) : (preview ? b.difficulty_rating : undefined);
    const have = st !== undefined;
    const pr = pp.get(String(b.id));
    const ppv = on && v.std && pr && i >= 0 && typeof pr[i] === 'number' ? pr[i] : undefined;
    const raw = { cs: b.cs, drain: b.drain, ar: b.ar, od: b.accuracy };
    const pick = (k) => (on && v.std ? v[k] : on && b.mode === 'fruits' && k === 'ar' ? v.ar : raw[k]);
    const count = (n) => Number(n || 0).toLocaleString('en-US');

    const root = document.querySelector('.beatmapset-stats');
    if (root) {
      root.querySelectorAll('.beatmap-basic-stats__entry').forEach((e) => {
        const t = e.dataset.ompTitleOrig || e.getAttribute('title') || '';
        if (/^Length/.test(t)) {
          swap(e.querySelector('span'), mmss(b.total_length / v.rate), active);
          swap(e, `Length (Drain length: ${mmss(b.hit_length / v.rate)})`, active, 'title');
        } else if (t === 'BPM') swap(e.querySelector('span'), String(Math.round(b.bpm * v.rate)), active);
        else if (t === 'Circle Count') swap(e.querySelector('span'), count(b.count_circles), preview);
        else if (t === 'Slider Count') swap(e.querySelector('span'), count(b.count_sliders), preview);
      });
      let starRow = null;
      root.querySelectorAll('.beatmap-stats-table tr:not(.omp-pp-row)').forEach((r) => {
        const label = (r.querySelector('th') || {}).textContent;
        const value = r.querySelector('.beatmap-stats-table__value');
        const bar = r.querySelector('.bar');
        const set = (x) => { if (x != null) { swap(value, num1(x), active); if (!/Key/.test(label)) fill(bar, x, active); } };
        if (label === 'Circle Size' || label === 'Key Count') set(pick('cs'));
        else if (label === 'HP Drain') set(pick('drain'));
        else if (label === 'Accuracy') set(pick('od'));
        else if (label === 'Approach Rate') set(pick('ar'));
        else if (label === 'Star Rating') { starRow = r; swap(value, have ? st.toFixed(2) : '', have); fill(bar, have ? st : 0, have); }
      });
      // the SS pp line, right under the star rating; it is there before the number arrives, so nothing moves when it does
      let row = root.querySelector('.omp-pp-row');
      if (!on || !v.std || !starRow) { if (row) row.remove(); } else {
        if (!row || row.previousElementSibling !== starRow) {
          if (row) row.remove();
          row = document.createElement('tr');
          row.className = 'omp-pp-row';
          row.innerHTML = '<td colspan="3"></td>';
          starRow.after(row);
        }
        const cell = row.firstElementChild;
        const text = ppv === undefined ? 'SS: –' : `SS: ${ppv.toLocaleString('en-US', { minimumFractionDigits: 1, maximumFractionDigits: 1 })}pp`;
        if (cell.textContent !== text) cell.textContent = text;
        cell.classList.toggle('omp-pending', ppv === undefined);
      }
    }
    // success rate follows the difficulty under the pointer
    const sr = document.querySelector('.beatmap-success-rate');
    if (sr) {
      const play = b.playcount || 0;
      const pass = b.passcount || 0;
      // the site's text is several text nodes, so it is hidden and replaced instead of edited
      const cnt = sr.querySelector('.beatmap-success-rate__count-text');
      let alt = sr.querySelector('.omp-sr-alt');
      if (preview && play > 0 && cnt) {
        if (!alt) { alt = document.createElement('div'); alt.className = 'beatmap-success-rate__count-text omp-sr-alt'; cnt.after(alt); }
        const msg = `${(pass / play * 100).toFixed(1)}% (${count(pass)} of ${count(play)} plays)`;
        if (alt.textContent !== msg) alt.textContent = msg;
        cnt.classList.add('omp-hide');
      } else {
        if (alt) alt.remove();
        if (cnt) cnt.classList.remove('omp-hide');
      }
      setVar(sr.querySelector('.bar--beatmap-success-rate'), '--fill', `${play ? pass / play * 100 : 0}%`, preview && play > 0);
    }
    // the header badge always shows the selected difficulty
    const badge = document.querySelector('.beatmapset-header__diff-name .difficulty-badge__rating');
    if (badge && sel) {
      const vs = view(sel, on ? combo : '');
      const stSel = on ? starsOf(sel.id, i) : undefined;
      const haveSel = vs.std && stSel !== undefined;
      swap(badge, haveSel ? stSel.toFixed(2) : '', haveSel);
      tint(badge.closest('.difficulty-badge'), haveSel ? stSel : null, haveSel, '--bg', true);
    }
    decoratePicker(on, i);
  }

  function decoratePicker(on, i) {
    document.querySelectorAll('.beatmapset-beatmap-picker__beatmap').forEach((a) => {
      const id = idOf(a.getAttribute('href'));
      if (on && id) load('s', Number(id));
      const st = id ? starsOf(id, i) : undefined;
      tint(a.querySelector('.beatmap-icon'), on && st !== undefined ? st : null, on && st !== undefined, '--diff');
    });
  }

  function decorateListing(on, i) {
    document.querySelectorAll('.beatmaps-popup-item').forEach((a) => {
      const id = idOf(a.getAttribute('href'));
      if (on && id) load('s', Number(id));
      const st = id ? starsOf(id, i) : undefined;
      const has = on && st !== undefined;
      swap(a.querySelector('.difficulty-badge__rating'), has ? st.toFixed(2) : '', has);
      tint(a.querySelector('.difficulty-badge'), has ? st : null, has, '--bg', true);
    });
    document.querySelectorAll('.beatmapset-panel').forEach((card) => {
      const id = Number(idOf((card.querySelector('.beatmapset-panel__main-link') || {}).href));
      const maps = setMaps.get(id);
      if (!maps) return;
      const byMode = {};
      [...maps].sort((x, y) => x.r - y.r).forEach((m) => { (byMode[m.mode] = byMode[m.mode] || []).push(m); });
      const modeOf = (icon) => ({ 'osu!': 'osu', 'osu!taiko': 'taiko', 'osu!catch': 'fruits', 'osu!mania': 'mania' }[icon.title]);
      const dots = card.querySelector('.beatmapset-panel__extra-item--dots');
      const std = byMode.osu || [];
      const missing = on && dots && std.length && std.every((m) => loaded.has(`s${Math.floor(m.id / 1000)}`)) && std.some((m) => !stars.has(String(m.id)));
      let note = dots && dots.querySelector('.omp-new');
      if (!missing) { if (note) note.remove(); } else if (!note) {
        note = document.createElement('span');
        note.className = 'omp-new';
        note.title = 'Not in the mod database yet. New maps are added about once a day.';
        note.innerHTML = '<svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>';
        dots.append(note);
      }
      let mode = null;
      let n = 0;
      card.querySelectorAll('.beatmapset-panel__extra-item--dots > *').forEach((el) => {
        if (el.classList.contains('omp-new')) return;
        if (el.classList.contains('beatmapset-panel__beatmap-icon')) { mode = modeOf(el); n = 0; return; }
        const m = mode && (byMode[mode] || [])[n++];
        if (!m) return;
        if (on && mode === 'osu') load('s', m.id);
        const st = mode === 'osu' ? starsOf(m.id, i) : undefined;
        tint(el, on && st !== undefined ? st : null, on && st !== undefined, '--bg');
      });
    });
  }

  const schedule = () => { if (!queued) { queued = true; queueMicrotask(() => { try { decorate(); } catch (e) { console.error('[osu! maid]', e); } }); } };
  new MutationObserver(schedule).observe(document.documentElement, { childList: true, subtree: true });
  window.addEventListener('hashchange', () => { hoverId = null; OMP.emitHover(); schedule(); });
  const hoverAt = (id) => { if (id !== hoverId) { hoverId = id; OMP.emitHover(); schedule(); } };
  document.addEventListener('mouseover', (e) => {
    const a = e.target.closest && e.target.closest('.beatmapset-beatmap-picker__beatmap');
    hoverAt(a ? idOf(a.getAttribute('href')) : null);
  });
  document.documentElement.addEventListener('mouseleave', () => hoverAt(null));
  OMP.onSettings(schedule);
  schedule();
})();
