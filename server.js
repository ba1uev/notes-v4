var fs = require('fs');
var path = require('path');
var express = require('express');
var app = express();

var COMMENTS_FILE = path.join(__dirname, 'comments.json');

app.set('port', (process.env.PORT || 8080));

app.use('/', express.static(path.join(__dirname, 'pub')));

app.listen(app.get('port'), function() {
  console.log('it okei, go to -> http://localhost:' + app.get('port') + '/');
});
