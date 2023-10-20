(() => {
	const makeSprite = (sprite) => {
		const spriteFrame = sprite;
		const spriteSheet = spriteFrame.querySelector('img');
		const spriteSpeed = (parseFloat(spriteFrame.dataset.speed) || 1) * 1000;
		let spriteShift = 0;
		let trailingTimestamp = 0;
		let elapsed = 0;

		const step = (timestamp) => {
			if (trailingTimestamp === undefined) {
				trailingTimestamp = timestamp;
			}

			elapsed = timestamp - trailingTimestamp;
			if (Math.floor(elapsed) > spriteSpeed) {
				if ((spriteShift * -1) === (spriteSheet.offsetWidth - spriteFrame.offsetWidth)) {
					spriteShift = 0;
				} else {
					spriteShift -= spriteFrame.offsetWidth
				}

				spriteSheet.style.transform = `translateX(${spriteShift}px)`;
				trailingTimestamp = timestamp;
			}
			window.requestAnimationFrame(step);
		};

		window.requestAnimationFrame(step);
	};

	const sprites = document.querySelectorAll('.zelda-sprite');
	sprites.forEach((sprite) => {
		makeSprite(sprite);
	});
})();
