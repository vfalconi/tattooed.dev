class webmentions {
	constructor(url) {
		const mentions = this.fetchMentions(url).then(mentions => this.parseMentions(mentions));
		return mentions;
	}

	parseMentions = (mentions) => {
		const parsedMentions = {};

		if (mentions === undefined) return parsedMentions;

		mentions.children.forEach(mention => {
			const key = new URL(mention['wm-target']).pathname.replace(/^\//i, '');
			if (parsedMentions[key] === undefined) parsedMentions[key] = [];

			parsedMentions[key].push(mention);
		});

		return parsedMentions;
	}

	fetchMentions = (url) => {
		const results = fetch(url).then(resp => {
			if (resp.ok) return resp.json();
			return new Error('network error');
		}).then(mentions => {
			return mentions;
		}).catch(e => console.log(e));

		return results
	}
}

module.exports = { webmentions }
