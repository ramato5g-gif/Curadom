const CACHE = 'curadom-v1';
self.addEventListener('install', e => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(clients.claim()));
self.addEventListener('fetch', e => e.respondWith(
  caches.open(CACHE).then(cache =>
    cache.match(e.request).then(r => r || fetch(e.request).then(res => {
      cache.put(e.request, res.clone()); return res;
    }).catch(() => r))
  )
));
