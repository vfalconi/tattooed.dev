module.exports.trim = (str) => {
	if (typeof str !== 'string' || (chr !== null && typeof chr !== 'string'))
		return str;
	if (chr === null) return str.trim;

	let result = str;
	if (str.startsWith(chr)) result = result.slice(chr.length);
	if (str.endsWith(chr)) result = result.slice(0, result.length - chr.length);
	return result;
};
