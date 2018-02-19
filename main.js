'use strict';

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var mongoose = require('mongoose');

var port = process.env.PORT || 8080;
var db = require('./config/db.js');
var path = require('path');

mongoose.connect(db.url);

app.use(bodyParser.json({type: 'application/json'}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('X-HTTP-Method-Override'));

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

require('./server/routes/players.routes')(app);
require('./server/routes/fixtures.routes')(app);
require('./server/routes/teams.routes')(app);
require('./server/routes/statistics.routes')(app);
require('./server/routes/points.routes')(app);

app.use(express.static(__dirname + '/dist'));

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname + '/dist/index.html'));
});

app.listen(port);

console.log('Fantasy statistics running at port: ' + port);

exports = module.exports = app;
