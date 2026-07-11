const CACHE_VERSION = "v10-force-heal";
const CACHE_NAME = `bataille-navale-${CACHE_VERSION}`;

const ASSETS_TO_CACHE = [
    "./",
    "./index.html",
    "./manifest.json",
    "./icon.svg",
    "./icons/icon-32.png",
    "./icons/icon-192.png",
    "./icons/icon-512.png",
    "./icons/icon-maskable-192.png",
    "./icons/icon-maskable-512.png",
    "./icons/apple-touch-icon.png",
    "https://cdn.tailwindcss.com",
    "https://unpkg.com/peerjs@1.5.2/dist/peerjs.min.js",
    "https://fonts.googleapis.com/css2?family=Black+Ops+One&family=Rajdhani:wght@300;400;500;600;700&display=swap"
];

self.addEventListener("install", event => {
    self.skipWaiting();
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            // allSettled empêche l'installation de planter si une icône est manquante (404)
            return Promise.allSettled(ASSETS_TO_CACHE.map(url => cache.add(url)));
        })
    );
});

self.addEventListener("activate", event => {
    event.waitUntil(
        caches.keys()
            .then(keys => Promise.all(
                keys
                    .filter(key => key !== CACHE_NAME) // Détruit l'ancien cache v8 et v9
                    .map(key => caches.delete(key))
            ))
            .then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', event => {
  if (event.request.url.includes('peerjs.com') || event.request.url.includes('wss://')) return;

  // Stratégie "Network First" pour le HTML
  if (event.request.mode === 'navigate' || event.request.url.endsWith('index.html')) {
    event.respondWith(
      fetch(event.request).then(networkResponse => {
        if (networkResponse && networkResponse.status === 200) {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, responseToCache));
        }
        return networkResponse;
      }).catch(() => caches.match(event.request).then(response => response || caches.match('./index.html')))
    );
    return;
  }

  // Stratégie "Cache First" pour le reste
  event.respondWith(
    caches.match(event.request).then(response => {
      if (response) return response;
      return fetch(event.request).then(networkResponse => {
        if (networkResponse && networkResponse.status === 200 && event.request.method === 'GET') {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, responseToCache));
        }
        return networkResponse;
      }).catch(() => {
        if (event.request.mode === 'navigate') return caches.match('./index.html');
      });
    })
  );
});