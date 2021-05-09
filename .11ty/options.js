module.exports.options = {
	htmlTemplateEngine: [ 'njk' ],
	templateFormats: ['njk', 'html'],
	dir: {
		input: 'src/templates',
		includes: '_partials',
		output: process.env.BUILD_DIR,
	},
};
