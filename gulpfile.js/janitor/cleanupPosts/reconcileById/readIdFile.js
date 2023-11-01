const { readFile } = require('node:fs/promises');
const readIdFromBuffer = require('./readIdFromBuffer');

module.exports = (idFilePath) => {
	return readFile(`${idFilePath}/id.txt`)
		.then(contents => readIdFromBuffer(contents))
		.then(id => [ idFilePath, id ])
		.catch(e => [ idFilePath, null ]);
}
