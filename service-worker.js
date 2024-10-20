const CACHE_NAME = 'my-cache-v1';
const urlsToCache = [
  '/myApp2/',
  '/myApp2/index.html',
  '/myApp2/styles.css',
  '/myApp2/script.js',
  '/myApp2/manifest.json',
  '/myApp2/icons/icon-192x192.png',
  '/myApp2/icons/icon-512x512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
