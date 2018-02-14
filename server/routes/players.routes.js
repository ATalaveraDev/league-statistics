var Player = require('../models/player');
const https = require('https');
var constants = require('../constants.js');

module.exports = function (app) {
  app.route('/api/players')
    /*.get(function (request, res) {
      Player.find(function (error, result) {
        return result;
      }).then(function (result) {
        return res.send(result);
      });
    })*/
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




  app.route('/api/players')
    .get(function (request, response) {
      getPlayers(request, function (result) {
        response.send(result);
      });
    });

  app.route('/api/players/:playerId')
    .get(function (request, response) {
      getPlayers(request, function (result) {
        response.send(findPlayer(request.params.playerId, result));
      });
    });

  function getPlayers(request, result) {
    var data = '';
    https.get({hostname: constants.hostname, path: constants.playersPath, headers: {'Authorization': 'Bearer ' + request.headers.bearer}}, function (response) {
      response.on('data', function (chunk) {
        data += chunk;
      });

      response.on('end', function () {
        result(JSON.parse(data));
      })
    });
  }

  function findPlayer(playerId, players) {
    return players.find(function (player) {
      return player.id === playerId;
    });
  }
};
