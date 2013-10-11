var epsilon = require(__basepath + '/lib/controllers/epsilon_controller')

exports.setup = function(app) {
  app.get('/api/epsilon/:testName', epsilon.get)
  app.put('/api/epsilon', epsilon.update)
}
