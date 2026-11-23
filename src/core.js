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

  const STARS = [[0.1, '#4290FB'], [1.25, '#4FC0FF'], [2, '#4FFFD5'], [2.5, '#7CFF4F'], [3.3, '#F6F05C'], [4.2, '#FF8068'], [4.9, '#FF4E6F'], [5.8, '#C645B8'], [6.7, '#6563DE'], [7.7, '#4B49C9'], [9, '#3A38A0']];
  const rgb = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
  OMP.starColour = (r) => {
    if (r <= STARS[0][0]) return STARS[0][1];
    for (let i = 1; i < STARS.length; i++) {
      if (r <= STARS[i][0]) {
        const [a, ca] = STARS[i - 1], [b, cb] = STARS[i];
        const t = (r - a) / (b - a);
        const [x, y] = [rgb(ca), rgb(cb)];
        return `rgb(${x.map((v, k) => Math.round(v + (y[k] - v) * t)).join(',')})`;
      }
    }
    return STARS[STARS.length - 1][1];
  };

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
    modIcons: s && s.modIcons === 'game' ? 'plain' : (s && s.modIcons) || CFG.defaults.modIcons,
    v: CFG.defaults.v,
  });

  let settings = normalize(store.get() || oldCopy());
  const OFF = { theme: false, black: false, playArt: false, lbSide: false, scoreLayout: false, scoreImage: false, ppDecimals: false, modIcons: 'site', hideLocked: false, medalLink: false, copyDesc: false, copyInfo: false, modTotal: false, accountSearch: false, lazerboard: false, scoreRank: false, bgPass: false, bgButton: false, compactDl: false, listBpm: false, listOutlines: false, listTitles: false, listMode: false };
  const eff = () => (settings.enabled ? settings : { ...settings, ...OFF });
  OMP.settings = eff;

  const applyScale = (k) => {
    html.style.setProperty('--omp-k', String(k));
    html.style.setProperty('--omp-nz', eff().theme ? (k / 19).toFixed(3) : '1');
  };

  const applyTheme = () => {
    const e = eff();
    html.classList.toggle('omp-theme', e.theme);
    html.classList.toggle('omp-black', e.theme && e.black);
    html.classList.toggle('omp-playart', !!e.playArt);
    html.classList.toggle('omp-scorelayout', !!e.scoreLayout);
    html.classList.toggle('omp-modtext', e.modIcons === 'letters');
    html.classList.toggle('omp-modplain', e.modIcons === 'plain');
  };

  const listeners = [];
  OMP.onSettings = (fn) => { listeners.push(fn); };

  function applySettings(prev) {
    applyScale(settings.scale);
    applyTheme();
    if (!prev || prev.enabled !== settings.enabled) renderTools();
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
      ['scoreRank', 'Score rank', 'Asks score.respektive.pw (sends the player id)'],
      ['medalLink', 'Osekai link on medals', 'A link to the medal on Osekai in its popup'],
      ['hideLocked', 'Hide unachieved medals', 'Only the medals you have; also a switch in the medals header'],
    ] },
    { id: 'scores', label: 'Scores', match: (p) => /^\/(users|scores)\//.test(p) || /^\/beatmapsets\/\d+/.test(p), rows: [
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
    menuEl.addEventListener('change', (e) => {
      const t = e.target;
      if (t.dataset.set) OMP.set({ [t.dataset.set]: t.checked });
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
    m.style.top = `${(bar ? Math.round(bar.getBoundingClientRect().bottom) : 60) + 6}px`;
    m.hidden = false;
    setGear(true);
  }

  function renderTools() {
    document.getElementById('omp-tools')?.remove();
    const nav = document.querySelector('.nav2-header .nav2');
    if (!nav) return;
    const on = settings.enabled;
    const tools = document.createElement('div');
    tools.id = 'omp-tools';
    tools.innerHTML = `${on ? `<button class="omp-icon-btn" id="omp-gear" title="osu! maid settings" aria-label="osu! maid settings" aria-pressed="false">${ICON_GEAR}</button>` : ''}
      <button class="omp-icon-btn" id="omp-power" title="${on ? 'Turn osu! maid off' : 'Turn osu! maid on'}" aria-label="osu! maid" aria-pressed="${on}">${ICON_POWER}</button>`;
    const group = [...nav.children].find((c) => c.classList.contains('nav2__colgroup--icons'));
    nav.insertBefore(tools, group || null);
    tools.querySelector('#omp-power').addEventListener('click', () => OMP.set({ enabled: !settings.enabled }));
    if (on) tools.querySelector('#omp-gear').addEventListener('click', onGear);
  }

  OMP.start = () => {
    document.addEventListener('click', () => closeMenu());
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeMenu(); });
    applyScale(settings.scale);
    applyTheme();
    watchStorage();
    const ensure = () => { if (document.querySelector('.nav2-header .nav2') && !document.getElementById('omp-tools')) renderTools(); };
    document.addEventListener('DOMContentLoaded', ensure);
    new MutationObserver(ensure).observe(html, { childList: true, subtree: true });
    ensure();
  };
})();
