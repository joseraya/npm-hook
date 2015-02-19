var express = require('express')
var app = express()
var hook = require('./hook.js');
console.log("Hook", hook)

app.set('port', (process.env.PORT || 3000));
//app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
  res.send('Hello World!')
});

app.post('/:repo', function (req, res) {
	console.log("Webhook invoked");
	hook.run(req.params.repo).then(function() {
		console.log("Hook was run successfully");
	}, function(error) {
		console.log("Error: ", error);
	});
	//It is a webhook, we should not make the client wait
	res.send('POST request to homepage  to ' + req.params.repo);

});

var server = app.listen(app.get('port'), function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)

});