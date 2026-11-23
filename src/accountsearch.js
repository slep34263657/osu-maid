// Search box on the account settings page.
(() => {
  'use strict';

  const PAGE = /^\/home\/account\/edit\/?$/;
  const norm = (t) => String(t || '').toLowerCase().replace(/\s+/g, ' ').trim();
  let box = null;
  let query = '';

  function haystack(el) {
    let t = el.textContent || '';
    el.querySelectorAll('input, textarea, select, button, [title], [aria-label]').forEach((c) => {
      t += ` ${c.getAttribute('placeholder') || ''} ${c.getAttribute('title') || ''} ${c.getAttribute('aria-label') || ''}`;
      if (c.tagName === 'SELECT') t += ` ${[...c.options].map((o) => o.textContent).join(' ')}`;
    });
    return norm(t);
  }

  function apply() {
    const page = document.querySelector('.osu-page--account-edit');
    if (!page) return;
    const q = norm(query);
    const sections = [...page.querySelectorAll('.account-edit')];
    let shown = 0;
    for (const sec of sections) {
      const entries = [...sec.querySelectorAll('.account-edit-entry')];
      const groups = [...sec.querySelectorAll('.account-edit__input-group')];
      const title = norm((sec.querySelector('.account-edit__section-title') || {}).textContent);
      sec.hidden = false;
      entries.forEach((e) => { e.hidden = false; });
      groups.forEach((g) => { g.hidden = false; });
      if (!q) { shown++; continue; }
      const whole = title.includes(q);
      let any = false;
      entries.forEach((e) => {
        const hit = whole || haystack(e).includes(q);
        e.hidden = !hit;
        if (hit) any = true;
      });
      groups.forEach((g) => { g.hidden = !whole && ![...g.querySelectorAll('.account-edit-entry')].some((e) => !e.hidden) && !haystack(g).includes(q); if (!g.hidden) any = true; });
      if (!entries.length && !groups.length && haystack(sec).includes(q)) any = true;
      sec.hidden = !(whole || any);
      if (!sec.hidden) shown++;
    }
    const none = box && box.querySelector('.omp-acc-none');
    if (none) none.hidden = !(q && !shown);
  }

  function build(page) {
    box = document.createElement('div');
    box.className = 'omp-acc-search';
    box.innerHTML = `<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/></svg>
      <input type="search" placeholder="Search settings   ( / )" aria-label="Search settings" autocomplete="off" spellcheck="false">
      <span class="omp-acc-none" hidden>No settings match</span>`;
    const input = box.querySelector('input');
    input.value = query;
    input.addEventListener('input', () => { query = input.value; apply(); });
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') { input.value = query = ''; apply(); input.blur(); }
      e.stopPropagation();
    });
    page.prepend(box);
  }

  document.addEventListener('keydown', (e) => {
    if (e.key !== '/' || e.ctrlKey || e.metaKey || e.altKey || !box || !box.isConnected) return;
    const t = e.target;
    if (t && (t.isContentEditable || /^(input|textarea|select)$/i.test(t.tagName))) return;
    e.preventDefault();
    box.querySelector('input').focus();
  });

  let queued = false;
  function decorate() {
    queued = false;
    const page = PAGE.test(location.pathname) && OMP.settings().accountSearch ? document.querySelector('.osu-page--account-edit') : null;
    if (!page) {
      if (box) { box.remove(); box = null; }
      document.querySelectorAll('.account-edit, .account-edit-entry, .account-edit__input-group').forEach((e) => { e.hidden = false; });
      return;
    }
    if (!box || !box.isConnected || box.parentElement !== page) { if (box) box.remove(); build(page); }
    if (query) apply();
  }
  const schedule = () => { if (!queued) { queued = true; setTimeout(decorate, 120); } };
  new MutationObserver((records) => { if (records.some((r) => !(box && box.contains(r.target)))) schedule(); }).observe(document.documentElement, { childList: true, subtree: true });
  OMP.onSettings(schedule);
  schedule();
})();
