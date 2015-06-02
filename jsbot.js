var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var fs = require('fs');
var app = express();

var hookUrl = process.env.WEBHOOK;

app.set('port', (process.env.PORT || 5000));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

process.stdout.on('data', function(data) {
  request.post(hookUrl, { form: JSON.stringify({ text: data }) }, function(err, resp, body) { });
});
process.stderr.on('data', function(data) {
  request.post(hookUrl, { form: JSON.stringify({ text: data }) }, function(err, resp, body) { });
});

app.post('/', function(req, res) {
  if (!req.body.text) return res.send(400, 'undefined');
  console.log(eval(req.body.text));
});

app.listen(app.get('port'), function() { });
