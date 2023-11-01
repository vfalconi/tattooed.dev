const Nunjucks = require('nunjucks');
const spacelessExt = require('nunjucks-tag-spaceless');
const fsLoader = new Nunjucks.FileSystemLoader([
	'src/templates',
	'src/templates/_data',
	'src/templates/_partials',
	'src/templates/_partials',
]);
const environment = new Nunjucks.Environment(fsLoader);

environment.addExtension('spaceless', new spacelessExt());

module.exports = environment;
