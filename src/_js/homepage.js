(() => {
	const list = [
		'a tattoo-collector',
		'a weightlifter',
		'a gardener',
		'a home cook',
		'a rescuer of Princess Zelda',
		'a lover of horror',
		'a fan of obnoxious colors',
		'01101001 01101110 01110011 01110101 01100110 01100110 01100101 01110010 01100001 01100010 01101100 01100101',
		'a gentle breeze on an October afternoon',
		'definitely not a time traveller',
		'always interested in hearing about your favorite monospace font',
		'a hockey fan',
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
