// ==UserScript==
// @name         osu! Wide Profile Layout
// @version      1.1.0
// @match        https://osu.ppy.sh/*
// @updateURL    https://raw.githubusercontent.com/slep34263657/osu-maid/main/osu-layout.user.js
// @downloadURL  https://raw.githubusercontent.com/slep34263657/osu-maid/main/osu-layout.user.js
// @run-at       document-start
// @grant        none
// ==/UserScript==

const style = document.createElement("style");
style.textContent = `
@media (min-width: 1100px) {
  .osu-page--generic-compact:has(.user-profile-pages),
  .header-v4--users .header-v4__content {
    max-width: min(1500px, 94vw);
  }
  .user-profile-pages {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    column-gap: 16px;
    row-gap: 16px;
  }
  .user-profile-pages > [data-page-id="top_ranks"],
  .user-profile-pages > [data-page-id="historical"],
  .user-profile-pages > [data-page-id="medals"] {
    grid-column: 1 / -1;
  }
  .user-profile-pages > .js-sortable--page {
    display: flex;
    margin: 0;
  }
  .user-profile-pages > .osu-fill {
    grid-column: 1 / -1;
  }
  .user-profile-pages > .js-sortable--page > .page-extra {
    flex: 1;
    min-width: 0;
    margin: 0;
    border: 1px solid rgba(255, 255, 255, .06);
    border-radius: 10px;
  }
  .user-profile-pages > [data-page-id="me"] > .page-extra {
    display: flex;
    flex-direction: column;
  }
  .user-profile-pages > [data-page-id="me"] .page-extra__content-overflow-wrapper-outer {
    flex: 1 1 0;
    display: flex;
    flex-direction: column;
    min-height: 400px;
    max-height: none;
  }
  .user-profile-pages > [data-page-id="me"] .page-extra__content-overflow-wrapper-inner {
    flex: 1 1 auto;
    min-height: 0;
    max-height: none;
    height: auto;
  }
}
.header-v4--users .header-v4__row--title {
  display: none;
}
.header-v4--users .header-v4__container--main {
  min-height: 0;
  padding-top: 96px;
}
`;
document.documentElement.appendChild(style);

let queued = false;

function fillLonelyRows() {
  queued = false;
  const grid = document.querySelector(".user-profile-pages");
  if (!grid) return;

  const items = [...grid.children].filter((el) => el.offsetParent !== null);
  items.forEach((el) => el.classList.remove("osu-fill"));

  const rows = new Map();
  items.forEach((el) => {
    const top = Math.round(el.getBoundingClientRect().top);
    rows.set(top, [...(rows.get(top) || []), el]);
  });
  rows.forEach((row) => {
    if (row.length === 1) row[0].classList.add("osu-fill");
  });
}

function schedule() {
  if (queued) return;
  queued = true;
  requestAnimationFrame(fillLonelyRows);
}

new MutationObserver(schedule).observe(document.documentElement, {
  childList: true,
  subtree: true,
});
window.addEventListener("resize", schedule);
