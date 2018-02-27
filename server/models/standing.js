var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var standingSchema = new Schema({
  name: String,
  points: []
});

module.exports = mongoose.model('Standing', standingSchema);
