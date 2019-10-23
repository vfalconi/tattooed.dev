require("dotenv").config();
const cron = require('node-cron');
const shell = require('shelljs');
const fs = require('fs');
const { DateTime } = require("luxon");
const fetch = require('node-fetch');
const hash = require('object-hash');
const buildLock = (fs.existsSync('build.lock') ? fs.readFileSync('build.lock', 'utf8') : null);
const buildTime = DateTime.local().toLocaleString(DateTime.DATETIME_MED);
let results = null;
let entriesHash = null;

cron.schedule('*/15 * * * *', async () => {
	// fetch the entries (in JSON) from the CMS for comparison purposes
	// i send the CMS a header that contains the build environment, because i use it
	// to determine whether to include drafts/pending entries or leave them out
	// this is really helpful when i'm using certain markup for the first time and need
	// to work through the styling (ex: tables, figures, etc)
	const apiResponse = await fetch(process.env.BUILD_BLOG_ENDPOINT, {
		'headers': {
			'x-build-environment': process.env.BUILD_ENVIRONMENT
		}
	}).then(resp => {
		if (resp.ok) return resp.json();
		throw Error('network error');
	}).catch(err => {
		return `${err.type.toUpperCase()} ERROR (#${err.errno}: ${err.code}): ${err.message}`;
	});

	if (typeof apiResponse === 'object') {
		// if fetch was successful, i'll have a JSON object, so do the build stuff

		// this happens
		entriesHash = hash(apiResponse);

		if (entriesHash !== buildLock) {
			await shell.exec(`npm run-script build`);

			// update/write the build lock
			await fs.writeFileSync('build.lock', entriesHash);

			results = `build script ran`;
		} else {
			results = 'no build, lock matched response';
		}
	} else {
		// the fetch was not successful
		results = apiResponse;
	}

	// output the events of the quarter-hour
	console.group(`build for ${buildTime}`)
		console.log(`build lock: ${buildLock}`);
		console.log(`entries hash: ${entriesHash}`)
		console.group('Settings');
			if (process.getuid) console.log(`Current uid: ${process.getuid()}`);
			// manually adding/removing dotenv variables from this output was annoying as hell
			Object.keys(process.env).forEach(key => {
				if (key.substr(0,6) === 'BUILD_') console.log(`${key}: ${process.env[key]}`);
			});
		console.groupEnd();
		console.group('Result');
			console.log(results);
		console.groupEnd();
	console.groupEnd();
	console.log('========================================================================');
});
