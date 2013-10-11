var Schema = mongoose.Schema
  , supergoose = require('supergoose')

var EpsilonLever = new Schema({
  name: String
  , totalTrials: {type: Number, default: 0} 
  , totalRewards: {type: Number, default: 0}
})
var EpsilonTest = new Schema({
  name: String
  , levers: [EpsilonLever]
})

EpsilonTest.plugin(supergoose)

module.exports = mongoose.model('EpsilonTest', EpsilonTest )
