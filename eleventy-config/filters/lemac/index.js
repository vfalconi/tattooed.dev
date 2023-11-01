module.exports = (str) => {
	if (typeof str !== 'string') return str;
	const chars = str.split('').map(char => {
		if (char === char.toUpperCase()) return ` ${char.toLowerCase()}`;
		return char;
	});

	return chars.join('');
};
