const https = require('https');
var constants = require('../constants.js');
const axios = require('axios');

module.exports = function (app) {
  app.route('/api/players/:playerId/points/live')
    .get(function (request, response) {
      getPoints(request).then(function (result) {
        var promisesArray = [];
        var teamPoints = [];

        promisesArray.push(axios.get(constants.hostname + constants.playerPath + result.data.formation.goalkeeper[0].id, {headers: {'Authorization': 'Bearer ' + request.headers.bearer}}).then(function (response) {
          teamPoints.push(response.data);

          return teamPoints;
        }));

        result.data.formation.defender.forEach(function (player) {
          promisesArray.push(axios.get(constants.hostname + constants.playerPath + player.id, {headers: {'Authorization': 'Bearer ' + request.headers.bearer}}).then(function (response) {
            teamPoints.push(response.data);

            return teamPoints;
          }));
        });

        result.data.formation.midfield.forEach(function (player) {
          promisesArray.push(axios.get(constants.hostname + constants.playerPath + player.id, {headers: {'Authorization': 'Bearer ' + request.headers.bearer}}).then(function (response) {
            teamPoints.push(response.data);

            return teamPoints;
          }));
        });

        result.data.formation.striker.forEach(function (player) {
          promisesArray.push(axios.get(constants.hostname + constants.playerPath + player.id, {headers: {'Authorization': 'Bearer ' + request.headers.bearer}}).then(function (response) {
            teamPoints.push(response.data);

            return teamPoints;
          }));
        });

        axios.all(promisesArray).then(axios.spread(function () {
          var result = [];

          teamPoints.forEach(function (player) {
            result.push({name: player.nickname, points: player.player_stats[player.player_stats.length - 1].total_points, picture: player.image96x96});
          });

          return response.send(result);
        }));
      });
    });

  function getPoints(request) {
    return axios.get(constants.hostname + constants.teamPath + request.params.playerId + '/lineup', {headers: {'Authorization': 'Bearer ' + request.headers.bearer}});
  }
};
