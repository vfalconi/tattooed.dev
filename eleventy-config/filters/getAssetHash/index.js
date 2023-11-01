const hashes = require('./getHashes');

module.exports = (str) => {
	if (!hashes.get(str)) return str;

	return `${str}?v=${hashes.get(str)}`;
}
