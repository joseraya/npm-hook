var Q = require('q');
var errors = require('./errors');
var config = require('./config');
var exec = require('./exec');

function clone(conf) {
	var deferred = Q.defer();
	exec('git clone ' + conf.url + ' ' + conf.dir)
	.then(function(result){
		deferred.resolve(result);
	},function(result){
		if (result.code === 128 ) {
			//128 means that the repo already exists in the filesystem, this is ok
			deferred.resolve(result);
		} else {
			deferred.reject(result);
		}
	});
	return deferred.promise;
}

module.exports.run = function(repo) {
	var conf = config(repo);
	return clone(conf).
	then(function() {
		return exec('git checkout ' + conf.branch, conf.dir)
	}).
	then(function(){
		return exec('git pull', conf.dir);
	}).
	then(function() {
		return exec('npm install', conf.dir);	
	}).
	then(function() {
		return exec(conf.command, conf.dir);	
	});
}