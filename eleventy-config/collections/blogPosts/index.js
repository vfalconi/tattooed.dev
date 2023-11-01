const { CMSEntries } = require('../../lib/CMSEntries');
const { webmentions } = require('../../lib/webmentions');

module.exports = async () => {
	const entries = await new CMSEntries(process.env.BUILD_BLOG_ENDPOINT);
	const mentions = await new webmentions(process.env.WEBMENTIONS_ENDPOINT);

	entries.forEach(entry => {
		entry.mentions = mentions[entry.permalink] || [];
	});

	return entries;
};
