require('dotenv').config();
const config = require('./eleventy-config');

module.exports = function (eleventyConfig) {
	eleventyConfig.setLibrary("njk", config.nunjucksEnvironment);

	config.passthroughCopy.forEach((copy) => eleventyConfig.addPassthroughCopy(copy));

	eleventyConfig.setBrowserSyncConfig({
    files: config.watchTargets
  });

	Object.keys(config.data).forEach((name) => {
		eleventyConfig.addGlobalData(name, config.data[name]);
	});

	Object.keys(config.collections).forEach((name) => {
		eleventyConfig.addCollection(name, config.collections[name]);
	});

	Object.keys(config.transforms).forEach((name) => {
		eleventyConfig.addTransform(name, config.transforms[name]);
	});

	Object.keys(config.filters).forEach((name) => {
		eleventyConfig.addFilter(name, config.filters[name]);
	});

	Object.keys(config.plugins).forEach((name) => {
		eleventyConfig.addPlugin(config.plugins[name]);
	});

	eleventyConfig.addGlobalData('now', new Date());

	return config.options;
};
