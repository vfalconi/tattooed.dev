const { sortSources } = require('./entryHelpers');

class CMSEntries {
	constructor(endpoint) {
		return this.fetchEntries(endpoint).then(entries => this.parse(entries));
	}

	async fetchEntries(endpoint) {		
		return await fetch(endpoint).then(resp => {
				if (resp.ok) return resp.json();
				throw new Error('network error');
			}).then(resp => {
				return resp.entries;
			}).catch(err => {
				console.group('[ ] Fetch error');
				console.log(err.message);
				console.log('endpoint', endpoint);
				console.groupEnd();
			});
	}

	timestampToObject(timestamp) {
		return new Date(timestamp);
	}

	parse(entries) {
		return entries.map(entry => {
			if (entry.url) entry.slug = entry.url;

			if (entry.published_at) entry.published_at = this.timestampToObject(entry.published_at);
			if (entry.date) entry.date = this.timestampToObject(entry.date);

			if (entry.dateCreated) {
				if (entry.dateCreated.date) entry.dateCreated.date = this.timestampToObject(entry.dateCreated.date);
			}

			if (entry.dateUpdated) {
				entry.dateUpdated.date = this.timestampToObject(entry.dateUpdated.date);
			}

			if (entry.photos !== undefined) {
				entry.photos = entry.photos.map(photo => {
					const processedPhoto = {...photo};
					processedPhoto.title = photo.title.replace(/\s\((AVIF|WEBP|JPG)\)/,'');
					processedPhoto.permalink = `${entry.url}photos/${processedPhoto.title}/`;
					processedPhoto.optimizedVersions = sortSources(photo);
					return processedPhoto;
				});
			}

			return entry;
		});
	}
}

module.exports = {
	CMSEntries
}
