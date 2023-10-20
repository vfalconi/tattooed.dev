require('dotenv').config();
const crypto = require('crypto');
const gulp = require('gulp');
const uglify = require('gulp-uglify-es').default;
const browserify = require('gulp-browserify');
const replace = require('gulp-replace');
const { buildHashes } = require('./hashes');
const { staticAssets } = require('../src/javascript/sw-config');
const output = `${process.env.BUILD_DIR}/assets`;
const serviceWorkerPath = './src/javascript/sw.js';
const scriptsPaths = [
	'./src/javascript/*.js',
	'!./src/javascript/sw-config.js',
	`!${serviceWorkerPath}`,
];

const buildScripts = () => {
	return gulp.src(scriptsPaths)
		.pipe(uglify())
		.pipe(gulp.dest(output));
};

const buildServiceWorker = () => {
	const hash = crypto.createHash('sha512');
	const assetHashes = buildHashes(output);
	const assets = staticAssets.map(asset => {
		const assetPath = asset.replace('/cdn/', '/assets/');
		return assetHashes[assetPath] || 0;
	});
	const staticAssetsDigest = hash.update(Buffer.from(assets)).digest('hex');
	const cacheId = `cache-${staticAssetsDigest.substring(0, 7).toUpperCase()}`;
	const assetsArray = `${staticAssets.join("', '")}`;

	return gulp.src(serviceWorkerPath)
		.pipe(replace('[[:CACHE_ID:]]', cacheId))
		.pipe(replace('[[:ASSETS_ARRAY:]]', assetsArray))
		.pipe(uglify())
		.pipe(gulp.dest(process.env.BUILD_DIR));
};

// build is done in series because buildServiceWorker depends
// on the results of buildScripts
const buildJS = gulp.series(buildScripts, buildServiceWorker);

const watchScripts = () => gulp.watch(scriptsPaths, buildScripts);
const watchServiceWorker = () => gulp.watch(serviceWorkerPath, buildServiceWorker);

const watchJS = gulp.parallel(watchScripts, watchServiceWorker);

module.exports = {
	buildJS,
	watchJS
}
