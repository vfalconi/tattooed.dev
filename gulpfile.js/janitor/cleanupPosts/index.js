const getIdsFromCMS = require('./getIdsFromCMS');
const getPostsPaths = require('./getPostsPaths');
const reconcileById = require('./reconcileById');
const reconcileByLockFile = require('./reconcileByLockFile');
const reapAbandonedPosts = require('./reapAbandonedPosts');

const cleanupPosts = () => {
	return Promise.all([
		getIdsFromCMS(process.env.BUILD_ID_ENDPOINT),
		getPostsPaths(`${process.env.BUILD_DIR}/wrote/*/`),
	])
		.then((results) => reconcileById(...results))
		.then((results) => reconcileByLockFile(results))
		.then((results) => reapAbandonedPosts(results))
		.then((results) => {
			if (results.length > 0) {
				console.group(`Janitor: Removed ${results.length} posts`);
				results.forEach(result => console.log(result));
				console.groupEnd();
			}
		})
		.catch(err => console.log(err));
};

module.exports = {
	cleanupPosts,
}
