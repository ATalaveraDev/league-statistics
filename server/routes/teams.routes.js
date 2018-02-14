const https = require('https');

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

  https.get({hostname: 'api-game.laligafantasymarca.com', path: '/api/1/team/' + request.params.playerId + '/lineup', headers: {'Authorization': 'Bearer ' + request.headers.bearer}}, function (response) {
    response.on('data', function (chunk) {
      data += chunk;
    });

    response.on('end', function () {
      data = JSON.parse(data);
      result(data);
    });
  });
}
