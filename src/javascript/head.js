if ('serviceWorker' in navigator) {
	navigator.serviceWorker
		.register('/sw.js')
		.then((registration) => {})
		.catch((error) => error);
}

if (!Array.prototype.hasOwnProperty('shuffle')) {
	Array.prototype.shuffle = function () {
		let current = this.length;
		let temp, random;

		while (0 !== current) {
			random = Math.floor(Math.random() * current);
			current--;

			temp = this[current];
			this[current] = this[random];
			this[random] = temp;
		}
	};
}

const font = new FontFaceObserver('LatoLatin');
font.load().then(function () {
	const body = document.querySelector('body');
	body.classList.add('font-loaded');
});
