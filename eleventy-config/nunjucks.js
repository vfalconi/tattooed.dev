require('dotenv').config();
const Nunjucks = require('nunjucks');
const spacelessExt = require('nunjucks-tag-spaceless');
const fsLoader = new Nunjucks.FileSystemLoader([
	'src/templates',
	'src/templates/_data',
	'src/templates/_partials',
	'src/templates/_partials',
]);
const environment = new Nunjucks.Environment(fsLoader);
const { buildHashes } = require('../tasks/hashes');
const assetHashes = buildHashes(`${process.env.BUILD_DIR}/assets`);

environment.addExtension('spaceless', new spacelessExt());
environment.addGlobal('assetHashes', assetHashes);

module.exports = environment;
