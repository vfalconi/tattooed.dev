const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const hashAlgo = 'sha256';

const shiftTo = (array, targetIndex) => {
	if (array.includes(targetIndex) === false) {
		throw Error('array must actually include targetIndex');
	}

	while (array[0] !== targetIndex) {
		array.shift();
	}

	return array;
};

const cropPath = (fullPath, cropIndex) => {
	if (typeof fullPath !== 'string') {
		throw TypeError('fullpath must be string');
	}
	const arrPath = fullPath.split(path.sep);
	const croppedPath = shiftTo(arrPath, cropIndex);
	return path.sep + croppedPath.join(path.sep);
};

const readdirToBuffers = (paths) => {
	const fileContents = [];

	if (typeof paths !== 'string' && Array.isArray(paths) !== true) {
		throw new TypeError('paths must be either a string or an array')
	}

	if (typeof paths === 'string') {
		paths = [ paths ];
	}

	try {
		paths.forEach(_path => {
			const files = fs.readdirSync(_path);
			files.forEach(_file => {
				const filePath = `${_path}/${_file}`;
				if (fs.statSync(filePath).isDirectory() !== true) {
					fileContents.push({
						...path.parse(filePath),
						contents: fs.readFileSync(filePath)
					});
				} else {
					fileContents.push(readdirToBuffers(filePath));
				}
			});
		});
	} catch (e) {
		console.log(e);
	}

	return fileContents.flat();
};



const buildHashes = (paths) => {
	const hash = crypto.createHash(hashAlgo);
	const assets = readdirToBuffers(paths);
	const cacheIdHashes = [];
	const assetHashes = {};

	assets.forEach(asset => {
		const digest = hash.copy().update(asset.contents).digest('hex');
		const publicPath = cropPath(`${asset.dir}/${asset.base}`, 'assets');
		assetHashes[publicPath] = digest;
		cacheIdHashes.push(digest);
	});

	assetHashes.cache_id = hash.copy().update(Buffer.from(cacheIdHashes.join(' '))).digest('hex');

	return assetHashes;
};

module.exports = {
	buildHashes,
	shiftTo,
	cropPath,
	readdirToBuffers,
};
