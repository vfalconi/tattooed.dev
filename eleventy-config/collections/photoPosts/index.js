const { CMSEntries } = require('../../lib/CMSEntries');

module.exports = async () => {
	return await new CMSEntries(process.env.BUILD_PHOTOS_ENDPOINT);
};
