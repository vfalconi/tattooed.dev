const gulp = require('gulp');
const FromPaths = require('./fromPaths');
const ServiceWorker = require('./serviceWorker');
const { serviceWorker, scripts } = require('../config');

const buildFromPaths = () => FromPaths(scripts);
const buildServiceWorker = () => ServiceWorker(serviceWorker);

const watchScripts = () => gulp.watch(scripts.paths, buildFromPaths);
const watchServiceWorker = () => gulp.watch(serviceWorker.path, buildServiceWorker);

const buildJS = gulp.parallel(buildFromPaths, buildServiceWorker);
const watchJS = gulp.parallel(watchScripts, watchServiceWorker);

module.exports = {
	buildJS,
	watchJS
}
