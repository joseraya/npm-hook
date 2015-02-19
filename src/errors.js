module.exports.notFound = function(message) {
	var error = new Error(message);
	error.status = 404;
	error.name = "NotFound";
	return error;
}