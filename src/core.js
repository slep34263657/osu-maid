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
    modView: s && s.modView !== undefined ? !!s.modView : !!(s && s.dtMode),
    modCombo: s && s.modCombo !== undefined ? s.modCombo : (s && s.dtOn ? 'DT' : ''),
    modIcons: s && s.modIcons === 'game' ? 'plain' : (s && s.modIcons) || CFG.defaults.modIcons,
    v: CFG.defaults.v,
  });

  let settings = normalize(store.get() || oldCopy());
  const OFF = { theme: false, searchIn: false, ownPlays: false, failChart: false, hoverStats: false, modView: false, docsCode: true, accentOn: false, accentButtons: false, accentLinks: false, accentHighlights: false, accentCharts: false, accent: '', docsTheme: 'off', black: false, playArt: false, lbSide: false, scoreLayout: false, scoreImage: false, ppDecimals: false, playHours: false, statusColour: false, modIcons: 'site', hideLocked: false, medalLink: false, copyDesc: false, copyInfo: false, modTotal: false, accountSearch: false, lazerboard: false, scoreRank: false, bgPass: false, bgButton: false, compactDl: false, listBpm: false, listOutlines: false, listTitles: false, listMode: false };
  const eff = () => (settings.enabled ? settings : { ...settings, ...OFF });
  OMP.settings = eff;
  OMP.combo = () => (eff().modView ? settings.modCombo || '' : '');
  OMP.rate = () => { const c = OMP.combo(); return /DT/.test(c) ? 1.5 : /HT/.test(c) ? 0.75 : 1; };

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
    html.classList.toggle('omp-on', settings.enabled);
    html.classList.toggle('omp-theme', e.theme);
    html.classList.toggle('omp-black', e.theme && e.black);
    html.classList.toggle('omp-playart', !!e.playArt);
    html.classList.toggle('omp-scorelayout', !!e.scoreLayout);
    html.classList.toggle('omp-docs', e.docsTheme !== 'off');
    html.classList.toggle('omp-nocode', !e.docsCode);
    html.classList.toggle('omp-docs-black', e.docsTheme === 'black');
    html.classList.toggle('omp-ppdec', !!e.ppDecimals);
    html.classList.toggle('omp-modtext', e.modIcons === 'letters');
    html.classList.toggle('omp-modplain', e.modIcons === 'plain');
  };

  const listeners = [];
  OMP.onSettings = (fn) => { listeners.push(fn); };
  const hoverFns = [];
  OMP.onHover = (fn) => { hoverFns.push(fn); };
  OMP.emitHover = () => hoverFns.forEach((fn) => { try { fn(); } catch (e) { console.error('[osu! maid]', e); } });

  function applySettings(prev) {
    applyScale(settings.scale);
    applyTheme();
    if (!prev || prev.enabled !== settings.enabled || prev.modView !== settings.modView || prev.modCombo !== settings.modCombo) renderTools();
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
  const mrow = (attrs, label, on) => `<label class="omp-mrow"><span><b>${esc(label)}</b></span><input type="checkbox" class="omp-sw" ${attrs}${on ? ' checked' : ''}></label>`;
  const srow = (key, label) => mrow(`data-set="${key}"`, label, settings[key]);

  const GROUPS = [
    { id: 'profile', label: 'Profile', match: (p) => /^\/users\//.test(p), rows: [
      ['playArt', 'Map art on scores'],
      ['lazerboard', 'Lazerboard stats'],
      ['lbSide', 'Pop out', 'lazerboard'],
      ['statusColour', 'Status colour'],
      ['scoreRank', 'Score rank'],
      ['medalLink', 'Osekai medal link'],
      ['hideLocked', 'Hide locked medals'],
    ] },
    { id: 'scores', label: 'Scores', match: (p) => /^\/(users|scores)\//.test(p) || /^\/beatmapsets\/\d+/.test(p), rows: [
      ['playHours', 'Play time in hours'],
      ['ppDecimals', 'pp decimals'],
      ['modIcons', 'Mod icons', [['site', 'Site'], ['letters', 'Letters'], ['plain', 'Plain']]],
    ] },
    { id: 'score', label: 'Score page', match: (p) => /^\/scores\//.test(p), rows: [
      ['scoreLayout', 'Results layout'],
      ['scoreImage', 'Score buttons'],
    ] },
    { id: 'beatmap', label: 'Beatmap page', match: (p) => /^\/beatmapsets\/\d+\/?$/.test(p), rows: [
      ['bgPass', 'Map background'],
      ['bgButton', 'Background button'],
      ['compactDl', 'Slim downloads'],
      ['failChart', 'Fail chart'],
      ['hoverStats', 'Hover stats'],
      ['copyDesc', 'Copy description'],
      ['copyInfo', 'Copy map info'],
      ['ownPlays', 'Own play count'],
    ] },
    { id: 'modding', label: 'Modding', match: (p) => /^\/beatmapsets\/\d+\/discussion/.test(p), rows: [
      ['modTotal', 'Open on Total'],
    ] },
    { id: 'listing', label: 'Beatmap listing', match: (p) => /^\/beatmapsets\/?$/.test(p), rows: [
      ['listBpm', 'BPM'],
      ['listOutlines', 'Status outlines'],
      ['listTitles', 'Other title and artist'],
      ['listMode', 'Remember mode'],
      ['searchIn', 'Search in buttons'],
    ] },
    { id: 'docs', label: 'API docs', match: (p) => /^\/docs/.test(p), rows: [
      ['docsTheme', 'Dark docs', [['off', 'Off'], ['grey', 'Grey'], ['black', 'Black']]],
      ['docsCode', 'Code panel'],
    ] },
    { id: 'account', label: 'Account settings', match: (p) => /^\/home\/account\/edit/.test(p), rows: [
      ['accountSearch', 'Search box'],
    ] },
  ];
  const openGroups = new Set();

  function buildMenu() {
    const path = location.pathname;
    const choice = (key, label, opts) => `<div class="omp-mrow"><span><b>${esc(label)}</b></span><span class="omp-seg">${opts.map(([v, t]) => `<button type="button" data-key="${key}" data-choice="${v}"${settings[key] === v ? ' aria-pressed="true"' : ''}>${esc(t)}</button>`).join('')}</span></div>`;
    const rows = (g) => g.rows.map(([key, label, extra]) => (Array.isArray(extra)
      ? choice(key, label, extra)
      : extra
      ? `<div class="omp-msub${settings[extra] ? '' : ' omp-off'}">${srow(key, label)}</div>`
      : srow(key, label))).join('');
    const here = GROUPS.filter((g) => g.match(path));
    const other = GROUPS.filter((g) => !g.match(path));
    const group = (g) => `<details class="omp-mgroup" data-g="${g.id}"${openGroups.has(g.id) ? ' open' : ''}><summary>${esc(g.label)}</summary>${rows(g)}</details>`;
    menuEl.innerHTML = `
      <div class="omp-mhead"><div><div class="omp-mtitle">osu! maid</div></div><i class="omp-mlogo" aria-hidden="true"></i></div>
      ${here.length ? `<h3>On this page</h3>${here.map((g) => `<div class="omp-mblock"><div class="omp-mname">${esc(g.label)}</div>${rows(g)}</div>`).join('')}` : ''}
      <h3>Everywhere</h3>
      <div class="omp-mblock">
        ${srow('theme', 'Dark theme')}
        <div class="omp-msub${settings.theme ? '' : ' omp-off'}">${srow('black', 'Pure black')}</div>
        ${srow('accentOn', 'Accent colour')}
        <div class="omp-msub"${settings.accentOn ? '' : ' hidden'}><div class="omp-mrow"><span><b>Colour</b></span><span class="omp-acc"><input type="color" data-accent value="${/^#[0-9a-f]{6}$/i.test(settings.accent || '') ? settings.accent : '#ff66aa'}" aria-label="Accent colour"></span></div>
          ${srow('accentButtons', 'Buttons')}
          ${srow('accentLinks', 'Links')}
          ${srow('accentHighlights', 'Highlights')}
          ${srow('accentCharts', 'Charts')}</div>
        ${srow('modView', 'Mod view (experimental)')}
        <div class="omp-mrow"><span><b>Text size</b></span>
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

  function openCombos(e) {
    e.stopPropagation();
    const old = document.getElementById('omp-combos');
    if (old) { old.remove(); return; }
    const box = document.createElement('div');
    box.id = 'omp-combos';
    const btn = e.currentTarget.getBoundingClientRect();
    box.style.top = `${Math.round(btn.bottom) + 6}px`;
    box.style.right = `${Math.max(8, Math.round(innerWidth - btn.right))}px`;
    box.innerHTML = ['', ...(OMP.modCombos || [])].map((c) => `<button type="button" data-combo="${c}"${(settings.modCombo || '') === c ? ' aria-pressed="true"' : ''}>${c || 'Off'}</button>`).join('');
    box.addEventListener('click', (ev) => {
      ev.stopPropagation();
      const b = ev.target.closest('[data-combo]');
      if (!b) return;
      OMP.set({ modCombo: b.dataset.combo });
      box.remove();
    });
    html.append(box);
    document.addEventListener('click', () => box.remove(), { once: true });
  }

  function renderTools() {
    document.getElementById('omp-tools')?.remove();
    const nav = document.querySelector('.nav2-header .nav2');
    const floating = !nav && /^\/docs/.test(location.pathname);
    if (!nav && !floating) return;
    const on = settings.enabled;
    const tools = document.createElement('div');
    tools.id = 'omp-tools';
    const dt = on && settings.modView && !floating ? `<button class="omp-icon-btn omp-modbtn" id="omp-dt" title="Mod view (experimental)" aria-label="Mod view" aria-pressed="${!!settings.modCombo}">${settings.modCombo || 'Mods'}</button>` : '';
    tools.innerHTML = `${dt}${on ? `<button class="omp-icon-btn" id="omp-gear" title="osu! maid settings" aria-label="osu! maid settings" aria-pressed="false">${ICON_GEAR}</button>` : ''}
      <button class="omp-icon-btn" id="omp-power" title="${on ? 'Turn osu! maid off' : 'Turn osu! maid on'}" aria-label="osu! maid" aria-pressed="${on}">${ICON_POWER}</button>`;
    if (floating) { tools.classList.add('omp-tools-fixed'); html.append(tools); } else {
      const group = [...nav.children].find((c) => c.classList.contains('nav2__colgroup--icons'));
      nav.insertBefore(tools, group || null);
    }
    tools.querySelector('#omp-power').addEventListener('click', () => OMP.set({ enabled: !settings.enabled }));
    if (on) tools.querySelector('#omp-gear').addEventListener('click', onGear);
    if (dt) tools.querySelector('#omp-dt').addEventListener('click', openCombos);
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
