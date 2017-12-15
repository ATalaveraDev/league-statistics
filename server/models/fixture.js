var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Player = require('Player');

var fixtureSchema = new Schema({
  name: String,
  results: [{ player: Player, points: Number }]
});

module.exports = mongoose.model('Fixture', fixtureSchema);
