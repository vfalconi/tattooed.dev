const { cleanupPosts } = require('./cleanupPosts');

const posts = () => cleanupPosts();

module.exports = {
	posts,
	cleanupPosts,
}
