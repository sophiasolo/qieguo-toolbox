// 切果NOW文案助手 · Service Worker
const CACHE = 'qieguo-copy-v6';
const FILES = ['index.html', 'manifest.json', 'app-icon.png', 'app-icon-ios.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)));
});

// 激活时清除旧缓存
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(k => k !== CACHE).map(k => caches.delete(k))
    ))
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  );
});
