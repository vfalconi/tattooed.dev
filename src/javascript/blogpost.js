(() => {
	const buttons = document.querySelectorAll('[data-footnote-return]');

	Array.from(buttons).forEach(button => {
		button.addEventListener('click', e => {
			window.history.back();
		});
	});
})();
