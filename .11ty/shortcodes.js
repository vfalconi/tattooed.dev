const filemtime = require('./lib/filemtime');

module.exports.timestamp = (publicPath) => {
	if (process.env.BUILD_ENVIRONMENT === 'production') {
		const serverPath = process.env.BUILD_DIR + publicPath;
		return filemtime(publicPath, serverPath);
	}
	return publicPath;
};
