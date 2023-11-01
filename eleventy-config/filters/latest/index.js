module.exports = (entries) => {
	let mostRecentEntry = 0;

	entries.forEach(entry => {
		if (mostRecentEntry === 0) {
			mostRecentEntry = entry;
		} else {
			if (entry.published_at > mostRecentEntry.published_at) {
				mostRecentEntry = entry;
			}
		}
	});

	return mostRecentEntry || {};
}
