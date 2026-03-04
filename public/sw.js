const CACHE_NAME = 'flenschool-v1';
const STATIC_ASSETS = [
  '/',
  '/subjects',
  '/focus',
  '/progress',
  '/manifest.json',
  '/icons/apple-touch-icon.png',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);

  // Only cache same-origin requests
  if (url.origin !== self.location.origin) return;

  event.respondWith(
    caches.match(event.request).then((cached) => {
      const networkFetch = fetch(event.request)
        .then((response) => {
          if (response.ok) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          }
          return response;
        })
        .catch((err) => {
          console.warn('[SW] Network request failed, serving offline fallback:', err);
          if (cached) return cached;
          // Return a minimal offline fallback for navigation requests
          if (event.request.mode === 'navigate') {
            return caches.match('/').then((root) => root || new Response('Offline – please reconnect to use FLENschool.', {
              status: 503,
              headers: { 'Content-Type': 'text/plain' },
            }));
          }
          return new Response('Offline', { status: 503 });
        });

      // Return cached version immediately if available, otherwise wait for network
      return cached || networkFetch;
    })
  );
});
