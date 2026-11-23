// Score page: results layout, buttons, score image.
(() => {
  'use strict';

  const { esc, num, fmtDate, gradeLabel, starColour, HITS } = OMP;
  const SCORE = /^\/scores\/(?:(?:osu|taiko|fruits|mania)\/)?(\d+)\/?$/;
  const MODES = ['osu', 'taiko', 'fruits', 'mania'];
  const GRADE_COLOURS = { X: '#f5c542', XH: '#d5dde3', S: '#f0a030', SH: '#b9c4cc', A: '#7fd24a', B: '#4aa8e0', C: '#a86bd8', D: '#f06060', F: '#f06060' };
  const JUDGE = { perfect: 'perfect', great: 'great', good: 'good', ok: 'ok', meh: 'meh', miss: 'miss', large_tick_hit: 'ok', small_tick_hit: 'meh' };
  const JUDGE_COLOURS = { perfect: '#9ad7ff', great: '#47b4eb', good: '#5fd68a', ok: '#99eb47', meh: '#ffd966', miss: '#ff6666' };
  const EXTRA = { slider_tail_hit: 'Slider ends', large_tick_hit: 'Slider ticks', small_tick_hit: 'Droplets', large_bonus: 'Big spinner bonus', small_bonus: 'Spinner bonus' };

  function read() {
    const el = document.getElementById('json-show');
    if (!el) return null;
    try {
      const score = JSON.parse(el.textContent);
      const want = (location.pathname.match(SCORE) || [])[1];
      if (!score || !score.beatmap || !score.beatmapset || !want) return null;
      if (String(score.id) !== want && String(score.legacy_score_id) !== want) return null;
      return score;
    } catch { return null; }
  }

  function facts(s) {
    const mode = MODES[s.ruleset_id] || 'osu';
    const keys = HITS[mode] || HITS.osu;
    const st = s.statistics || {};
    const hits = keys.map(([label, key]) => ({ label, key, value: st[key] || 0, judge: JUDGE[key] || 'ok' }));
    const max = s.maximum_statistics || {};
    const extras = Object.entries(max)
      .filter(([k, v]) => v > 0 && EXTRA[k] && !keys.some(([, key]) => key === k))
      .map(([k, v]) => ({ label: EXTRA[k], value: st[k] || 0, max: v }));
    return {
      mode, hits, extras,
      mods: (s.mods || []).map((m) => m.acronym).filter((m) => m !== 'CL'),
      acc: `${(s.accuracy * 100).toFixed(2)}%`,
      score: s.total_score ?? s.classic_total_score,
      pp: s.pp != null ? Math.round(s.pp) : null,
      when: s.ended_at ? fmtDate(s.ended_at) : '',
    };
  }

  const SIZE = { w: 1280, h: 720 };

  function rounded(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.roundRect(x, y, w, h, r);
  }

  function cover(ctx, img, x, y, w, h) {
    const k = Math.max(w / img.width, h / img.height);
    ctx.drawImage(img, x + (w - img.width * k) / 2, y + (h - img.height * k) / 2, img.width * k, img.height * k);
  }

  function fitText(ctx, text, maxW) {
    if (ctx.measureText(text).width <= maxW) return text;
    let t = text;
    while (t.length > 1 && ctx.measureText(`${t}…`).width > maxW) t = t.slice(0, -1);
    return `${t}…`;
  }

  async function loadImage(url) {
    const blob = await OMP.blob(url);
    if (!blob) return null;
    try { return await createImageBitmap(blob); } catch { return null; }
  }

  async function makeImage(s, f) {
    const bs = s.beatmapset, bm = s.beatmap, u = s.user || {};
    const [art, avatar] = await Promise.all([loadImage(bs.covers['cover@2x'] || bs.covers.cover), loadImage(u.avatar_url)]);
    const canvas = document.createElement('canvas');
    canvas.width = SIZE.w;
    canvas.height = SIZE.h;
    const ctx = canvas.getContext('2d');
    const font = (size, weight = 400) => { ctx.font = `${weight} ${size}px "Segoe UI", system-ui, sans-serif`; };
    const PAD = 56;

    ctx.fillStyle = '#0e0e10';
    ctx.fillRect(0, 0, SIZE.w, SIZE.h);
    if (art) { ctx.save(); ctx.filter = 'brightness(.42)'; cover(ctx, art, 0, 0, SIZE.w, SIZE.h); ctx.restore(); }
    ctx.fillStyle = 'rgba(8, 8, 10, .45)';
    ctx.fillRect(0, 0, SIZE.w, SIZE.h);

    ctx.textBaseline = 'alphabetic';
    ctx.fillStyle = '#e8e8ea';
    font(46, 700);
    ctx.fillText(fitText(ctx, bs.title, SIZE.w - PAD * 2), PAD, 92);
    ctx.fillStyle = '#b4b4ba';
    font(28, 400);
    ctx.fillText(fitText(ctx, bs.artist, SIZE.w - PAD * 2), PAD, 134);
    ctx.fillStyle = '#e8e8ea';
    font(28, 600);
    const diff = `${bm.version}`;
    ctx.fillText(fitText(ctx, diff, 620), PAD, 182);
    const dw = ctx.measureText(diff).width;
    ctx.fillStyle = starColour(bm.difficulty_rating);
    ctx.beginPath(); ctx.arc(PAD + dw + 26, 172, 8, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#e8e8ea';
    font(24, 600);
    ctx.fillText(`${bm.difficulty_rating.toFixed(2)}★`, PAD + dw + 42, 181);
    ctx.fillStyle = '#9a9aa2';
    font(22, 400);
    ctx.fillText(`mapped by ${bs.creator}`, PAD, 214);

    const avSize = 96, avY = 262;
    if (avatar) {
      ctx.save(); rounded(ctx, PAD, avY, avSize, avSize, 14); ctx.clip(); cover(ctx, avatar, PAD, avY, avSize, avSize); ctx.restore();
    } else {
      ctx.fillStyle = '#222226'; rounded(ctx, PAD, avY, avSize, avSize, 14); ctx.fill();
    }
    ctx.fillStyle = '#e8e8ea';
    font(40, 700);
    ctx.fillText(fitText(ctx, u.username || '', 420), PAD + avSize + 22, avY + 46);
    ctx.fillStyle = '#9a9aa2';
    font(22, 400);
    ctx.fillText([u.country_code, f.when && `played ${f.when}`].filter(Boolean).join('  ·  '), PAD + avSize + 22, avY + 82);

    const rx = SIZE.w - PAD;
    ctx.textAlign = 'right';
    ctx.fillStyle = GRADE_COLOURS[s.rank] || '#e8e8ea';
    font(200, 700);
    ctx.fillText(gradeLabel(s.rank), rx, 330);
    ctx.fillStyle = '#e8e8ea';
    font(84, 600);
    ctx.fillText(num(f.score), rx, 430);
    ctx.textAlign = 'left';

    if (f.mods.length) {
      font(26, 700);
      let x = PAD;
      const y = 410;
      for (const m of f.mods) {
        const w = ctx.measureText(m).width + 28;
        ctx.fillStyle = 'rgba(0, 0, 0, .6)'; rounded(ctx, x, y - 32, w, 44, 10); ctx.fill();
        ctx.fillStyle = '#e8e8ea'; ctx.fillText(m, x + 14, y);
        x += w + 10;
      }
    }

    const head = [
      { label: 'Accuracy', value: f.acc },
      { label: 'Combo', value: `${num(s.max_combo)}x` },
      { label: 'Performance', value: f.pp != null ? `${num(f.pp)}pp` : '-' },
    ];
    const hits = f.hits.map((h) => ({ label: h.label, value: num(h.value), colour: JUDGE_COLOURS[h.judge] || '#e8e8ea' }));
    const px = PAD, pw = SIZE.w - PAD * 2, py = 478, ph = 196;
    ctx.fillStyle = 'rgba(6, 6, 8, .74)'; rounded(ctx, px, py, pw, ph, 22); ctx.fill();
    ctx.strokeStyle = 'rgba(255, 255, 255, .08)'; ctx.lineWidth = 1.5; rounded(ctx, px + .75, py + .75, pw - 1.5, ph - 1.5, 22); ctx.stroke();

    const row = (items, top, h, valueSize, labelSize) => {
      const cw = pw / items.length;
      items.forEach((t, i) => {
        const cx = px + cw * i + cw / 2;
        ctx.textAlign = 'center';
        ctx.fillStyle = '#9a9aa2'; font(labelSize, 600);
        const label = t.label.toUpperCase();
        ctx.fillText(label, cx, top + h * 0.34);
        ctx.fillStyle = t.colour || '#f2f2f4';
        let size = valueSize;
        font(size, 700);
        while (ctx.measureText(t.value).width > cw - 28 && size > 20) { size -= 2; font(size, 700); }
        ctx.fillText(t.value, cx, top + h * 0.84);
        if (i) { ctx.fillStyle = 'rgba(255, 255, 255, .09)'; ctx.fillRect(px + cw * i - .5, top + h * 0.16, 1, h * 0.68); }
      });
      ctx.textAlign = 'left';
    };
    ctx.textBaseline = 'alphabetic';
    row(head, py + 6, 100, 50, 19);
    ctx.fillStyle = 'rgba(255, 255, 255, .09)'; ctx.fillRect(px + 28, py + 104, pw - 56, 1);
    row(hits, py + 102, 90, 44, 18);

    ctx.fillStyle = 'rgba(255, 255, 255, .35)';
    font(16, 400);
    ctx.fillText(`osu.ppy.sh/scores/${s.id}`, PAD, SIZE.h - 16);
    return canvas;
  }

  async function saveImage(s, f, button) {
    const label = button.textContent;
    button.disabled = true;
    button.textContent = 'Saving…';
    try {
      const canvas = await makeImage(s, f);
      const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/png'));
      if (!blob) throw new Error('could not encode the image');
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = `${s.user.username} - ${s.beatmapset.title} [${s.beatmap.version}].png`.replace(/[\\/:*?"<>|]/g, '_');
      document.body.append(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(a.href), 10000);
      OMP.toast('Saved the score image');
    } catch (e) {
      console.error('[osu! minimal] score image', e);
      OMP.toast('Could not save the image');
    } finally {
      button.disabled = false;
      button.textContent = label;
    }
  }

  const RANK_CLASS = { SS: 'X', X: 'X', S: 'S', A: 'A', B: 'B', C: 'C', D: 'D' };
  const SILVER_MODS = '.score-player__mods .mod__icon--HD, .score-player__mods .mod__icon--FL, .score-player__mods .mod__icon--FI';

  function useHighRes(art) {
    const key = art.className;
    if (art.dataset.hires === key) return;
    art.style.backgroundImage = '';
    const urls = [...getComputedStyle(art).backgroundImage.matchAll(/url\("?([^")]+)"?\)/g)].map((m) => m[1]);
    const hi = urls.find((u) => u.includes('@2x')) || urls[urls.length - 1];
    if (!hi) return;
    art.style.backgroundImage = `url("${hi}")`;
    art.dataset.hires = key;
  }

  function grade() {
    const dial = document.querySelector('.score-info__item--dial');
    const letter = dial && dial.querySelector('.score-dial__layer--grade span');
    if (!dial || !letter) return;
    const base = RANK_CLASS[letter.textContent.trim()];
    if (!base) return;
    const silver = (base === 'X' || base === 'S') && document.querySelector(SILVER_MODS);
    const cls = `legacy-rank--${base}${silver ? 'H' : ''}`;
    let art = dial.querySelector('.legacy-rank');
    if (!art) { art = document.createElement('div'); art.dataset.omp = '1'; dial.append(art); }
    if (art.dataset.grade !== cls) { art.className = `legacy-rank ${cls}`; art.dataset.grade = cls; }
    useHighRes(art);
  }

  function playedLine() {
    const bar = document.querySelector('.score-beatmap');
    const player = document.querySelector('.score-player__row--player');
    if (!bar || !player) return;
    const info = {};
    const cells = [...player.children];
    for (let i = 0; i + 1 < cells.length; i += 2) info[cells[i].textContent.trim()] = cells[i + 1].textContent.trim();
    if (!info['Played by']) return;
    const parts = [`Played by ${info['Played by']}`];
    if (info['Submitted on']) parts[0] += ` on ${info['Submitted on']}`;
    if (info['Played on']) parts.push(info['Played on']);
    const text = parts.join(' \u00b7 ');
    let line = bar.querySelector('.score-beatmap__played');
    if (!line) { line = document.createElement('div'); line.className = 'score-beatmap__played'; bar.append(line); }
    if (line.textContent !== text) line.textContent = text;
  }

  function tagStats() {
    document.querySelectorAll('.score-stats__stat').forEach((tile) => {
      const label = tile.querySelector('.score-stats__stat-row--label');
      const kind = label && label.textContent.trim().toLowerCase();
      if (kind && tile.dataset.kind !== kind) tile.dataset.kind = kind;
    });
  }

  function removeLayoutBits() {
    document.querySelectorAll('.score-beatmap__played, .legacy-rank[data-omp]').forEach((e) => e.remove());
  }

  async function saveImage(s, button) {
    const f = facts(s);
    button.disabled = true;
    try {
      const canvas = await makeImage(s, f);
      const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/png'));
      if (!blob) throw new Error('could not encode the image');
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = `${s.user.username} - ${s.beatmapset.title} [${s.beatmap.version}].png`.replace(/[\\/:*?"<>|]/g, '_');
      document.body.append(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(a.href), 10000);
      OMP.toast('Saved the score image');
    } catch (e) {
      console.error('[osu! minimal] score image', e);
      OMP.toast('Could not save the image');
    } finally {
      button.disabled = false;
    }
  }

  const ICONS = {
    down: '<svg viewBox="0 0 24 24"><path d="M12 3v12M7 10l5 5 5-5M4 20h16"/></svg>',
    link: '<svg viewBox="0 0 24 24"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>',
    image: '<svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="1.6"/><path d="M21 16l-5-5-8 9"/></svg>',
  };

  function copyLink(s) {
    const url = `${location.origin}/scores/${s.id}`;
    const done = () => OMP.toast('Copied the score link');
    const fallback = () => {
      const ta = document.createElement('textarea');
      ta.value = url;
      ta.style.cssText = 'position:fixed;opacity:0';
      document.body.append(ta);
      ta.select();
      try { document.execCommand('copy'); done(); } catch { OMP.toast('Could not copy'); }
      ta.remove();
    };
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(url).then(done, fallback); else fallback();
  }

  function buttons(on) {
    const box = document.querySelector('.score-buttons');
    const old = document.getElementById('omp-actions');
    if (!on || !box) {
      if (old) old.remove();
      document.querySelectorAll('.omp-orig').forEach((e) => e.classList.remove('omp-orig'));
      return;
    }
    const orig = [...box.children].find((b) => b.id !== 'omp-actions' && b.matches && b.matches('.btn-osu-big') && /replay/i.test(b.textContent));
    if (orig) orig.classList.add('omp-orig');
    const sig = orig ? 'r' : '-';
    if (old && old.parentElement === box && old.dataset.sig === sig) return;
    if (old) old.remove();
    const row = document.createElement('div');
    row.id = 'omp-actions';
    row.dataset.sig = sig;
    const btn = (act, icon, title) => `<button type="button" class="omp-act" data-act="${act}" title="${title}" aria-label="${title}">${icon}</button>`;
    row.innerHTML = `${orig ? btn('replay', ICONS.down, 'Download replay') : ''}${btn('link', ICONS.link, 'Copy score link')}${btn('image', ICONS.image, 'Save as image')}`;
    row.addEventListener('click', (e) => {
      const b = e.target.closest('[data-act]');
      if (!b) return;
      const s = read();
      if (b.dataset.act === 'replay') { if (orig) orig.click(); } else if (s && b.dataset.act === 'link') copyLink(s); else if (s && b.dataset.act === 'image') saveImage(s, b);
    });
    box.prepend(row);
  }

  let queued = false;
  function decorate() {
    queued = false;
    const c = OMP.settings();
    if (!SCORE.test(location.pathname) || !document.querySelector('.score-info')) { const old = document.getElementById('omp-actions'); if (old) old.remove(); return; }
    if (c.scoreLayout) { grade(); playedLine(); tagStats(); } else removeLayoutBits();
    buttons(c.scoreImage);
  }
  const schedule = () => { if (!queued) { queued = true; queueMicrotask(() => { try { decorate(); } catch (e) { console.error('[osu! minimal]', e); } }); } };
  new MutationObserver(schedule).observe(document.documentElement, { childList: true, subtree: true });
  OMP.onSettings(schedule);
  schedule();
})();
