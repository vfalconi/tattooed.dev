const { CMSEntries } = require('./lib/CMSEntries');

module.exports.blogPosts = async () => {
	return await CMSEntries.get(process.env.BUILD_BLOG_ENDPOINT);
};
