// pp decimals, play time in hours, online status colour, and the modding Total tab.
(() => {
  'use strict';

  function pp(on) {
    document.querySelectorAll('.pp-value[title]').forEach((el) => {
      const node = [...el.childNodes].find((n) => n.nodeType === 3);
      if (!node) return;
      if (el.dataset.ompPp === undefined) el.dataset.ompPp = node.textContent;
      const exact = Number(el.title.replace(/,/g, ''));
      const want = on && Number.isFinite(exact) ? exact.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : el.dataset.ompPp;
      if (node.textContent !== want) node.textContent = want;
    });
  }

  const DAYS = /^\s*\d+d \d+h \d+m\s*$/;
  function playTime(on) {
    document.querySelectorAll('span[data-omp-days], span[title$=" hours"], span[data-orig-title$=" hours"]').forEach((el) => {
      const hours = el.dataset.ompHours || el.getAttribute('title') || el.getAttribute('data-orig-title');
      if (!el.dataset.ompDays) {
        if (!DAYS.test(el.textContent) || !on) return;
        el.dataset.ompDays = el.textContent.trim();
        el.dataset.ompHours = hours;
      }
      const [show, tip] = on ? [el.dataset.ompHours, el.dataset.ompDays] : [el.dataset.ompDays, el.dataset.ompHours];
      if (el.textContent !== show) el.textContent = show;
      if (el.hasAttribute('title')) el.setAttribute('title', tip);
      if (el.hasAttribute('data-orig-title')) el.setAttribute('data-orig-title', tip);
    });
  }

  // online status on profiles: green while online, red when it says offline, "last seen" stays as it is
  function status(on) {
    document.querySelectorAll('.profile-links__item').forEach((e) => {
      const t = e.textContent;
      const v = !on ? '' : /offline/i.test(t) ? 'offline' : /online/i.test(t) ? 'online' : '';
      if (v) e.dataset.ompStatus = v; else delete e.dataset.ompStatus;
    });
  }

  let totalFor = null;
  let pickedPraise = null;
  document.addEventListener('click', (e) => {
    if (e.target.closest && e.target.closest('.counter-box--praises')) pickedPraise = location.pathname.split('/')[2] || '';
  }, true);

  function total() {
    const m = location.pathname.match(/^\/beatmapsets\/(\d+)\/discussion/);
    if (!m) { totalFor = null; return; }
    if (totalFor === m[1] || pickedPraise === m[1]) return;
    const praise = document.querySelector('.counter-box--praises.js-active');
    const all = document.querySelector('.counter-box--total');
    if (!praise || !all) return;
    totalFor = m[1];
    all.click();
  }

  let queued = false;
  function decorate() {
    queued = false;
    const c = OMP.settings();
    pp(!!c.ppDecimals);
    playTime(!!c.playHours);
    status(!!c.statusColour);
    if (c.modTotal) total();
  }
  const schedule = () => { if (!queued) { queued = true; queueMicrotask(() => { try { decorate(); } catch (e) { console.error('[osu! minimal]', e); } }); } };
  new MutationObserver(schedule).observe(document.documentElement, { childList: true, subtree: true });
  OMP.onSettings(schedule);
  schedule();
})();
