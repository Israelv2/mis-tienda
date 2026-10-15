// Guarda la app en el equipo para que abra rápido y funcione sin internet.
const V = 'mitienda-v1';
const FILES = ["./", "index.html", "app.js", "firebase-config.js", "manifest.webmanifest", "catalogo-c15.json", "libs/pdf.min.js", "libs/firebase-firestore-compat.js", "libs/xlsx.full.min.js", "libs/pdf.worker.min.js", "libs/firebase-app-compat.js", "libs/firebase-auth-compat.js", "libs/jspdf.umd.min.js", "fonts/figtree-latin-600-normal.woff2", "fonts/bodoni-moda-latin-500-italic.woff2", "fonts/figtree-latin-700-normal.woff2", "fonts/ibm-plex-mono-latin-400-normal.woff2", "fonts/figtree-latin-400-normal.woff2", "fonts/bodoni-moda-latin-700-normal.woff2", "fonts/ibm-plex-mono-latin-500-normal.woff2", "fonts/figtree-latin-500-normal.woff2", "fonts/bodoni-moda-latin-500-normal.woff2", "img/natura_32.jpg", "img/natura_36.jpg", "img/avon_35.jpg", "img/avon_57.jpg", "img/avon_47.jpg", "img/natura_33.jpg", "img/natura_40.jpg", "img/natura_24.jpg", "img/natura_26.jpg", "img/avon_43.jpg", "img/avon_6.jpg", "img/natura_45.jpg", "img/natura_1.jpg", "img/natura_44.jpg", "img/avon_13.jpg", "img/avon_71.jpg", "img/avon_1.jpg", "img/natura_71.jpg", "img/avon_51.jpg", "img/avon_15.jpg", "img/natura_34.jpg", "icons/icon-192.png", "icons/icon-512.png"];
self.addEventListener('install', e => { e.waitUntil(caches.open(V).then(c => c.addAll(FILES)).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== V).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', e => {
  const u = new URL(e.request.url);
  if (e.request.method !== 'GET' || u.origin !== location.origin) return;
  // red primero (para recibir mejoras), si no hay internet usa la copia guardada
  e.respondWith(fetch(e.request).then(r => { const c = r.clone(); caches.open(V).then(x => x.put(e.request, c)); return r; }).catch(() => caches.match(e.request, { ignoreSearch: true })));
});
