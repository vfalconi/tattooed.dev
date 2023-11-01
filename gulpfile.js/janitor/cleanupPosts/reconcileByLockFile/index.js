const readLockFile = require('./readLockFile');

module.exports = (paths) => {
	/**
	 * check all remaining paths for a lock file
	 * 		exists? return length
	 * 		does not exist? return null
	 * filter all non-null values
	 * flatten to the first item in each couplet
	 */
	return Promise.all(paths.map(p => readLockFile(p)))
		.then(unlockedFiles => unlockedFiles.filter(file => file[1] === null))
		.then(invalidIds => invalidIds.map(p => p[0]))
		.catch(e => console.log(e));
}
