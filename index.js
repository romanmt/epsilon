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
    app.get('/epsilon/test/:testName', epsilon.get)
    app.put('/epsilon/test', epsilon.update)
  }
}
