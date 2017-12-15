var Player = require('../models/player');
var SoccerPlayer = require('../models/soccerPlayer');

module.exports = function (app) {
  app.route('/api/players')
    .get(function (request, res) {
      Player.find(function (error, result) {
        return result;
      }).then(function (result) {
        return res.send(result);
      });
    })
    .post(function (request, res) {
      var newPlayer = new Player();

      newPlayer.name = request.body.name;
      newPlayer.points = request.body.points;
      newPlayer.team = request.body.team;

      newPlayer.save().then(function (result) {
        return res.send(result);
      });
    });

  app.route('/api/players/:id/team')
    .get(function (request, res) {
      Player.findById(request.params.id, function (error, response) {
        return response;
      }).then(function (result) {
        return res.send(result);
      });
    })
    .post(function (request, res) {
      Player.findByIdAndUpdate(request.params.id, { team: request.body.team }).then(function (result) {
        return res.send(result);
      });
    });

  app.route('/api/players/:id/team/soccer-player')
    .post(function (request, res) {
      Player.findByIdAndUpdate(request.params.id, { $push: { team: request.body.soccerPlayer } }).then(function (result) {
        return res.send(result);
      });
    });
};
