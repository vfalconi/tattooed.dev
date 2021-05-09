module.exports.options = {
	htmlTemplateEngine: 'njk',
	dataTemplateEngine: 'njk',
	templateFormats: ['njk', 'html'],
	dir: {
		input: 'src/templates',
		data: '_data',
		includes: '_partials',
		output: process.env.BUILD_DIR,
	},
};
