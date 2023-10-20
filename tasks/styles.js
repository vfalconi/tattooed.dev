require('dotenv').config();
const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const output = `${process.env.BUILD_DIR}/assets/`;
const sassGlob = './src/sass/**/*.scss';
const opts = {
	outputStyle: 'compressed',
};

const buildMainStyles = () => {
	return gulp.src(sassGlob)
		.pipe(sass.sync(opts).on('error', sass.logError))
		.pipe(gulp.dest(output));
};

const watchCSS = () => gulp.watch(sassGlob, buildMainStyles);

const buildCSS = gulp.parallel(buildMainStyles);

module.exports = {
	buildCSS,
	watchCSS,
};
