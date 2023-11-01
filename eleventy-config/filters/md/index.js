const md = require('marked');

module.exports = (str) => {
	if (typeof str !== 'string') return str;
	return md(str);
};
