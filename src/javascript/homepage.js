(() => {
	const straightLines = [
		'a tattoo-collector',
		'a powerlifter',
		'a gardener',
		'a home cook',
		'a lover of horror',
		'a fan of obnoxious colors',
		'a hockey fan',
		'an enjoyer of kayaking',
		'a rescuer of Princess Zelda',
	];
	const punchLines = [
		'a chaotic good cleric main',
		'61 20 62 69 67 20 6E 65 72 64',
		'a gentle breeze on an October afternoon',
		'definitely not a time traveller',
		'always interested in hearing about your favorite monospace font',
		'a joy to have in class',
	];
	const descriptionSpans = document.querySelectorAll('[data-description]');
	const randomUniqueDescriptions = new Set();

	// sets cannot contain duplicates, so this loop will run until
	// randomUniqueDescriptions has enough items in it to update the
	// placeholders on the page. this also scales up or down based
	// on the number of placeholders, without neededing to change this
	// loop. <3
	while ((descriptionSpans.length - 1) > randomUniqueDescriptions.size) {
		const itemIndex = Math.floor(Math.random() * straightLines.length);
		randomUniqueDescriptions.add(straightLines[itemIndex]);
	}

	randomUniqueDescriptions.add(punchLines[Math.floor(Math.random() * punchLines.length)])

	descriptionSpans.forEach((node, i) => {
		const descriptions = Array.from(randomUniqueDescriptions);
		node.textContent = descriptions[i];
	});
})();
