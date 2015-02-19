var url = require('url');
var errors = require('./errors');

function repoUrlToDirName(repoUrl) {
	var parsedUrl = url.parse(repoUrl);
	var dirName = parsedUrl.pathname.substring(parsedUrl.pathname.lastIndexOf('/')+1);
	if (dirName.indexOf(".git") > 0) {
		dirName = dirName.replace(".git","");
	}
	return 'repos/' + dirName;
}

module.exports = function(repo) {
	var url = process.env[repo.toUpperCase()+'_REPO'];
	var branch = process.env[repo.toUpperCase()+'_BRANCH'];
	var command = process.env[repo.toUpperCase()+'_COMMAND'];
	if (! url || ! branch || ! command) {
		throw errors.notFound("Repository " + repo + " not configured");
	}
	return {
		url: url,
		branch: branch,
		dir: repoUrlToDirName(url),
		command: command
	}
}