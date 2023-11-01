const pluralize = require('pluralize');

module.exports = (str, count = null) => {
	if (typeof str !== 'string' || count === null) return str;
	const intCount = parseInt(count, 10);
	return pluralize(str, intCount);
};
