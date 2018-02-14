const https = require('https');
var constants = require('../constants.js');

module.exports = function (app) {
  app.route('/api/teams/:playerId')
    .get(function (request, response) {
      getPlayerTeam(request, function (result) {
        response.send(result);
      });
    });
};

function getPlayerTeam(request, result) {
  var data = '';
  https.get({hostname: constants.hostname, path: constants.teamPath + request.params.playerId + '/lineup', headers: {'Authorization': 'Bearer ' + request.headers.bearer}}, function (response) {
    response.on('data', function (chunk) {
      data += chunk;
    });

    response.on('end', function () {
      result(JSON.parse(data));
    });
  });
}
