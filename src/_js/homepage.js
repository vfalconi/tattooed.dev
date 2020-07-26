(() => {
	const descriptionSpans = document.querySelectorAll('[data-description]');
	const list = [
		'tattoo-collector',
		'weightlifter',
		'gardener',
		'home cook',
		'rescuer of Princess Zelda',
		'lover of horror',
	];
	const descriptionSet = new Set();
	let loop = 0;

	while (descriptionSet.size <= 2) {
		const itemIndex = Math.floor(Math.random() * list.length);
		descriptionSet.add(list[itemIndex]);
	}

	descriptionSet.forEach((description) => {
		descriptionSpans[loop].textContent = description;
		loop++;
	});
})();
