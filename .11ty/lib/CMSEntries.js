const md = require('marked');
const fetch = require('node-fetch');
class CMSEntries {
	static timestampToObject(timestamp) {
		return new Date(timestamp);
	}
	static fetchEntries(endpoint) {
		return fetch(endpoint)
			.then(resp => {
				if (resp.ok) return resp.json();
				throw new Error('network error');
			}).then(resp => {
				return resp.entries;
			}).catch(err => {
				console.log(err);
			});
	}

	static parse(entries) {
		const parsedEntries = entries.map(entry => {
			if (entry.url) entry.slug = entry.url;
			if (entry.post) entry.parsed = md(entry.post);

			if (entry.published_at) entry.published_at = CMSEntries.timestampToObject(entry.published_at);
			if (entry.dateCreated.date) entry.dateCreated.date = CMSEntries.timestampToObject(entry.dateCreated.date);

			if (entry.dateUpdated) {
				entry.dateUpdated.date = CMSEntries.timestampToObject(entry.dateUpdated.date);
			}

			if (entry.footnotes) {
				entry.footnotes.forEach((note, i) => {
					entry.footnotes[i] = md(note);
				});
			}
			return entry;
		});

		return parsedEntries;
	}

	static get(endpoint) {
		return CMSEntries.fetchEntries(endpoint).then(entries => CMSEntries.parse(entries));
	}
}

module.exports = {
	CMSEntries
}
