// ============================================================================
// Service Worker - Bataille Navale
// Incrémenter CACHE_VERSION à chaque nouvelle mise à jour
// ============================================================================

const CACHE_VERSION = "v8";
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
    "./icons/apple-touch-icon.png"
];

// ---------------------------------------------------------------------------
// Installation
// ---------------------------------------------------------------------------
self.addEventListener("install", event => {

    self.skipWaiting();

    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(ASSETS_TO_CACHE))
    );

});

// ---------------------------------------------------------------------------
// Activation
// ---------------------------------------------------------------------------
self.addEventListener("activate", event => {

    event.waitUntil(

        caches.keys()

            .then(keys => Promise.all(

                keys
                    .filter(key => key !== CACHE_NAME)
                    .map(key => caches.delete(key))

            ))

            .then(() => self.clients.claim())

    );

});

// ---------------------------------------------------------------------------
// Fetch
// Réseau d'abord, cache en secours
// ---------------------------------------------------------------------------
self.addEventListener('fetch', event => {
  // On ne cache pas les requêtes de connexion WebRTC de PeerJS
  if (event.request.url.includes('peerjs.com') || event.request.url.includes('wss://')) {
    return;
  }

  // Stratégie "Network First" pour index.html (pour forcer les mises à jour)
  if (event.request.mode === 'navigate' || event.request.url.endsWith('index.html')) {
    event.respondWith(
      fetch(event.request).then(networkResponse => {
        if (networkResponse && networkResponse.status === 200) {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseToCache);
          });
        }
        return networkResponse;
      }).catch(() => {
        return caches.match(event.request).then(response => {
          return response || caches.match('./index.html');
        });
      })
    );
    return;
  }

  // Stratégie "Cache First" pour le reste (CSS, JS, polices)
  event.respondWith(
    caches.match(event.request).then(response => {
      if (response) {
        return response;
      }
      return fetch(event.request).then(networkResponse => {
        if (networkResponse && networkResponse.status === 200 && event.request.method === 'GET') {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseToCache);
          });
        }
        return networkResponse;
      }).catch(() => {
        if (event.request.mode === 'navigate') {
          return caches.match('./index.html');
        }
      });
    })
  );
});