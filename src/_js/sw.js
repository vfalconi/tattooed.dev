const version = 'v2::static';
const staticAssets = [
	'/assets/prism.css',
	'/assets/prism.js',
	'/assets/fathom.js',
	'/assets/image-toggle.js',
	'/assets/fonts/lato/LatoLatin-Regular.woff2',
	'/assets/fonts/lato/LatoLatin-Regular.woff',
	'/assets/fonts/lato/LatoLatin-Italic.woff2',
	'/assets/fonts/lato/LatoLatin-Italic.woff',
	'/assets/fonts/lato/LatoLatin-Bold.woff2',
	'/assets/fonts/lato/LatoLatin-Bold.woff',
	'/assets/fonts/lato/LatoLatin-Black.woff2',
	'/assets/fonts/lato/LatoLatin-Black.woff',
	'/assets/img/portrait-bizness.jpg',
];
const fromCache = (request) => {
	return caches.open(version).then(cache => cache.match(request));
}
const update = (request) => {
	return caches.open(version).then(cache => {
		return fetch(request).then(response => {
			return cache.put(request, response.clone()).then(() => {
				return response;
			});
		});
	});
}
const refresh = (response) => {
	return self.clients.matchAll().then(clients => {
		clients.forEach(client => {
			const message = {
				type: 'refresh',
				url: response.url,
				eTag: response.headers.get('ETag')
			};
			client.postMessage(JSON.stringify(message));
		});
	});
}

self.addEventListener('install', evt => {
	evt.waitUntil(caches.open(version).then(cache => cache.addAll(staticAssets)));
});

self.addEventListener('fetch', evt => {
	const request = evt.request;
	const requestUrl = new URL(request.url);

	if (staticAssets.includes(requestUrl.pathname)) {
		evt.respondWith(fromCache(request));
		evt.waitUntil(update(request).then(refresh));
	}
});
