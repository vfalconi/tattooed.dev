const { CMSEntries } = require('../../lib/CMSEntries');

module.exports = async () => {
	const photoPosts = await new CMSEntries(process.env.BUILD_PHOTOS_ENDPOINT);
	const photos = [];

	photoPosts.forEach(post => {
		post.photos.forEach(photo => {
			photo.parentEntry = post.permalink;
			photo.parentTitle = post.title;
			photos.push(photo);
		});
	});

	return photos;
};
