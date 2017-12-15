var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var playerSchema = new Schema({
  name: String,
  points: Number,
  team: Object
});

module.exports = mongoose.model('Player', playerSchema);
