const gulp = require('gulp');
const FromPaths = require('./FromPaths');
const { css } = require('../config');

const buildFromPaths = () => FromPaths(css)
const watchFromPaths = () => gulp.watch(css.paths, buildFromPaths);

const watchCSS = gulp.series(watchFromPaths);
const buildCSS = gulp.series(buildFromPaths);

module.exports = {
	buildCSS,
	watchCSS,
};
