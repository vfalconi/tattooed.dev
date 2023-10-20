registerPaint('starscape', class {
	static get contextOptions() {
		return { alpha: true };
	}

	paint(ctx, geom) {
		const defaults = {
			color: '#FFDC00',
			density: 1000,
			max_diameter: 4,
			min_diameter: 1,
		};

		const randomInt = (max, min) => {
			return Math.floor(Math.random() * (max - min) + min);
		};

		const layers = [
			{ color: '#FFDC0044', max_diameter: 1, density: 2000 },
			{ color: '#7FDBFF88', max_diameter: 3, min_diameter: 2, density: 100 }
		];

		layers.forEach(layer => {
			const opts = { ...defaults, ...layer };

			for (let i = 0; i < opts.density; i++) {
				const cx = randomInt(geom.width, 0);
				const cy = randomInt(geom.height, 0);
				const r = randomInt(opts.max_diameter, opts.min_diameter);

				ctx.beginPath();
				ctx.arc(cx, cy, r, 0, Math.PI * 2, false);
				ctx.fillStyle = opts.color;
				ctx.fill();
			}
		});
	}
});
