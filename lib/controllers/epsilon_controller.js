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

exports.trial = function(req, res, next) {
  var levers = req.query.levers.split(',');
  EpsilonTest.findOrCreate({name: req.params.testName}, function(err, test) {
    var existing = _.pluck(test.levers, 'name')
    var missing = _.difference(levers, existing);
    async.forEach(missing, function(name, done) {
      test.levers.push({name: name})
      done(null);
    }, function(err){
      if(err) return next(err);
      test.save(function(err) {
        if(err) return next(err);
        res.json(test.levers);
      });
    });
  });
}
