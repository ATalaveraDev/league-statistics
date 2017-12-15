var Fixture = require('../models/fixture');

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

      newFixture.name = request.body.name;
      newFixture.results = request.body.results;

      newFixture.save().then(function (fixture) {
        return response.send(fixture);
      });
    });
};
