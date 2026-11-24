// Beatmap page: map background, background button, slim downloads, copy buttons.
(() => {
  'use strict';

  const html = document.documentElement;
  const BEATMAPSET = /^\/beatmapsets\/(\d+)\/?$/;
  let queued = false;
  let header = null;
  let info = null;

  const sizer = new ResizeObserver(() => sizeBackground());
  function sizeBackground() {
    if (!header || !info) return;
    const h = `${Math.round(info.getBoundingClientRect().height)}px`;
    if (header.style.getPropertyValue('--omp-info-h') !== h) header.style.setProperty('--omp-info-h', h);
  }

  function clearBackground() {
    sizer.disconnect();
    if (header) {
      header.removeAttribute('data-omp-bg');
      header.style.removeProperty('--omp-bg');
      header.style.removeProperty('--omp-info-h');
    }
    header = info = null;
  }

  function background(id, on) {
    const h = on ? document.querySelector('.beatmapset-header') : null;
    const i = h && h.nextElementSibling;
    if (!h || !i || !i.classList.contains('beatmapset-info')) { clearBackground(); return; }
    if (h !== header || i !== info) {
      clearBackground();
      header = h;
      info = i;
      sizer.observe(info);
    }
    if (header.dataset.ompBg !== id) {
      header.style.setProperty('--omp-bg', `url("https://assets.ppy.sh/beatmaps/${id}/covers/fullsize.jpg")`);
      header.dataset.ompBg = id;
    }
    sizeBackground();
  }

  function bgButton(id, on) {
    const buttons = document.querySelector('.beatmapset-header__buttons');
    const old = document.querySelector('.omp-bg-link');
    const href = `https://assets.ppy.sh/beatmaps/${id}/covers/fullsize.jpg`;
    if (!on || !buttons) { if (old) old.remove(); return; }
    if (old && old.parentElement === buttons && old.href === href) return;
    if (old) old.remove();
    const a = document.createElement('a');
    a.className = 'btn-osu-big btn-osu-big--beatmapset-header-square omp-bg-link';
    a.href = href;
    a.target = '_blank';
    a.rel = 'noopener';
    a.title = 'View the full-size background';
    a.innerHTML = '<span class="btn-osu-big__content"><span class="btn-osu-big__icon"><span class="fa fa-fw"><span class="fas fa-image"></span></span></span></span>';
    buttons.append(a);
  }

  const setData = (id) => {
    try {
      const j = JSON.parse(document.getElementById('json-beatmapset').textContent);
      return String(j.id) === id ? j : null;
    } catch { return null; }
  };
  const plain = (markup) => {
    const t = document.createElement('template');
    t.innerHTML = markup || '';
    t.content.querySelectorAll('br').forEach((b) => b.replaceWith('\n'));
    t.content.querySelectorAll('p, li, div').forEach((n) => n.append('\n'));
    return t.content.textContent.replace(/\n{3,}/g, '\n\n').trim();
  };
  function copyText(text, what) {
    const done = () => OMP.toast(`Copied the ${what}`);
    const fallback = () => {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.cssText = 'position:fixed;opacity:0';
      document.body.append(ta);
      ta.select();
      try { document.execCommand('copy'); done(); } catch { OMP.toast('Could not copy'); }
      ta.remove();
    };
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(done, fallback); else fallback();
  }
  const COPY_ICON = '<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h8"/></svg>';

  function infoButton(id, on) {
    const buttons = document.querySelector('.beatmapset-header__buttons');
    const old = document.querySelector('.omp-copy');
    if (!on || !buttons) { if (old) old.remove(); return; }
    if (old && old.parentElement === buttons && old.dataset.set === id) return;
    if (old) old.remove();
    const a = document.createElement('a');
    a.className = 'btn-osu-big btn-osu-big--beatmapset-header-square omp-copy';
    a.dataset.set = id;
    a.href = '#';
    a.title = 'Copy the map info';
    a.innerHTML = '<span class="btn-osu-big__content"><span class="btn-osu-big__icon"><span class="fa fa-fw"><span class="fas fa-copy"></span></span></span></span>';
    a.addEventListener('click', (e) => {
      e.preventDefault();
      const bs = setData(id);
      if (!bs) return;
      const hash = location.hash.match(/#(\w+)\/(\d+)/);
      const bm = hash && (bs.beatmaps || []).find((b) => String(b.id) === hash[2]);
      copyText(`${bs.artist} - ${bs.title}${bm ? ` [${bm.version}]` : ''}
mapped by ${bs.creator}
https://osu.ppy.sh/beatmapsets/${bs.id}${hash ? hash[0] : ''}`, 'map info');
    });
    buttons.append(a);
  }

  function descButton(id, on) {
    const head = [...document.querySelectorAll('h3.beatmapset-info__header')].find((h) => /^description$/i.test(h.firstChild && h.firstChild.nodeType === 3 ? h.firstChild.textContent.trim() : h.textContent.replace(/\s+/g, ' ').trim()));
    document.querySelectorAll('.omp-copy-desc').forEach((b) => { if (!on || !head || b.parentElement !== head || b.dataset.set !== id) b.remove(); });
    if (!on || !head || head.querySelector('.omp-copy-desc')) return;
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'omp-copy-desc';
    b.dataset.set = id;
    b.title = 'Copy the description';
    b.setAttribute('aria-label', 'Copy the description');
    b.innerHTML = COPY_ICON;
    b.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const bs = setData(id);
      if (bs) copyText(plain(bs.description && bs.description.description) || 'No description', 'description');
    });
    head.append(b);
  }

  function downloads(on) {
    html.classList.toggle('omp-compact-dl', on);
    const links = [...document.querySelectorAll('.beatmapset-header__buttons a.btn-osu-big')]
      .filter((a) => /\/beatmapsets\/\d+\/download/.test(a.getAttribute('href') || ''));
    const hasNoVideo = links.some((a) => a.href.includes('noVideo=1'));
    links.forEach((a) => {
      const withVideo = hasNoVideo && !a.href.includes('noVideo=1');
      a.classList.toggle('omp-dl-video', withVideo);
      a.classList.toggle('omp-dl', !withVideo);
    });
  }

  // "770,054 [3]": the viewer's own plays of the selected difficulty, after the total
  function ownPlays(id, on) {
    const head = document.querySelector('.beatmapset-header__value[title="Playcount"]');
    const mine = document.querySelector('.omp-own');
    let n = null;
    if (on && head) {
      try {
        const set = JSON.parse(document.getElementById('json-beatmapset').textContent);
        const h = location.hash.match(/#\w+\/(\d+)/);
        const b = String(set.id) === id && h && (set.beatmaps || []).find((x) => String(x.id) === h[1]);
        if (b && typeof b.current_user_playcount === 'number') n = b.current_user_playcount;
      } catch { /* no data yet */ }
    }
    if (n === null) { if (mine) mine.remove(); return; }
    const text = ` [${n.toLocaleString('en-US')}]`;
    if (mine && mine.parentElement === head) { if (mine.textContent !== text) mine.textContent = text; return; }
    if (mine) mine.remove();
    const s = document.createElement('span');
    s.className = 'omp-own';
    s.title = 'Your plays on this difficulty';
    s.textContent = text;
    head.append(s);
  }

  function decorate() {
    queued = false;
    const id = (location.pathname.match(BEATMAPSET) || [])[1];
    const c = OMP.settings();
    const active = !!id;
    background(id, active && c.bgPass);
    infoButton(id, active && c.copyInfo);
    descButton(id, active && c.copyDesc);
    ownPlays(id, active && c.ownPlays);
    bgButton(id, active && c.bgButton);
    if (active) downloads(c.compactDl); else html.classList.remove('omp-compact-dl');
  }

  const schedule = () => { if (!queued) { queued = true; queueMicrotask(() => { try { decorate(); } catch (e) { console.error('[osu! minimal]', e); } }); } };
  new MutationObserver(schedule).observe(html, { childList: true, subtree: true });
  OMP.onSettings(schedule);
  schedule();
})();
