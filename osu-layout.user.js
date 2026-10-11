// ==UserScript==
// @name         osu! Wide Profile Layout
// @version      1.2.0
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
.play-detail[data-cover]::before {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  border-radius: var(--border-radius);
  pointer-events: none;
  background-image:
    linear-gradient(90deg, transparent 0%, transparent 30%, var(--bg-main) 70%),
    linear-gradient(rgba(20, 14, 18, .4), rgba(20, 14, 18, .4)),
    var(--cover),
    linear-gradient(var(--bg-main), var(--bg-main));
  background-size: 100% 100%, 70% 100%, 70% auto, 100% 100%;
  background-position: 0 0, left center, left center, 0 0;
  background-repeat: no-repeat;
}
.play-detail[data-cover] {
  min-height: 62px;
  text-shadow: 0 1px 3px rgba(0, 0, 0, .6);
}
.play-detail[data-cover] .play-detail__group--bottom > * {
  align-items: center;
}
.play-detail[data-cover] .play-detail__pp,
.play-detail[data-cover] .play-detail__more {
  align-self: stretch;
}
.play-detail--pin-sortable[data-cover]::before {
  left: var(--pin-sortable-handle-width);
}
.play-detail[data-cover] .play-detail__group--top {
  background-color: transparent;
}
.play-detail[data-cover] .play-detail__score-detail,
.play-detail[data-cover] .play-detail__mods,
.play-detail[data-cover] .play-detail__pp {
  background: transparent;
}
.play-detail[data-cover] .play-detail__pp::before {
  display: none;
}
.play-detail[data-cover] .play-detail__score-detail,
.play-detail[data-cover] .play-detail__mods {
  padding-left: 4px;
  padding-right: 4px;
}
.play-detail__rank-num {
  opacity: .6;
  margin-right: .4em;
  font-weight: 600;
}
`;
document.documentElement.appendChild(style);

function applyScores() {
  document.querySelectorAll(".play-detail-list").forEach((list) => {
    list.querySelectorAll(".play-detail").forEach((row, i) => {
      const link = row.querySelector(".play-detail__title");
      if (!link) return;

      const setId = link.href.match(/beatmapsets\/(\d+)/)?.[1];
      if (setId && !row.dataset.cover) {
        row.dataset.cover = setId;
        row.style.setProperty("--cover", `url(https://assets.ppy.sh/beatmaps/${setId}/covers/cover.jpg)`);
      }

      let num = link.querySelector(".play-detail__rank-num");
      const numbered = [...link.childNodes].some((n) => n !== num && /^\s*#\d+/.test(n.textContent));
      if (numbered) {
        num?.remove();
        return;
      }
      if (!num) {
        num = document.createElement("span");
        num.className = "play-detail__rank-num";
        link.prepend(num);
      }
      const text = `#${i + 1}`;
      if (num.textContent !== text) num.textContent = text;
    });
  });
}

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

new MutationObserver(() => {
  applyScores();
  schedule();
}).observe(document.documentElement, {
  childList: true,
  subtree: true,
});
window.addEventListener("resize", schedule);
applyScores();
