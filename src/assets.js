// Fetches images through the script manager.
(() => {
  'use strict';

  const HOSTS = new Set(['assets.ppy.sh', 'a.ppy.sh', 'raw.githubusercontent.com']);

  OMP.blob = (url) => new Promise((resolve) => {
    let u;
    try { u = new URL(url); } catch { resolve(null); return; }
    if (u.protocol !== 'https:' || !HOSTS.has(u.hostname)) { resolve(null); return; }

    if (typeof GM_xmlhttpRequest === 'function') {
      try {
        GM_xmlhttpRequest({
          url: u.href,
          method: 'GET',
          responseType: 'blob',
          timeout: 20000,
          onload: (r) => resolve(r.status >= 200 && r.status < 300 && r.response ? r.response : null),
          onerror: () => resolve(null),
          ontimeout: () => resolve(null),
        });
        return;
      } catch { /* fall back to a plain request */ }
    }
    fetch(u.href).then((r) => (r.ok ? r.blob() : null)).then(resolve).catch(() => resolve(null));
  });
})();
