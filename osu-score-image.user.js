// ==UserScript==
// @name         osu! Score Image Export
// @version      1.0.3
// @match        https://osu.ppy.sh/*
// @updateURL    https://raw.githubusercontent.com/slep34263657/osu-maid/main/osu-score-image.user.js
// @downloadURL  https://raw.githubusercontent.com/slep34263657/osu-maid/main/osu-score-image.user.js
// @grant        GM_xmlhttpRequest
// @connect      assets.ppy.sh
// ==/UserScript==

const SCALE = 2;
const ROOTS = [".score-beatmap", ".score-info", ".score-stats__group--stats"];
const SKIP = [
  ".score-info__cover",
  ".score-info__item--buttons",
  ".score-info__item:has(.score-tower)",
  ".score-stats__group--user-card",
  ".osu-score-image-button",
].join(",");

const style = document.createElement("style");
style.textContent = `
.score-buttons {
  gap: 8px;
}
.score-buttons .osu-score-image-button {
  background: rgba(0, 0, 0, .45);
  border: 1px solid rgba(255, 255, 255, .1);
  box-shadow: none;
  cursor: pointer;
}
.score-buttons .osu-score-image-button:hover {
  background: rgba(0, 0, 0, .65);
}
.osu-score-image-message {
  position: fixed;
  left: 50%;
  bottom: 32px;
  z-index: 10000;
  transform: translateX(-50%);
  padding: 10px 18px;
  font-size: 13px;
  color: #fff;
  background: rgba(0, 0, 0, .8);
  border: 1px solid rgba(255, 255, 255, .1);
  border-radius: 10px;
}
`;
document.documentElement.appendChild(style);

const alphaProbe = document.createElement("canvas").getContext("2d", { willReadFrequently: true });
const alphaCache = new Map();

function colorAlpha(color) {
  if (!color || color === "transparent") return 0;
  if (alphaCache.has(color)) return alphaCache.get(color);
  alphaProbe.clearRect(0, 0, 1, 1);
  alphaProbe.fillStyle = "#000";
  alphaProbe.fillStyle = color;
  alphaProbe.fillRect(0, 0, 1, 1);
  const alpha = alphaProbe.getImageData(0, 0, 1, 1).data[3];
  alphaCache.set(color, alpha);
  return alpha;
}

function showMessage(text) {
  document.querySelector(".osu-score-image-message")?.remove();
  const box = document.createElement("div");
  box.className = "osu-score-image-message";
  box.textContent = text;
  document.body.append(box);
  setTimeout(() => box.remove(), 5000);
}

function fetchBlob(url) {
  if (typeof GM_xmlhttpRequest === "function") {
    return new Promise((resolve, reject) => {
      GM_xmlhttpRequest({
        url,
        method: "GET",
        responseType: "blob",
        onload: (res) => {
          if (res.status >= 200 && res.status < 300 && res.response) resolve(res.response);
          else reject(new Error(`HTTP ${res.status}`));
        },
        onerror: () => reject(new Error("network error")),
        ontimeout: () => reject(new Error("timeout")),
      });
    });
  }
  return fetch(url).then((res) => (res.ok ? res.blob() : Promise.reject(new Error(`HTTP ${res.status}`))));
}

function decodeImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`image failed: ${src}`));
    img.src = src;
  });
}

const resolved = new Map();

function loadImage(url) {
  if (resolved.has(url)) return Promise.resolve(resolved.get(url));
  return decodeImage(url)
    .catch(() => null)
    .then((img) => {
      resolved.set(url, img);
      return img;
    });
}

async function loadCover() {
  const el = document.querySelector(".score-info__cover .beatmapset-cover");
  if (!el) return null;

  const cs = getComputedStyle(el);
  const urls = [...`${cs.getPropertyValue("--bg")} ${cs.backgroundImage}`.matchAll(/url\("?([^")]+)"?\)/g)].map((m) => m[1]);
  const hit = urls.find((u) => /assets\.ppy\.sh\/beatmaps\/\d+\/covers\//.test(u));
  if (!hit) return null;

  const base = hit.replace(/covers\/[^?]*(\?.*)?$/, "covers/");
  for (const name of ["raw.jpg", "cover@2x.jpg", "cover.jpg"]) {
    try {
      const blob = await fetchBlob(base + name);
      return await decodeImage(URL.createObjectURL(blob));
    } catch {
      continue;
    }
  }
  return null;
}

function pickUrl(value) {
  const list = urlsOf(value || "");
  return list.find((u) => u.includes("@2x")) || list[0];
}

function urlsOf(value) {
  return [...value.matchAll(/url\("?([^")]+)"?\)/g)].map((m) => m[1]);
}

function effectiveOpacity(el) {
  let opacity = 1;
  for (let node = el; node && node !== document.documentElement; node = node.parentElement) {
    opacity *= parseFloat(getComputedStyle(node).opacity);
  }
  return opacity;
}

function radiusOf(cs, rect) {
  const r = parseFloat(cs.borderTopLeftRadius) || 0;
  return Math.min(r, rect.width / 2, rect.height / 2);
}

function roundedPath(ctx, x, y, w, h, r) {
  ctx.beginPath();
  if (r > 0) ctx.roundRect(x, y, w, h, r);
  else ctx.rect(x, y, w, h);
}

function fitBox(img, box, size, posX, posY) {
  const iw = img.naturalWidth || img.width;
  const ih = img.naturalHeight || img.height;
  let w = iw;
  let h = ih;

  if (size === "contain" || size === "cover") {
    const k = size === "contain" ? Math.min(box.width / iw, box.height / ih) : Math.max(box.width / iw, box.height / ih);
    w = iw * k;
    h = ih * k;
  } else if (size && size !== "auto") {
    const [sw, sh] = size.split(" ");
    const px = (v, total) => (v.endsWith("%") ? (parseFloat(v) / 100) * total : parseFloat(v));
    w = sw && sw !== "auto" ? px(sw, box.width) : null;
    h = sh && sh !== "auto" ? px(sh, box.height) : null;
    if (w == null && h == null) {
      w = iw;
      h = ih;
    } else if (w == null) w = (h / ih) * iw;
    else if (h == null) h = (w / iw) * ih;
  }

  const offset = (pos, free) => (pos.endsWith("%") ? (parseFloat(pos) / 100) * free : parseFloat(pos) || 0);
  return {
    x: box.left + offset(posX, box.width - w),
    y: box.top + offset(posY, box.height - h),
    w,
    h,
  };
}

function drawBackgroundImage(ctx, el, cs, rect, alpha) {
  const url = pickUrl(cs.backgroundImage);
  const img = url && resolved.get(url);
  if (!img) return;

  const fit = fitBox(img, rect, cs.backgroundSize, cs.backgroundPositionX, cs.backgroundPositionY);
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.beginPath();
  ctx.rect(rect.left, rect.top, rect.width, rect.height);
  ctx.clip();
  ctx.drawImage(img, fit.x, fit.y, fit.w, fit.h);
  ctx.restore();
}

function drawMaskedPseudo(ctx, rect, pcs, alpha) {
  const url = urlsOf(pcs.maskImage || pcs.webkitMaskImage || "")[0];
  const img = url && resolved.get(url);
  if (!img) return;

  const color = pcs.backgroundColor;
  if (colorAlpha(color) === 0) return;

  const w = Math.max(1, Math.round(rect.width * SCALE));
  const h = Math.max(1, Math.round(rect.height * SCALE));
  const layer = document.createElement("canvas");
  layer.width = w;
  layer.height = h;
  const lctx = layer.getContext("2d");

  const size = pcs.maskSize || "auto";
  const fit = fitBox(img, { left: 0, top: 0, width: w, height: h }, size, pcs.maskPositionX || "50%", pcs.maskPositionY || "50%");
  lctx.imageSmoothingQuality = "high";
  lctx.drawImage(img, fit.x, fit.y, fit.w, fit.h);
  lctx.globalCompositeOperation = "source-in";
  lctx.fillStyle = color;
  lctx.fillRect(0, 0, w, h);

  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.drawImage(layer, rect.left, rect.top, rect.width, rect.height);
  ctx.restore();
}

function unquote(content) {
  return content.replace(/^["']|["']$/g, "");
}

function drawGlyph(ctx, rect, pcs, alpha) {
  const glyph = unquote(pcs.content);
  if (!glyph.trim()) return;

  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.font = `${pcs.fontStyle} ${pcs.fontWeight} ${pcs.fontSize} ${pcs.fontFamily}`;
  ctx.fillStyle = pcs.color;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(glyph, rect.left + rect.width / 2, rect.top + rect.height / 2);
  ctx.restore();
}

function drawPseudo(ctx, el, which, rect, alpha) {
  const pcs = getComputedStyle(el, which);
  if (pcs.display === "none" || pcs.content === "none" || pcs.content === "normal") return;

  if ((pcs.maskImage && pcs.maskImage !== "none") || (pcs.webkitMaskImage && pcs.webkitMaskImage !== "none")) {
    drawMaskedPseudo(ctx, rect, pcs, alpha);
  } else {
    drawGlyph(ctx, rect, pcs, alpha);
  }
}

function parseShadow(value) {
  if (!value || value === "none") return null;
  const m = value.match(/^(.*?)\s+(-?[\d.]+)px\s+(-?[\d.]+)px\s+([\d.]+)px/);
  return m ? { color: m[1], x: parseFloat(m[2]), y: parseFloat(m[3]), blur: parseFloat(m[4]) } : null;
}

function transformText(text, transform) {
  if (transform === "uppercase") return text.toUpperCase();
  if (transform === "lowercase") return text.toLowerCase();
  if (transform === "capitalize") return text.replace(/\b\p{L}/gu, (c) => c.toUpperCase());
  return text;
}

function textLines(node) {
  const lines = [];
  const re = /\S+/g;
  const text = node.textContent;
  let m;
  while ((m = re.exec(text))) {
    const range = document.createRange();
    range.setStart(node, m.index);
    range.setEnd(node, m.index + m[0].length);
    const rect = range.getClientRects()[0];
    if (!rect) continue;
    const line = lines[lines.length - 1];
    if (line && Math.abs(line.top - rect.top) < 2) {
      line.words.push(m[0]);
      line.right = rect.right;
    } else {
      lines.push({ words: [m[0]], left: rect.left, top: rect.top, right: rect.right, height: rect.height });
    }
  }
  return lines;
}

function drawTextNode(ctx, node, cs, alpha, origin) {
  const fontSize = parseFloat(cs.fontSize);
  const font = `${cs.fontStyle} ${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`;
  const shadow = parseShadow(cs.textShadow);
  const tabular = (cs.fontVariantNumeric || "").includes("tabular");

  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.font = font;
  ctx.fillStyle = cs.color;
  ctx.textAlign = "left";
  ctx.textBaseline = "alphabetic";
  if (cs.letterSpacing && cs.letterSpacing !== "normal") ctx.letterSpacing = cs.letterSpacing;
  if (shadow) {
    ctx.shadowColor = shadow.color;
    ctx.shadowOffsetX = shadow.x * SCALE;
    ctx.shadowOffsetY = shadow.y * SCALE;
    ctx.shadowBlur = shadow.blur * SCALE;
  }

  const ascent = ctx.measureText("Hg").fontBoundingBoxAscent || fontSize * 0.8;

  textLines(node).forEach((line) => {
    const str = transformText(line.words.join(" "), cs.textTransform);
    const baseline = line.top - origin.y + ascent;
    const left = line.left - origin.x;

    if (tabular) {
      const digit = ctx.measureText("0").width;
      const advances = [...str].map((ch) => (/\d/.test(ch) ? digit : ctx.measureText(ch).width));
      const total = advances.reduce((a, b) => a + b, 0);
      const k = total > 0 ? (line.right - line.left) / total : 1;
      let x = left;
      [...str].forEach((ch, i) => {
        const w = advances[i] * k;
        const natural = ctx.measureText(ch).width;
        ctx.fillText(ch, x + (w - natural) / 2, baseline);
        x += w;
      });
    } else {
      ctx.fillText(str, left, baseline);
    }
  });

  ctx.restore();
}

function drawElement(ctx, el, origin) {
  const cs = getComputedStyle(el);
  if (cs.display === "none" || cs.visibility === "hidden") return;

  const r = el.getBoundingClientRect();
  if (r.width === 0 || r.height === 0) return;

  const rect = {
    left: r.left - origin.x,
    top: r.top - origin.y,
    width: r.width,
    height: r.height,
  };
  const alpha = effectiveOpacity(el);

  if (colorAlpha(cs.backgroundColor) > 0) {
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.fillStyle = cs.backgroundColor;
    roundedPath(ctx, rect.left, rect.top, rect.width, rect.height, radiusOf(cs, rect));
    ctx.fill();
    ctx.restore();
  }

  drawBackgroundImage(ctx, el, cs, rect, alpha);

  const bw = parseFloat(cs.borderTopWidth);
  if (bw > 0 && cs.borderTopStyle !== "none" && colorAlpha(cs.borderTopColor) > 0) {
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.strokeStyle = cs.borderTopColor;
    ctx.lineWidth = bw;
    roundedPath(ctx, rect.left + bw / 2, rect.top + bw / 2, rect.width - bw, rect.height - bw, Math.max(0, radiusOf(cs, rect) - bw / 2));
    ctx.stroke();
    ctx.restore();
  }

  drawPseudo(ctx, el, "::before", rect, alpha);

  for (const node of el.childNodes) {
    if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
      drawTextNode(ctx, node, cs, alpha, origin);
    }
  }

  drawPseudo(ctx, el, "::after", rect, alpha);
}

function drawTree(ctx, root, origin) {
  [root, ...root.querySelectorAll("*")].forEach((el) => {
    if (!el.closest(SKIP)) drawElement(ctx, el, origin);
  });
}

function capturedElements() {
  return ROOTS.flatMap((selector) => {
    const root = document.querySelector(selector);
    return root ? [root, ...root.querySelectorAll("*")].filter((el) => !el.closest(SKIP)) : [];
  });
}

function imageUrls() {
  const urls = new Set();
  capturedElements().forEach((el) => {
    if (getComputedStyle(el).display === "none") return;
    const bg = pickUrl(getComputedStyle(el).backgroundImage);
    if (bg) urls.add(bg);
    ["::before", "::after"].forEach((which) => {
      const mask = urlsOf(getComputedStyle(el, which).maskImage || "")[0];
      if (mask) urls.add(mask);
    });
  });
  return [...urls];
}

function fontSpecs() {
  const specs = new Set();
  ROOTS.forEach((selector) => {
    const root = document.querySelector(selector);
    if (!root) return;
    [root, ...root.querySelectorAll("*")].forEach((el) => {
      [null, "::before", "::after"].forEach((pseudo) => {
        const cs = getComputedStyle(el, pseudo);
        if (pseudo && (cs.content === "none" || cs.content === "normal")) return;
        specs.add(`${cs.fontStyle} ${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`);
      });
    });
  });
  return [...specs];
}

async function renderImage() {
  const bar = document.querySelector(".score-beatmap");
  const info = document.querySelector(".score-info");
  if (!bar || !info) throw new Error("score panel not found");

  await Promise.all(fontSpecs().map((spec) => document.fonts.load(spec).catch(() => null)));
  const cover = await loadCover();
  await Promise.all(imageUrls().map(loadImage));

  const barRect = bar.getBoundingClientRect();
  const infoRect = info.getBoundingClientRect();
  const origin = { x: infoRect.left, y: barRect.top };
  const width = Math.round(infoRect.width);
  const height = Math.round(infoRect.bottom - barRect.top);

  const canvas = document.createElement("canvas");
  canvas.width = width * SCALE;
  canvas.height = height * SCALE;
  const ctx = canvas.getContext("2d");
  ctx.scale(SCALE, SCALE);
  ctx.imageSmoothingQuality = "high";

  ctx.fillStyle = getComputedStyle(document.body).backgroundColor || "#121212";
  ctx.fillRect(0, 0, width, height);

  const panel = { left: 0, top: infoRect.top - origin.y, width: infoRect.width, height: infoRect.height };
  const coverBox = document.querySelector(".score-info__cover");
  const coverEl = coverBox?.querySelector(".beatmapset-cover");
  const brightness = parseFloat((coverEl ? getComputedStyle(coverEl).filter.match(/brightness\(([\d.]+)\)/) : null)?.[1] ?? "1");
  const veil = coverBox ? getComputedStyle(coverBox, "::after").backgroundColor : "transparent";

  ctx.save();
  ctx.beginPath();
  ctx.rect(panel.left, panel.top, panel.width, panel.height);
  ctx.clip();
  if (cover) {
    const fit = fitBox(cover, panel, "cover", "50%", "50%");
    ctx.drawImage(cover, fit.x, fit.y, fit.w, fit.h);
  } else {
    ctx.fillStyle = "#3a3a40";
    ctx.fillRect(panel.left, panel.top, panel.width, panel.height);
  }
  if (brightness < 1) {
    ctx.fillStyle = `rgba(0, 0, 0, ${1 - brightness})`;
    ctx.fillRect(panel.left, panel.top, panel.width, panel.height);
  }
  if (colorAlpha(veil) > 0) {
    ctx.fillStyle = veil;
    ctx.fillRect(panel.left, panel.top, panel.width, panel.height);
  }
  ctx.restore();

  ROOTS.forEach((selector) => {
    const root = document.querySelector(selector);
    if (root) drawTree(ctx, root, origin);
  });

  return { canvas, hasCover: Boolean(cover) };
}

function fileName() {
  const player = document.querySelector(".score-beatmap__played")?.textContent.match(/Played by (.+?) on /)?.[1];
  const link = document.querySelector(".score-beatmap__link-plain");
  const title = [...(link?.childNodes || [])].find((n) => n.nodeType === Node.TEXT_NODE)?.textContent.trim();
  const version = document.querySelector(".beatmap-list-item__version-link")?.textContent.trim();
  const parts = [player, title && (version ? `${title} [${version}]` : title)].filter(Boolean);
  return `${(parts.join(" - ") || "osu score").replace(/[\\/:*?"<>|]/g, "")}.png`;
}

function download(canvas) {
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (!blob) {
        reject(new Error("canvas export blocked"));
        return;
      }
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName();
      document.body.append(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 10000);
      resolve();
    }, "image/png");
  });
}

let busy = false;

async function onClick(button) {
  if (busy) return;
  busy = true;
  const label = button.textContent;
  button.textContent = "Rendering...";
  showMessage("Creating image...");
  try {
    const { canvas, hasCover } = await renderImage();
    await download(canvas);
    showMessage(hasCover ? "Image saved." : "Saved without the map background (it could not be loaded).");
  } catch (err) {
    console.error("[score image]", err);
    showMessage(`Could not create the image: ${err.message}`);
  } finally {
    button.textContent = label;
    busy = false;
  }
}

function addButton() {
  const info = document.querySelector(".score-info");
  if (!info || info.querySelector(".osu-score-image-button")) return;

  let buttons = info.querySelector(".score-buttons");
  if (!buttons) {
    const slot = info.querySelector(".score-info__item--buttons") || info.appendChild(Object.assign(document.createElement("div"), { className: "score-info__item score-info__item--buttons" }));
    buttons = slot.appendChild(Object.assign(document.createElement("div"), { className: "score-buttons" }));
  }

  const button = document.createElement("a");
  button.className = "btn-osu-big btn-osu-big--rounded osu-score-image-button";
  button.textContent = "Save image";
  button.addEventListener("click", (event) => {
    event.preventDefault();
    onClick(button);
  });
  buttons.prepend(button);
}

new MutationObserver(addButton).observe(document.documentElement, {
  childList: true,
  subtree: true,
});
addButton();
