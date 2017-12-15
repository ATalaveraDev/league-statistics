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

  app.route('/api/players/:id/soccer-players')
    .get(function (request, res) {
      Player.findById(request.param.id, function (error, response) {
        return response;
      }).then(function (result) {
        return res.send(result);
      });
    })
    .post(function (request, res) {
      var newSoccerPlayer = new SoccerPlayer();

      newSoccerPlayer.name = request.body.name;
      newSoccerPlayer.points = request.body.points;
      newSoccerPlayer.position = request.body.position;

      newSoccerPlayer.save().then(function (result) {
        return res.send(result);
      });
    });
};
