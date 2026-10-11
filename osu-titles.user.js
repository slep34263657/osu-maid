// ==UserScript==
// @name         osu! Custom Titles
// @version      1.2.6
// @match        https://osu.ppy.sh/*
// @updateURL    https://raw.githubusercontent.com/slep34263657/osu-maid/main/osu-titles.user.js
// @downloadURL  https://raw.githubusercontent.com/slep34263657/osu-maid/main/osu-titles.user.js
// @grant        none
// ==/UserScript==

const TITLES = {
  19249802: { text: "Mold Emperor", color: "#6b8e23" },
};

const style = document.createElement("style");
style.textContent = `
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
document.head.appendChild(style);

function profileId() {
  const href = document.querySelector("link[rel=canonical]")?.href || "";
  return href.match(/\/users\/(\d+)/)?.[1];
}

function applyTitle() {
  const nameEl = document.querySelector(".profile-info__name");
  if (!nameEl) return;

  const entry = TITLES[profileId()];
  if (!entry) return;

  let titleEl = document.querySelector(".profile-info__title");
  if (!titleEl) {
    titleEl = document.createElement("span");
    titleEl.className = "profile-info__title";
    nameEl.after(titleEl);
  }
  if (titleEl.textContent !== entry.text) titleEl.textContent = entry.text;
  titleEl.style.color = entry.color;
}

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

function apply() {
  applyTitle();
  applyScores();
}

new MutationObserver(apply).observe(document.body, {
  childList: true,
  subtree: true,
});
apply();
