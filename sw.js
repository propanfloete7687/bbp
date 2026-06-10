const CACHE = 'bbp-trainer-v1';
const FILES = [
  '/bbp-trainer/',
  '/bbp-trainer/index.html',
  '/bbp-trainer/manifest.json',
  '/bbp-trainer/icon-192.png',
  '/bbp-trainer/icon-512.png'
];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)));
  self.skipWaiting();
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.map(k => caches.delete(k)))));
  self.clients.claim();
});
self.addEventListener('fetch', e => {
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
});