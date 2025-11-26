const CACHE_NAME = 'website-cache-v1';
const FILES_TO_CACHE = [
	'/css/main.css',
	'/css/style.css',
	'/js/main.js',
	'/site.webmanifest',
	'/icon.png',
];

self.addEventListener('install', function (e) {
	// console.log('[ServiceWorker] Install');

	e.waitUntil(
		caches.open(CACHE_NAME).then(function (cache) {
			return cache.addAll(FILES_TO_CACHE);
		}).then(function () {
			// console.log('[ServiceWorker] Files cached')
		})
	);

	self.skipWaiting();
});

self.addEventListener('activate', function (e) {
	// console.log('[ServiceWorker] Activate');

	self.clients.claim();

	// Remove old cache
	e.waitUntil(
		caches.keys().then(function (keyList) {
			return Promise.all(keyList.map(function (key) {
				if (key !== CACHE_NAME) {
					// console.log('[ServiceWorker] Removing old cache', key);
					return caches.delete(key);
				}
			}));
		})
	);
});

self.addEventListener('fetch', function (e) {
	// Return from cache or fetch, cache first strategy, then ...
	e.respondWith(
		caches.open(CACHE_NAME).then(function (cache) {
			return cache.match(e.request).then(function (response) {
				// console.log('[ServiceWorker] Fetch', e.request.url);
				return response || fetch(e.request);
			});
		})
	);

	// ... update cache

	const requestUri = getRequestUri(e.request);

	if (!(FILES_TO_CACHE.indexOf(requestUri) > -1)) return;

	e.waitUntil(
		caches.open(CACHE_NAME).then(function (cache) {
			return fetch(e.request).then(function (response) {
				if (FILES_TO_CACHE.indexOf(requestUri) > -1) {
					// console.log('[ServiceWorker] Fetch into cache', e.request.url);
					return cache.put(e.request, response);
				}

				return;
			}).catch(function (err) {
				// console.log(err);
			});
		})
	);

	// Network first, cache second strategy
	// e.respondWith(
	// 	caches.open(CACHE_NAME).then(function (cache) {
	// 		return fetch(e.request).then(function (response) {
	// 			if (response.status === 200) {
	// 				cache.put(e.request.url, response.clone());
	// 			}

	// 			return response;
	// 		}).catch((err) => {
	// 			return cache.match(e.request);
	// 		});
	// 	})
	// );
});

function getRequestUri(request) {
	const urlParts = request.url.split('/');
	urlParts.splice(0, 3);

	return '/' + urlParts.join('/');
}
