// Beatmap listing: BPM, length, outlines, other title and artist, remembered mode.
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
      .then((j) => { OMP.emitSearch((j.beatmapsets || []).map((s) => ({ id: s.id, bpm: s.bpm, length: Math.max(0, ...(s.beatmaps || []).map((b) => b.total_length || 0)), title: s.title, original: s.title_unicode, artist: s.artist, artistOriginal: s.artist_unicode, maps: (s.beatmaps || []).map((b) => ({ id: b.id, mode: b.mode, r: b.difficulty_rating })) }))); })
      .catch(() => { /* the cards just stay as they are */ });
  }

  const fmtBpm = (b) => (Number.isInteger(b) ? String(b) : b.toFixed(1));

  const fmtLength = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

  // one extra entry in a card's stats row; no value takes it out again
  function putStat(row, kind, iconClass, value, title) {
    let item = row.querySelector(`.omp-${kind}`);
    if (!value) { if (item) item.remove(); return; }
    if (!item) {
      item = document.createElement('div');
      item.className = `beatmapset-panel__stats-item beatmapset-panel__stats-item--${kind} omp-${kind}`;
      const icon = document.createElement('span');
      icon.className = 'beatmapset-panel__stats-item-icon';
      icon.innerHTML = `<i class="fa-fw ${iconClass}"></i>`;
      item.append(icon, document.createElement('span'));
      row.insertBefore(item, row.querySelector('.beatmapset-panel__stats-item--date'));
    }
    const key = `${value}|${title}`;
    if (item.dataset.key === key) return;
    item.dataset.key = key;
    item.title = title;
    item.lastElementChild.textContent = value;
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

  // the thumbnail shows the whole background; the site's own square crop stays underneath in case it is missing
  function decorateThumb(card, on) {
    const cover = card.querySelector('.beatmapset-panel__cover-col--play .beatmapset-cover');
    if (!cover) return;
    const id = ((card.querySelector('.beatmapset-panel__main-link') || {}).href || '').match(/beatmapsets\/(\d+)/)?.[1];
    const url = on && id ? `url("https://assets.ppy.sh/beatmaps/${id}/covers/fullsize.jpg")` : '';
    if (cover.style.getPropertyValue('--omp-thumb') === url) return;
    if (url) cover.style.setProperty('--omp-thumb', url);
    else cover.style.removeProperty('--omp-thumb');
  }

  function decorate() {
    const c = cfg();
    document.querySelectorAll('.beatmapset-panel').forEach((card) => decorateThumb(card, !!c.theme));
    html.classList.toggle('omp-list-outlines', !!c.listOutlines);
    html.classList.toggle('omp-list-titles', !!c.listTitles);
    html.classList.toggle('omp-nobpm', !c.listBpm);
    html.classList.toggle('omp-nobpmicon', !c.listBpmIcon);
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

      if ((c.listBpm || c.listLength) && (!meta || meta.bpm == null)) missing = true;
      const rate = OMP.rate();
      const mods = OMP.combo() ? ` (${OMP.combo()})` : '';
      const bpm = c.listBpm && meta && meta.bpm != null ? (rate === 1 ? fmtBpm(meta.bpm) : String(Math.round(meta.bpm * rate))) : '';
      putStat(row, 'bpm', 'fas fa-music', bpm && `${bpm} BPM`, `BPM: ${bpm}${mods}`);
      const length = c.listLength && meta && meta.length ? fmtLength(Math.round(meta.length / rate)) : '';
      putStat(row, 'length', 'far fa-clock', length, `Length: ${length}${mods}`);
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
