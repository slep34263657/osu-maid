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
