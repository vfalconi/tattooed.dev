const readIdFile = require('./readIdFile');

module.exports = (entries, paths) => {
	/**
	 * does id file exist?
	 * 		yes? read contents
	 * 		no? return path
	 * remove any path with a key not found in entries
	 * flatten to first item in each couplet
	 */

	return Promise.all(paths.map(p => readIdFile(p)))
		.then(unsyncedEntries => unsyncedEntries.filter(entry => !entries.has(entry[1])))
		.then(invalidIds => invalidIds.map(p => p[0]))
		.catch(e => console.log(e));
}
