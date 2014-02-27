var epsilon = require('./lib/controllers/epsilon_controller')
module.exports = {
  middleware: function() {
    return function (req, res, next) {
      if(!req.url.match(/^\/epsilon\/epsilon_greedy.js$/)) return next();
      console.log(__dirname + '/client/epsilon_greedy.js')
      res.status(200).sendfile("/client/epsilon_greedy.js", {root: __dirname})
    }
  },

  bind: function(app) {
    app.post('/epsilon/test/:testName/trial', epsilon.trial)
    app.post('/epsilon/test/:testName/reward', epsilon.reward)
    app.put('/epsilon/test/:testName', epsilon.get)
  }
}
