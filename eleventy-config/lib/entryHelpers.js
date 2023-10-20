const dppx2int = (dppx) => {
	return parseFloat(dppx.replace('dppx', ''));
};

const sortByDppx = (photoA, photoB) => {
	const resA = dppx2int(photoA.resolution);
	const resB = dppx2int(photoB.resolution);

	if (resA > resB) return -1;
	if (resA < resB) return 1;

	return 0;
}

module.exports.sortSources = (photo) => {
	const sortedSources = {
		'image/avif': [],
		'image/webp': [],
		'image/jpeg': [],
	};

	photo.optimizedVersions.forEach(version => {
		sortedSources[version.mimeType].push(version);
	});

	Object.keys(sortedSources).forEach(type => {
		sortedSources[type].sort(sortByDppx);
	});

	return sortedSources;
};
