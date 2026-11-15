// Lingo555 PWA Service Worker v2 (Ultra Fast & Always Fresh)
const CACHE_NAME = 'lingo555-v2-nocache';

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          console.log('[SW] Purging cache:', key);
          return caches.delete(key);
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // 1. Always pass API requests and HTML documents directly to network (never serve stale cache)
  if (
    url.pathname.startsWith('/api/') || 
    event.request.mode === 'navigate' || 
    url.pathname === '/' || 
    url.pathname.endsWith('.html') ||
    url.pathname === '/sw.js'
  ) {
    event.respondWith(fetch(event.request));
    return;
  }

  // 2. Network-first with fallback for static assets (js, css, images)
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});
