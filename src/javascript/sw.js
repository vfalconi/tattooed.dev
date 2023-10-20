const version = '[[:CACHE_ID:]]';
const staticAssets = [ '[[:ASSETS_ARRAY:]]' ];

const fromCache = (request) => {
	return caches.open(version).then((cache) => cache.match(request));
};

const update = (request) => {
	return caches.open(version).then((cache) => {
		return fetch(request).then((response) => {
			return cache.put(request, response.clone()).then(() => {
				return response;
			}).catch(e=>console.log(e));
		}).catch(e=>console.log(e));
	}).catch(e=>console.log(e));
};

const refresh = (response) => {
	return self.clients.matchAll().then((clients) => {
		clients.forEach((client) => {
			const message = {
				type: 'refresh',
				url: response.url,
				eTag: response.headers.get('ETag'),
			};
			client.postMessage(JSON.stringify(message));
		});
	});
};

self.addEventListener('install', (evt) => {
	caches.keys().then(keys => {
		keys.forEach(key => {
			if (version !== key) {
				caches.delete(key);
			}
		});
	}).catch(e=>console.log(e));
	evt.waitUntil(caches.open(version).then((cache) => cache.addAll(staticAssets)).catch(e=>console.log(e)));
});

self.addEventListener('fetch', (evt) => {
	const request = evt.request;
	const requestUrl = new URL(request.url);

	if (staticAssets.includes(requestUrl.pathname)) {
		evt.respondWith(fromCache(request));
		evt.waitUntil(update(request).then(refresh));
	}
});
