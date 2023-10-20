const gulp = require('gulp');
const { buildCSS, watchCSS } = require('./tasks/styles');
const { buildJS, watchJS } = require('./tasks/scripts');
const { deploy } = require('./tasks/deploy');

// build is done in series because buildJS depends on the results
// of buildCSS for the serviceworker-friendly cachebusting
const build = gulp.series(buildCSS, buildJS);
const watch = gulp.parallel(watchCSS, watchJS);

gulp.task('build:css', buildCSS);
gulp.task('build:js', buildJS);
gulp.task('build', build);
gulp.task('watch', watch);
gulp.task('deploy', deploy);
