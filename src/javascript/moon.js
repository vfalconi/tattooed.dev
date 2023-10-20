import 'https://unpkg.com/suncalc@1.9.0/suncalc.js';

class Moon {
	constructor() {
		const now = new Date();
		const moon = SunCalc.getMoonIllumination(now);
		const phases = [
			{ limit: 0, state: 'new' },
			{ limit: [
				0.000000000000001,
				0.249999999999999,
			], state: 'waxing-crescent' },
			{ limit: 0.25, state: 'first-quarter' },
			{ limit: [
				0.250000000000001,
				0.499999999999999,
			 ], state: 'waxing-gibbous' },
			{ limit: 0.5, state: 'full-moon' },
			{ limit: [
				0.500000000000001,
				0.749999999999999,
			 ], state: 'waning-gibbous' },
			{ limit: 0.75, state: 'last-quarter' },
			{ limit: [
				0.750000000000001,
				0.999999999999999,
			 ], state: 'waning-crescent' },
		];

		moon.solarDate = now.toString();

		phases.forEach(phase => {
			if ('object' === typeof phase.limit) {
				if (moon.phase >= phase.limit[0] && moon.phase <= phase.limit[1]) {
					moon.state = phase.state;
				}
			} else if ('number' === typeof phase.limit) {
				if (moon.phase === phase.limit) {
					moon.state = phase.state;
				}
			}
		});

		return moon;
	};
}


(function() {
	const moon = new Moon();
	const svgMoonPhaseMask = document.getElementById(`phase-mask--${moon.state}`);
	const favIcon = document.querySelector('link[rel="icon"]');
	const moonEmoji = {
		'new': '🌑',
		'waxing-crescent': '🌒',
		'first-quarter': '🌓',
		'waxing-gibbous': '🌔',
		'full': '🌕',
		'waning-gibbous': '🌖',
		'last-quarter': '🌗',
		'waning-crescent': '🌘',
	};
	const favIconData = `data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22 transform="rotate(45 50 50)">${moonEmoji[moon.state]}</text></svg>`;

	svgMoonPhaseMask.classList.add(`phase--active`);
	favIcon.href = favIconData;
})();
