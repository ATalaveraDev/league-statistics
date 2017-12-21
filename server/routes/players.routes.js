var Player = require('../models/player');

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
      newPlayer.position = request.body.position;

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
    })
    .delete(function (request, res) {
      Player.findById(request.params.id, function (error, player) {
        var updatedTeam = player.team.filter(function (element) {
          return element.name !== request.body.soccerPlayerName;
        });

        Player.findByIdAndUpdate(request.params.id, { team: updatedTeam }).then(function (result) {
          return res.send(result);
        });
      });
    });

  app.route('/api/players/:id/team/soccer-player/:name/points')
    .post(function (request, res) {
      Player.findById(request.params.id, function (error, player) {
        var updatedTeam = player.team.map(function (element) {
          if (element.name === request.params.name) {
            element.points = request.body.points;
          }

          return element;
        });

        Player.findByIdAndUpdate(request.params.id, { team: updatedTeam }).then(function (result) {
          return res.send(result);
        });
      });
    });
};
