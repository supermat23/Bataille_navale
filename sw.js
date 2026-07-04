const CACHE_NAME = 'bataille-navale-v3';
const LOCAL_ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon.svg'
];

// Installation : on ne met en cache QUE les fichiers locaux pour éviter les erreurs CORS des CDN
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(LOCAL_ASSETS))
  );
  self.skipWaiting();
});

// Activation : on nettoie les anciens caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)));
    })
  );
  self.clients.claim();
});

// Fetch : Stratégie intelligente
self.addEventListener('fetch', (event) => {
  // On ignore les requêtes qui ne sont pas en GET (comme les WebSockets de PeerJS)
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);

  // 1. Pour la navigation (quand tu ouvres l'app), on force le cache local
  if (event.request.mode === 'navigate') {
    event.respondWith(
      caches.match('./index.html').then(cached => cached || fetch(event.request))
    );
    return;
  }

  // 2. Pour les autres fichiers (Tailwind, PeerJS, polices)
  event.respondWith(
    caches.match(event.request).then((cached) => {
      // Si on a le fichier en cache, on le renvoie (mode hors-ligne)
      if (cached) return cached;

      // Sinon, on va le chercher sur le réseau
      return fetch(event.request).then((response) => {
        // Si le réseau répond bien, on le met en cache pour la prochaine fois
        if (response.ok || response.type === 'opaque') {
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, responseClone));
        }
        return response;
      }).catch(() => {
        // En cas d'échec total, on tente de renvoyer le cache si on en a un
        return cached;
      });
    })
  );
});
