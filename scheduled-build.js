require("dotenv").config();
const fs = require('fs');
const { spawn } = require('child_process');
const fetch = require('node-fetch');
const hash = require('object-hash');
const buildLock = (fs.existsSync('build.lock') ? fs.readFileSync('build.lock', 'utf8') : null);

(async () => {
	const entries = await fetch(process.env.BLOG_ENDPOINT).then(resp => {
		if (resp.ok) return resp.json();
		throw Error('network error');
	}).catch(err => console.log(err));
	const entriesHash = hash(entries);

	if (buildLock === null) {
		console.log('no build lock, running build');
		await spawn('npm', [ 'run-script', 'build' ]);
		await fs.writeFile('build.lock', entriesHash, null, () => {
			console.log('build lock generated');
		});
	} else if (buildLock !== entriesHash) {
		console.log('build lock, no match, running build');
		await spawn('npm', [ 'run-script', 'build' ]);
		await fs.writeFile('build.lock', entriesHash, null, () => {
			console.log('build lock generated');
		});
	} else if (buildLock === entriesHash) {
		console.log('build lock matches, no build');
	}
})();
