var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var fs = require('fs');
var app = express();

var hookUrl = process.env.WEBHOOK;

app.set('port', (process.env.PORT || 5000));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

process.stdout.write = process.stderr.write = function(data) {
  request.post(hookUrl, { body: JSON.stringify({ text: data  }) }, function(err, resp, body) { });
};

app.post('/', function(req, res) {
  if (!req.body.text) return res.send(400, 'undefined');
  req.body.text = decodeURIComponent(req.body.text);
  console.log((req.body.user_name || 'undefined') + ": `" + req.body.text + "`");
  try {
    (function(t) {
      eval.apply(this, arguments);
    })(req.body.text);
  } catch(e) {
    console.log(e)
  }
  res.sendStatus(204);
});

app.listen(app.get('port'), function() { });
