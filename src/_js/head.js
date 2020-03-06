if ('serviceWorker' in navigator) {
	navigator.serviceWorker.register('/sw.js').then(registration => {
		console.log('Service worker registration succeeded');
	}).catch(error => {
		console.log('Service worker registration failed');
	});
} else {
	console.log('Service workers are not supported.');
}
