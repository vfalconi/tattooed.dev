const fs = require('fs');
const path = require('path');
const { DateTime } = require('luxon');

module.exports.filemtime = (publicPath, serverPath) => {
	const publicDir = path.dirname(publicPath);
	const ext = path.extname(serverPath);
	const filename = path.basename(serverPath, ext);
	const stats = fs.statSync(serverPath);
	const mtime = DateTime.fromJSDate(stats.mtime, { zone: 'utc' }).toFormat('X');
	return `${publicDir}/${filename}.${mtime}${ext}`;
};
