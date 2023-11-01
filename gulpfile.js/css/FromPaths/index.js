const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));

module.exports = async ({ paths, opts, output }) => {
	return await new Promise((resolve, reject) => {
		gulp.src(paths)
			.pipe(sass.sync(opts).on('error', sass.logError))
			.pipe(gulp.dest(`${process.env.BUILD_DIR}${output}`))
			.on('end', resolve)
			.on('error', reject);
	});
}
