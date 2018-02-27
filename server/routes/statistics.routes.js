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
        var fixtures = result.slice(2);

        fixtures.forEach(function (fixture) {
          fixture.results = setScores(fixture.results);

          setWins(fixture.results);
          setLost(fixture.results);
        });

        response.send(results);
      });

      function setWins(fixturePoints) {
        if (fixturePoints[0].points !== fixturePoints[1].points) {
          if (fixturePoints[0].name === 'Yerbinho') {
            results[0].win++;
          } else if (fixturePoints[0].name === 'Txarlo Magno') {
            results[1].win++;
          } else if (fixturePoints[0].name === 'ThePumpkin') {
            results[2].win++;
          }
        }
      }

      function setLost(fixturePoints) {
        if (fixturePoints[2].name === 'Yerbinho') {
          results[0].lost++;
        } else if (fixturePoints[2].name === 'Txarlo Magno') {
          results[1].lost++;
        } else if (fixturePoints[2].name === 'ThePumpkin') {
          results[2].lost++;
        }
      }
    });

  app.route('/api/statistics/streaks')
    .get(function (request, response) {
      var provisionalStreaks = [
        {
          name: 'Yerbinho',
          winStreak: 0,
          provStreak: 1
        },
        {
          name: 'Txarlo Magno',
          winStreak: 0,
          provStreak: 1
        },
        {
          name: 'The Pumpkin',
          winStreak: 0,
          provStreak: 1
        }
      ];

      Fixture.find(function (error, result) {
        var fixtures = result.slice(2);

        fixtures.forEach(function (fixture, index) {
          if (index > 0) {
            if (fixture.results[0].points >= fixtures[index - 1].results[0].points) {
              provisionalStreaks[0].provStreak++;
            } else {
              if (provisionalStreaks[0].winStreak < provisionalStreaks[0].provStreak) {
                provisionalStreaks[0].winStreak = provisionalStreaks[0].provStreak;
              }
              provisionalStreaks[0].provStreak = 1;
            }

            if (fixture.results[1].points >= fixtures[index - 1].results[1].points) {
              provisionalStreaks[1].provStreak++;
            } else {
              if (provisionalStreaks[1].winStreak < provisionalStreaks[1].provStreak) {
                provisionalStreaks[1].winStreak = provisionalStreaks[1].provStreak;
              }
              provisionalStreaks[1].provStreak = 1;
            }

            if (fixture.results[2].points >= fixtures[index - 1].results[2].points) {
              provisionalStreaks[2].provStreak++;
            } else {
              if (provisionalStreaks[2].winStreak < provisionalStreaks[2].provStreak) {
                provisionalStreaks[2].winStreak = provisionalStreaks[2].provStreak;
              }
              provisionalStreaks[2].provStreak = 1;
            }
          }
        });

        var finalStreaks = [
          {
            name: 'Yerbinho',
            win: provisionalStreaks[0].winStreak
          },
          {
            name: 'Txarlo Magno',
            win: provisionalStreaks[1].winStreak
          },
          {
            name: 'The Pumpkin',
            win: provisionalStreaks[2].winStreak
          }
        ];

        response.send(finalStreaks);
      });
    });

  function setScores(fixtures) {
    return fixtures.sort(function (elementA, elementB) {
      if (elementA.points < elementB.points) {
        return 1;
      }
      if (elementA.points > elementB.points) {
        return -1;
      }

      return 0;
    });
  }
};
