const gulp = require('gulp');
const { spawn } = require('child_process');

const buildSite = () => {
	const eleventy = spawn('npx', [ 'eleventy' ], { stdio: "inherit" });

	return eleventy;
}

const watchSite = () => gulp.watch('./src/templates/**/*.*', buildSite);

module.exports = {
	buildSite,
	watchSite,
}
