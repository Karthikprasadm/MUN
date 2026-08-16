const CACHE_NAME = 'mun-cache-v1';
const PRECACHE_ASSETS = [
  '/',
  '/team',
  '/stay-connected',
  '/404',
  '/assets/Logos/25_logo.png',
  '/assets/Logos/MUN_logo.png'
];

// Install Event - Pre-cache critical pages and logos
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_ASSETS);
    }).then(() => self.skipWaiting())
  );
});

// Activate Event - Clean up old caches
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch Event - Stale-While-Revalidate Strategy
self.addEventListener('fetch', (e) => {
  // Only handle GET requests and ignore chrome-extension / third-party protocols
  if (e.request.method !== 'GET' || !e.request.url.startsWith(self.location.origin)) {
    return;
  }

  e.respondWith(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.match(e.request).then((cachedResponse) => {
        const fetchPromise = fetch(e.request).then((networkResponse) => {
          // If valid response, update the cache
          if (networkResponse && networkResponse.status === 200) {
            cache.put(e.request, networkResponse.clone());
          }
          return networkResponse;
        }).catch(() => {
          // Offline fallback
          return cachedResponse;
        });

        // Return cached version immediately if exists, otherwise wait for network
        return cachedResponse || fetchPromise;
      });
    })
  );
});
