(() => {
	const imageToggle = document.querySelector('[data-image-toggle]');
	const tmpImage = new Image;
	tmpImage.src = imageToggle.dataset.altSrc;

	const toggleControls = document.querySelectorAll('[name="toggle-input"]');
	toggleControls.forEach(toggle => {
		toggle.addEventListener('change', e => {
			const img = document.querySelector('[data-image-toggle]');
			const button = e.target;
			const src = button.dataset.toggleImage;
			const alt = button.dataset.toggleAlt;
			img.src = src;
			img.alt = alt;
		});
	});
})();
