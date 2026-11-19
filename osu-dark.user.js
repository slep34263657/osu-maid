// ==UserScript==
// @name         osu! Dark Theme
// @version      1.3.1
// @match        https://osu.ppy.sh/*
// @updateURL    https://raw.githubusercontent.com/slep34263657/osu-maid/main/osu-dark.user.js
// @downloadURL  https://raw.githubusercontent.com/slep34263657/osu-maid/main/osu-dark.user.js
// @run-at       document-start
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_registerMenuCommand
// ==/UserScript==

const PALETTES = {
  grey: { b: [28, 20, 16, 12, 9, 7], d: [27, 22, 17, 12, 8, 5], header: 0.45, triangles: 0.6 },
  black: { b: [20, 13, 9, 6, 3, 0], d: [18, 14, 10, 6, 3, 0], header: 0.3, triangles: 0.4 },
};

const NOT_USER_PAGE = "body:not(:has(.header-v4--users))";

const style = document.createElement("style");
document.documentElement.appendChild(style);

function render() {
  const palette = PALETTES[GM_getValue("mode", "grey")];
  if (!palette) {
    style.textContent = "";
    return;
  }
  const vars = (name, levels) => levels.map((l, i) => `--hsl-${name}${i + 1}: 0, 0%, ${l}%;`).join("");
  style.textContent = `
html body { ${vars("b", palette.b)} ${vars("d", palette.d)} }
${NOT_USER_PAGE} .header-v4__bg { filter: grayscale(1) brightness(${palette.header}); }
${NOT_USER_PAGE} .nav2-header__triangles { filter: grayscale(1) brightness(${palette.triangles}); }
${NOT_USER_PAGE} .nav2-header__transition-overlay { background-color: hsl(var(--hsl-b5)); }
.beatmapset-header__buttons .btn-osu-big {
  --bg: rgba(0, 0, 0, .5);
  --hover-bg: rgba(0, 0, 0, .7);
  --colour: #fff;
  --hover-colour: #fff;
  backdrop-filter: blur(6px);
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, .06);
}
.beatmapset-header__buttons .btn-osu-big--beatmapset-header-square-unfavourite {
  --colour: hsl(var(--hsl-pink-1));
  --hover-colour: hsl(var(--hsl-pink-1));
}
html:has(.tocify-wrapper), html:has(.tocify-wrapper) body { background: hsl(var(--hsl-b5)); }
.page-wrapper { background: hsl(var(--hsl-b5)); color: #d8d8d8; }
.page-wrapper .content, .page-wrapper .content * { text-shadow: none; }
.page-wrapper .content, .page-wrapper .content :is(p, li, td, th, h1, h2, h3, h4, h5, strong, em, b, span, label, summary, small) { color: #d8d8d8; }
.page-wrapper .content h1 { background-image: none; background-color: hsl(var(--hsl-b4)); border-color: hsl(var(--hsl-b3)); }
.page-wrapper .content h2 { background-image: none; border-color: hsl(var(--hsl-b3)); }
.page-wrapper .content h3 { border-color: hsl(var(--hsl-b3)); }
.page-wrapper .content a { color: #7cc4ff; }
.page-wrapper .content a.badge, .page-wrapper .content a.badge * { color: #fff; }
.page-wrapper .content code { background-color: rgba(255, 255, 255, .08); }
.page-wrapper .content table, .page-wrapper .content th, .page-wrapper .content td { border-color: hsl(var(--hsl-b3)); }
.page-wrapper .content td { background-color: rgba(255, 255, 255, .03); }
.page-wrapper .content tr:nth-child(even) td { background-color: rgba(255, 255, 255, .06); }
.page-wrapper .content h4.fancy-heading-panel { background-color: hsl(var(--hsl-b3)); color: #fff; }
.page-wrapper .content input { background-color: hsl(var(--hsl-b3)); color: #fff; border-color: hsl(var(--hsl-b2)); }
.page-wrapper .content hr { border-color: hsl(var(--hsl-b3)); }
.tocify-wrapper { background-color: hsl(var(--hsl-b6)); }
.tocify-wrapper input.search { background-color: hsl(var(--hsl-b4)); }
.tocify-wrapper ul.tocify-subheader { background-color: hsl(var(--hsl-b5)); }
.page-wrapper .dark-box { background-color: hsl(var(--hsl-b4)); }
.page-wrapper pre, .page-wrapper blockquote, .page-wrapper aside.notice { background-color: hsl(var(--hsl-b6)); }
`;
}

function setMode(mode) {
  GM_setValue("mode", mode);
  render();
}

GM_registerMenuCommand("Theme: dark grey", () => setMode("grey"));
GM_registerMenuCommand("Theme: pitch black", () => setMode("black"));
GM_registerMenuCommand("Theme: off", () => setMode("off"));

render();
