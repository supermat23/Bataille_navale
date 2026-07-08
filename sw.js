// ============================================================================
// Service Worker - Bataille Navale
// Incrémenter CACHE_VERSION à chaque nouvelle mise à jour
// ============================================================================

const CACHE_VERSION = "v6";
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
self.addEventListener("fetch", event => {

    if (event.request.method !== "GET") return;

    // Ignore les requêtes autres que http(s)
    if (!event.request.url.startsWith("http")) return;

    event.respondWith(

        fetch(event.request)

            .then(response => {

                // On ne met en cache que les réponses valides
                if (response.ok) {

                    const copy = response.clone();

                    caches.open(CACHE_NAME)
                        .then(cache => cache.put(event.request, copy));

                }

                return response;

            })

            .catch(() => {

                return caches.match(event.request);

            })

    );

});