if ('serviceWorker' in navigator) {
	navigator.serviceWorker
		.register('/sw.js')
		.then((registration) => {})
		.catch((error) => error);
}

(() => {
	const body = document.querySelector('body');
	const font = new FontFaceObserver('LatoLatin');

	body.classList.add('js');

	font.load().then(function () {
		body.classList.add('font-loaded');
	});
})();
