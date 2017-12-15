var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var soccerPlayerSchema = new Schema({
  name: String,
  points: Number,
  position: String
});

module.exports = mongoose.model('SoccerPlayer', soccerPlayerSchema);
