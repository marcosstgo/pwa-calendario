self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('mi-cache-v1').then(function(cache) {
      return cache.addAll([
        '/',
        '/index.html',
        '/manifest.json',
        '/icono-192x192.png',
        '/icono-512x512.png'
      ]);
    })
  );
});

self.addEventListener('activate', function(event) {
  const cacheAllowlist = ['mi-cache-v1'];
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (!cacheAllowlist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});
