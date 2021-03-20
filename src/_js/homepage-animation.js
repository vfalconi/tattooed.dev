/*
const flashes = ['#1A1F23', '#5E5E5E', '#ABABAB', '#fcfdde', '#ffe72e', '#ffffff', '#ffe72e', '#ffffff', '#111111', '#ffe72e', '#ffffff', '#ffe72e', '#ffffff'];
	const landscape = document.querySelector('.landscape-wrapper');

	landscape.addEventListener('click', (e) => {
		const lightning = gsap.timeline();
		const tentacles = gsap.timeline();
		const duration = 0.12;

		tentacles.set('#TENTACLES', { opacity: 1 });

		tentacles.to('#TENTACLES path', { attr: { fill: '#232417' }, duration: duration * flashes.length });

		for (let i = 0; i < flashes.length; i++) {
			lightning.to('#lightning stop:nth-child(1)', { attr: { 'stop-color': flashes[i] }, duration });
		}

		tentacles.set('#TENTACLES', { opacity: 0 });
		tentacles.set('#TENTACLES', { attr: { fill: '#121212' } });
		lightning.set('#lightning stop:nth-child(1)', { attr: { 'stop-color': 'transparent' } });
	});
*/
const killStars = () => {
	const stars = Array.from(document.querySelectorAll('#stars .star'));

	stars.shuffle();

	stars.forEach((star, i) => {
		const starTL = gsap.timeline({ delay: i * 0.1 });
		const ease = 'slow(0.7, 0.7, false)';

		const states = [
			{
				fill: '#fff',
				stroke: '#fff',
				duration: 0.15,
				ease: ease,
				onStart: function () {
					const targets = Array.from(this._targets);
					targets.forEach((c) => {
						c.classList.remove('star--animate');
					});
				},
			},
			{ scale: 2.5, transformOrigin: 'center center', duration: 0.15, ease: ease },
			{ scale: 0, transformOrigin: 'center center', opacity: 0, duration: 0.25, ease: ease },
		];

		states.forEach((state) => starTL.to(star, state));
	});
};

const killGlow = (duration) => {
	gsap.to('#glowRect', { scale: 3, opacity: 0, transformOrigin: 'center bottom', duration, ease: 'expoScale(1, 3)' });
};

const killMountains = (duration) => {
	const mountains = gsap.timeline();
	const zoom = {
		y: 1555.5,
		scale: 3,
		transformOrigin: 'center bottom',
		duration: duration,
		ease: 'expoScale(1, 3)',
	};
	const fade = {
		opacity: 0,
		duration: duration / 3,
	};

	mountains
		.add('start', 0)
		.to('#sky', zoom, 'start')
		.to('#sky', fade, `start+=${zoom.duration - fade.duration}`);
};

const glow = gsap.timeline({ repeat: -1, yoyo: true });

glow.to('#glow', { duration: 2.1, attr: { r: 1 }, ease: 'sine.inOut' });

document.querySelector('body').addEventListener('click', (e) => {
	const stars = document.querySelectorAll('#stars .star');
	let starDuration = 0;
	for (let i = 0; i <= stars.length; i++) {
		starDuration += 0.15;
	}
	starDuration = starDuration / 3;
	killStars();
	killGlow(starDuration);
	killMountains(starDuration);
});
