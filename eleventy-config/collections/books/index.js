const { CMSEntries } = require('../../lib/CMSEntries');

module.exports = async () => {
	const bookshelfEntries = await new CMSEntries(process.env.BUILD_BOOKS_ENDPOINT);
	const books = {};

	bookshelfEntries.forEach(book => {
		const bookYear = book.date.getFullYear();
		if (books[bookYear] === undefined) books[bookYear] = [];
		books[bookYear].push(book);
	});

	return books;
};
