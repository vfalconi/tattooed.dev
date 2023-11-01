const gulp = require('gulp');
const replace = require('gulp-replace');
const uglify = require('gulp-uglify-es').default;

module.exports = async ({ path, output, cacheId, staticAssets }) => {
	return await new Promise((resolve, reject) => {
		gulp.src(path)
			.pipe(replace('[[:CACHE_ID:]]', cacheId))
			.pipe(replace('[[:ASSETS_ARRAY:]]', staticAssets.join("', '")))
			.pipe(uglify())
			.pipe(gulp.dest(`${process.env.BUILD_DIR}${output}`))
			.on('end', resolve)
			.on('error', reject);
	});
}
