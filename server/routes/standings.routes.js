var Standing = require('../models/standing');

module.exports = function (app) {
  app.route('/api/standings')
    .get(function (request, response) {
      Standing.find(function (error, results) {
        var result = {
          points: [
            {
              seriesname: 'Yerbinho',
              data: [{value: 0}, {value: 0}]
            },
            {
              seriesname: 'Txarlo Magno',
              data: [{value: 0}, {value: 0}]
            },
            {
              seriesname: 'The Pumpkin',
              data: [{value: 0}, {value: 0}]
            }
          ],
          labels: [{
            category: [{label: 'Jornada 1'}, {label: 'Jornada 2'}]
          }]
        };

        results.forEach(function (fixture) {
          result.labels[0].category.push({label: fixture.name});
          result.points[0].data.push({value: fixture.points[0].points});
          result.points[1].data.push({value: fixture.points[1].points});
          result.points[2].data.push({value: fixture.points[2].points});
        });

        return response.send(result);
      });
    })
    .post(function (request, response) {
      var standing = new Standing();

      standing.name = request.body.name;
      standing.points = [
        {
          player: 'Yerbinho',
          points: 0
        },
        {
          player: 'Txarlo Magno',
          points: 0
        },
        {
          player: 'The Pumpkin',
          points: 0
        }
      ];

      Standing.find(function (error, result) {
        if (result.length > 0) {
          standing.points[0].points = result[result.length - 1].points[0].points + request.body.points[0].points;
          standing.points[1].points = result[result.length - 1].points[1].points + request.body.points[1].points;
          standing.points[2].points = result[result.length - 1].points[2].points + request.body.points[2].points;
        } else {
          standing.points[0].points = request.body.points[0].points;
          standing.points[1].points = request.body.points[1].points;
          standing.points[2].points = request.body.points[2].points;
        }

        standing.save().then(function (standing) {
          response.send(standing);
        });
      });
    });
};
