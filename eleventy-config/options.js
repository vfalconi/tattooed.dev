module.exports = {
	htmlTemplateEngine: 'njk',
	dataTemplateEngine: 'njk',
	templateFormats: [ 'html', 'txt', 'xml' ],
	dir: {
		input: 'src/templates',
		data: '_data',
		includes: '_partials',
		output: process.env.BUILD_DIR,
	},
};
