require("dotenv").config();
const md = require('marked');
const htmlmin = require("html-minifier");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const fetch = require('node-fetch');
const { DateTime } = require("luxon");
const passthroughCopies = require('./passthroughCopy');

module.exports = function(eleventyConfig) {
	eleventyConfig.addTransform("htmlmin", function(content, outputPath) {
    if( outputPath.endsWith(".html") && process.env.BUILD_ENVIRONMENT !== 'development' ) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true
      });
      return minified;
    }

    return content;
  });

	eleventyConfig.addCollection('highlightedBlogPosts', function(collection) {
		return collection.getAllSorted().reverse().filter(item => {
			return item.data.highlighted === true
		});
	});

	eleventyConfig.addCollection('blogPosts', async function(collection) {
		collection = await fetch(process.env.BUILD_BLOG_ENDPOINT).then(resp => {
			if (resp.ok) return resp.json();
			throw new Error('network error');
		}).then(resp => {
			return resp.entries;
		}).catch(err => console.log(err));

		collection.map(post => {
			post.published_at = new Date(post.published_at);
			post.parsed = md(post.post);

			if (post.footnotes) {
				post.footnotes.forEach((note, i) => {
					post.footnotes[i] = md(note);
				});
			}
			return post;
		});

		return collection;
	});

	// https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
	eleventyConfig.addFilter('htmlDateString', (dateObj) => {
		const date = (dateObj instanceof Date ? dateObj : new Date(dateObj));
		const format = 'LLLL d, yyyy';
		const options = { zone: 'utc' };
		return DateTime.fromJSDate(date, options).toFormat(format);
	});
	eleventyConfig.addFilter('machineTime', (dateObj) => {
		const date = (dateObj instanceof Date ? dateObj : new Date(dateObj));
		const format = 'yyyy-LL-dd';
		const options = { zone: 'utc' };
		return DateTime.fromJSDate(date, options).toFormat(format);
	});
	eleventyConfig.addFilter('RSSTimeFormat', (dateObj) => {
		return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toISO();
	});
	eleventyConfig.addFilter('machineTimeISO', (dateObj) => {
		return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toISO();
	});
	eleventyConfig.addFilter('apiRSSLastUpdated', collection => {
		if (!collection || !collection.length) {
			throw new Error('Collection is empty.');
		}

		return collection[collection.length - 1].date;
	});

	eleventyConfig.addNunjucksShortcode('currentTime', () => {
		return DateTime.local().toFormat('dd LLL yyyy');
	});

	passthroughCopies.forEach(copy => eleventyConfig.addPassthroughCopy(copy));

	eleventyConfig.addPlugin(pluginRss);

	return {
		templateFormats: [
			'md',
			'njk',
			'html',
			'liquid'
		],
		passthroughFileCopy: true,
		dynamicPartials: true,
    dir: {
      input: "src",
			output: process.env.BUILD_DIR,
			layouts: "_layouts"
    }
	};
}
