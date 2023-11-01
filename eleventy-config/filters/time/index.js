const formatDate = require('./format');

const htmlDateString = (dateObj) => {
	return formatDate(dateObj).toFormat('LLLL d, yyyy');
};

const machineTime = (dateObj) => {
	return formatDate(dateObj).toFormat('yyyy-LL-dd');
};

const date = (dateObj, format = null) => {
	if (format === null) format = 'yyyy-mm-dd';
	return formatDate(dateObj).toFormat(format);
};

module.exports = {
	htmlDateString,
	machineTime,
	date,
}
