const CACHE_NAME = "mecanica-facil-v1";

const urlsToCache = [
  "/index.html",
  "/baterias.html",
  "/Frenos.html",
  "/llantas.html",
  "/niveles.html",
  "/servicios.html",
  "/manifest.json",
  "/service-worker.js",
  "/img/logo.png"   // Ruta del logo según el manifest
];

// Instalar y cachear archivos
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
  self.skipWaiting();
});

// Activar y limpiar cachés viejos
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      )
    )
  );
  self.clients.claim();
});

// Interceptar peticiones
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return (
        cachedResponse ||
        fetch(event.request).catch(() =>
          caches.match("/index.html") // Opcional: reemplazar por una página offline.html si la tienes
        )
      );
    })
  );
});
