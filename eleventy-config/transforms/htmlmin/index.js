const htmlMinifier = require('html-minifier');

module.exports = (content, outputPath) => {
	if (outputPath.endsWith('.html') && process.env.BUILD_ENVIRONMENT !== 'development') {
		return htmlMinifier.minify(content, {
			useShortDoctype: true,
			removeComments: true,
			collapseWhitespace: true,
		});
	}

	return content;
};
