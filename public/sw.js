const CACHE_NAME = 'image-cache-v1';

// Instalación del Service Worker
self.addEventListener('install', (event) => {
  self.skipWaiting(); // Activar inmediatamente
  console.log('Service Worker instalado');
});


self.addEventListener('fetch', (event) => {

  if (event.request.method !== 'GET') return;
  
  const url = new URL(event.request.url);
  const isImage = event.request.destination === 'image' || 
                 url.pathname.match(/\.(jpg|jpeg|png|gif|webp|svg)$/i);
  
  if (isImage) {
    event.respondWith(
      caches.match(event.request).then((response) => {
        // Si la respuesta está en la caché, la devuelve 
        if (response) {
            console.log('Imagen encontrada en caché:', event.request.url);
          return response;
        }
        
        // Si no está en la caché, hace la solicitud a la red
        return fetch(event.request).then((networkResponse) => {
          
          if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
            return networkResponse;
          }
          
          // Almacena la nueva respuesta en la caché antes de devolverla
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
            console.log('Imagen cacheada:', event.request.url);
          });
          
          return networkResponse;
        }).catch(error => {
          console.error('Error en fetch:', error);
          throw error;
        });
      })
    );
  } else {
    
    event.respondWith(fetch(event.request));
  }
});


self.addEventListener('activate', (event) => {
  console.log('Service Worker activado');
});