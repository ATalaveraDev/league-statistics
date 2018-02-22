var Fixture = require('../models/fixture');
var Player = require('../models/player');
var PlayerFixture = require('../models/playerFixture');
var Q = require('q');

module.exports = function (app) {
  app.route('/api/fixtures')
    .get(function (request, response) {
      Fixture.find(function (error, result) {
        return result;
      }).then(function (result) {
        return response.send(result);
      })
    })
    .post(function (request, response) {
      var newFixture = new Fixture();
      var promisesArray = [];

      request.body.results.forEach(function (element) {
        var newPlayerFixture = new PlayerFixture();
        newPlayerFixture.fixtureName = request.body.name;
        newPlayerFixture.playerName = element.name;
        newPlayerFixture.playerPoints = element.points;

        promisesArray.push(newPlayerFixture.save());
      });

      return Q.all(promisesArray).then(function (value) {
        newFixture.name = request.body.name;
        newFixture.results = request.body.results;

        newFixture.save().then(function (fixture) {
          return response.send(fixture);
        });
      });
    });

  app.route('/api/fixtures/last')
    .get(function (request, response) {
      Fixture.find(function (error, result) {
        return response.send(result[result.length - 1]);
      });
    });

  app.route('/api/fixtures/standings')
    .get(function (request, res) {
      Player.find(function (error, response) {
        return response;
      }).then(function (players) {
        var results = {
          labels: [{
            category: []
          }],
          dataset: []
        };

        players.forEach(function (element) {
          results.dataset.push({ seriesname: element.name, data: [] });
        });

        Fixture.find(function (error, result) {
          return result;
        }).then(function (fixtures) {
          fixtures.forEach(function (element) {
            results.labels[0].category.push({ label: element.name });

            element.results.forEach(function (fixture) {
              switch (fixture.name) {
                case 'Yerbinho':
                  results.dataset[0].data.push({ value: fixture.points });
                  break;
                case 'Txarlo Magno':
                  results.dataset[1].data.push({ value: fixture.points });
                  break;
                case 'ThePumpkin':
                  results.dataset[2].data.push({ value: fixture.points });
                  break;
              }
            });
          });

          return res.send(results);

          /*PlayerFixture.find(function (error, response) {
            return response;
          }).then(function (fixtures) {
            fixtures.forEach(function (fixture) {
              switch (fixture.playerName) {
                case 'Yerbinho':
                  results.dataset[0].data.push({ value: fixture.playerPoints });
                  break;
                case 'Txarlo Magno':
                  results.dataset[1].data.push({ value: fixture.playerPoints });
                  break;
                case 'ThePumpkin':
                  results.dataset[2].data.push({ value: fixture.playerPoints });
                  break;
              }
            });
            return res.send(results);
          });*/
        });
      });
    });
};
