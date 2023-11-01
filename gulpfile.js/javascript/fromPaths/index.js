const gulp = require('gulp')
const uglify = require('gulp-uglify-es').default;

module.exports = async ({ paths, output }) => {
	return await new Promise((resolve, reject) => {
		gulp.src(paths)
			.pipe(uglify())
			.pipe(gulp.dest(`${process.env.BUILD_DIR}${output}`))
			.on('end', resolve)
			.on('error', reject);
	});
};
