var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var fixtureSchema = new Schema({
  name: String,
  results: []
});

module.exports = mongoose.model('Fixture', fixtureSchema);
