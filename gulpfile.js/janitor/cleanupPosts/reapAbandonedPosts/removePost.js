const { rm } = require('node:fs/promises');

module.exports = (path) => {
	return rm(path, {
		recursive: true,
	}).then(() => path)
		.catch(e => console.log(e));
}
