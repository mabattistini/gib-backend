const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/guib', {UseMongoClient: true})
mongoose.Promise = global.Promise

module.exports = mongoose

