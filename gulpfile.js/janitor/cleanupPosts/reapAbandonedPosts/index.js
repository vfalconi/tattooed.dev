const removePost = require('./removePost');

module.exports = (paths) => {
	return Promise.all(paths.map(p => removePost(p)))
	.catch(e => console.log(e));
}
