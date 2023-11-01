const babek = require('./babek');
const checkPlural = require('./checkPlural');
const findValue = require('./findValue');
const getAssetHash = require('./getAssetHash');
const getKeys = require('./getKeys');
const isString = require('./isString');
const latest = require('./latest');
const lemac = require('./lemac');
const md = require('./md');
const merge = require('./merge');
const time = require('./time');
const trim = require('./trim');

module.exports = {
	babek,
	checkPlural,
	findValue,
	getAssetHash,
	getKeys,
	isString,
	latest,
	lemac,
	md,
	merge,
	...time,
	trim,
}
