// Beatmap page: a clearer fail/quit chart with a pass/fail/quit split and axis labels.
(() => {
  'use strict';

  const num = (n) => Number(n).toLocaleString('en-US');
  const pct = (a, b) => (b ? `${Math.round((a / b) * 100)}%` : '0%');
  let queued = false;

  function current() {
    if (!/^\/beatmapsets\/\d+\/?$/.test(location.pathname)) return null;
    try {
      const set = JSON.parse(document.getElementById('json-beatmapset').textContent);
      const h = location.hash.match(/#\w+\/(\d+)/);
      if (String(set.id) !== location.pathname.match(/\d+/)[0] || !h) return null;
      return (set.beatmaps || []).find((b) => String(b.id) === h[1]) || null;
    } catch { return null; }
  }

  const sum = (a) => a.reduce((x, y) => x + y, 0);

  function build(b) {
    const fail = (b.failtimes && b.failtimes.fail) || [];
    const quit = (b.failtimes && b.failtimes.exit) || [];
    const n = Math.max(fail.length, quit.length, 100);
    const f = Array.from({ length: n }, (_, i) => fail[i] || 0);
    const q = Array.from({ length: n }, (_, i) => quit[i] || 0);
    const totals = f.map((v, i) => v + q[i]);
    const max = Math.max(...totals, 1);
    const sf = sum(f);
    const sq = sum(q);
    const passed = b.passcount || 0;
    const events = passed + sf + sq;

    const W = 300, H = 96, top = 4, base = 92, bw = W / n;
    let bars = '';
    for (let i = 0; i < n; i++) {
      const hq = (q[i] / max) * (base - top);
      const hf = (f[i] / max) * (base - top);
      const x = (i * bw).toFixed(2);
      const label = `${i}%-${i + 1}%: ${num(f[i])} failed, ${num(q[i])} quit`;
      bars += `<g class="omp-fc-col"><title>${label}</title><rect class="omp-fc-hit" x="${x}" y="0" width="${bw.toFixed(2)}" height="${base}"/>`
        + (hq ? `<rect class="omp-fc-quit" x="${x}" y="${(base - hq).toFixed(2)}" width="${(bw - 0.5).toFixed(2)}" height="${hq.toFixed(2)}"/>` : '')
        + (hf ? `<rect class="omp-fc-fail" x="${x}" y="${(base - hq - hf).toFixed(2)}" width="${(bw - 0.5).toFixed(2)}" height="${hf.toFixed(2)}"/>` : '')
        + '</g>';
    }
    const ticks = '';

    // where half of the quits / fails happen
    const half = (a, total) => { let c = 0; for (let i = 0; i < a.length; i++) { c += a[i]; if (c >= total / 2) return i; } return null; };
    const mq = sq ? half(q, sq) : null;
    const mf = sf ? half(f, sf) : null;
    const facts = [mq != null ? `Half of quits by ${mq + 1}%` : '', mf != null ? `half of fails by ${mf + 1}%` : ''].filter(Boolean).join(' · ');

    return `
      <div class="omp-fc-split" title="Shares of all recorded passes, fails and quits. The site records fails and quits from a sample, so treat the shares as approximate.">
        <span class="omp-fc-pass" style="flex:${passed}"></span><span class="omp-fc-failbar" style="flex:${sf}"></span><span class="omp-fc-quitbar" style="flex:${sq}"></span>
      </div>
      <div class="omp-fc-legend">
        <span><i class="omp-fc-pass"></i>Passed ${pct(passed, events)}</span>
        <span><i class="omp-fc-failbar"></i>Failed ${pct(sf, events)}</span>
        <span><i class="omp-fc-quitbar"></i>Quit ${pct(sq, events)}</span>
      </div>
      <svg class="omp-fc-svg" data-facts="${facts}${facts ? ' · ' : ''}tallest bar ${num(max)} players" viewBox="0 0 ${W} ${H}" preserveAspectRatio="none" role="img" aria-label="Where players fail or quit, by map progress">
        <line class="omp-fc-grid" x1="0" x2="${W}" y1="${top}" y2="${top}"/>
        <line class="omp-fc-grid" x1="0" x2="${W}" y1="${(top + base) / 2}" y2="${(top + base) / 2}"/>
        <line class="omp-fc-axis" x1="0" x2="${W}" y1="${base}" y2="${base}"/>
        ${bars}${ticks}
      </svg>
`;
  }

  function decorate() {
    queued = false;
    const on = OMP.settings().failChart;
    const box = document.querySelector('.beatmap-success-rate');
    const b = current();
    const mine = document.querySelector('.omp-fc');
    if (!on || !box || !b) { if (mine) mine.remove(); document.querySelectorAll('.omp-fc-hidden').forEach((e) => e.classList.remove('omp-fc-hidden')); return; }
    const orig = box.querySelector('.beatmap-success-rate__chart');
    if (!orig) return;
    orig.classList.add('omp-fc-hidden');
    if (mine && mine.dataset.id === String(b.id) && mine.previousElementSibling === orig) return;
    if (mine) mine.remove();
    const el = document.createElement('div');
    el.className = 'omp-fc';
    el.dataset.id = String(b.id);
    el.title = el.dataset.facts || '';
    el.innerHTML = build(b);
    el.title = el.querySelector('svg').dataset.facts;
    orig.after(el);
  }

  const schedule = () => { if (!queued) { queued = true; queueMicrotask(() => { try { decorate(); } catch (e) { console.error('[osu! maid]', e); } }); } };
  new MutationObserver(schedule).observe(document.documentElement, { childList: true, subtree: true });
  window.addEventListener('hashchange', schedule);
  OMP.onSettings(schedule);
  schedule();
})();
