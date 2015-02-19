var Q = require('q');
var shell = require('shelljs');

module.exports = function(cmd, pwd) {
	var deferred = Q.defer();
	if (pwd) {
		cmd = 'pushd ' + pwd + ';' + cmd + '; popd';
	}
	console.log('------------------------------------------------------');
	console.log('exec ' + cmd);
	shell.exec(cmd, function(code, output) {
		console.log('exit status: ' + code);
		if (code === 0) {
			deferred.resolve({code:code, output:output});
		} else {
			deferred.reject({code:code, output:output});
		}
	});
	return deferred.promise;
}