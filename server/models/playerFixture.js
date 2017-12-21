var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var playerFixtureSchema = new Schema({
  fixtureName: String,
  playerName: String,
  playerPoints: Number
});

module.exports = mongoose.model('PlayerFixture', playerFixtureSchema);
