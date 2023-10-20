const canvasFallback = () => {
	const fallback = document.createElement('script');
	const thisScript = document.querySelectorAll('script')[0];
	fallback.src = '/assets/stars-fallback.js';
	fallback.async = true;
	thisScript.parentNode.insertBefore(fallback, thisScript);
};

if ('serviceWorker' in navigator) {
	navigator.serviceWorker
		.register('/sw.js')
		.then((registration) => {})
		.catch((error) => error);
}

if (CSS !== undefined && 'paintWorklet' in CSS) {
	CSS.paintWorklet.addModule('/assets/stars.js');
} else {
	canvasFallback();
}

(() => {
	const body = document.querySelector('body');
	const fonts = [
		new FontFace('Lato', 'url(https://assets.tattooed.dev/fonts/lato/LatoLatin-Regular-subset.woff2)', {
			style: 'normal', weight: 'normal'
		}),
		new FontFace('LatoItalic', 'url(https://assets.tattooed.dev/fonts/lato/LatoLatin-Italic-subset.woff2)', {
			style: 'italic', weight: 'normal'
		}),
		new FontFace('LatoBold', 'url(https://assets.tattooed.dev/fonts/lato/LatoLatin-Bold-subset.woff2)', {
			style: 'normal', weight: 'bold'
		}),
	];
	const loaders = [];

	fonts.forEach(font => {
		loaders.push(font.load());
	});

	Promise.all(loaders).then(() => {
		body.classList.add('fonts-loaded');
	}).catch(e => {});
})();
