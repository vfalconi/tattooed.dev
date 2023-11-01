const { glob } = require('glob');

module.exports = (path) => {
	return glob(path, {
		ignore: 'node_modules/**',
		maxDepth: 3,
	}).catch(e => console.log(e));;
}
