const CACHE_NAME = "mecanica-facil-cache-v1";
const OFFLINE_URL = "index.html";

importScripts("https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js");

// Cachear el index para modo offline
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.add(OFFLINE_URL);
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  self.clients.claim();
});

if (workbox.navigationPreload.isSupported()) {
  workbox.navigationPreload.enable();
}

workbox.routing.registerRoute(
  ({ request }) => request.mode === "navigate",
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: CACHE_NAME,
  })
);

// 🟢 Manejo real de background sync
self.addEventListener("sync", (event) => {
  if (event.tag === "sync-datos") {
    event.waitUntil(
      (async () => {
        console.log("[SW] Background sync ejecutado");
        // Aquí podrías reenviar datos guardados si los tuvieras
      })()
    );
  }
});

// 🟢 Periodic Sync real
self.addEventListener("periodicsync", (event) => {
  if (event.tag === "sync-periodico") {
    event.waitUntil(
      (async () => {
        console.log("[SW] Periodic sync ejecutado");
        // Aquí podrías refrescar datos si fuera necesario
      })()
    );
  }
});

// 🟢 Push Notifications reales
self.addEventListener("push", (event) => {
  const data = event.data ? event.data.text() : "Mensaje por defecto";
  self.registration.showNotification("Notificación", {
    body: data,
    icon: "img/logo.png"
  });
});
