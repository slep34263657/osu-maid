// Beatmap listing: buttons under the search that scope it to one field (title, artist...) through the URL.
(() => {
  'use strict';

  const FIELDS = [['title', 'Title'], ['artist', 'Artist'], ['creator', 'Creator'], ['source', 'Source'], ['tag', 'Tag']];
  const TOKEN = /^\s*(title|artist|creator|source|tag)=("?)(.*?)\2\s*$/i;
  let queued = false;

  const urlQuery = () => new URLSearchParams(location.search).get('q') || '';
  const plain = (q) => { const m = q.match(TOKEN); return m ? m[3] : q.trim(); };
  const activeField = () => { const m = urlQuery().match(TOKEN); return m ? m[1].toLowerCase() : null; };

  function go(field) {
    const input = document.querySelector('.js-beatmapsets-search-input');
    const text = plain((input && input.value) || urlQuery()).replace(/"/g, '');
    if (!text) { if (input) input.focus(); return; }
    const u = new URL(location.href);
    u.searchParams.set('q', field === activeField() ? text : `${field}="${text}"`);
    u.searchParams.delete('cursor_string');
    location.href = u.href;
  }

  function build() {
    const row = document.createElement('div');
    row.className = 'beatmapsets-search-filter beatmapsets-search-filter--grid omp-searchin';
    const head = document.createElement('span');
    head.className = 'beatmapsets-search-filter__header';
    head.textContent = 'Search in';
    row.append(head);
    const items = document.createElement('div');
    items.className = 'beatmapsets-search-filter__items';
    FIELDS.forEach(([field, label]) => {
      const a = document.createElement('a');
      a.className = 'beatmapsets-search-filter__item';
      a.dataset.field = field;
      a.href = '#';
      a.textContent = label;
      a.title = `Search the ${label.toLowerCase()} only`;
      a.addEventListener('click', (e) => { e.preventDefault(); go(field); });
      items.append(a);
    });
    row.append(items);
    return row;
  }

  function decorate() {
    queued = false;
    const on = OMP.settings().searchIn && /^\/beatmapsets\/?$/.test(location.pathname);
    const boxes = [...document.querySelectorAll('.beatmapsets-search__filter-grid')];
    document.querySelectorAll('.omp-searchin').forEach((r) => { if (!on || !boxes.includes(r.parentElement)) r.remove(); });
    if (!on) return;
    const active = activeField();
    boxes.forEach((box) => {
      let row = box.querySelector(':scope > .omp-searchin');
      if (!row) { row = build(); box.prepend(row); }
      row.querySelectorAll('a').forEach((a) => a.classList.toggle('beatmapsets-search-filter__item--active', a.dataset.field === active));
    });
  }

  const schedule = () => { if (!queued) { queued = true; queueMicrotask(() => { try { decorate(); } catch (e) { console.error('[osu! maid]', e); } }); } };
  new MutationObserver(schedule).observe(document.documentElement, { childList: true, subtree: true });
  OMP.onSettings(schedule);
  schedule();
})();
