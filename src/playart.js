// Beatmap cover on profile score cards.
(() => {
  'use strict';

  let queued = false;

  function decorate() {
    queued = false;
    document.querySelectorAll('.play-detail:not([data-omp-art])').forEach((card) => {
      const id = ((card.querySelector('.play-detail__title') || {}).href || '').match(/beatmapsets\/(\d+)/)?.[1];
      if (!id) return;
      card.dataset.ompArt = id;
      card.style.setProperty('--omp-art', `url("https://assets.ppy.sh/beatmaps/${id}/covers/cover.jpg")`);
    });
  }

  const schedule = () => { if (!queued) { queued = true; queueMicrotask(decorate); } };
  new MutationObserver(schedule).observe(document.documentElement, { childList: true, subtree: true });
  schedule();
})();
