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
