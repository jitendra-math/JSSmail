import { build, files, version } from '$service-worker';

const CACHE_NAME = `jss-mail-cache-${version}`;
const ASSETS = [...build, ...files];

self.addEventListener('install', (event) => {
	event.waitUntil(
		caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
	);
});

self.addEventListener('activate', (event) => {
	event.waitUntil(
		caches.keys().then((keys) => {
			return Promise.all(
				keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
			);
		})
	);
});

self.addEventListener('fetch', (event) => {
	if (event.request.method !== 'GET') return;

	event.respondWith(
		caches.match(event.request).then((cacheResponse) => {
			if (cacheResponse) return cacheResponse;

			return fetch(event.request).then((networkResponse) => {
				return networkResponse;
			}).catch(() => {
				if (event.request.mode === 'navigate') {
					return caches.match('/');
				}
			});
		})
	);
});
