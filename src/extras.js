// pp decimals and the modding Total tab.
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
    if (c.modTotal) total();
  }
  const schedule = () => { if (!queued) { queued = true; queueMicrotask(() => { try { decorate(); } catch (e) { console.error('[osu! minimal]', e); } }); } };
  new MutationObserver(schedule).observe(document.documentElement, { childList: true, subtree: true });
  OMP.onSettings(schedule);
  schedule();
})();
