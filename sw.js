self.addEventListener('install', (event) => {
  console.log('[ServiceWorker] Installed');
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  console.log('[ServiceWorker] Activated');
  return self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  // Respuesta simple para habilitar modo offline mínimo
  event.respondWith(
    fetch(event.request).catch(() => {
      return new Response('<h1>Offline</h1>', {
        headers: { 'Content-Type': 'text/html' }
      });
    })
  );
});

// Simulación de background sync (sin funcionalidad real)
self.addEventListener('sync', (event) => {
  console.log('[ServiceWorker] Background sync', event.tag);
});

// Simulación de push (sin notificaciones reales)
self.addEventListener('push', (event) => {
  console.log('[ServiceWorker] Push received');
});
