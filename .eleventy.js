require('dotenv').config();
const { options } = require('./.11ty/options');
const collections = require('./.11ty/collections');
const shortcodes = require('./.11ty/shortcodes');
const transforms = require('./.11ty/transforms');
const filters = require('./.11ty/filters');
const passthroughCopy = require('./.11ty/passthroughCopy');
const plugins = require('./.11ty/filters');

module.exports = function (eleventyConfig) {

	passthroughCopy.forEach((copy) => eleventyConfig.addPassthroughCopy(copy));

	Object.keys(collections).forEach((name) => {
		eleventyConfig.addCollection(name, collections[name]);
	});

	Object.keys(shortcodes).forEach((name) => {
		eleventyConfig.addShortcode(name, shortcodes[name]);
	});

	Object.keys(transforms).forEach((name) => {
		eleventyConfig.addTransform(name, transforms[name]);
	});

	Object.keys(filters).forEach((name) => {
		eleventyConfig.addFilter(name, filters[name]);
	});

	Object.keys(plugins).forEach((name) => {
		eleventyConfig.addPlugin(plugins[name]);
	});

	return options;
};
