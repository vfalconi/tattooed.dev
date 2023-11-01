const { readFile } = require('node:fs/promises');

module.exports = (lockFilePath) => {
	return readFile(`${lockFilePath}/janitor.lock`)
		.then((id) => [ lockFilePath, id.length ])
		.catch(() => [ lockFilePath, null ]);
}
