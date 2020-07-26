(() => {
	const list = [
		'tattoo-collector',
		'weightlifter',
		'gardener',
		'home cook',
		'rescuer of Princess Zelda',
		'lover of horror',
	];
	const descriptionSpans = document.querySelectorAll('[data-description]');
	const descriptionSet = new Set();
	let loop = 0;

	// sets cannot contain duplicates, so this loop will run until
	// descriptionSet has enough items in it to update the
	// placeholders on the page. this also scales up or down based
	// on the number of placeholders, without neededing to change this
	// loop. <3
	while (descriptionSet.size <= descriptionSpans.length - 1) {
		const itemIndex = Math.floor(Math.random() * list.length);
		descriptionSet.add(list[itemIndex]);
	}

	descriptionSet.forEach((description) => {
		descriptionSpans[loop].textContent = description;
		loop++;
	});
})();
