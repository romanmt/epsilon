exports.get = function(req, res) {
  var test = {name: req.params.testName}
  EpsilonTest.findOrCreate(test, function(err, test) {
    res.json(test.toJSON());
  })
}

exports.update = function(req, res) {
  var test = req.body.test;
  EpsilonTest.findOneAndUpdate(
    _(test).pick('name'),
    test, function(err, result) {
      res.json(result);
    });
}
