(() => {
	const footnoteButtons = document.querySelectorAll('[data-footnote-return]');

	Array.from(footnoteButtons).forEach(button => {
		button.addEventListener('click', e => {
			window.history.back();
		});
	});
})();
