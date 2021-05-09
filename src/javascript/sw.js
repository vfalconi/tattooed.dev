const version = 'v3::static';
const staticAssets = [
	'/assets/prism-tomorrow.css',
	'/assets/prism.js',
	'/assets/fathom.js',
	'/assets/fonts/lato/LatoLatin-Regular.woff2',
	'/assets/fonts/lato/LatoLatin-Regular.woff',
	'/assets/fonts/lato/LatoLatin-Italic.woff2',
	'/assets/fonts/lato/LatoLatin-Italic.woff',
	'/assets/fonts/lato/LatoLatin-Bold.woff2',
	'/assets/fonts/lato/LatoLatin-Bold.woff',
	'/assets/fonts/lato/LatoLatin-Black.woff2',
	'/assets/fonts/lato/LatoLatin-Black.woff',
	'/assets/img/homepage-portrait-1x.avif',
	'/assets/img/homepage-portrait-1.5x.avif',
	'/assets/img/homepage-portrait-2x.avif',
	'/assets/img/homepage-portrait-1x.webp',
	'/assets/img/homepage-portrait-1.5x.webp',
	'/assets/img/homepage-portrait-2x.webp',
	'/assets/img/homepage-portrait-1x.jpg',
	'/assets/img/homepage-portrait-1.5x.jpg',
	'/assets/img/homepage-portrait-2x.jpg',
];
const fromCache = (request) => {
	return caches.open(version).then((cache) => cache.match(request));
};
const update = (request) => {
	return caches.open(version).then((cache) => {
		return fetch(request).then((response) => {
			return cache.put(request, response.clone()).then(() => {
				return response;
			});
		});
	});
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
	evt.waitUntil(caches.open(version).then((cache) => cache.addAll(staticAssets)));
});

self.addEventListener('fetch', (evt) => {
	const request = evt.request;
	const requestUrl = new URL(request.url);

	if (staticAssets.includes(requestUrl.pathname)) {
		evt.respondWith(fromCache(request));
		evt.waitUntil(update(request).then(refresh));
	}
});
