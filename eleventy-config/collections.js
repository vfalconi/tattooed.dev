const { CMSEntries } = require('./lib/CMSEntries');
const { webmentions } = require('./lib/webmentions');

module.exports.blogPosts = async () => {
	const entries = await new CMSEntries(process.env.BUILD_BLOG_ENDPOINT);
	const mentions = await new webmentions(process.env.WEBMENTIONS_ENDPOINT);

	entries.forEach(entry => {
		entry.mentions = mentions[entry.permalink] || [];
	});

	return entries;
};

module.exports.photoPosts = async () => {
	return await new CMSEntries(process.env.BUILD_PHOTOS_ENDPOINT);
};

module.exports.books = async () => {
	const bookshelfEntries = await new CMSEntries(process.env.BUILD_BOOKS_ENDPOINT);
	const books = {};

	bookshelfEntries.forEach(book => {
		const bookYear = book.date.getFullYear();
		if (books[bookYear] === undefined) books[bookYear] = [];
		books[bookYear].push(book);
	});

	return books;
};

module.exports.photos = async () => {
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

/*module.exports.projects = async() => {
	const allBlogPosts = await new CMSEntries(process.env.BUILD_BLOG_ENDPOINT);
	const projects = await new CMSEntries(process.env.BUILD_PROJECTS_ENDPOINT);
	const changelogPosts = [...allBlogPosts].filter(blogPost => blogPost.entryType === 'changelog');

	projects.forEach(project => {
		project.relatedPosts = changelogPosts.filter(post => post.relatedProjects.some(relatedProject => relatedProject.id === project.id));
	});

	return projects;
};*/
