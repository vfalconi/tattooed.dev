const { DateTime } = require('luxon');
const pluralize = require('pluralize');
const md = require('marked');

module.exports.getKeys = (obj) => {
	return Object.keys(obj);
};

module.exports.isString = (obj) => {
	return typeof obj == 'string';
};

module.exports.md = (str) => {
	if (typeof str !== 'string') return str;
	return md(str);
};

module.exports.htmlDateString = (dateObj) => {
	const date = dateObj instanceof Date ? dateObj : new Date(dateObj);
	const format = 'LLLL d, yyyy';
	const options = { zone: 'utc' };
	return DateTime.fromJSDate(date, options).toFormat(format);
};

module.exports.machineTime = (dateObj) => {
	const date = dateObj instanceof Date ? dateObj : new Date(dateObj);
	const format = 'yyyy-LL-dd';
	const options = { zone: 'utc' };
	return DateTime.fromJSDate(date, options).toFormat(format);
};

module.exports.RSSTimeFormat = (dateObj) => {
	return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toISO();
};

module.exports.machineTimeISO = (dateObj) => {
	return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toISO();
};

module.exports.trim = (str) => {
	if (typeof str !== 'string' || (chr !== null && typeof chr !== 'string'))
		return str;
	if (chr === null) return str.trim;

	let result = str;
	if (str.startsWith(chr)) result = result.slice(chr.length);
	if (str.endsWith(chr)) result = result.slice(0, result.length - chr.length);
	return result;
};

module.exports.date = (obj, format = null) => {
	if (format === null) format = 'yyyy-mm-dd';
	return DateTime.fromJSDate(obj).toFormat(format);
};

module.exports.checkPlural = (str, count = null) => {
	if (typeof str !== 'string' || count === null) return str;
	const intCount = parseInt(count, 10);
	return pluralize(str, intCount);
};

module.exports.babek = (str) => {
	if (typeof str !== 'string') return str;
	return str.replace('-', ' ');
};

module.exports.lemac = (str) => {
	if (typeof str !== 'string') return str;
	const chars = str.split('').map(char => {
		if (char === char.toUpperCase()) return ` ${char.toLowerCase()}`;
		return char;
	});

	return chars.join('');
};

module.exports.findValue = (needle, haystack = []) => {
	return (haystack.includes(needle));
};

module.exports.merge = (a, b = []) => {
	return b.concat(a);
}

module.exports.latest = (entries) => {
	let mostRecentEntry = 0;

	entries.forEach(entry => {
		if (mostRecentEntry === 0) {
			mostRecentEntry = entry;
		} else {
			if (entry.published_at > mostRecentEntry.published_at) {
				mostRecentEntry = entry;
			}
		}
	});

	return mostRecentEntry || {};
}
