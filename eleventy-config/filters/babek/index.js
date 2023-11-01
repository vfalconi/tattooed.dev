module.exports = (str) => {
	if (typeof str !== 'string') return str;
	return str.replace('-', ' ');
};
