// ⚠️ IMPORTANT : incrémentez ce numéro à CHAQUE mise à jour que vous déployez.
// C'est ce qui force la création d'un nouveau cache et le rejet de l'ancien.
const CACHE_VERSION = 'v3';
const CACHE_NAME = `bataille-navale-${CACHE_VERSION}`;

// Adaptez cette liste au(x) fichier(s) réel(s) de votre site
// (nom exact du HTML, manifest, icônes, etc.)
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './icon.svg',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-maskable-192.png',
  './icons/icon-maskable-512.png',
  './icons/icon-32.png',
  './icons/apple-touch-icon.png'
];

// --- Installation : met en cache les fichiers ET active la nouvelle version SANS ATTENDRE ---
self.addEventListener('install', (event) => {
  self.skipWaiting(); // ne pas attendre la fermeture des onglets existants
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS_TO_CACHE))
  );
});

// --- Activation : supprime les anciens caches ET prend le contrôle des pages déjà ouvertes ---
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

// --- Récupération : réseau en priorité, cache seulement en secours (hors-ligne) ---
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        const copy = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});
