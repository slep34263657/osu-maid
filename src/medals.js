// Medals: hide unachieved, Osekai link.
(() => {
  'use strict';

  const html = document.documentElement;
  const MEDALS = '[data-page-id="medals"]';
  let queued = false;

  function place(toggle, header) {
    const handle = header.querySelector('.sortable-handle');
    if (!handle) return;
    const box = header.getBoundingClientRect();
    const rect = handle.getBoundingClientRect();
    if (!rect.width) return;
    toggle.style.top = `${rect.top - box.top + rect.height / 2}px`;
    toggle.style.right = `${box.right - rect.left + 14}px`;
  }

  const LINK_ICON = '<svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>';
  function popups(on) {
    document.querySelectorAll('.tooltip-achievement').forEach((tip) => {
      const old = tip.querySelector('.omp-osekai');
      const name = ((tip.querySelector('.tooltip-achievement__name') || {}).textContent || '').trim();
      if (!on || !name) { if (old) old.remove(); return; }
      const href = `https://inex.osekai.net/medals/${encodeURIComponent(name)}`;
      if (old && old.getAttribute('href') === href) return;
      if (old) old.remove();
      const a = document.createElement('a');
      a.className = 'omp-osekai';
      a.href = href;
      a.target = '_blank';
      a.rel = 'noopener';
      a.title = 'Open this medal on Osekai';
      a.innerHTML = `${LINK_ICON}<span>Osekai</span>`;
      tip.append(a);
    });
  }

  function decorate() {
    queued = false;
    popups(OMP.settings().enabled && OMP.settings().medalLink);
    const on = !!OMP.settings().hideLocked;
    html.toggleAttribute('data-omp-hide-locked', on);
    const header = document.querySelector(`${MEDALS} .page-extra > .u-relative`);
    const mine = document.querySelector('.omp-medal-switch');
    if (!OMP.settings().enabled || !header) { if (mine) mine.remove(); return; }
    if (mine && mine.parentElement === header) { mine.setAttribute('aria-checked', String(on)); return; }
    if (mine) mine.remove();
    const toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.className = 'omp-medal-switch';
    toggle.title = 'Hide unachieved medals';
    toggle.setAttribute('role', 'switch');
    toggle.setAttribute('aria-checked', String(on));
    toggle.addEventListener('click', () => OMP.set({ hideLocked: toggle.getAttribute('aria-checked') !== 'true' }));
    header.append(toggle);
    place(toggle, header);
    requestAnimationFrame(() => place(toggle, header));
  }

  const schedule = () => { if (!queued) { queued = true; queueMicrotask(() => { try { decorate(); } catch (e) { console.error('[osu! maid]', e); } }); } };
  new MutationObserver(schedule).observe(html, { childList: true, subtree: true });
  window.addEventListener('resize', () => document.querySelectorAll('.omp-medal-switch').forEach((t) => place(t, t.parentElement)));
  OMP.onSettings(schedule);
  schedule();
})();
