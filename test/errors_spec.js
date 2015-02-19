var assert = require("assert");
var errors = require('../src/errors');

describe('Errors', function(){
	describe('Not found', function() {
		it('should set a 404 status', function() {
			var message = "Something was not found";
			var error = errors.notFound(message);
			assert.equal(404, error.status);
		});
	});
});
