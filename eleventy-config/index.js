const options = require('./options');
const data = require('./data');
const collections = require('./collections');
const transforms = require('./transforms');
const filters = require('./filters');
const passthroughCopy = require('./passthroughCopy');
const plugins = require('./plugins');
const watchTargets = require('./watchTargets');
const nunjucksEnvironment = require('./nunjucks');

module.exports = {
	options,
	data,
	collections,
	transforms,
	filters,
	passthroughCopy,
	plugins,
	watchTargets,
	nunjucksEnvironment,
}
