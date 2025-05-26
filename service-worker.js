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
  "/img/logo.png"
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
          caches.match("/index.html")
        )
      );
    })
  );
});

// Simulación básica de background sync
self.addEventListener("sync", (event) => {
  console.log("[ServiceWorker] Background sync triggered:", event.tag);
  // Puedes agregar lógica personalizada aquí si lo deseas
});

// Simulación de notificaciones push
self.addEventListener("push", (event) => {
  console.log("[ServiceWorker] Push event recibido");
  // También puedes usar self.registration.showNotification(...) si luego lo necesitas
});
