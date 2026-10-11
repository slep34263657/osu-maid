// ==UserScript==
// @name         osu! Dark Theme
// @version      1.1.0
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
