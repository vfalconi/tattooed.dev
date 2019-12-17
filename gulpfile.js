require("dotenv").config();
const gulp = require("gulp");
const sass = require("gulp-sass");
const uglify = require('gulp-uglify');
const minify = require('gulp-minify');
const concat = require('gulp-concat');
const merge = require('merge-stream');
const gulpBuildPath = `${process.env.BUILD_DIR}/assets/`;

// css
gulp.task('css', function() {
	const normalize = gulp.src('./node_modules/normalize.css/normalize.css');
	const siteStyles = gulp.src('./src/_sass/styles.scss');

	return merge(normalize, siteStyles)
		.pipe(concat('styles.css'))
		.pipe(sass({
			outputStyle: 'compressed'
		}))
		.pipe(gulp.dest(gulpBuildPath));
});

// javascript
gulp.task('javascript', function() {
  return gulp.src("./src/_js/*.js")
    .pipe(uglify())
    .pipe(gulp.dest(gulpBuildPath));
});

// watcher
gulp.task("watch", function() {
  gulp.watch('./src/_sass/**/*.scss', gulp.parallel('css'));
	gulp.watch('./src/_js/**/*.js', gulp.parallel('javascript'));
});

// build
gulp.task('build', gulp.parallel(
	'css',
  'javascript'
));
