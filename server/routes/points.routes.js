var constants = require('../constants.js');
const axios = require('axios');

module.exports = function (app) {
  app.route('/api/players/:playerId/points/live')
    .get(function (request, response) {
      getPoints(request).then(function (team) {
        var result = [];

        team.data.formation.goalkeeper.forEach(function (player) {
          var points = player.week_points ? player.week_points : '-';

          result.push({name: player.nickname, points: points, picture: player.image96x96});
        });

        team.data.formation.defender.forEach(function (player) {
          var points = player.week_points ? player.week_points : '-';

          result.push({name: player.nickname, points: points, picture: player.image96x96});
        });

        team.data.formation.midfield.forEach(function (player) {
          var points = player.week_points ? player.week_points : '-';

          result.push({name: player.nickname, points: points, picture: player.image96x96});
        });

        team.data.formation.striker.forEach(function (player) {
          var points = player.week_points ? player.week_points : '-';

          result.push({name: player.nickname, points: points, picture: player.image96x96});
        });

        return response.send(result);
      });
    });

  function getPoints(request) {
    return axios.get('https://api-game.laligafantasymarca.com/api/1/week/current', {headers: {'Authorization': 'Bearer ' + request.headers.bearer}}).then(function (response) {
      return axios.get(constants.hostname + constants.teamPath + request.params.playerId + '/lineup/' + (response.data.week_number - 1).toString(), {headers: {'Authorization': 'Bearer ' + request.headers.bearer}});
    });
  }
};
