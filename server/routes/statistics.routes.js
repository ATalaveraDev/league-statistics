var Fixture = require('../models/fixture');

module.exports = function (app) {
  app.route('/api/statistics/results')
    .get(function (request, response) {
      var results = [
        {
          name: 'Yerbinho',
          win: 0,
          lost: 0
        },
        {
          name: 'Txarlo Magno',
          win: 0,
          lost: 0
        },
        {
          name: 'The Pumpkin',
          win: 0,
          lost: 0
        }
      ];

      Fixture.find(function (error, result) {
        result.slice(2).forEach(function (fixture) {
          chooseWinners(fixture.results);
        });

        response.send(results);
      });

      function chooseWinners(fixturePoints) {
        fixturePoints.sort(function (elementA, elementB) {
          if (elementA.points < elementB.points) {
            return 1;
          }
          if (elementA.points > elementB.points) {
            return -1;
          }

          return 0;
        });

        if (fixturePoints[0].points !== fixturePoints[1].points) {
          if (fixturePoints[0].name === 'Yerbinho') {
            results[0].win++;
          } else if (fixturePoints[0].name === 'Txarlo Magno') {
            results[1].win++;
          } else if (fixturePoints[0].name === 'ThePumpkin') {
            results[2].win++;
          }
        }

        if (fixturePoints[2].name === 'Yerbinho') {
          results[0].lost++;
        } else if (fixturePoints[2].name === 'Txarlo Magno') {
          results[1].lost++;
        } else if (fixturePoints[2].name === 'ThePumpkin') {
          results[2].lost++;
        }
      }
    });
};
