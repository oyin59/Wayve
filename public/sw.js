const CACHE_NAME = "wayve-pwa-v1";
const OFFLINE_URL = "/offline.html";
const APP_SHELL = [OFFLINE_URL, "/wayve-icon.svg"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)),
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames
          .filter((cacheName) => cacheName.startsWith("wayve-pwa-") && cacheName !== CACHE_NAME)
          .map((cacheName) => caches.delete(cacheName)),
      ),
    ).then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  const url = new URL(request.url);

  if (request.method !== "GET" || url.origin !== self.location.origin) {
    return;
  }

  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response.ok && !url.search) {
            return caches
              .open(CACHE_NAME)
              .then((cache) => cache.put(request, response.clone()))
              .then(() => response);
          }
          return response;
        })
        .catch(async () => {
          const cachedPage = await caches.match(request);
          return cachedPage || (await caches.match(OFFLINE_URL));
        }),
    );
    return;
  }

  if (["script", "style", "image", "font"].includes(request.destination)) {
    event.respondWith(caches.match(request).then((cached) => {
      const update = fetch(request)
        .then((response) => {
          if (!response.ok) return response;
          return caches
            .open(CACHE_NAME)
            .then((cache) => cache.put(request, response.clone()))
            .then(() => response);
        })
        .catch((error) => {
          if (cached) return cached;
          throw error;
        });

      return cached || update;
    }));
  }
});
