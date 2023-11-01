module.exports = {
	css: {
		output: `/assets`,
		paths: [
			'./src/sass/**/*.scss',
		],
		opts: {
			outputStyle: 'compressed',
		},
	},
	scripts: {
		output: '/assets',
		paths: [
			'./src/javascript/*.js',
			'!./src/javascript/sw.js',
		],
	},
	serviceWorker: {
		output: '/',
		path: './src/javascript/sw.js',
		cacheId: '231b05b0',
		staticAssets: [
			'/cdn/fonts/lato/LatoLatin-Regular-subset.woff2',
			'/cdn/fonts/lato/LatoLatin-Italic-subset.woff2',
			'/cdn/fonts/lato/LatoLatin-Bold-subset.woff2',
			'/cdn/fonts/shlop-shloppy/6ad80901-77f1-4050-91f7-d4f08d7f6123-subset.woff2',
			'/cdn/pages/homepage-portrait-1x.avif',
			'/cdn/pages/homepage-portrait-1.5x.avif',
			'/cdn/pages/homepage-portrait-2x.avif',
			'/cdn/pages/homepage-portrait-1x.webp',
			'/cdn/pages/homepage-portrait-1.5x.webp',
			'/cdn/pages/homepage-portrait-2x.webp',
			'/cdn/pages/homepage-portrait-1x.jpg',
			'/cdn/pages/homepage-portrait-1.5x.jpg',
			'/cdn/pages/homepage-portrait-2x.jpg',
		],
	},
}
