const { CMSEntries } = require('../../lib/CMSEntries');

module.exports = async () => {
	const allBlogPosts = await new CMSEntries(process.env.BUILD_BLOG_ENDPOINT);
	const projects = await new CMSEntries(process.env.BUILD_PROJECTS_ENDPOINT);
	const changelogPosts = [...allBlogPosts].filter(blogPost => blogPost.entryType === 'changelog');

	projects.forEach(project => {
		project.relatedPosts = changelogPosts.filter(post => post.relatedProjects.some(relatedProject => relatedProject.id === project.id));
	});

	return projects;
};
