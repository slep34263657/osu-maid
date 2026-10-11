// ==UserScript==
// @name         osu! Leaderboard Minutes
// @version      1.0.0
// @match        https://osu.ppy.sh/*
// @updateURL    https://raw.githubusercontent.com/slep34263657/osu-maid/main/beatmap-leaderboard.user.js
// @downloadURL  https://raw.githubusercontent.com/slep34263657/osu-maid/main/beatmap-leaderboard.user.js
// @run-at       document-start
// @grant        none
// ==/UserScript==

function fixTimes() {
  document.querySelectorAll(".beatmap-scoreboard-table time").forEach((el) => {
    const node = el.firstChild;
    if (!node || node.nodeType !== Node.TEXT_NODE || node.nodeValue.trim() !== "now") return;
    const age = Date.now() - new Date(el.getAttribute("title")).getTime();
    const minutes = Math.floor(age / 60000);
    if (minutes >= 1 && minutes < 60) node.nodeValue = `${minutes}m`;
  });
}

new MutationObserver(fixTimes).observe(document.documentElement, {
  childList: true,
  subtree: true,
});
fixTimes();
