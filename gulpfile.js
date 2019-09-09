require("dotenv").config();
const gulp = require("gulp");
const sass = require("gulp-sass");
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const gulpBuildPath = `${process.env.BUILD_PATH}/assets/`;

// css
gulp.task('css', function() {
  return gulp.src('./src/_sass/*.scss')
    .pipe(sass({
      outputStyle: 'compressed'
    })
    .on('error', sass.logError))
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
