// Reads the listing search responses.
(() => {
  'use strict';

  const SEARCH = '/beatmapsets/search';
  const win = typeof unsafeWindow !== 'undefined' ? unsafeWindow : window;

  const publish = (text) => {
    try {
      const sets = (JSON.parse(text).beatmapsets || []).map((s) => ({ id: s.id, bpm: s.bpm, title: s.title, original: s.title_unicode, artist: s.artist, artistOriginal: s.artist_unicode }));
      if (sets.length) OMP.emitSearch(sets);
    } catch { /* not JSON */ }
  };

  try {
    const open = win.XMLHttpRequest.prototype.open;
    win.XMLHttpRequest.prototype.open = function (method, url) {
      if (String(url).includes(SEARCH)) this.addEventListener('load', () => publish(this.responseText));
      return open.apply(this, arguments);
    };

    const nativeFetch = win.fetch;
    win.fetch = function (input) {
      const promise = nativeFetch.apply(this === undefined || this === null ? win : this, arguments);
      const url = typeof input === 'string' ? input : (input && input.url) || '';
      if (url.includes(SEARCH)) promise.then((res) => res.clone().text()).then(publish).catch(() => {});
      return promise;
    };
  } catch (e) {
    console.error('[osu! minimal] could not watch beatmap searches', e);
  }
})();
