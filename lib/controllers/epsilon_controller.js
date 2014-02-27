var EpsilonTest = require('../models/epsilon_test')

exports.get = function(req, res) {
  var test = {
    name: req.params.testName,
    levers: _.map(req.body.levers, function(l) {
      return {totalTrials: 0, totalRewards: 0, name: l}
    })
  }

  EpsilonTest.findOrCreate(_.pick(test, 'name'), test, function(err, test) {
    res.json(test.toJSON());
  })
}

function increment(testName, levelName, field) {
  var query = {name: testName}

  //tried to use update with an $inc operator, wasn't working
  //don't like the double pass in here
  EpsilonTest.findOne(query, function(err, doc) {
    if (!_.any(doc.levers, function(l) { return l.name === levelName }))
      doc.levers.push({name: levelName, totalTrials: 0, totalRewards: 0})

    _.each(doc.levers, function(l) {
      if(l.name === levelName) l[field]++;
    })
    doc.save()
  })
}

exports.trial = function(req, res) {
  increment(req.params.testName, req.body.name, 'totalTrials')
  res.json({})
}

exports.reward = function(req, res) {
  increment(req.params.testName, req.body.name, 'totalRewards')
  res.json({})
}
