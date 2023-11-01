const path = require('node:path');
const { readFileSync } = require('node:fs');
const { createHash } = require('node:crypto');
const { globSync } = require('glob');

const staticAssetsPath = `${process.env.BUILD_DIR}/assets`;
const files = globSync(`${staticAssetsPath}/**/*.{js,css}`)

const buffers = files.map(file => {
	const filePath = file.split(path.sep).slice(1).join('/');
	const b = readFileSync(file);
	return [ `/${filePath}`, b ];
});

module.exports = new Map(buffers.map(([ filePath, buffer ]) => {
	const hash = createHash('sha512');
	hash.update(buffer);
	return [ filePath, hash.digest('hex').slice(0,8) ];
}));
