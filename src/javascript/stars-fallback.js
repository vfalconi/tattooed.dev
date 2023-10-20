class Starscape {

	static randomInt(max, min) {
		return Math.floor(Math.random() * (max - min) + min);
	}

	static randomCoords(xBound = null, yBound = null) {
		const xMax = xBound || this.canvas.width;
		const yMax = yBound || this.canvas.height;
		return [ Starscape.randomInt(xMax, 1), Starscape.randomInt(yMax, 1) ];
	}

	static randomDiameter(max) {
		return Starscape.randomInt(max, 1);
	}

	static make(canvasRoot, opts = {}) {
		const defaults = {
			color: '#FFDC00',
			density: 1000,
			max_diameter: 4,
			min_diameter: 1,
			base_width: 1600,
			base_height: 900,
		};

		opts = {...defaults,...opts};

		this.canvas = document.createElement('canvas');
		this.ctx = this.canvas.getContext('2d');
		this.density = ((window.screen.width * window.screen.height) / (opts.base_width * opts.base_height)) * opts.density;

		this.canvas.width = window.screen.width;
		this.canvas.height = (window.screen.height > document.body.scrollHeight ? window.screen.height : document.body.scrollHeight);

		for (let i = 0; i < this.density; i++) {
			const [ cx, cy ] = [ ...Starscape.randomCoords() ];
			const r = Starscape.randomInt(opts.max_diameter, opts.min_diameter);

			this.ctx.beginPath();
			this.ctx.arc(cx, cy, r, 0, Math.PI * 2, false);
			this.ctx.fillStyle = opts.color;
			this.ctx.fill();
		}

		canvasRoot.append(this.canvas);
	}
}

(function () {
	const navEl = document.querySelector('.scroll-wrapper');
	const starscapeEl = document.createElement('div');
	const fallbackStyle = document.createElement('style');

	fallbackStyle.textContent = '#starscape{position:fixed;inset:0;z-index:-1;overflow:hidden;}#starscape canvas{position:absolute;inset:0;}';
	document.head.appendChild(fallbackStyle);

	starscapeEl.id = 'starscape';
	Starscape.make(starscapeEl, { color: '#FFDC0044', max_diameter: 1, density: 2000 });
	Starscape.make(starscapeEl, { color: '#7FDBFF88', max_diameter: 3, min_diameter: 2, density: 100 });
	navEl.parentNode.insertBefore(starscapeEl, navEl);
})();
