module.exports = (endpoint) => {
	/**
	 * get list of entries with their meta data
	 * flatten to the value of `entries` in the api response
	 * convert entries into a Map keyed by each entry's uuid
	 */
	return fetch(endpoint)
		.then((resp) => {
			if (!resp.ok) throw Error ('network problem');
			return resp.json();
		})
		.then((json) => [ ...json.entries ])
		.then((entries) => new Map(entries.map((entry) => [ entry.uuid, entry ])))
		.catch((e) => console.log(e));
}
