const { DateTime } = require('luxon');

module.exports = (dateObj) => {
	const date = dateObj instanceof Date ? dateObj : new Date(dateObj);
	const options = { zone: 'utc' };
	return DateTime.fromJSDate(date, options);
}
