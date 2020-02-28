require('dotenv').config();
const gulp = require('gulp');
const sass = require('gulp-sass');
const uglifyjs = require('uglify-es');
const concat = require('gulp-concat');
const merge = require('merge-stream');
const composer = require('gulp-uglify/composer');
const tiny = composer(uglifyjs, console);
const pipeline = require('readable-stream').pipeline;
const gulpBuildPath = `${process.env.BUILD_DIR}/assets/`;
const rootPath = process.env.BUILD_DIR;

// css
gulp.task('css', () => {
	const normalize = gulp.src('./node_modules/normalize.css/normalize.css');
	const siteStyles = gulp.src('./src/_sass/styles.scss');

	return pipeline(
		merge(normalize, siteStyles),
		concat('styles.css'),
		sass({
			outputStyle: 'compressed'
		}),
		gulp.dest(gulpBuildPath)
	);
});

// javascript
gulp.task('javascript', () => {
	return pipeline(
		gulp.src(['./src/_js/*.js', '!./src/_js/sw.js']),
		tiny(),
		gulp.dest(gulpBuildPath)
	);
});

gulp.task('serviceworker', () => {
	return pipeline(
		gulp.src(['./src/_js/sw.js']),
		tiny(),
		gulp.dest(rootPath)
	);
});

// watcher
gulp.task('watch', () => {
	gulp.watch('./src/_sass/**/*.scss', gulp.parallel('css'));
	gulp.watch(['./src/_js/**/*.js', '!./src/_js/sw.js'], gulp.parallel('javascript'));
	gulp.watch('./src/_js/sw.js', gulp.parallel('serviceworker'));
});

// build
gulp.task('build', gulp.parallel(
	'css',
	'javascript',
	'serviceworker',
));
