var epsilon = require(__basepath + '/lib/controllers/epsilon_controller')

exports.setup = function(app) {
  app.get('/epsilon/test/:testName', epsilon.get)
  app.put('/epsilon/test', epsilon.update)
}
