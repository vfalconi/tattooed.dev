require('dotenv').config();
const gulp = require('gulp');
const { buildCSS, watchCSS } = require('./css');
const { buildJS, watchJS } = require('./javascript');
const { cleanupPosts } = require('./janitor');

const build = gulp.parallel(buildJS, buildCSS);
const watch = gulp.parallel(watchJS, watchCSS);
const cleanup = gulp.series(cleanupPosts);

gulp.task('watch', watch);
gulp.task('watch:css', watchCSS);
gulp.task('watch:js', watchJS);

gulp.task('build', build);
gulp.task('build:css', buildCSS);
gulp.task('build:js', buildJS);

gulp.task('cleanup', cleanup);
gulp.task('cleanup:posts', cleanupPosts);
